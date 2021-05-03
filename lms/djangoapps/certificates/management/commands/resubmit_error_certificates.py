"""Management command for re-submitting certificates with an error status.

Certificates may have "error" status for a variety of reasons,
but the most likely is that the course was misconfigured
in the certificates worker.

This management command identifies certificate tasks
that have an error status and re-resubmits them.

Example usage:

    # Re-submit certificates for *all* courses
    $ ./manage.py lms resubmit_error_certificates

    # Re-submit certificates for particular courses
    $ ./manage.py lms resubmit_error_certificates -c edX/DemoX/Fall_2015 -c edX/DemoX/Spring_2016

"""


import logging
from textwrap import dedent

from django.core.management.base import BaseCommand, CommandError
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey

from lms.djangoapps.certificates.api import generate_user_certificates
from lms.djangoapps.certificates.models import CertificateStatuses, GeneratedCertificate
from xmodule.modulestore.django import modulestore

LOGGER = logging.getLogger(__name__)


class Command(BaseCommand):
    """Resubmit certificates with error status. """
    help = dedent(__doc__).strip()

    def add_arguments(self, parser):
        parser.add_argument(
            '-c', '--course',
            metavar='COURSE_KEY',
            dest='course_key_list',
            action='append',
            default=[],
            help='Only re-submit certificates for these courses.'
        )

    def handle(self, *args, **options):
        """Resubmit certificates with status 'error'.

        Arguments:
            username (unicode): Identifier for the certificate's user.

        Keyword Arguments:
            course_key_list (list): List of course key strings.

        Raises:
            CommandError

        """
        only_course_keys = []
        for course_key_str in options['course_key_list']:
            try:
                only_course_keys.append(CourseKey.from_string(course_key_str))
            except InvalidKeyError as e:
                raise CommandError(
                    '"{course_key_str}" is not a valid course key.'.format(
                        course_key_str=course_key_str
                    )
                ) from e

        if only_course_keys:
            LOGGER.info(
                (
                    'Starting to re-submit certificates with status "error" '
                    'in these courses: %s'
                ), ", ".join([str(key) for key in only_course_keys])
            )
        else:
            LOGGER.info('Starting to re-submit certificates with status "error".')

        # Retrieve the IDs of generated certificates with
        # error status in the set of courses we're considering.
        queryset = (
            GeneratedCertificate.objects.select_related('user')
        ).filter(status=CertificateStatuses.error)
        if only_course_keys:
            queryset = queryset.filter(course_id__in=only_course_keys)

        resubmit_list = [(cert.user, cert.course_id) for cert in queryset]
        course_cache = {}
        resubmit_count = 0
        for user, course_key in resubmit_list:
            course = self._load_course_with_cache(course_key, course_cache)

            if course is not None:
                generate_user_certificates(user, course_key, course=course)
                resubmit_count += 1
                LOGGER.info(
                    (
                        "Re-submitted certificate for user %s "
                        "in course '%s'"
                    ), user.id, course_key
                )
            else:
                LOGGER.error(
                    (
                        "Could not find course for course key '%s'.  "
                        "Certificate for user %s will not be resubmitted."
                    ), course_key, user.id
                )

        LOGGER.info("Finished resubmitting %s certificate tasks", resubmit_count)

    def _load_course_with_cache(self, course_key, course_cache):
        """Retrieve the course, then cache it to avoid Mongo queries. """
        course = (
            course_cache[course_key] if course_key in course_cache
            else modulestore().get_course(course_key, depth=0)
        )
        course_cache[course_key] = course
        return course
