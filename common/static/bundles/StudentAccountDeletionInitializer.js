(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([14,18,22],{

/***/ "./common/static/js/src/ReactRenderer.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactRenderer", function() { return ReactRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__("./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ReactRendererException = function (_Error) {
  _inherits(ReactRendererException, _Error);

  function ReactRendererException(message) {
    _classCallCheck(this, ReactRendererException);

    var _this = _possibleConstructorReturn(this, (ReactRendererException.__proto__ || Object.getPrototypeOf(ReactRendererException)).call(this, 'ReactRendererException: ' + message));

    Error.captureStackTrace(_this, ReactRendererException);
    return _this;
  }

  return ReactRendererException;
}(Error);

var ReactRenderer = function () {
  function ReactRenderer(_ref) {
    var component = _ref.component,
        selector = _ref.selector,
        componentName = _ref.componentName,
        _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props;

    _classCallCheck(this, ReactRenderer);

    _extends(this, {
      component: component,
      selector: selector,
      componentName: componentName,
      props: props
    });
    this.handleArgumentErrors();
    this.targetElement = this.getTargetElement();
    this.renderComponent();
  }

  _createClass(ReactRenderer, [{
    key: 'handleArgumentErrors',
    value: function handleArgumentErrors() {
      if (this.component === null) {
        throw new ReactRendererException('Component ' + this.componentName + ' is not defined. Make sure you\'re ' + ('using a non-default export statement for the ' + this.componentName + ' ') + ('class, that ' + this.componentName + ' has an entry point defined ') + 'within the \'entry\' section of webpack.common.config.js, and that the ' + 'entry point is pointing at the correct file path.');
      }
      if (!(this.props instanceof Object && this.props.constructor === Object)) {
        var propsType = _typeof(this.props);
        if (Array.isArray(this.props)) {
          propsType = 'array';
        } else if (this.props === null) {
          propsType = 'null';
        }
        throw new ReactRendererException('Invalid props passed to component ' + this.componentName + '. Expected ' + ('an object, but received a ' + propsType + '.'));
      }
    }
  }, {
    key: 'getTargetElement',
    value: function getTargetElement() {
      var elementList = document.querySelectorAll(this.selector);
      if (elementList.length !== 1) {
        throw new ReactRendererException('Expected 1 element match for selector "' + this.selector + '" ' + ('but received ' + elementList.length + ' matches.'));
      } else {
        return elementList[0];
      }
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(this.component, this.props, null), this.targetElement);
    }
  }]);

  return ReactRenderer;
}();

/***/ }),

/***/ "./lms/static/js/student_account/AccountsClient.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deactivate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__("./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_cookie__ = __webpack_require__("./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_cookie__);



var deactivate = function deactivate(password) {
  return fetch('/api/user/v1/accounts/deactivate_logout/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-CSRFToken': __WEBPACK_IMPORTED_MODULE_1_js_cookie___default.a.get('csrftoken')
    },
    // URLSearchParams + polyfill doesn't work in IE11
    body: 'password=' + encodeURIComponent(password)
  }).then(function (response) {
    if (response.ok) {
      return response;
    }

    throw new Error(response.status);
  });
};



/***/ }),

/***/ "./lms/static/js/student_account/StudentAccountDeletionInitializer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ReactRenderer__ = __webpack_require__("./common/static/js/src/ReactRenderer.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_StudentAccountDeletion__ = __webpack_require__("./lms/static/js/student_account/components/StudentAccountDeletion.jsx");
/* eslint-disable no-new */



var maxWait = 60000;
var interval = 50;
var accountDeletionWrapperId = 'account-deletion-container';
var currentWait = 0;

var wrapperRendered = setInterval(function () {
  var wrapper = document.getElementById(accountDeletionWrapperId);

  if (wrapper) {
    clearInterval(wrapperRendered);
    new __WEBPACK_IMPORTED_MODULE_0_ReactRenderer__["ReactRenderer"]({
      component: __WEBPACK_IMPORTED_MODULE_1__components_StudentAccountDeletion__["StudentAccountDeletion"],
      selector: '#' + accountDeletionWrapperId,
      componentName: 'StudentAccountDeletion',
      props: {
        socialAccountLinks: window.auth,
        isActive: window.isActive,
        additionalSiteSpecificDeletionText: window.additionalSiteSpecificDeletionText,
        mktgRootLink: window.mktgRootLink,
        platformName: window.platformName,
        siteName: window.siteName
      }
    });
  }

  currentWait += interval;

  if (currentWait >= maxWait) {
    clearInterval(wrapperRendered);
  }
}, interval);

/***/ }),

/***/ "./lms/static/js/student_account/components/StudentAccountDeletion.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StudentAccountDeletion", function() { return StudentAccountDeletion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__ = __webpack_require__("./node_modules/@edx/paragon/static/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edx_paragon_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils__ = __webpack_require__("./node_modules/edx-ui-toolkit/src/js/utils/string-utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__StudentAccountDeletionModal__ = __webpack_require__("./lms/static/js/student_account/components/StudentAccountDeletionModal.jsx");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals gettext */
/* eslint-disable react/no-danger, import/prefer-default-export */






var StudentAccountDeletion = function (_React$Component) {
  _inherits(StudentAccountDeletion, _React$Component);

  function StudentAccountDeletion(props) {
    _classCallCheck(this, StudentAccountDeletion);

    var _this = _possibleConstructorReturn(this, (StudentAccountDeletion.__proto__ || Object.getPrototypeOf(StudentAccountDeletion)).call(this, props));

    _this.closeDeletionModal = _this.closeDeletionModal.bind(_this);
    _this.loadDeletionModal = _this.loadDeletionModal.bind(_this);
    _this.state = {
      deletionModalOpen: false,
      isActive: props.isActive,
      socialAuthConnected: _this.getConnectedSocialAuth()
    };
    return _this;
  }

  _createClass(StudentAccountDeletion, [{
    key: 'getConnectedSocialAuth',
    value: function getConnectedSocialAuth() {
      var socialAccountLinks = this.props.socialAccountLinks;

      if (socialAccountLinks && socialAccountLinks.providers) {
        return socialAccountLinks.providers.reduce(function (acc, value) {
          return acc || value.connected;
        }, false);
      }

      return false;
    }
  }, {
    key: 'closeDeletionModal',
    value: function closeDeletionModal() {
      this.setState({ deletionModalOpen: false });
      this.modalTrigger.focus();
    }
  }, {
    key: 'loadDeletionModal',
    value: function loadDeletionModal() {
      this.setState({ deletionModalOpen: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          deletionModalOpen = _state.deletionModalOpen,
          socialAuthConnected = _state.socialAuthConnected,
          isActive = _state.isActive;

      var loseAccessText = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('You may also lose access to verified certificates and other program credentials like MicroMasters certificates. If you want to make a copy of these for your records before proceeding with deletion, follow the instructions for {htmlStart}printing or downloading a certificate{htmlEnd}.'), {
        htmlStart: '<a href="https://edx.readthedocs.io/projects/edx-guide-for-students/en/latest/SFD_certificates.html#printing-a-certificate" rel="noopener" target="_blank">',
        htmlEnd: '</a>'
      });

      var showError = socialAuthConnected || !isActive;

      var socialAuthError = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('Before proceeding, please {htmlStart}unlink all social media accounts{htmlEnd}.'), {
        htmlStart: '<a href="https://support.edx.org/hc/en-us/articles/207206067" rel="noopener" target="_blank">',
        htmlEnd: '</a>'
      });

      var activationError = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('Before proceeding, please {htmlStart}activate your account{htmlEnd}.'), {
        htmlStart: '<a href="https://support.edx.org/hc/en-us/articles/115000940568-How-do-I-activate-my-account-" rel="noopener" target="_blank">',
        htmlEnd: '</a>'
      });

      var changeAcctInfoText = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('{htmlStart}Want to change your email, name, or password instead?{htmlEnd}'), {
        htmlStart: '<a href="https://support.edx.org/hc/en-us/sections/115004139268-Manage-Your-Account-Settings" rel="noopener" target="_blank">',
        htmlEnd: '</a>'
      });

      var acctDeletionWarningText = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('{strongStart}Warning: Account deletion is permanent.{strongEnd} Please read the above carefully before proceeding. This is an irreversible action, and {strongStart}you will no longer be able to use the same email on {platformName}.{strongEnd}'), {
        strongStart: '<strong>',
        strongEnd: '</strong>',
        platformName: this.props.platformName
      });

      var noteDeletion = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('Please note: Deletion of your account and personal data is permanent and cannot be undone. {platformName} will not be able to recover your account or the data that is deleted.'), {
        platformName: this.props.platformName
      });

      var bodyDeletion = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('Once your account is deleted, you cannot use it to take courses on the {platformName} app, {siteName}, or any other site hosted by {platformName}.'), {
        platformName: this.props.platformName,
        siteName: this.props.siteName
      });

      var bodyDeletion2 = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('This includes access to {siteName} from your employer’s or university’s system{additionalSiteSpecificDeletionText}.'), {
        siteName: this.props.siteName,
        additionalSiteSpecificDeletionText: this.props.additionalSiteSpecificDeletionText
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'account-deletion-details' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'account-settings-header-subtitle' },
          gettext('We’re sorry to see you go!')
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'account-settings-header-subtitle' },
          noteDeletion
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'account-settings-header-subtitle' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            bodyDeletion,
            ' '
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            bodyDeletion2
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', {
          className: 'account-settings-header-subtitle',
          dangerouslySetInnerHTML: { __html: loseAccessText }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', {
          className: 'account-settings-header-subtitle-warning',
          dangerouslySetInnerHTML: { __html: acctDeletionWarningText }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', {
          className: 'account-settings-header-subtitle',
          dangerouslySetInnerHTML: { __html: changeAcctInfoText }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Button"], {
          id: 'delete-account-btn',
          className: ['btn-outline-primary'],
          disabled: showError,
          label: gettext('Delete My Account'),
          inputRef: function inputRef(input) {
            _this2.modalTrigger = input;
          },
          onClick: this.loadDeletionModal
        }),
        showError && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["StatusAlert"], {
          dialog: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'modal-alert' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'icon-wrapper' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Icon"], { id: 'delete-confirmation-body-error-icon', className: ['fa', 'fa-exclamation-circle'] })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'alert-content' },
              socialAuthConnected && isActive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', { dangerouslySetInnerHTML: { __html: socialAuthError } }),
              !isActive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', { dangerouslySetInnerHTML: { __html: activationError } })
            )
          ),
          alertType: 'danger',
          dismissible: false,
          open: true
        }),
        deletionModalOpen && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__StudentAccountDeletionModal__["a" /* default */], {
          onClose: this.closeDeletionModal,
          additionalSiteSpecificDeletionText: this.props.additionalSiteSpecificDeletionText,
          mktgRootLink: this.props.mktgRootLink,
          platformName: this.props.platformName,
          siteName: this.props.siteName
        })
      );
    }
  }]);

  return StudentAccountDeletion;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

StudentAccountDeletion.propTypes = {
  isActive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  socialAccountLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    providers: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object)
  }).isRequired,
  additionalSiteSpecificDeletionText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  mktgRootLink: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  platformName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  siteName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

StudentAccountDeletion.defaultProps = {
  additionalSiteSpecificDeletionText: '',
  mktgRootLink: '',
  platformName: '',
  siteName: ''
};

/***/ }),

/***/ "./lms/static/js/student_account/components/StudentAccountDeletionModal.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__ = __webpack_require__("./node_modules/@edx/paragon/static/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edx_paragon_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils__ = __webpack_require__("./node_modules/edx-ui-toolkit/src/js/utils/string-utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AccountsClient__ = __webpack_require__("./lms/static/js/student_account/AccountsClient.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__removeLoggedInCookies__ = __webpack_require__("./lms/static/js/student_account/components/removeLoggedInCookies.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* globals gettext */
/* eslint-disable react/no-danger */








var StudentAccountDeletionConfirmationModal = function (_React$Component) {
  _inherits(StudentAccountDeletionConfirmationModal, _React$Component);

  function StudentAccountDeletionConfirmationModal(props) {
    _classCallCheck(this, StudentAccountDeletionConfirmationModal);

    var _this = _possibleConstructorReturn(this, (StudentAccountDeletionConfirmationModal.__proto__ || Object.getPrototypeOf(StudentAccountDeletionConfirmationModal)).call(this, props));

    _this.deleteAccount = _this.deleteAccount.bind(_this);
    _this.handlePasswordInputChange = _this.handlePasswordInputChange.bind(_this);
    _this.passwordFieldValidation = _this.passwordFieldValidation.bind(_this);
    _this.handleConfirmationModalClose = _this.handleConfirmationModalClose.bind(_this);
    _this.state = {
      password: '',
      passwordSubmitted: false,
      passwordValid: true,
      validationMessage: '',
      validationErrorDetails: '',
      accountQueuedForDeletion: false,
      responseError: false
    };
    return _this;
  }

  _createClass(StudentAccountDeletionConfirmationModal, [{
    key: 'handleConfirmationModalClose',
    value: function handleConfirmationModalClose() {
      this.props.onClose();

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__removeLoggedInCookies__["a" /* default */])();
      window.location.href = this.props.mktgRootLink;
    }
  }, {
    key: 'deleteAccount',
    value: function deleteAccount() {
      var _this2 = this;

      return this.setState({ passwordSubmitted: true }, function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__AccountsClient__["a" /* deactivate */])(_this2.state.password).then(function () {
          return _this2.setState({
            accountQueuedForDeletion: true,
            responseError: false,
            passwordSubmitted: false,
            validationMessage: '',
            validationErrorDetails: ''
          });
        }).catch(function (error) {
          return _this2.failedSubmission(error);
        });
      });
    }
  }, {
    key: 'failedSubmission',
    value: function failedSubmission(error) {
      var title = error.message === '403' ? gettext('Password is incorrect') : gettext('Unable to delete account');
      var body = error.message === '403' ? gettext('Please re-enter your password.') : gettext('Sorry, there was an error trying to process your request. Please try again later.');

      this.setState({
        passwordSubmitted: false,
        responseError: true,
        passwordValid: false,
        validationMessage: title,
        validationErrorDetails: body
      });
    }
  }, {
    key: 'handlePasswordInputChange',
    value: function handlePasswordInputChange(value) {
      this.setState({ password: value });
    }
  }, {
    key: 'passwordFieldValidation',
    value: function passwordFieldValidation(value) {
      var feedback = { passwordValid: true };

      if (value.length < 1) {
        feedback = {
          passwordValid: false,
          validationMessage: gettext('A Password is required'),
          validationErrorDetails: ''
        };
      }

      this.setState(feedback);
    }
  }, {
    key: 'renderConfirmationModal',
    value: function renderConfirmationModal() {
      var _state = this.state,
          passwordValid = _state.passwordValid,
          password = _state.password,
          passwordSubmitted = _state.passwordSubmitted,
          responseError = _state.responseError,
          validationErrorDetails = _state.validationErrorDetails,
          validationMessage = _state.validationMessage;
      var onClose = this.props.onClose;

      var loseAccessText = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('You may also lose access to verified certificates and other program credentials like MicroMasters certificates. If you want to make a copy of these for your records before proceeding with deletion, follow the instructions for {htmlStart}printing or downloading a certificate{htmlEnd}.'), {
        htmlStart: '<a href="https://edx.readthedocs.io/projects/edx-guide-for-students/en/latest/SFD_certificates.html#printing-a-certificate" rel="noopener" target="_blank">',
        htmlEnd: '</a>'
      });

      var noteDeletion = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('You have selected “Delete my account.” Deletion of your account and personal data is permanent and cannot be undone. {platformName} will not be able to recover your account or the data that is deleted.'), {
        platformName: this.props.platformName
      });

      var bodyDeletion = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('If you proceed, you will be unable to use this account to take courses on the {platformName} app, {siteName}, or any other site hosted by {platformName}.'), {
        platformName: this.props.platformName,
        siteName: this.props.siteName
      });

      var bodyDeletion2 = __WEBPACK_IMPORTED_MODULE_3_edx_ui_toolkit_js_utils_string_utils___default.a.interpolate(gettext('This includes access to {siteName} from your employer’s or university’s system{additionalSiteSpecificDeletionText}.'), {
        siteName: this.props.siteName,
        additionalSiteSpecificDeletionText: this.props.additionalSiteSpecificDeletionText
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'delete-confirmation-wrapper' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Modal"], {
          title: gettext('Are you sure?'),
          renderHeaderCloseButton: false,
          onClose: onClose,
          'aria-live': 'polite',
          open: true,
          body: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            responseError && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["StatusAlert"], {
              dialog: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'modal-alert' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'icon-wrapper' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Icon"], { id: 'delete-confirmation-body-error-icon', className: ['fa', 'fa-exclamation-circle'] })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'alert-content' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h3',
                    { className: 'alert-title' },
                    validationMessage
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    validationErrorDetails
                  )
                )
              ),
              alertType: 'danger',
              dismissible: false,
              open: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["StatusAlert"], {
              dialog: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'modal-alert' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'icon-wrapper' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Icon"], { id: 'delete-confirmation-body-warning-icon', className: ['fa', 'fa-exclamation-triangle'] })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'div',
                  { className: 'alert-content' },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'h3',
                    { className: 'alert-title' },
                    noteDeletion
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'p',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      null,
                      bodyDeletion,
                      ' '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                      'span',
                      null,
                      bodyDeletion2
                    )
                  ),
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('p', { dangerouslySetInnerHTML: { __html: loseAccessText } })
                )
              ),
              dismissible: false,
              open: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'next-steps' },
              gettext('If you still wish to continue and delete your account, please enter your account password:')
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["InputText"], {
              name: 'confirm-password',
              label: 'Password',
              type: 'password',
              className: ['confirm-password-input'],
              onBlur: this.passwordFieldValidation,
              isValid: passwordValid,
              validationMessage: validationMessage,
              onChange: this.handlePasswordInputChange,
              autoComplete: 'new-password',
              themes: ['danger']
            })
          ),
          closeText: gettext('Cancel'),
          buttons: [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Button"], {
            label: gettext('Yes, Delete'),
            onClick: this.deleteAccount,
            disabled: password.length === 0 || passwordSubmitted
          })]
        })
      );
    }
  }, {
    key: 'renderSuccessModal',
    value: function renderSuccessModal() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'delete-success-wrapper' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__edx_paragon_static__["Modal"], {
          title: gettext('We\'re sorry to see you go! Your account will be deleted shortly.'),
          renderHeaderCloseButton: false,
          body: gettext('Account deletion, including removal from email lists, may take a few weeks to fully process through our system. If you want to opt-out of emails before then, please unsubscribe from the footer of any email.'),
          onClose: this.handleConfirmationModalClose,
          'aria-live': 'polite',
          open: true
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var accountQueuedForDeletion = this.state.accountQueuedForDeletion;


      return accountQueuedForDeletion ? this.renderSuccessModal() : this.renderConfirmationModal();
    }
  }]);

  return StudentAccountDeletionConfirmationModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

StudentAccountDeletionConfirmationModal.propTypes = {
  onClose: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  additionalSiteSpecificDeletionText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  mktgRootLink: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  platformName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  siteName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

StudentAccountDeletionConfirmationModal.defaultProps = {
  onClose: function onClose() {},
  additionalSiteSpecificDeletionText: "",
  mktgRootLink: "",
  platformName: "",
  siteName: ""
};

/* harmony default export */ __webpack_exports__["a"] = (StudentAccountDeletionConfirmationModal);

/***/ }),

/***/ "./lms/static/js/student_account/components/removeLoggedInCookies.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__("./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);


var removeLoggedInCookies = function removeLoggedInCookies() {
  var hostname = window.location.hostname;
  var isLocalhost = hostname.indexOf('localhost') >= 0;
  var isStage = hostname.indexOf('stage') >= 0;

  var domain = '.edx.org';
  if (isLocalhost) {
    domain = 'localhost';
  } else if (isStage) {
    domain = '.stage.edx.org';
  }

  __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove('edxloggedin', { domain: domain });

  if (isLocalhost) {
    // localhost doesn't have prefixes
    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove('csrftoken', { domain: domain });
    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove('edx-user-info', { domain: domain });
  } else {
    // does not take sandboxes into account
    var prefix = isStage ? 'stage' : 'prod';
    // both stage and prod csrf tokens are set to .edx.org
    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(prefix + '-edx-csrftoken', { domain: '.edx.org' });
    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.remove(prefix + '-edx-user-info', { domain: domain });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (removeLoggedInCookies);

/***/ }),

/***/ "./node_modules/@edx/paragon/static/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = e(__webpack_require__("./node_modules/react/index.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/react/index.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.paragon = e(require("react")) : a.paragon = e(a.React);
}("undefined" != typeof self ? self : undefined, function (a) {
  return function (a) {
    var e = {};function r(n) {
      if (e[n]) return e[n].exports;var o = e[n] = { i: n, l: !1, exports: {} };return a[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }return r.m = a, r.c = e, r.d = function (a, e, n) {
      r.o(a, e) || Object.defineProperty(a, e, { configurable: !1, enumerable: !0, get: n });
    }, r.n = function (a) {
      var e = a && a.__esModule ? function () {
        return a.default;
      } : function () {
        return a;
      };return r.d(e, "a", e), e;
    }, r.o = function (a, e) {
      return Object.prototype.hasOwnProperty.call(a, e);
    }, r.p = "", r(r.s = 18);
  }([function (e, r) {
    e.exports = a;
  }, function (a, e, r) {
    (function (e) {
      if ("production" !== e.env.NODE_ENV) {
        var n = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;a.exports = r(19)(function (a) {
          return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === n;
        }, !0);
      } else a.exports = r(22)();
    }).call(e, r(4));
  }, function (a, e, r) {
    var n;!function () {
      "use strict";
      var r = {}.hasOwnProperty;function o() {
        for (var a = [], e = 0; e < arguments.length; e++) {
          var n = arguments[e];if (n) {
            var t = typeof n === "undefined" ? "undefined" : _typeof(n);if ("string" === t || "number" === t) a.push(n);else if (Array.isArray(n)) a.push(o.apply(null, n));else if ("object" === t) for (var l in n) {
              r.call(n, l) && n[l] && a.push(l);
            }
          }
        }return a.join(" ");
      }void 0 !== a && a.exports ? a.exports = o : void 0 === (n = function () {
        return o;
      }.apply(e, [])) || (a.exports = n);
    }();
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.defaultProps = e.inputProps = e.getDisplayName = void 0;var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = s(r(0)),
        l = s(r(1)),
        p = s(r(2)),
        _ = s(r(6)),
        g = s(r(7)),
        f = s(r(23));function s(a) {
      return a && a.__esModule ? a : { default: a };
    }function i(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var m = e.getDisplayName = function (a) {
      return a.displayName || a.name || "Component";
    },
        u = e.inputProps = { label: l.default.oneOfType([l.default.string, l.default.element]).isRequired, name: l.default.string.isRequired, id: l.default.string, value: l.default.oneOfType([l.default.string, l.default.number]), dangerIconDescription: l.default.oneOfType([l.default.string, l.default.element]), description: l.default.oneOfType([l.default.string, l.default.element]), disabled: l.default.bool, required: l.default.bool, onChange: l.default.func, onBlur: l.default.func, validator: l.default.func, isValid: l.default.bool, validationMessage: l.default.oneOfType([l.default.string, l.default.element]), className: l.default.arrayOf(l.default.string), themes: l.default.arrayOf(l.default.string), inline: l.default.bool, inputGroupPrepend: l.default.element, inputGroupAppend: l.default.element },
        d = e.defaultProps = { onChange: function onChange() {}, onBlur: function onBlur() {}, id: (0, g.default)("asInput"), value: "", dangerIconDescription: "", description: void 0, disabled: !1, required: !1, validator: void 0, isValid: !0, validationMessage: "", className: [], themes: [], inline: !1, inputGroupPrepend: void 0, inputGroupAppend: void 0 };e.default = function (a) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
          r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
          l = function (l) {
        function s(a) {
          !function (a, e) {
            if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, s);var e = function (a, e) {
            if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
          }(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, a));e.handleChange = e.handleChange.bind(e), e.handleBlur = e.handleBlur.bind(e), e.renderInput = e.renderInput.bind(e);var r = e.props.id ? e.props.id : (0, g.default)("asInput"),
              n = !!e.props.validator || e.props.isValid,
              o = e.props.validator ? "" : e.props.validationMessage,
              t = e.props.validator ? "" : e.props.dangerIconDescription;return e.state = { id: r, value: e.props.value, isValid: n, validationMessage: o, dangerIconDescription: t, describedBy: [], errorId: "error-" + r, descriptionId: "description-" + r }, e;
        }return function (a, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
        }(s, t.default.Component), o(s, [{ key: "componentWillReceiveProps", value: function value(a) {
            var e = {};a.value !== this.props.value && (e.value = a.value), a.isValid === this.props.isValid || a.validator || (e.isValid = a.isValid), a.validationMessage === this.props.validationMessage || a.validator || (e.validationMessage = a.validationMessage), a.dangerIconDescription === this.props.dangerIconDescription || a.validator || (e.dangerIconDescription = a.dangerIconDescription), a.validator === this.props.validator || a.validator || (e.isValid = a.isValid, e.validationMessage = a.validationMessage, e.dangerIconDescription = a.dangerIconDescription), Object.keys(e).length > 0 && this.setState(e);
          } }, { key: "getDescriptions", value: function value() {
            var a = "error-" + this.state.id,
                e = "description-" + this.state.id,
                r = {},
                n = this.hasDangerTheme();return r.error = t.default.createElement("div", { className: (0, p.default)(f.default["form-control-feedback"], i({}, f.default["invalid-feedback"], n)), id: a, key: "0", "aria-live": "polite" }, this.state.isValid ? t.default.createElement("span", null) : [n && t.default.createElement("span", { key: "0" }, t.default.createElement("span", { className: (0, p.default)(_.default.fa, _.default["fa-exclamation-circle"], f.default["fa-icon-spacing"]), "aria-hidden": !0 }), t.default.createElement("span", { className: (0, p.default)(f.default["sr-only"]) }, this.state.dangerIconDescription)), t.default.createElement("span", { key: "1" }, this.state.validationMessage)]), r.describedBy = a, this.props.description && (r.description = t.default.createElement("small", { className: f.default["form-text"], id: e, key: "1" }, this.props.description), r.describedBy = (r.describedBy + " " + e).trim()), r;
          } }, { key: "getLabel", value: function value() {
            return t.default.createElement("label", { id: "label-" + this.state.id, htmlFor: this.state.id, className: [(0, p.default)(i({}, f.default["form-check-label"], this.isGroupedInput()))] }, this.props.label);
          } }, { key: "hasDangerTheme", value: function value() {
            return this.props.themes.indexOf("danger") >= 0;
          } }, { key: "isGroupedInput", value: function value() {
            switch (e) {case "checkbox":
                return !0;default:
                return !1;}
          } }, { key: "handleBlur", value: function value(a) {
            var e = a.target.value;this.props.validator && this.setState(this.props.validator(e)), this.props.onBlur(e, this.props.name);
          } }, { key: "handleChange", value: function value(a) {
            this.setState({ value: a.target.value }), this.props.onChange("checkbox" === a.target.type ? a.target.checked : a.target.value, this.props.name);
          } }, { key: "renderInput", value: function value(e) {
            var r,
                o = this.props.className;return t.default.createElement(a, n({}, this.props, this.state, { className: [(0, p.default)((r = {}, i(r, f.default["form-control"], !this.isGroupedInput()), i(r, f.default["form-check-input"], this.isGroupedInput()), i(r, f.default["is-invalid"], !this.state.isValid && this.hasDangerTheme()), r), o).trim()], describedBy: e, onChange: this.handleChange, onBlur: this.handleBlur }));
          } }, { key: "render", value: function value() {
            var a,
                e = this.getDescriptions(),
                n = e.description,
                o = e.error,
                l = e.describedBy;return t.default.createElement("div", { className: [(0, p.default)((a = {}, i(a, f.default["form-group"], !this.isGroupedInput()), i(a, f.default["form-inline"], !this.isGroupedInput() && this.props.inline), i(a, f.default["form-check"], this.isGroupedInput()), a))] }, r && this.getLabel(), this.props.inputGroupPrepend || this.props.inputGroupAppend ? t.default.createElement("div", { className: f.default["input-group"] }, t.default.createElement("div", { className: f.default["input-group-prepend"] }, this.props.inputGroupPrepend), this.renderInput(l), t.default.createElement("div", { className: f.default["input-group-append"] }, this.props.inputGroupAppend)) : this.renderInput(l), !r && this.getLabel(), o, n);
          } }]), s;
      }();return l.displayName = "asInput(" + m(a) + ")", l.propTypes = u, l.defaultProps = d, l;
    };
  }, function (a, e) {
    var r,
        n,
        o = a.exports = {};function t() {
      throw new Error("setTimeout has not been defined");
    }function l() {
      throw new Error("clearTimeout has not been defined");
    }function p(a) {
      if (r === setTimeout) return setTimeout(a, 0);if ((r === t || !r) && setTimeout) return r = setTimeout, setTimeout(a, 0);try {
        return r(a, 0);
      } catch (e) {
        try {
          return r.call(null, a, 0);
        } catch (e) {
          return r.call(this, a, 0);
        }
      }
    }!function () {
      try {
        r = "function" == typeof setTimeout ? setTimeout : t;
      } catch (a) {
        r = t;
      }try {
        n = "function" == typeof clearTimeout ? clearTimeout : l;
      } catch (a) {
        n = l;
      }
    }();var _,
        g = [],
        f = !1,
        s = -1;function i() {
      f && _ && (f = !1, _.length ? g = _.concat(g) : s = -1, g.length && m());
    }function m() {
      if (!f) {
        var a = p(i);f = !0;for (var e = g.length; e;) {
          for (_ = g, g = []; ++s < e;) {
            _ && _[s].run();
          }s = -1, e = g.length;
        }_ = null, f = !1, function (a) {
          if (n === clearTimeout) return clearTimeout(a);if ((n === l || !n) && clearTimeout) return n = clearTimeout, clearTimeout(a);try {
            n(a);
          } catch (e) {
            try {
              return n.call(null, a);
            } catch (e) {
              return n.call(this, a);
            }
          }
        }(a);
      }
    }function u(a, e) {
      this.fun = a, this.array = e;
    }function d() {}o.nextTick = function (a) {
      var e = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
        e[r - 1] = arguments[r];
      }g.push(new u(a, e)), 1 !== g.length || f || p(m);
    }, u.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = d, o.addListener = d, o.once = d, o.off = d, o.removeListener = d, o.removeAllListeners = d, o.emit = d, o.prependListener = d, o.prependOnceListener = d, o.listeners = function (a) {
      return [];
    }, o.binding = function (a) {
      throw new Error("process.binding is not supported");
    }, o.cwd = function () {
      return "/";
    }, o.chdir = function (a) {
      throw new Error("process.chdir is not supported");
    }, o.umask = function () {
      return 0;
    };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.buttonPropTypes = void 0;var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = g(r(0)),
        l = g(r(2)),
        p = g(r(1)),
        _ = g(r(24));function g(a) {
      return a && a.__esModule ? a : { default: a };
    }function f(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var s = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a)),
            n = a.onBlur,
            o = a.onKeyDown;return r.onBlur = n.bind(r), r.onKeyDown = o.bind(r), r.onClick = r.onClick.bind(r), r.setRefs = r.setRefs.bind(r), r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, t.default.Component), o(e, [{ key: "onClick", value: function value(a) {
          this.buttonRef.focus(), this.props.onClick(a);
        } }, { key: "setRefs", value: function value(a) {
          this.buttonRef = a, this.props.inputRef(a);
        } }, { key: "render", value: function value() {
          var a = this.props,
              e = a.buttonType,
              r = a.className,
              o = (a.label, a.isClose),
              p = a.type,
              g = (a.inputRef, function (a, e) {
            var r = {};for (var n in a) {
              e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
            }return r;
          }(a, ["buttonType", "className", "label", "isClose", "type", "inputRef"]));return t.default.createElement("button", n({}, g, { className: (0, l.default)([].concat(function (a) {
              if (Array.isArray(a)) {
                for (var e = 0, r = Array(a.length); e < a.length; e++) {
                  r[e] = a[e];
                }return r;
              }return Array.from(a);
            }(r), [_.default.btn]), f({}, _.default["btn-" + e], void 0 !== e), f({}, _.default.close, o)), onBlur: this.onBlur, onClick: this.onClick, onKeyDown: this.onKeyDown, type: p, ref: this.setRefs }), this.props.label);
        } }]), e;
    }(),
        i = e.buttonPropTypes = { buttonType: p.default.string, className: p.default.arrayOf(p.default.string), label: p.default.oneOfType([p.default.string, p.default.element]).isRequired, inputRef: p.default.func, isClose: p.default.bool, onBlur: p.default.func, onClick: p.default.func, onKeyDown: p.default.func, type: p.default.string };s.propTypes = i, s.defaultProps = { buttonType: void 0, className: [], inputRef: function inputRef() {}, isClose: !1, onBlur: function onBlur() {}, onKeyDown: function onKeyDown() {}, onClick: function onClick() {}, type: "button" }, e.default = s;
  }, function (a, e) {
    a.exports = { fa: "paragon__fa", "fa-lg": "paragon__fa-lg", "fa-2x": "paragon__fa-2x", "fa-3x": "paragon__fa-3x", "fa-4x": "paragon__fa-4x", "fa-5x": "paragon__fa-5x", "fa-fw": "paragon__fa-fw", "fa-ul": "paragon__fa-ul", "fa-li": "paragon__fa-li", "fa-border": "paragon__fa-border", "fa-pull-left": "paragon__fa-pull-left", "fa-pull-right": "paragon__fa-pull-right", "pull-right": "paragon__pull-right", "pull-left": "paragon__pull-left", "fa-spin": "paragon__fa-spin", "fa-pulse": "paragon__fa-pulse", "fa-rotate-90": "paragon__fa-rotate-90", "fa-rotate-180": "paragon__fa-rotate-180", "fa-rotate-270": "paragon__fa-rotate-270", "fa-flip-horizontal": "paragon__fa-flip-horizontal", "fa-flip-vertical": "paragon__fa-flip-vertical", "fa-stack": "paragon__fa-stack", "fa-stack-1x": "paragon__fa-stack-1x", "fa-stack-2x": "paragon__fa-stack-2x", "fa-inverse": "paragon__fa-inverse", "fa-glass": "paragon__fa-glass", "fa-music": "paragon__fa-music", "fa-search": "paragon__fa-search", "fa-envelope-o": "paragon__fa-envelope-o", "fa-heart": "paragon__fa-heart", "fa-star": "paragon__fa-star", "fa-star-o": "paragon__fa-star-o", "fa-user": "paragon__fa-user", "fa-film": "paragon__fa-film", "fa-th-large": "paragon__fa-th-large", "fa-th": "paragon__fa-th", "fa-th-list": "paragon__fa-th-list", "fa-check": "paragon__fa-check", "fa-remove": "paragon__fa-remove", "fa-close": "paragon__fa-close", "fa-times": "paragon__fa-times", "fa-search-plus": "paragon__fa-search-plus", "fa-search-minus": "paragon__fa-search-minus", "fa-power-off": "paragon__fa-power-off", "fa-signal": "paragon__fa-signal", "fa-gear": "paragon__fa-gear", "fa-cog": "paragon__fa-cog", "fa-trash-o": "paragon__fa-trash-o", "fa-home": "paragon__fa-home", "fa-file-o": "paragon__fa-file-o", "fa-clock-o": "paragon__fa-clock-o", "fa-road": "paragon__fa-road", "fa-download": "paragon__fa-download", "fa-arrow-circle-o-down": "paragon__fa-arrow-circle-o-down", "fa-arrow-circle-o-up": "paragon__fa-arrow-circle-o-up", "fa-inbox": "paragon__fa-inbox", "fa-play-circle-o": "paragon__fa-play-circle-o", "fa-rotate-right": "paragon__fa-rotate-right", "fa-repeat": "paragon__fa-repeat", "fa-refresh": "paragon__fa-refresh", "fa-list-alt": "paragon__fa-list-alt", "fa-lock": "paragon__fa-lock", "fa-flag": "paragon__fa-flag", "fa-headphones": "paragon__fa-headphones", "fa-volume-off": "paragon__fa-volume-off", "fa-volume-down": "paragon__fa-volume-down", "fa-volume-up": "paragon__fa-volume-up", "fa-qrcode": "paragon__fa-qrcode", "fa-barcode": "paragon__fa-barcode", "fa-tag": "paragon__fa-tag", "fa-tags": "paragon__fa-tags", "fa-book": "paragon__fa-book", "fa-bookmark": "paragon__fa-bookmark", "fa-print": "paragon__fa-print", "fa-camera": "paragon__fa-camera", "fa-font": "paragon__fa-font", "fa-bold": "paragon__fa-bold", "fa-italic": "paragon__fa-italic", "fa-text-height": "paragon__fa-text-height", "fa-text-width": "paragon__fa-text-width", "fa-align-left": "paragon__fa-align-left", "fa-align-center": "paragon__fa-align-center", "fa-align-right": "paragon__fa-align-right", "fa-align-justify": "paragon__fa-align-justify", "fa-list": "paragon__fa-list", "fa-dedent": "paragon__fa-dedent", "fa-outdent": "paragon__fa-outdent", "fa-indent": "paragon__fa-indent", "fa-video-camera": "paragon__fa-video-camera", "fa-photo": "paragon__fa-photo", "fa-image": "paragon__fa-image", "fa-picture-o": "paragon__fa-picture-o", "fa-pencil": "paragon__fa-pencil", "fa-map-marker": "paragon__fa-map-marker", "fa-adjust": "paragon__fa-adjust", "fa-tint": "paragon__fa-tint", "fa-edit": "paragon__fa-edit", "fa-pencil-square-o": "paragon__fa-pencil-square-o", "fa-share-square-o": "paragon__fa-share-square-o", "fa-check-square-o": "paragon__fa-check-square-o", "fa-arrows": "paragon__fa-arrows", "fa-step-backward": "paragon__fa-step-backward", "fa-fast-backward": "paragon__fa-fast-backward", "fa-backward": "paragon__fa-backward", "fa-play": "paragon__fa-play", "fa-pause": "paragon__fa-pause", "fa-stop": "paragon__fa-stop", "fa-forward": "paragon__fa-forward", "fa-fast-forward": "paragon__fa-fast-forward", "fa-step-forward": "paragon__fa-step-forward", "fa-eject": "paragon__fa-eject", "fa-chevron-left": "paragon__fa-chevron-left", "fa-chevron-right": "paragon__fa-chevron-right", "fa-plus-circle": "paragon__fa-plus-circle", "fa-minus-circle": "paragon__fa-minus-circle", "fa-times-circle": "paragon__fa-times-circle", "fa-check-circle": "paragon__fa-check-circle", "fa-question-circle": "paragon__fa-question-circle", "fa-info-circle": "paragon__fa-info-circle", "fa-crosshairs": "paragon__fa-crosshairs", "fa-times-circle-o": "paragon__fa-times-circle-o", "fa-check-circle-o": "paragon__fa-check-circle-o", "fa-ban": "paragon__fa-ban", "fa-arrow-left": "paragon__fa-arrow-left", "fa-arrow-right": "paragon__fa-arrow-right", "fa-arrow-up": "paragon__fa-arrow-up", "fa-arrow-down": "paragon__fa-arrow-down", "fa-mail-forward": "paragon__fa-mail-forward", "fa-share": "paragon__fa-share", "fa-expand": "paragon__fa-expand", "fa-compress": "paragon__fa-compress", "fa-plus": "paragon__fa-plus", "fa-minus": "paragon__fa-minus", "fa-asterisk": "paragon__fa-asterisk", "fa-exclamation-circle": "paragon__fa-exclamation-circle", "fa-gift": "paragon__fa-gift", "fa-leaf": "paragon__fa-leaf", "fa-fire": "paragon__fa-fire", "fa-eye": "paragon__fa-eye", "fa-eye-slash": "paragon__fa-eye-slash", "fa-warning": "paragon__fa-warning", "fa-exclamation-triangle": "paragon__fa-exclamation-triangle", "fa-plane": "paragon__fa-plane", "fa-calendar": "paragon__fa-calendar", "fa-random": "paragon__fa-random", "fa-comment": "paragon__fa-comment", "fa-magnet": "paragon__fa-magnet", "fa-chevron-up": "paragon__fa-chevron-up", "fa-chevron-down": "paragon__fa-chevron-down", "fa-retweet": "paragon__fa-retweet", "fa-shopping-cart": "paragon__fa-shopping-cart", "fa-folder": "paragon__fa-folder", "fa-folder-open": "paragon__fa-folder-open", "fa-arrows-v": "paragon__fa-arrows-v", "fa-arrows-h": "paragon__fa-arrows-h", "fa-bar-chart-o": "paragon__fa-bar-chart-o", "fa-bar-chart": "paragon__fa-bar-chart", "fa-twitter-square": "paragon__fa-twitter-square", "fa-facebook-square": "paragon__fa-facebook-square", "fa-camera-retro": "paragon__fa-camera-retro", "fa-key": "paragon__fa-key", "fa-gears": "paragon__fa-gears", "fa-cogs": "paragon__fa-cogs", "fa-comments": "paragon__fa-comments", "fa-thumbs-o-up": "paragon__fa-thumbs-o-up", "fa-thumbs-o-down": "paragon__fa-thumbs-o-down", "fa-star-half": "paragon__fa-star-half", "fa-heart-o": "paragon__fa-heart-o", "fa-sign-out": "paragon__fa-sign-out", "fa-linkedin-square": "paragon__fa-linkedin-square", "fa-thumb-tack": "paragon__fa-thumb-tack", "fa-external-link": "paragon__fa-external-link", "fa-sign-in": "paragon__fa-sign-in", "fa-trophy": "paragon__fa-trophy", "fa-github-square": "paragon__fa-github-square", "fa-upload": "paragon__fa-upload", "fa-lemon-o": "paragon__fa-lemon-o", "fa-phone": "paragon__fa-phone", "fa-square-o": "paragon__fa-square-o", "fa-bookmark-o": "paragon__fa-bookmark-o", "fa-phone-square": "paragon__fa-phone-square", "fa-twitter": "paragon__fa-twitter", "fa-facebook-f": "paragon__fa-facebook-f", "fa-facebook": "paragon__fa-facebook", "fa-github": "paragon__fa-github", "fa-unlock": "paragon__fa-unlock", "fa-credit-card": "paragon__fa-credit-card", "fa-feed": "paragon__fa-feed", "fa-rss": "paragon__fa-rss", "fa-hdd-o": "paragon__fa-hdd-o", "fa-bullhorn": "paragon__fa-bullhorn", "fa-bell": "paragon__fa-bell", "fa-certificate": "paragon__fa-certificate", "fa-hand-o-right": "paragon__fa-hand-o-right", "fa-hand-o-left": "paragon__fa-hand-o-left", "fa-hand-o-up": "paragon__fa-hand-o-up", "fa-hand-o-down": "paragon__fa-hand-o-down", "fa-arrow-circle-left": "paragon__fa-arrow-circle-left", "fa-arrow-circle-right": "paragon__fa-arrow-circle-right", "fa-arrow-circle-up": "paragon__fa-arrow-circle-up", "fa-arrow-circle-down": "paragon__fa-arrow-circle-down", "fa-globe": "paragon__fa-globe", "fa-wrench": "paragon__fa-wrench", "fa-tasks": "paragon__fa-tasks", "fa-filter": "paragon__fa-filter", "fa-briefcase": "paragon__fa-briefcase", "fa-arrows-alt": "paragon__fa-arrows-alt", "fa-group": "paragon__fa-group", "fa-users": "paragon__fa-users", "fa-chain": "paragon__fa-chain", "fa-link": "paragon__fa-link", "fa-cloud": "paragon__fa-cloud", "fa-flask": "paragon__fa-flask", "fa-cut": "paragon__fa-cut", "fa-scissors": "paragon__fa-scissors", "fa-copy": "paragon__fa-copy", "fa-files-o": "paragon__fa-files-o", "fa-paperclip": "paragon__fa-paperclip", "fa-save": "paragon__fa-save", "fa-floppy-o": "paragon__fa-floppy-o", "fa-square": "paragon__fa-square", "fa-navicon": "paragon__fa-navicon", "fa-reorder": "paragon__fa-reorder", "fa-bars": "paragon__fa-bars", "fa-list-ul": "paragon__fa-list-ul", "fa-list-ol": "paragon__fa-list-ol", "fa-strikethrough": "paragon__fa-strikethrough", "fa-underline": "paragon__fa-underline", "fa-table": "paragon__fa-table", "fa-magic": "paragon__fa-magic", "fa-truck": "paragon__fa-truck", "fa-pinterest": "paragon__fa-pinterest", "fa-pinterest-square": "paragon__fa-pinterest-square", "fa-google-plus-square": "paragon__fa-google-plus-square", "fa-google-plus": "paragon__fa-google-plus", "fa-money": "paragon__fa-money", "fa-caret-down": "paragon__fa-caret-down", "fa-caret-up": "paragon__fa-caret-up", "fa-caret-left": "paragon__fa-caret-left", "fa-caret-right": "paragon__fa-caret-right", "fa-columns": "paragon__fa-columns", "fa-unsorted": "paragon__fa-unsorted", "fa-sort": "paragon__fa-sort", "fa-sort-down": "paragon__fa-sort-down", "fa-sort-desc": "paragon__fa-sort-desc", "fa-sort-up": "paragon__fa-sort-up", "fa-sort-asc": "paragon__fa-sort-asc", "fa-envelope": "paragon__fa-envelope", "fa-linkedin": "paragon__fa-linkedin", "fa-rotate-left": "paragon__fa-rotate-left", "fa-undo": "paragon__fa-undo", "fa-legal": "paragon__fa-legal", "fa-gavel": "paragon__fa-gavel", "fa-dashboard": "paragon__fa-dashboard", "fa-tachometer": "paragon__fa-tachometer", "fa-comment-o": "paragon__fa-comment-o", "fa-comments-o": "paragon__fa-comments-o", "fa-flash": "paragon__fa-flash", "fa-bolt": "paragon__fa-bolt", "fa-sitemap": "paragon__fa-sitemap", "fa-umbrella": "paragon__fa-umbrella", "fa-paste": "paragon__fa-paste", "fa-clipboard": "paragon__fa-clipboard", "fa-lightbulb-o": "paragon__fa-lightbulb-o", "fa-exchange": "paragon__fa-exchange", "fa-cloud-download": "paragon__fa-cloud-download", "fa-cloud-upload": "paragon__fa-cloud-upload", "fa-user-md": "paragon__fa-user-md", "fa-stethoscope": "paragon__fa-stethoscope", "fa-suitcase": "paragon__fa-suitcase", "fa-bell-o": "paragon__fa-bell-o", "fa-coffee": "paragon__fa-coffee", "fa-cutlery": "paragon__fa-cutlery", "fa-file-text-o": "paragon__fa-file-text-o", "fa-building-o": "paragon__fa-building-o", "fa-hospital-o": "paragon__fa-hospital-o", "fa-ambulance": "paragon__fa-ambulance", "fa-medkit": "paragon__fa-medkit", "fa-fighter-jet": "paragon__fa-fighter-jet", "fa-beer": "paragon__fa-beer", "fa-h-square": "paragon__fa-h-square", "fa-plus-square": "paragon__fa-plus-square", "fa-angle-double-left": "paragon__fa-angle-double-left", "fa-angle-double-right": "paragon__fa-angle-double-right", "fa-angle-double-up": "paragon__fa-angle-double-up", "fa-angle-double-down": "paragon__fa-angle-double-down", "fa-angle-left": "paragon__fa-angle-left", "fa-angle-right": "paragon__fa-angle-right", "fa-angle-up": "paragon__fa-angle-up", "fa-angle-down": "paragon__fa-angle-down", "fa-desktop": "paragon__fa-desktop", "fa-laptop": "paragon__fa-laptop", "fa-tablet": "paragon__fa-tablet", "fa-mobile-phone": "paragon__fa-mobile-phone", "fa-mobile": "paragon__fa-mobile", "fa-circle-o": "paragon__fa-circle-o", "fa-quote-left": "paragon__fa-quote-left", "fa-quote-right": "paragon__fa-quote-right", "fa-spinner": "paragon__fa-spinner", "fa-circle": "paragon__fa-circle", "fa-mail-reply": "paragon__fa-mail-reply", "fa-reply": "paragon__fa-reply", "fa-github-alt": "paragon__fa-github-alt", "fa-folder-o": "paragon__fa-folder-o", "fa-folder-open-o": "paragon__fa-folder-open-o", "fa-smile-o": "paragon__fa-smile-o", "fa-frown-o": "paragon__fa-frown-o", "fa-meh-o": "paragon__fa-meh-o", "fa-gamepad": "paragon__fa-gamepad", "fa-keyboard-o": "paragon__fa-keyboard-o", "fa-flag-o": "paragon__fa-flag-o", "fa-flag-checkered": "paragon__fa-flag-checkered", "fa-terminal": "paragon__fa-terminal", "fa-code": "paragon__fa-code", "fa-mail-reply-all": "paragon__fa-mail-reply-all", "fa-reply-all": "paragon__fa-reply-all", "fa-star-half-empty": "paragon__fa-star-half-empty", "fa-star-half-full": "paragon__fa-star-half-full", "fa-star-half-o": "paragon__fa-star-half-o", "fa-location-arrow": "paragon__fa-location-arrow", "fa-crop": "paragon__fa-crop", "fa-code-fork": "paragon__fa-code-fork", "fa-unlink": "paragon__fa-unlink", "fa-chain-broken": "paragon__fa-chain-broken", "fa-question": "paragon__fa-question", "fa-info": "paragon__fa-info", "fa-exclamation": "paragon__fa-exclamation", "fa-superscript": "paragon__fa-superscript", "fa-subscript": "paragon__fa-subscript", "fa-eraser": "paragon__fa-eraser", "fa-puzzle-piece": "paragon__fa-puzzle-piece", "fa-microphone": "paragon__fa-microphone", "fa-microphone-slash": "paragon__fa-microphone-slash", "fa-shield": "paragon__fa-shield", "fa-calendar-o": "paragon__fa-calendar-o", "fa-fire-extinguisher": "paragon__fa-fire-extinguisher", "fa-rocket": "paragon__fa-rocket", "fa-maxcdn": "paragon__fa-maxcdn", "fa-chevron-circle-left": "paragon__fa-chevron-circle-left", "fa-chevron-circle-right": "paragon__fa-chevron-circle-right", "fa-chevron-circle-up": "paragon__fa-chevron-circle-up", "fa-chevron-circle-down": "paragon__fa-chevron-circle-down", "fa-html5": "paragon__fa-html5", "fa-css3": "paragon__fa-css3", "fa-anchor": "paragon__fa-anchor", "fa-unlock-alt": "paragon__fa-unlock-alt", "fa-bullseye": "paragon__fa-bullseye", "fa-ellipsis-h": "paragon__fa-ellipsis-h", "fa-ellipsis-v": "paragon__fa-ellipsis-v", "fa-rss-square": "paragon__fa-rss-square", "fa-play-circle": "paragon__fa-play-circle", "fa-ticket": "paragon__fa-ticket", "fa-minus-square": "paragon__fa-minus-square", "fa-minus-square-o": "paragon__fa-minus-square-o", "fa-level-up": "paragon__fa-level-up", "fa-level-down": "paragon__fa-level-down", "fa-check-square": "paragon__fa-check-square", "fa-pencil-square": "paragon__fa-pencil-square", "fa-external-link-square": "paragon__fa-external-link-square", "fa-share-square": "paragon__fa-share-square", "fa-compass": "paragon__fa-compass", "fa-toggle-down": "paragon__fa-toggle-down", "fa-caret-square-o-down": "paragon__fa-caret-square-o-down", "fa-toggle-up": "paragon__fa-toggle-up", "fa-caret-square-o-up": "paragon__fa-caret-square-o-up", "fa-toggle-right": "paragon__fa-toggle-right", "fa-caret-square-o-right": "paragon__fa-caret-square-o-right", "fa-euro": "paragon__fa-euro", "fa-eur": "paragon__fa-eur", "fa-gbp": "paragon__fa-gbp", "fa-dollar": "paragon__fa-dollar", "fa-usd": "paragon__fa-usd", "fa-rupee": "paragon__fa-rupee", "fa-inr": "paragon__fa-inr", "fa-cny": "paragon__fa-cny", "fa-rmb": "paragon__fa-rmb", "fa-yen": "paragon__fa-yen", "fa-jpy": "paragon__fa-jpy", "fa-ruble": "paragon__fa-ruble", "fa-rouble": "paragon__fa-rouble", "fa-rub": "paragon__fa-rub", "fa-won": "paragon__fa-won", "fa-krw": "paragon__fa-krw", "fa-bitcoin": "paragon__fa-bitcoin", "fa-btc": "paragon__fa-btc", "fa-file": "paragon__fa-file", "fa-file-text": "paragon__fa-file-text", "fa-sort-alpha-asc": "paragon__fa-sort-alpha-asc", "fa-sort-alpha-desc": "paragon__fa-sort-alpha-desc", "fa-sort-amount-asc": "paragon__fa-sort-amount-asc", "fa-sort-amount-desc": "paragon__fa-sort-amount-desc", "fa-sort-numeric-asc": "paragon__fa-sort-numeric-asc", "fa-sort-numeric-desc": "paragon__fa-sort-numeric-desc", "fa-thumbs-up": "paragon__fa-thumbs-up", "fa-thumbs-down": "paragon__fa-thumbs-down", "fa-youtube-square": "paragon__fa-youtube-square", "fa-youtube": "paragon__fa-youtube", "fa-xing": "paragon__fa-xing", "fa-xing-square": "paragon__fa-xing-square", "fa-youtube-play": "paragon__fa-youtube-play", "fa-dropbox": "paragon__fa-dropbox", "fa-stack-overflow": "paragon__fa-stack-overflow", "fa-instagram": "paragon__fa-instagram", "fa-flickr": "paragon__fa-flickr", "fa-adn": "paragon__fa-adn", "fa-bitbucket": "paragon__fa-bitbucket", "fa-bitbucket-square": "paragon__fa-bitbucket-square", "fa-tumblr": "paragon__fa-tumblr", "fa-tumblr-square": "paragon__fa-tumblr-square", "fa-long-arrow-down": "paragon__fa-long-arrow-down", "fa-long-arrow-up": "paragon__fa-long-arrow-up", "fa-long-arrow-left": "paragon__fa-long-arrow-left", "fa-long-arrow-right": "paragon__fa-long-arrow-right", "fa-apple": "paragon__fa-apple", "fa-windows": "paragon__fa-windows", "fa-android": "paragon__fa-android", "fa-linux": "paragon__fa-linux", "fa-dribbble": "paragon__fa-dribbble", "fa-skype": "paragon__fa-skype", "fa-foursquare": "paragon__fa-foursquare", "fa-trello": "paragon__fa-trello", "fa-female": "paragon__fa-female", "fa-male": "paragon__fa-male", "fa-gittip": "paragon__fa-gittip", "fa-gratipay": "paragon__fa-gratipay", "fa-sun-o": "paragon__fa-sun-o", "fa-moon-o": "paragon__fa-moon-o", "fa-archive": "paragon__fa-archive", "fa-bug": "paragon__fa-bug", "fa-vk": "paragon__fa-vk", "fa-weibo": "paragon__fa-weibo", "fa-renren": "paragon__fa-renren", "fa-pagelines": "paragon__fa-pagelines", "fa-stack-exchange": "paragon__fa-stack-exchange", "fa-arrow-circle-o-right": "paragon__fa-arrow-circle-o-right", "fa-arrow-circle-o-left": "paragon__fa-arrow-circle-o-left", "fa-toggle-left": "paragon__fa-toggle-left", "fa-caret-square-o-left": "paragon__fa-caret-square-o-left", "fa-dot-circle-o": "paragon__fa-dot-circle-o", "fa-wheelchair": "paragon__fa-wheelchair", "fa-vimeo-square": "paragon__fa-vimeo-square", "fa-turkish-lira": "paragon__fa-turkish-lira", "fa-try": "paragon__fa-try", "fa-plus-square-o": "paragon__fa-plus-square-o", "fa-space-shuttle": "paragon__fa-space-shuttle", "fa-slack": "paragon__fa-slack", "fa-envelope-square": "paragon__fa-envelope-square", "fa-wordpress": "paragon__fa-wordpress", "fa-openid": "paragon__fa-openid", "fa-institution": "paragon__fa-institution", "fa-bank": "paragon__fa-bank", "fa-university": "paragon__fa-university", "fa-mortar-board": "paragon__fa-mortar-board", "fa-graduation-cap": "paragon__fa-graduation-cap", "fa-yahoo": "paragon__fa-yahoo", "fa-google": "paragon__fa-google", "fa-reddit": "paragon__fa-reddit", "fa-reddit-square": "paragon__fa-reddit-square", "fa-stumbleupon-circle": "paragon__fa-stumbleupon-circle", "fa-stumbleupon": "paragon__fa-stumbleupon", "fa-delicious": "paragon__fa-delicious", "fa-digg": "paragon__fa-digg", "fa-pied-piper-pp": "paragon__fa-pied-piper-pp", "fa-pied-piper-alt": "paragon__fa-pied-piper-alt", "fa-drupal": "paragon__fa-drupal", "fa-joomla": "paragon__fa-joomla", "fa-language": "paragon__fa-language", "fa-fax": "paragon__fa-fax", "fa-building": "paragon__fa-building", "fa-child": "paragon__fa-child", "fa-paw": "paragon__fa-paw", "fa-spoon": "paragon__fa-spoon", "fa-cube": "paragon__fa-cube", "fa-cubes": "paragon__fa-cubes", "fa-behance": "paragon__fa-behance", "fa-behance-square": "paragon__fa-behance-square", "fa-steam": "paragon__fa-steam", "fa-steam-square": "paragon__fa-steam-square", "fa-recycle": "paragon__fa-recycle", "fa-automobile": "paragon__fa-automobile", "fa-car": "paragon__fa-car", "fa-cab": "paragon__fa-cab", "fa-taxi": "paragon__fa-taxi", "fa-tree": "paragon__fa-tree", "fa-spotify": "paragon__fa-spotify", "fa-deviantart": "paragon__fa-deviantart", "fa-soundcloud": "paragon__fa-soundcloud", "fa-database": "paragon__fa-database", "fa-file-pdf-o": "paragon__fa-file-pdf-o", "fa-file-word-o": "paragon__fa-file-word-o", "fa-file-excel-o": "paragon__fa-file-excel-o", "fa-file-powerpoint-o": "paragon__fa-file-powerpoint-o", "fa-file-photo-o": "paragon__fa-file-photo-o", "fa-file-picture-o": "paragon__fa-file-picture-o", "fa-file-image-o": "paragon__fa-file-image-o", "fa-file-zip-o": "paragon__fa-file-zip-o", "fa-file-archive-o": "paragon__fa-file-archive-o", "fa-file-sound-o": "paragon__fa-file-sound-o", "fa-file-audio-o": "paragon__fa-file-audio-o", "fa-file-movie-o": "paragon__fa-file-movie-o", "fa-file-video-o": "paragon__fa-file-video-o", "fa-file-code-o": "paragon__fa-file-code-o", "fa-vine": "paragon__fa-vine", "fa-codepen": "paragon__fa-codepen", "fa-jsfiddle": "paragon__fa-jsfiddle", "fa-life-bouy": "paragon__fa-life-bouy", "fa-life-buoy": "paragon__fa-life-buoy", "fa-life-saver": "paragon__fa-life-saver", "fa-support": "paragon__fa-support", "fa-life-ring": "paragon__fa-life-ring", "fa-circle-o-notch": "paragon__fa-circle-o-notch", "fa-ra": "paragon__fa-ra", "fa-resistance": "paragon__fa-resistance", "fa-rebel": "paragon__fa-rebel", "fa-ge": "paragon__fa-ge", "fa-empire": "paragon__fa-empire", "fa-git-square": "paragon__fa-git-square", "fa-git": "paragon__fa-git", "fa-y-combinator-square": "paragon__fa-y-combinator-square", "fa-yc-square": "paragon__fa-yc-square", "fa-hacker-news": "paragon__fa-hacker-news", "fa-tencent-weibo": "paragon__fa-tencent-weibo", "fa-qq": "paragon__fa-qq", "fa-wechat": "paragon__fa-wechat", "fa-weixin": "paragon__fa-weixin", "fa-send": "paragon__fa-send", "fa-paper-plane": "paragon__fa-paper-plane", "fa-send-o": "paragon__fa-send-o", "fa-paper-plane-o": "paragon__fa-paper-plane-o", "fa-history": "paragon__fa-history", "fa-circle-thin": "paragon__fa-circle-thin", "fa-header": "paragon__fa-header", "fa-paragraph": "paragon__fa-paragraph", "fa-sliders": "paragon__fa-sliders", "fa-share-alt": "paragon__fa-share-alt", "fa-share-alt-square": "paragon__fa-share-alt-square", "fa-bomb": "paragon__fa-bomb", "fa-soccer-ball-o": "paragon__fa-soccer-ball-o", "fa-futbol-o": "paragon__fa-futbol-o", "fa-tty": "paragon__fa-tty", "fa-binoculars": "paragon__fa-binoculars", "fa-plug": "paragon__fa-plug", "fa-slideshare": "paragon__fa-slideshare", "fa-twitch": "paragon__fa-twitch", "fa-yelp": "paragon__fa-yelp", "fa-newspaper-o": "paragon__fa-newspaper-o", "fa-wifi": "paragon__fa-wifi", "fa-calculator": "paragon__fa-calculator", "fa-paypal": "paragon__fa-paypal", "fa-google-wallet": "paragon__fa-google-wallet", "fa-cc-visa": "paragon__fa-cc-visa", "fa-cc-mastercard": "paragon__fa-cc-mastercard", "fa-cc-discover": "paragon__fa-cc-discover", "fa-cc-amex": "paragon__fa-cc-amex", "fa-cc-paypal": "paragon__fa-cc-paypal", "fa-cc-stripe": "paragon__fa-cc-stripe", "fa-bell-slash": "paragon__fa-bell-slash", "fa-bell-slash-o": "paragon__fa-bell-slash-o", "fa-trash": "paragon__fa-trash", "fa-copyright": "paragon__fa-copyright", "fa-at": "paragon__fa-at", "fa-eyedropper": "paragon__fa-eyedropper", "fa-paint-brush": "paragon__fa-paint-brush", "fa-birthday-cake": "paragon__fa-birthday-cake", "fa-area-chart": "paragon__fa-area-chart", "fa-pie-chart": "paragon__fa-pie-chart", "fa-line-chart": "paragon__fa-line-chart", "fa-lastfm": "paragon__fa-lastfm", "fa-lastfm-square": "paragon__fa-lastfm-square", "fa-toggle-off": "paragon__fa-toggle-off", "fa-toggle-on": "paragon__fa-toggle-on", "fa-bicycle": "paragon__fa-bicycle", "fa-bus": "paragon__fa-bus", "fa-ioxhost": "paragon__fa-ioxhost", "fa-angellist": "paragon__fa-angellist", "fa-cc": "paragon__fa-cc", "fa-shekel": "paragon__fa-shekel", "fa-sheqel": "paragon__fa-sheqel", "fa-ils": "paragon__fa-ils", "fa-meanpath": "paragon__fa-meanpath", "fa-buysellads": "paragon__fa-buysellads", "fa-connectdevelop": "paragon__fa-connectdevelop", "fa-dashcube": "paragon__fa-dashcube", "fa-forumbee": "paragon__fa-forumbee", "fa-leanpub": "paragon__fa-leanpub", "fa-sellsy": "paragon__fa-sellsy", "fa-shirtsinbulk": "paragon__fa-shirtsinbulk", "fa-simplybuilt": "paragon__fa-simplybuilt", "fa-skyatlas": "paragon__fa-skyatlas", "fa-cart-plus": "paragon__fa-cart-plus", "fa-cart-arrow-down": "paragon__fa-cart-arrow-down", "fa-diamond": "paragon__fa-diamond", "fa-ship": "paragon__fa-ship", "fa-user-secret": "paragon__fa-user-secret", "fa-motorcycle": "paragon__fa-motorcycle", "fa-street-view": "paragon__fa-street-view", "fa-heartbeat": "paragon__fa-heartbeat", "fa-venus": "paragon__fa-venus", "fa-mars": "paragon__fa-mars", "fa-mercury": "paragon__fa-mercury", "fa-intersex": "paragon__fa-intersex", "fa-transgender": "paragon__fa-transgender", "fa-transgender-alt": "paragon__fa-transgender-alt", "fa-venus-double": "paragon__fa-venus-double", "fa-mars-double": "paragon__fa-mars-double", "fa-venus-mars": "paragon__fa-venus-mars", "fa-mars-stroke": "paragon__fa-mars-stroke", "fa-mars-stroke-v": "paragon__fa-mars-stroke-v", "fa-mars-stroke-h": "paragon__fa-mars-stroke-h", "fa-neuter": "paragon__fa-neuter", "fa-genderless": "paragon__fa-genderless", "fa-facebook-official": "paragon__fa-facebook-official", "fa-pinterest-p": "paragon__fa-pinterest-p", "fa-whatsapp": "paragon__fa-whatsapp", "fa-server": "paragon__fa-server", "fa-user-plus": "paragon__fa-user-plus", "fa-user-times": "paragon__fa-user-times", "fa-hotel": "paragon__fa-hotel", "fa-bed": "paragon__fa-bed", "fa-viacoin": "paragon__fa-viacoin", "fa-train": "paragon__fa-train", "fa-subway": "paragon__fa-subway", "fa-medium": "paragon__fa-medium", "fa-yc": "paragon__fa-yc", "fa-y-combinator": "paragon__fa-y-combinator", "fa-optin-monster": "paragon__fa-optin-monster", "fa-opencart": "paragon__fa-opencart", "fa-expeditedssl": "paragon__fa-expeditedssl", "fa-battery-4": "paragon__fa-battery-4", "fa-battery": "paragon__fa-battery", "fa-battery-full": "paragon__fa-battery-full", "fa-battery-3": "paragon__fa-battery-3", "fa-battery-three-quarters": "paragon__fa-battery-three-quarters", "fa-battery-2": "paragon__fa-battery-2", "fa-battery-half": "paragon__fa-battery-half", "fa-battery-1": "paragon__fa-battery-1", "fa-battery-quarter": "paragon__fa-battery-quarter", "fa-battery-0": "paragon__fa-battery-0", "fa-battery-empty": "paragon__fa-battery-empty", "fa-mouse-pointer": "paragon__fa-mouse-pointer", "fa-i-cursor": "paragon__fa-i-cursor", "fa-object-group": "paragon__fa-object-group", "fa-object-ungroup": "paragon__fa-object-ungroup", "fa-sticky-note": "paragon__fa-sticky-note", "fa-sticky-note-o": "paragon__fa-sticky-note-o", "fa-cc-jcb": "paragon__fa-cc-jcb", "fa-cc-diners-club": "paragon__fa-cc-diners-club", "fa-clone": "paragon__fa-clone", "fa-balance-scale": "paragon__fa-balance-scale", "fa-hourglass-o": "paragon__fa-hourglass-o", "fa-hourglass-1": "paragon__fa-hourglass-1", "fa-hourglass-start": "paragon__fa-hourglass-start", "fa-hourglass-2": "paragon__fa-hourglass-2", "fa-hourglass-half": "paragon__fa-hourglass-half", "fa-hourglass-3": "paragon__fa-hourglass-3", "fa-hourglass-end": "paragon__fa-hourglass-end", "fa-hourglass": "paragon__fa-hourglass", "fa-hand-grab-o": "paragon__fa-hand-grab-o", "fa-hand-rock-o": "paragon__fa-hand-rock-o", "fa-hand-stop-o": "paragon__fa-hand-stop-o", "fa-hand-paper-o": "paragon__fa-hand-paper-o", "fa-hand-scissors-o": "paragon__fa-hand-scissors-o", "fa-hand-lizard-o": "paragon__fa-hand-lizard-o", "fa-hand-spock-o": "paragon__fa-hand-spock-o", "fa-hand-pointer-o": "paragon__fa-hand-pointer-o", "fa-hand-peace-o": "paragon__fa-hand-peace-o", "fa-trademark": "paragon__fa-trademark", "fa-registered": "paragon__fa-registered", "fa-creative-commons": "paragon__fa-creative-commons", "fa-gg": "paragon__fa-gg", "fa-gg-circle": "paragon__fa-gg-circle", "fa-tripadvisor": "paragon__fa-tripadvisor", "fa-odnoklassniki": "paragon__fa-odnoklassniki", "fa-odnoklassniki-square": "paragon__fa-odnoklassniki-square", "fa-get-pocket": "paragon__fa-get-pocket", "fa-wikipedia-w": "paragon__fa-wikipedia-w", "fa-safari": "paragon__fa-safari", "fa-chrome": "paragon__fa-chrome", "fa-firefox": "paragon__fa-firefox", "fa-opera": "paragon__fa-opera", "fa-internet-explorer": "paragon__fa-internet-explorer", "fa-tv": "paragon__fa-tv", "fa-television": "paragon__fa-television", "fa-contao": "paragon__fa-contao", "fa-500px": "paragon__fa-500px", "fa-amazon": "paragon__fa-amazon", "fa-calendar-plus-o": "paragon__fa-calendar-plus-o", "fa-calendar-minus-o": "paragon__fa-calendar-minus-o", "fa-calendar-times-o": "paragon__fa-calendar-times-o", "fa-calendar-check-o": "paragon__fa-calendar-check-o", "fa-industry": "paragon__fa-industry", "fa-map-pin": "paragon__fa-map-pin", "fa-map-signs": "paragon__fa-map-signs", "fa-map-o": "paragon__fa-map-o", "fa-map": "paragon__fa-map", "fa-commenting": "paragon__fa-commenting", "fa-commenting-o": "paragon__fa-commenting-o", "fa-houzz": "paragon__fa-houzz", "fa-vimeo": "paragon__fa-vimeo", "fa-black-tie": "paragon__fa-black-tie", "fa-fonticons": "paragon__fa-fonticons", "fa-reddit-alien": "paragon__fa-reddit-alien", "fa-edge": "paragon__fa-edge", "fa-credit-card-alt": "paragon__fa-credit-card-alt", "fa-codiepie": "paragon__fa-codiepie", "fa-modx": "paragon__fa-modx", "fa-fort-awesome": "paragon__fa-fort-awesome", "fa-usb": "paragon__fa-usb", "fa-product-hunt": "paragon__fa-product-hunt", "fa-mixcloud": "paragon__fa-mixcloud", "fa-scribd": "paragon__fa-scribd", "fa-pause-circle": "paragon__fa-pause-circle", "fa-pause-circle-o": "paragon__fa-pause-circle-o", "fa-stop-circle": "paragon__fa-stop-circle", "fa-stop-circle-o": "paragon__fa-stop-circle-o", "fa-shopping-bag": "paragon__fa-shopping-bag", "fa-shopping-basket": "paragon__fa-shopping-basket", "fa-hashtag": "paragon__fa-hashtag", "fa-bluetooth": "paragon__fa-bluetooth", "fa-bluetooth-b": "paragon__fa-bluetooth-b", "fa-percent": "paragon__fa-percent", "fa-gitlab": "paragon__fa-gitlab", "fa-wpbeginner": "paragon__fa-wpbeginner", "fa-wpforms": "paragon__fa-wpforms", "fa-envira": "paragon__fa-envira", "fa-universal-access": "paragon__fa-universal-access", "fa-wheelchair-alt": "paragon__fa-wheelchair-alt", "fa-question-circle-o": "paragon__fa-question-circle-o", "fa-blind": "paragon__fa-blind", "fa-audio-description": "paragon__fa-audio-description", "fa-volume-control-phone": "paragon__fa-volume-control-phone", "fa-braille": "paragon__fa-braille", "fa-assistive-listening-systems": "paragon__fa-assistive-listening-systems", "fa-asl-interpreting": "paragon__fa-asl-interpreting", "fa-american-sign-language-interpreting": "paragon__fa-american-sign-language-interpreting", "fa-deafness": "paragon__fa-deafness", "fa-hard-of-hearing": "paragon__fa-hard-of-hearing", "fa-deaf": "paragon__fa-deaf", "fa-glide": "paragon__fa-glide", "fa-glide-g": "paragon__fa-glide-g", "fa-signing": "paragon__fa-signing", "fa-sign-language": "paragon__fa-sign-language", "fa-low-vision": "paragon__fa-low-vision", "fa-viadeo": "paragon__fa-viadeo", "fa-viadeo-square": "paragon__fa-viadeo-square", "fa-snapchat": "paragon__fa-snapchat", "fa-snapchat-ghost": "paragon__fa-snapchat-ghost", "fa-snapchat-square": "paragon__fa-snapchat-square", "fa-pied-piper": "paragon__fa-pied-piper", "fa-first-order": "paragon__fa-first-order", "fa-yoast": "paragon__fa-yoast", "fa-themeisle": "paragon__fa-themeisle", "fa-google-plus-circle": "paragon__fa-google-plus-circle", "fa-google-plus-official": "paragon__fa-google-plus-official", "fa-fa": "paragon__fa-fa", "fa-font-awesome": "paragon__fa-font-awesome", "fa-handshake-o": "paragon__fa-handshake-o", "fa-envelope-open": "paragon__fa-envelope-open", "fa-envelope-open-o": "paragon__fa-envelope-open-o", "fa-linode": "paragon__fa-linode", "fa-address-book": "paragon__fa-address-book", "fa-address-book-o": "paragon__fa-address-book-o", "fa-vcard": "paragon__fa-vcard", "fa-address-card": "paragon__fa-address-card", "fa-vcard-o": "paragon__fa-vcard-o", "fa-address-card-o": "paragon__fa-address-card-o", "fa-user-circle": "paragon__fa-user-circle", "fa-user-circle-o": "paragon__fa-user-circle-o", "fa-user-o": "paragon__fa-user-o", "fa-id-badge": "paragon__fa-id-badge", "fa-drivers-license": "paragon__fa-drivers-license", "fa-id-card": "paragon__fa-id-card", "fa-drivers-license-o": "paragon__fa-drivers-license-o", "fa-id-card-o": "paragon__fa-id-card-o", "fa-quora": "paragon__fa-quora", "fa-free-code-camp": "paragon__fa-free-code-camp", "fa-telegram": "paragon__fa-telegram", "fa-thermometer-4": "paragon__fa-thermometer-4", "fa-thermometer": "paragon__fa-thermometer", "fa-thermometer-full": "paragon__fa-thermometer-full", "fa-thermometer-3": "paragon__fa-thermometer-3", "fa-thermometer-three-quarters": "paragon__fa-thermometer-three-quarters", "fa-thermometer-2": "paragon__fa-thermometer-2", "fa-thermometer-half": "paragon__fa-thermometer-half", "fa-thermometer-1": "paragon__fa-thermometer-1", "fa-thermometer-quarter": "paragon__fa-thermometer-quarter", "fa-thermometer-0": "paragon__fa-thermometer-0", "fa-thermometer-empty": "paragon__fa-thermometer-empty", "fa-shower": "paragon__fa-shower", "fa-bathtub": "paragon__fa-bathtub", "fa-s15": "paragon__fa-s15", "fa-bath": "paragon__fa-bath", "fa-podcast": "paragon__fa-podcast", "fa-window-maximize": "paragon__fa-window-maximize", "fa-window-minimize": "paragon__fa-window-minimize", "fa-window-restore": "paragon__fa-window-restore", "fa-times-rectangle": "paragon__fa-times-rectangle", "fa-window-close": "paragon__fa-window-close", "fa-times-rectangle-o": "paragon__fa-times-rectangle-o", "fa-window-close-o": "paragon__fa-window-close-o", "fa-bandcamp": "paragon__fa-bandcamp", "fa-grav": "paragon__fa-grav", "fa-etsy": "paragon__fa-etsy", "fa-imdb": "paragon__fa-imdb", "fa-ravelry": "paragon__fa-ravelry", "fa-eercast": "paragon__fa-eercast", "fa-microchip": "paragon__fa-microchip", "fa-snowflake-o": "paragon__fa-snowflake-o", "fa-superpowers": "paragon__fa-superpowers", "fa-wpexplorer": "paragon__fa-wpexplorer", "fa-meetup": "paragon__fa-meetup", "sr-only": "paragon__sr-only", "sr-only-focusable": "paragon__sr-only-focusable" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = 0;e.default = function () {
      return "" + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "id") + (n += 1);
    };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.default = function (a, e, r) {
      return function (a, e) {
        if ("function" != typeof a) throw new TypeError("The typeValidator argument must be a function with the signature function(props, propName, componentName).");if (e && "string" != typeof e) throw new TypeError("The error message is optional, but must be a string if provided.");
      }(a, r), function (n, o, t) {
        for (var l = arguments.length, p = Array(3 < l ? l - 3 : 0), _ = 3; _ < l; _++) {
          p[_ - 3] = arguments[_];
        }return function (a, e, r, n) {
          return "boolean" == typeof a ? a : "function" == typeof a ? a(e, r, n) : !(1 != !!a || !a);
        }(e, n, o, t) ? function (a, e) {
          return Object.hasOwnProperty.call(a, e);
        }(n, o) ? a.apply(void 0, [n, o, t].concat(p)) : function (a, e, r, n) {
          return n ? new Error(n) : new Error("Required " + a[e] + " `" + e + "` was not specified in `" + r + "`.");
        }(n, o, t, r) : a.apply(void 0, [n, o, t].concat(p));
      };
    };
  }, function (a, e, r) {
    "use strict";
    function n(a) {
      return function () {
        return a;
      };
    }var o = function o() {};o.thatReturns = n, o.thatReturnsFalse = n(!1), o.thatReturnsTrue = n(!0), o.thatReturnsNull = n(null), o.thatReturnsThis = function () {
      return this;
    }, o.thatReturnsArgument = function (a) {
      return a;
    }, a.exports = o;
  }, function (a, e, r) {
    "use strict";
    (function (e) {
      var r = function r(a) {};"production" !== e.env.NODE_ENV && (r = function r(a) {
        if (void 0 === a) throw new Error("invariant requires an error message argument");
      }), a.exports = function (a, e, n, o, t, l, p, _) {
        if (r(e), !a) {
          var g;if (void 0 === e) g = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {
            var f = [n, o, t, l, p, _],
                s = 0;(g = new Error(e.replace(/%s/g, function () {
              return f[s++];
            }))).name = "Invariant Violation";
          }throw g.framesToPop = 1, g;
        }
      };
    }).call(e, r(4));
  }, function (a, e, r) {
    "use strict";
    a.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  }, function (a, e, r) {
    "use strict";
    (function (e) {
      var n = r(9);if ("production" !== e.env.NODE_ENV) {
        n = function n(a, e) {
          if (void 0 === e) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");if (0 !== e.indexOf("Failed Composite propType: ") && !a) {
            for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) {
              n[o - 2] = arguments[o];
            }(function (a) {
              for (var e = arguments.length, r = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) {
                r[n - 1] = arguments[n];
              }var o = 0,
                  t = "Warning: " + a.replace(/%s/g, function () {
                return r[o++];
              });"undefined" != typeof console && console.error(t);try {
                throw new Error(t);
              } catch (a) {}
            }).apply(void 0, [e].concat(n));
          }
        };
      }a.exports = n;
    }).call(e, r(4));
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = _(r(0)),
        l = _(r(1)),
        p = _(r(3));function _(a) {
      return a && a.__esModule ? a : { default: a };
    }var g = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.onChange = r.onChange.bind(r), r.state = { checked: a.checked || !1 }, r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, t.default.Component), o(e, [{ key: "componentWillReceiveProps", value: function value(a) {
          a.checked !== this.props.checked && this.setState({ checked: a.checked });
        } }, { key: "onChange", value: function value(a) {
          this.setState({ checked: !this.state.checked }), this.props.onChange(a);
        } }, { key: "render", value: function value() {
          var a = n({}, this.props);return t.default.createElement("input", { id: a.id, className: a.className, type: "checkbox", name: a.name, checked: this.state.checked, "aria-checked": this.state.checked, onChange: this.onChange, disabled: a.disabled });
        } }]), e;
    }();g.propTypes = { checked: l.default.bool, onChange: l.default.func }, g.defaultProps = { checked: !1, onChange: function onChange() {} };var f = (0, p.default)(g, "checkbox", !1);e.default = f;
  }, function (a, e) {
    var r = "<<anonymous>>",
        n = { prop: "prop", context: "context", childContext: "child context" },
        o = { elementOfType: function elementOfType(a) {
        return function (a) {
          function e(e, o, l, p, _, g) {
            if (p = p || r, g = g || l, null == o[l]) {
              var f = n[_];return e ? null === o[l] ? new t("The " + f + " `" + g + "` is marked as required in `" + p + "`, but its value is `null`.") : new t("The " + f + " `" + g + "` is marked as required in `" + p + "`, but its value is `undefined`.") : null;
            }return a(o, l, p, _, g);
          }var o = e.bind(null, !1);return o.isRequired = e.bind(null, !0), o;
        }(function (e, r, o, p, _) {
          var g = e[r];if (g && g.type !== a) {
            var f = n[p],
                s = l(a);if (!g.type) return new t("Invalid " + f + " `" + _ + "` with value `" + JSON.stringify(g) + "` supplied to `" + o + "`, expected element of type `" + s + "`.");var i = l(g.type);return new t("Invalid " + f + " `" + _ + "` of element type `" + i + "` supplied to `" + o + "`, expected element of type `" + s + "`.");
          }return null;
        });
      } };function t(a) {
      this.message = a, this.stack = "";
    }function l(a) {
      return a.displayName || a.name || ("string" == typeof a ? a : "Component");
    }t.prototype = Error.prototype, a.exports = o;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = g(r(0)),
        t = g(r(2)),
        l = g(r(6)),
        p = g(r(1)),
        _ = g(r(8));function g(a) {
      return a && a.__esModule ? a : { default: a };
    }function f(a) {
      var e = a.destination,
          r = a.content,
          p = a.target,
          _ = a.onClick,
          g = a.externalLinkAlternativeText,
          f = a.externalLinkTitle,
          s = function (a, e) {
        var r = {};for (var n in a) {
          e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
        }return r;
      }(a, ["destination", "content", "target", "onClick", "externalLinkAlternativeText", "externalLinkTitle"]),
          i = void 0;return "_blank" === p && (i = o.default.createElement("span", null, " ", o.default.createElement("span", { className: (0, t.default)(l.default.fa, l.default["fa-external-link"]), "aria-hidden": !1, "aria-label": g, title: f }))), o.default.createElement("a", n({ href: e, target: p, onClick: _ }, s), r, i);
    }f.defaultProps = { target: "_self", onClick: function onClick() {}, externalLinkAlternativeText: "Opens in a new window", externalLinkTitle: "Opens in a new window" }, f.propTypes = { destination: p.default.string.isRequired, content: p.default.oneOfType([p.default.string, p.default.element]).isRequired, target: p.default.string, onClick: p.default.func, externalLinkAlternativeText: (0, _.default)(p.default.string, function (a) {
        return "_blank" === a.target;
      }), externalLinkTitle: (0, _.default)(p.default.string, function (a) {
        return "_blank" === a.target;
      }) }, e.default = f;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = _(r(0)),
        o = _(r(2)),
        t = _(r(1)),
        l = _(r(29)),
        p = _(r(7));function _(a) {
      return a && a.__esModule ? a : { default: a };
    }function g(a) {
      return n.default.createElement("div", null, n.default.createElement("span", { id: a.id ? a.id : (0, p.default)("Icon"), className: (0, o.default)(a.className), "aria-hidden": a.hidden }), a.screenReaderText && n.default.createElement("span", { className: (0, o.default)(l.default["sr-only"]) }, a.screenReaderText));
    }g.propTypes = { id: t.default.string, className: t.default.arrayOf(t.default.string).isRequired, hidden: t.default.bool, screenReaderText: t.default.string }, g.defaultProps = { id: (0, p.default)("Icon"), hidden: !0, screenReaderText: void 0 }, e.default = g;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.freeze({ status: { DANGER: "DANGER", INFO: "INFO", SUCCESS: "SUCCESS", WARNING: "WARNING" } });e.default = n;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Variant = e.TextArea = e.Tabs = e.Table = e.StatusAlert = e.RadioButton = e.RadioButtonGroup = e.Modal = e.MailtoLink = e.InputText = e.InputSelect = e.Icon = e.Hyperlink = e.Dropdown = e.CheckBoxGroup = e.CheckBox = e.Button = e.asInput = void 0;var n = v(r(3)),
        o = v(r(5)),
        t = v(r(13)),
        l = v(r(25)),
        p = v(r(27)),
        _ = v(r(15)),
        g = v(r(16)),
        f = v(r(30)),
        s = v(r(31)),
        i = v(r(32)),
        m = v(r(42)),
        u = r(44),
        d = v(u),
        c = v(r(45)),
        b = v(r(47)),
        h = v(r(49)),
        x = v(r(51)),
        y = v(r(17));function v(a) {
      return a && a.__esModule ? a : { default: a };
    }e.asInput = n.default, e.Button = o.default, e.CheckBox = t.default, e.CheckBoxGroup = l.default, e.Dropdown = p.default, e.Hyperlink = _.default, e.Icon = g.default, e.InputSelect = f.default, e.InputText = s.default, e.MailtoLink = i.default, e.Modal = m.default, e.RadioButtonGroup = d.default, e.RadioButton = u.RadioButton, e.StatusAlert = c.default, e.Table = b.default, e.Tabs = h.default, e.TextArea = x.default, e.Variant = y.default;
  }, function (a, e, r) {
    "use strict";
    (function (e) {
      var n = r(9),
          o = r(10),
          t = r(12),
          l = r(20),
          p = r(11),
          _ = r(21);a.exports = function (a, r) {
        var g = "function" == typeof Symbol && Symbol.iterator,
            f = "@@iterator";var s = "<<anonymous>>",
            i = { array: c("array"), bool: c("boolean"), func: c("function"), number: c("number"), object: c("object"), string: c("string"), symbol: c("symbol"), any: d(n.thatReturnsNull), arrayOf: function arrayOf(a) {
            return d(function (e, r, n, o, t) {
              if ("function" != typeof a) return new u("Property `" + t + "` of component `" + n + "` has invalid PropType notation inside arrayOf.");var l = e[r];if (!Array.isArray(l)) {
                var _ = h(l);return new u("Invalid " + o + " `" + t + "` of type `" + _ + "` supplied to `" + n + "`, expected an array.");
              }for (var g = 0; g < l.length; g++) {
                var f = a(l, g, n, o, t + "[" + g + "]", p);if (f instanceof Error) return f;
              }return null;
            });
          }, element: function () {
            return d(function (e, r, n, o, t) {
              var l = e[r];if (!a(l)) {
                var p = h(l);return new u("Invalid " + o + " `" + t + "` of type `" + p + "` supplied to `" + n + "`, expected a single ReactElement.");
              }return null;
            });
          }(), instanceOf: function instanceOf(a) {
            return d(function (e, r, n, o, t) {
              if (!(e[r] instanceof a)) {
                var l = a.name || s,
                    p = function (a) {
                  if (!a.constructor || !a.constructor.name) return s;return a.constructor.name;
                }(e[r]);return new u("Invalid " + o + " `" + t + "` of type `" + p + "` supplied to `" + n + "`, expected instance of `" + l + "`.");
              }return null;
            });
          }, node: function () {
            return d(function (a, e, r, n, o) {
              if (!b(a[e])) return new u("Invalid " + n + " `" + o + "` supplied to `" + r + "`, expected a ReactNode.");return null;
            });
          }(), objectOf: function objectOf(a) {
            return d(function (e, r, n, o, t) {
              if ("function" != typeof a) return new u("Property `" + t + "` of component `" + n + "` has invalid PropType notation inside objectOf.");var l = e[r],
                  _ = h(l);if ("object" !== _) return new u("Invalid " + o + " `" + t + "` of type `" + _ + "` supplied to `" + n + "`, expected an object.");for (var g in l) {
                if (l.hasOwnProperty(g)) {
                  var f = a(l, g, n, o, t + "." + g, p);if (f instanceof Error) return f;
                }
              }return null;
            });
          }, oneOf: function oneOf(a) {
            if (!Array.isArray(a)) return "production" !== e.env.NODE_ENV && t(!1, "Invalid argument supplied to oneOf, expected an instance of array."), n.thatReturnsNull;return d(function (e, r, n, o, t) {
              for (var l = e[r], p = 0; p < a.length; p++) {
                if (m(l, a[p])) return null;
              }var _ = JSON.stringify(a);return new u("Invalid " + o + " `" + t + "` of value `" + l + "` supplied to `" + n + "`, expected one of " + _ + ".");
            });
          }, oneOfType: function oneOfType(a) {
            if (!Array.isArray(a)) return "production" !== e.env.NODE_ENV && t(!1, "Invalid argument supplied to oneOfType, expected an instance of array."), n.thatReturnsNull;for (var r = 0; r < a.length; r++) {
              var o = a[r];if ("function" != typeof o) return t(!1, "Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.", y(o), r), n.thatReturnsNull;
            }return d(function (e, r, n, o, t) {
              for (var l = 0; l < a.length; l++) {
                var _ = a[l];if (null == _(e, r, n, o, t, p)) return null;
              }return new u("Invalid " + o + " `" + t + "` supplied to `" + n + "`.");
            });
          }, shape: function shape(a) {
            return d(function (e, r, n, o, t) {
              var l = e[r],
                  _ = h(l);if ("object" !== _) return new u("Invalid " + o + " `" + t + "` of type `" + _ + "` supplied to `" + n + "`, expected `object`.");for (var g in a) {
                var f = a[g];if (f) {
                  var s = f(l, g, n, o, t + "." + g, p);if (s) return s;
                }
              }return null;
            });
          }, exact: function exact(a) {
            return d(function (e, r, n, o, t) {
              var _ = e[r],
                  g = h(_);if ("object" !== g) return new u("Invalid " + o + " `" + t + "` of type `" + g + "` supplied to `" + n + "`, expected `object`.");var f = l({}, e[r], a);for (var s in f) {
                var i = a[s];if (!i) return new u("Invalid " + o + " `" + t + "` key `" + s + "` supplied to `" + n + "`.\nBad object: " + JSON.stringify(e[r], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(a), null, "  "));var m = i(_, s, n, o, t + "." + s, p);if (m) return m;
              }return null;
            });
          } };function m(a, e) {
          return a === e ? 0 !== a || 1 / a == 1 / e : a != a && e != e;
        }function u(a) {
          this.message = a, this.stack = "";
        }function d(a) {
          if ("production" !== e.env.NODE_ENV) var n = {},
              l = 0;function _(_, g, f, i, m, d, c) {
            if (i = i || s, d = d || f, c !== p) if (r) o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");else if ("production" !== e.env.NODE_ENV && "undefined" != typeof console) {
              var b = i + ":" + f;!n[b] && l < 3 && (t(!1, "You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.", d, i), n[b] = !0, l++);
            }return null == g[f] ? _ ? null === g[f] ? new u("The " + m + " `" + d + "` is marked as required in `" + i + "`, but its value is `null`.") : new u("The " + m + " `" + d + "` is marked as required in `" + i + "`, but its value is `undefined`.") : null : a(g, f, i, m, d);
          }var g = _.bind(null, !1);return g.isRequired = _.bind(null, !0), g;
        }function c(a) {
          return d(function (e, r, n, o, t, l) {
            var p = e[r];return h(p) !== a ? new u("Invalid " + o + " `" + t + "` of type `" + x(p) + "` supplied to `" + n + "`, expected `" + a + "`.") : null;
          });
        }function b(e) {
          switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "number":case "string":case "undefined":
              return !0;case "boolean":
              return !e;case "object":
              if (Array.isArray(e)) return e.every(b);if (null === e || a(e)) return !0;var r = function (a) {
                var e = a && (g && a[g] || a[f]);if ("function" == typeof e) return e;
              }(e);if (!r) return !1;var n,
                  o = r.call(e);if (r !== e.entries) {
                for (; !(n = o.next()).done;) {
                  if (!b(n.value)) return !1;
                }
              } else for (; !(n = o.next()).done;) {
                var t = n.value;if (t && !b(t[1])) return !1;
              }return !0;default:
              return !1;}
        }function h(a) {
          var e = typeof a === "undefined" ? "undefined" : _typeof(a);return Array.isArray(a) ? "array" : a instanceof RegExp ? "object" : function (a, e) {
            return "symbol" === a || "Symbol" === e["@@toStringTag"] || "function" == typeof Symbol && e instanceof Symbol;
          }(e, a) ? "symbol" : e;
        }function x(a) {
          if (void 0 === a || null === a) return "" + a;var e = h(a);if ("object" === e) {
            if (a instanceof Date) return "date";if (a instanceof RegExp) return "regexp";
          }return e;
        }function y(a) {
          var e = x(a);switch (e) {case "array":case "object":
              return "an " + e;case "boolean":case "date":case "regexp":
              return "a " + e;default:
              return e;}
        }return u.prototype = Error.prototype, i.checkPropTypes = _, i.PropTypes = i, i;
      };
    }).call(e, r(4));
  }, function (a, e, r) {
    "use strict";
    var n = Object.getOwnPropertySymbols,
        o = Object.prototype.hasOwnProperty,
        t = Object.prototype.propertyIsEnumerable;a.exports = function () {
      try {
        if (!Object.assign) return !1;var a = new String("abc");if (a[5] = "de", "5" === Object.getOwnPropertyNames(a)[0]) return !1;for (var e = {}, r = 0; r < 10; r++) {
          e["_" + String.fromCharCode(r)] = r;
        }if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (a) {
          return e[a];
        }).join("")) return !1;var n = {};return "abcdefghijklmnopqrst".split("").forEach(function (a) {
          n[a] = a;
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
      } catch (a) {
        return !1;
      }
    }() ? Object.assign : function (a, e) {
      for (var r, l, p = function (a) {
        if (null === a || void 0 === a) throw new TypeError("Object.assign cannot be called with null or undefined");return Object(a);
      }(a), _ = 1; _ < arguments.length; _++) {
        for (var g in r = Object(arguments[_])) {
          o.call(r, g) && (p[g] = r[g]);
        }if (n) {
          l = n(r);for (var f = 0; f < l.length; f++) {
            t.call(r, l[f]) && (p[l[f]] = r[l[f]]);
          }
        }
      }return p;
    };
  }, function (a, e, r) {
    "use strict";
    (function (e) {
      if ("production" !== e.env.NODE_ENV) var n = r(10),
          o = r(12),
          t = r(11),
          l = {};a.exports = function (a, r, p, _, g) {
        if ("production" !== e.env.NODE_ENV) for (var f in a) {
          if (a.hasOwnProperty(f)) {
            var s;try {
              n("function" == typeof a[f], "%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.", _ || "React class", p, f, _typeof(a[f])), s = a[f](r, f, _, p, null, t);
            } catch (a) {
              s = a;
            }if (o(!s || s instanceof Error, "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", _ || "React class", p, f, typeof s === "undefined" ? "undefined" : _typeof(s)), s instanceof Error && !(s.message in l)) {
              l[s.message] = !0;var i = g ? g() : "";o(!1, "Failed %s type: %s%s", p, s.message, null != i ? i : "");
            }
          }
        }
      };
    }).call(e, r(4));
  }, function (a, e, r) {
    "use strict";
    var n = r(9),
        o = r(10),
        t = r(11);a.exports = function () {
      function a(a, e, r, n, l, p) {
        p !== t && o(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      }function e() {
        return a;
      }a.isRequired = a;var r = { array: a, bool: a, func: a, number: a, object: a, string: a, symbol: a, any: a, arrayOf: e, element: a, instanceOf: e, node: a, objectOf: e, oneOf: e, oneOfType: e, shape: e, exact: e };return r.checkPropTypes = n, r.PropTypes = r, r;
    };
  }, function (a, e) {
    a.exports = { "form-control": "paragon__form-control", "form-control-file": "paragon__form-control-file", "form-control-range": "paragon__form-control-range", "col-form-label": "paragon__col-form-label", "col-form-label-lg": "paragon__col-form-label-lg", "col-form-label-sm": "paragon__col-form-label-sm", "form-control-plaintext": "paragon__form-control-plaintext", "form-control-sm": "paragon__form-control-sm", "input-group-sm": "paragon__input-group-sm", "input-group-prepend": "paragon__input-group-prepend", "input-group-text": "paragon__input-group-text", "input-group-append": "paragon__input-group-append", btn: "paragon__btn", "form-control-lg": "paragon__form-control-lg", "input-group-lg": "paragon__input-group-lg", "form-group": "paragon__form-group", "form-text": "paragon__form-text", "form-row": "paragon__form-row", col: "paragon__col", "form-check": "paragon__form-check", "form-check-input": "paragon__form-check-input", "form-check-label": "paragon__form-check-label", "form-check-inline": "paragon__form-check-inline", "valid-feedback": "paragon__valid-feedback", "valid-tooltip": "paragon__valid-tooltip", "was-validated": "paragon__was-validated", "is-valid": "paragon__is-valid", "custom-select": "paragon__custom-select", "custom-control-input": "paragon__custom-control-input", "custom-control-label": "paragon__custom-control-label", "custom-file-input": "paragon__custom-file-input", "custom-file-label": "paragon__custom-file-label", "invalid-feedback": "paragon__invalid-feedback", "invalid-tooltip": "paragon__invalid-tooltip", "is-invalid": "paragon__is-invalid", "form-inline": "paragon__form-inline", "input-group": "paragon__input-group", "custom-control": "paragon__custom-control", "sr-only": "paragon__sr-only", "sr-only-focusable": "paragon__sr-only-focusable", "custom-file": "paragon__custom-file", "dropdown-toggle": "paragon__dropdown-toggle", "fa-icon-spacing": "paragon__fa-icon-spacing" };
  }, function (a, e) {
    a.exports = { btn: "paragon__btn", focus: "paragon__focus", disabled: "paragon__disabled", active: "paragon__active", "btn-primary": "paragon__btn-primary", show: "paragon__show", "dropdown-toggle": "paragon__dropdown-toggle", "btn-secondary": "paragon__btn-secondary", "btn-success": "paragon__btn-success", "btn-info": "paragon__btn-info", "btn-warning": "paragon__btn-warning", "btn-danger": "paragon__btn-danger", "btn-light": "paragon__btn-light", "btn-dark": "paragon__btn-dark", "btn-inverse": "paragon__btn-inverse", "btn-disabled": "paragon__btn-disabled", "btn-purchase": "paragon__btn-purchase", "btn-lightest": "paragon__btn-lightest", "btn-darker": "paragon__btn-darker", "btn-darkest": "paragon__btn-darkest", "btn-outline-primary": "paragon__btn-outline-primary", "btn-outline-secondary": "paragon__btn-outline-secondary", "btn-outline-success": "paragon__btn-outline-success", "btn-outline-info": "paragon__btn-outline-info", "btn-outline-warning": "paragon__btn-outline-warning", "btn-outline-danger": "paragon__btn-outline-danger", "btn-outline-light": "paragon__btn-outline-light", "btn-outline-dark": "paragon__btn-outline-dark", "btn-outline-inverse": "paragon__btn-outline-inverse", "btn-outline-disabled": "paragon__btn-outline-disabled", "btn-outline-purchase": "paragon__btn-outline-purchase", "btn-outline-lightest": "paragon__btn-outline-lightest", "btn-outline-darker": "paragon__btn-outline-darker", "btn-outline-darkest": "paragon__btn-outline-darkest", "btn-link": "paragon__btn-link", "btn-lg": "paragon__btn-lg", "btn-sm": "paragon__btn-sm", "btn-block": "paragon__btn-block", close: "paragon__close" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = _(r(0)),
        o = _(r(1)),
        t = _(r(14)),
        l = _(r(13)),
        p = _(r(26));function _(a) {
      return a && a.__esModule ? a : { default: a };
    }function g(a) {
      return n.default.createElement("div", { className: p.default["form-group"] }, a.children);
    }g.propTypes = { children: o.default.arrayOf(t.default.elementOfType(l.default)).isRequired }, e.default = g;
  }, function (a, e) {
    a.exports = { "form-control": "paragon__form-control", "form-control-file": "paragon__form-control-file", "form-control-range": "paragon__form-control-range", "col-form-label": "paragon__col-form-label", "col-form-label-lg": "paragon__col-form-label-lg", "col-form-label-sm": "paragon__col-form-label-sm", "form-control-plaintext": "paragon__form-control-plaintext", "form-control-sm": "paragon__form-control-sm", "form-control-lg": "paragon__form-control-lg", "form-group": "paragon__form-group", "form-text": "paragon__form-text", "form-row": "paragon__form-row", col: "paragon__col", "form-check": "paragon__form-check", "form-check-input": "paragon__form-check-input", "form-check-label": "paragon__form-check-label", "form-check-inline": "paragon__form-check-inline", "valid-feedback": "paragon__valid-feedback", "valid-tooltip": "paragon__valid-tooltip", "was-validated": "paragon__was-validated", "is-valid": "paragon__is-valid", "custom-select": "paragon__custom-select", "custom-control-input": "paragon__custom-control-input", "custom-control-label": "paragon__custom-control-label", "custom-file-input": "paragon__custom-file-input", "custom-file-label": "paragon__custom-file-label", "invalid-feedback": "paragon__invalid-feedback", "invalid-tooltip": "paragon__invalid-tooltip", "is-invalid": "paragon__is-invalid", "form-inline": "paragon__form-inline", "input-group": "paragon__input-group", "custom-control": "paragon__custom-control" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.triggerKeys = void 0;var n = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        o = g(r(0)),
        t = g(r(2)),
        l = g(r(1)),
        p = g(r(28)),
        _ = g(r(5));function g(a) {
      return a && a.__esModule ? a : { default: a };
    }function f(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var s = e.triggerKeys = { OPEN_MENU: ["ArrowDown", "Space"], CLOSE_MENU: ["Escape"], NAVIGATE_DOWN: ["ArrowDown", "Tab"], NAVIGATE_UP: ["ArrowUp"] },
        i = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.addEvents = r.addEvents.bind(r), r.handleDocumentClick = r.handleDocumentClick.bind(r), r.handleToggleKeyDown = r.handleToggleKeyDown.bind(r), r.handleMenuKeyDown = r.handleMenuKeyDown.bind(r), r.removeEvents = r.removeEvents.bind(r), r.toggle = r.toggle.bind(r), r.menuItems = [], r.state = { open: !1, focusIndex: 0 }, r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, o.default.Component), n(e, null, [{ key: "isTriggerKey", value: function value(a, e) {
          return s[a].indexOf(e) > -1;
        } }]), n(e, [{ key: "componentWillUpdate", value: function value(a, e) {
          e.open ? this.addEvents() : this.removeEvents();
        } }, { key: "componentDidUpdate", value: function value() {
          this.state.open ? this.menuItems[this.state.focusIndex].focus() : this.toggleElem && this.toggleElem.focus();
        } }, { key: "addEvents", value: function value() {
          document.addEventListener("click", this.handleDocumentClick, !0);
        } }, { key: "removeEvents", value: function value() {
          document.removeEventListener("click", this.handleDocumentClick, !0);
        } }, { key: "handleDocumentClick", value: function value(a) {
          this.container && this.container.contains(a.target) && this.container !== a.target || this.toggle();
        } }, { key: "handleMenuKeyDown", value: function value(a) {
          a.preventDefault(), e.isTriggerKey("CLOSE_MENU", a.key) ? this.toggle() : e.isTriggerKey("NAVIGATE_DOWN", a.key) ? this.setState({ focusIndex: (this.state.focusIndex + 1) % this.props.menuItems.length }) : e.isTriggerKey("NAVIGATE_UP", a.key) && this.setState({ focusIndex: (this.state.focusIndex - 1 + this.props.menuItems.length) % this.props.menuItems.length });
        } }, { key: "handleToggleKeyDown", value: function value(a) {
          !this.state.open && e.isTriggerKey("OPEN_MENU", a.key) ? this.toggle() : this.state.open && e.isTriggerKey("CLOSE_MENU", a.key) && this.toggle();
        } }, { key: "toggle", value: function value() {
          this.setState({ open: !this.state.open, focusIndex: 0 });
        } }, { key: "generateMenuItems", value: function value(a) {
          var e = this;return a.map(function (a, r) {
            return o.default.createElement("a", { className: p.default["dropdown-item"], href: a.href, key: r, onKeyDown: e.handleMenuKeyDown, ref: function ref(a) {
                e.menuItems[r] = a;
              }, role: "menuitem" }, a.label);
          });
        } }, { key: "render", value: function value() {
          var a = this,
              e = this.generateMenuItems(this.props.menuItems);return o.default.createElement("div", { className: (0, t.default)([p.default.dropdown, f({}, p.default.show, this.state.open)]), ref: function ref(e) {
              a.container = e;
            } }, o.default.createElement(_.default, { "aria-expanded": this.state.open, "aria-haspopup": "true", buttonType: this.props.buttonType, label: this.props.title, onClick: this.toggle, onKeyDown: this.handleToggleKeyDown, className: [p.default["dropdown-toggle"]], type: "button", inputRef: function inputRef(e) {
              a.toggleElem = e;
            } }), o.default.createElement("div", { "aria-label": this.props.title, "aria-hidden": !this.state.open, className: (0, t.default)([p.default["dropdown-menu"], f({}, p.default.show, this.state.open)]), role: "menu" }, e));
        } }]), e;
    }();i.propTypes = { buttonType: l.default.string, menuItems: l.default.arrayOf(l.default.shape({ label: l.default.string, href: l.default.string })).isRequired, title: l.default.string.isRequired }, i.defaultProps = { buttonType: "light" }, e.default = i;
  }, function (a, e) {
    a.exports = { dropup: "paragon__dropup", dropdown: "paragon__dropdown", "dropdown-toggle": "paragon__dropdown-toggle", "dropdown-menu": "paragon__dropdown-menu", dropright: "paragon__dropright", dropleft: "paragon__dropleft", "dropdown-divider": "paragon__dropdown-divider", "dropdown-item": "paragon__dropdown-item", active: "paragon__active", disabled: "paragon__disabled", show: "paragon__show", "dropdown-header": "paragon__dropdown-header" };
  }, function (a, e) {
    a.exports = { "sr-only": "paragon__sr-only", "sr-only-focusable": "paragon__sr-only-focusable" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = f(r(0)),
        l = f(r(2)),
        p = f(r(1)),
        _ = r(3),
        g = f(_);function f(a) {
      return a && a.__esModule ? a : { default: a };
    }var s = function (a) {
      function e() {
        return function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e), function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, t.default.Component), o(e, [{ key: "getOptions", value: function value() {
          return this.props.options.map(function (a, r) {
            var n = void 0;if (a.options) {
              var o = a.options.map(function (a, r) {
                return e.getOption(a, r);
              });n = t.default.createElement("optgroup", { label: a.label, key: a.label }, o);
            } else n = e.getOption(a, r);return n;
          });
        } }, { key: "render", value: function value() {
          var a = n({}, this.props),
              e = this.getOptions();return t.default.createElement("select", { id: a.id, className: (0, l.default)(a.className), type: "select", name: a.name, value: a.value, "aria-describedby": a.describedBy, onChange: a.onChange, onBlur: a.onBlur, ref: a.inputRef, disabled: a.disabled }, e);
        } }], [{ key: "getOption", value: function value(a, e) {
          var r = a.label,
              n = a.value;return "string" == typeof a && (r = a, n = a), t.default.createElement("option", { value: n, key: "option-" + e }, r);
        } }]), e;
    }();s.propTypes = n({}, _.inputProps, { options: p.default.oneOfType([p.default.arrayOf(p.default.string), p.default.arrayOf(p.default.object)]).isRequired });var i = (0, g.default)(s);i.propTypes = n({}, i.propTypes, s.propTypes), e.default = i;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = g(r(0)),
        t = g(r(2)),
        l = g(r(1)),
        p = r(3),
        _ = g(p);function g(a) {
      return a && a.__esModule ? a : { default: a };
    }function f(a) {
      return o.default.createElement("input", { id: a.id, className: (0, t.default)(a.className), type: a.type || "text", name: a.name, value: a.value, placeholder: a.placeholder, "aria-describedby": a.describedBy, onChange: a.onChange, onBlur: a.onBlur, "aria-invalid": !a.isValid, autoComplete: a.autoComplete, disabled: a.disabled, required: a.required, ref: a.inputRef, themes: a.themes });
    }var s = { type: l.default.string, describedBy: l.default.string, isValid: l.default.bool, autoComplete: l.default.string, inputRef: l.default.func };f.propTypes = n({}, s, p.inputProps), f.defaultProps = n({}, { type: "text", describedBy: "", isValid: !0, autoComplete: "on", inputRef: function inputRef() {} }, p.defaultProps);var i = (0, _.default)(f);e.default = i;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = (g(r(0)), g(r(1))),
        t = g(r(33)),
        l = g(r(8)),
        p = g(r(35)),
        _ = g(r(15));function g(a) {
      return a && a.__esModule ? a : { default: a };
    }var f = function f(a) {
      var e = a.to,
          r = a.cc,
          o = a.bcc,
          t = a.subject,
          l = a.body,
          g = a.content,
          f = a.target,
          s = a.onClick,
          i = a.externalLink,
          m = function (a, e) {
        var r = {};for (var n in a) {
          e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
        }return r;
      }(a, ["to", "cc", "bcc", "subject", "body", "content", "target", "onClick", "externalLink"]),
          u = i.alternativeLink,
          d = i.title,
          c = (0, p.default)({ to: e, cc: r, bcc: o, subject: t, body: l });return (0, _.default)(n({ destination: c, content: g, target: f, onClick: s, externalLinkAlternativeText: u, externalLinkTitle: d }, m));
    };f.defaultProps = { to: [], cc: [], bcc: [], subject: "", body: "", target: "_self", onClick: null, externalLink: { alternativeText: "Opens in a new window", title: "Opens in a new window" } }, f.propTypes = { content: o.default.oneOfType([o.default.string, o.default.element]).isRequired, to: o.default.oneOfType([o.default.arrayOf(t.default), t.default]), cc: o.default.oneOfType([o.default.arrayOf(t.default), t.default]), bcc: o.default.oneOfType([o.default.arrayOf(t.default), t.default]), subject: o.default.string, body: o.default.string, target: o.default.string, onClick: o.default.func, externalLink: o.default.shape({ alternativeText: (0, l.default)(o.default.string, function (a) {
          return "_blank" === a.target;
        }), title: (0, l.default)(o.default.string, function (a) {
          return "_blank" === a.target;
        }) }) }, e.default = f;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        o = r(34),
        t = (n = o) && n.__esModule ? n : { default: n };var l = function l(a, e, r) {
      var n = a[e];return null != n && "string" == typeof n && t.default.validate(n) ? null : new TypeError("Invalid Email Prop Value: " + n + " for " + e + " in " + r);
    },
        p = function p(a, e, r) {
      return null == a[e] ? null : l(a, e, r);
    };p.isRequired = l, e.default = p;
  }, function (a, e, r) {
    "use strict";
    var n = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;e.validate = function (a) {
      if (!a) return !1;if (a.length > 254) return !1;if (!n.test(a)) return !1;var e = a.split("@");return !(e[0].length > 64) && !e[1].split(".").some(function (a) {
        return a.length > 63;
      });
    };
  }, function (a, e, r) {
    "use strict";
    var n = r(36),
        o = r(37),
        t = r(39),
        l = r(40);function p(a) {
      return a ? o(a).join(",") : void 0;
    }a.exports = function (a) {
      n(a, "options are required");var e = { to: p(a.to), cc: p(a.cc), bcc: p(a.bcc), subject: a.subject, body: a.body },
          r = e.to;delete (e = t(e, Boolean)).to;var o = l.stringify(e);return "mailto:" + (r || "") + (o ? "?" + o : "");
    };
  }, function (a, e, r) {
    "use strict";
    a.exports = function (a, e) {
      if (!a) throw new Error(e || "Expected true, got " + a);
    };
  }, function (a, e, r) {
    "use strict";
    var n = r(38);a.exports = function (a) {
      return n(a) ? a : [a];
    };
  }, function (a, e) {
    a.exports = Array.isArray || function (a) {
      return "[object Array]" == Object.prototype.toString.call(a);
    };
  }, function (a, e) {
    a.exports = function (a, e, r) {
      if ("function" != typeof e) throw new TypeError("`f` has to be a function");var n = {};return Object.keys(a).forEach(function (o) {
        e.call(r || this, a[o], o, a) && (n[o] = a[o]);
      }), n;
    };
  }, function (a, e, r) {
    "use strict";
    var n = r(41);e.extract = function (a) {
      return a.split("?")[1] || "";
    }, e.parse = function (a) {
      return "string" != typeof a ? {} : (a = a.trim().replace(/^(\?|#|&)/, "")) ? a.split("&").reduce(function (a, e) {
        var r = e.replace(/\+/g, " ").split("="),
            n = r.shift(),
            o = r.length > 0 ? r.join("=") : void 0;return n = decodeURIComponent(n), o = void 0 === o ? null : decodeURIComponent(o), a.hasOwnProperty(n) ? Array.isArray(a[n]) ? a[n].push(o) : a[n] = [a[n], o] : a[n] = o, a;
      }, {}) : {};
    }, e.stringify = function (a) {
      return a ? Object.keys(a).sort().map(function (e) {
        var r = a[e];return Array.isArray(r) ? r.sort().map(function (a) {
          return n(e) + "=" + n(a);
        }).join("&") : n(e) + "=" + n(r);
      }).filter(function (a) {
        return a.length > 0;
      }).join("&") : "";
    };
  }, function (a, e, r) {
    "use strict";
    a.exports = function (a) {
      return encodeURIComponent(a).replace(/[!'()*]/g, function (a) {
        return "%" + a.charCodeAt(0).toString(16).toUpperCase();
      });
    };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = d(r(0)),
        l = d(r(2)),
        p = d(r(1)),
        _ = d(r(6)),
        g = d(r(43)),
        f = r(5),
        s = d(f),
        i = d(r(16)),
        m = d(r(7)),
        u = d(r(17));function d(a) {
      return a && a.__esModule ? a : { default: a };
    }function c(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var b = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.close = r.close.bind(r), r.handleKeyDown = r.handleKeyDown.bind(r), r.setFirstFocusableElement = r.setFirstFocusableElement.bind(r), r.setCloseButton = r.setCloseButton.bind(r), r.headerId = (0, m.default)(), r.state = { open: a.open }, r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, t.default.Component), o(e, [{ key: "componentDidMount", value: function value() {
          this.firstFocusableElement && this.firstFocusableElement.focus();
        } }, { key: "componentWillReceiveProps", value: function value(a) {
          var e = a.open;e !== this.state.open && this.setState({ open: e });
        } }, { key: "componentDidUpdate", value: function value(a) {
          this.state.open && !a.open && this.firstFocusableElement.focus();
        } }, { key: "setFirstFocusableElement", value: function value(a) {
          this.firstFocusableElement = a;
        } }, { key: "setCloseButton", value: function value(a) {
          this.closeButton = a;
        } }, { key: "getVariantIconClassName", value: function value() {
          var a = this.props.variant,
              e = void 0;switch (a.status) {case u.default.status.WARNING:
              e = (0, l.default)(_.default.fa, _.default["fa-exclamation-triangle"], _.default["fa-3x"], g.default["text-" + a.status.toLowerCase()]);}return e;
        } }, { key: "getVariantGridBody", value: function value(a) {
          var e = this.props.variant;return t.default.createElement("div", { className: g.default["container-fluid"] }, t.default.createElement("div", { className: g.default.row }, t.default.createElement("div", { className: g.default["col-md-10"] }, t.default.createElement("div", null, a)), t.default.createElement("div", { className: g.default.col }, t.default.createElement(i.default, { id: (0, m.default)("Modal-" + e.status), className: [this.getVariantIconClassName()] }))));
        } }, { key: "close", value: function value() {
          this.setState({ open: !1 }), this.props.onClose();
        } }, { key: "handleKeyDown", value: function value(a) {
          "Escape" === a.key ? this.close() : "Tab" === a.key && (a.shiftKey ? a.target === this.firstFocusableElement && (a.preventDefault(), this.closeButton.focus()) : a.target === this.closeButton && (a.preventDefault(), this.firstFocusableElement.focus()));
        } }, { key: "renderButtons", value: function value() {
          var a = this;return this.props.buttons.map(function (e, r) {
            var o = e.props;return e.type !== s.default && (o = e), t.default.createElement(s.default, n({}, o, { key: r, onKeyDown: a.handleKeyDown }));
          });
        } }, { key: "renderBody", value: function value() {
          var a = this.props.variant,
              e = this.props.body;return "string" == typeof e && (e = t.default.createElement("p", null, e)), a.status && (e = this.getVariantGridBody(e)), e;
        } }, { key: "render", value: function value() {
          var a,
              e = this.state.open,
              r = this.props.renderHeaderCloseButton;return t.default.createElement("div", n({ className: (0, l.default)(g.default.modal, (a = {}, c(a, g.default["modal-open"], e), c(a, g.default["modal-backdrop"], e), c(a, g.default.show, e), c(a, g.default.fade, !e), a)), role: "dialog", "aria-modal": !0, "aria-labelledby": this.headerId }, r ? {} : { tabIndex: "-1" }, r ? {} : { ref: this.setFirstFocusableElement }), t.default.createElement("div", { className: g.default["modal-dialog"] }, t.default.createElement("div", { className: g.default["modal-content"] }, t.default.createElement("div", { className: g.default["modal-header"] }, t.default.createElement("h2", { className: g.default["modal-title"], id: this.headerId }, this.props.title), r && t.default.createElement(s.default, { label: t.default.createElement(i.default, { className: ["fa", "fa-times"] }), className: ["p-1"], "aria-label": this.props.closeText, onClick: this.close, inputRef: this.setFirstFocusableElement, onKeyDown: this.handleKeyDown })), t.default.createElement("div", { className: g.default["modal-body"] }, this.renderBody()), t.default.createElement("div", { className: g.default["modal-footer"] }, this.renderButtons(), t.default.createElement(s.default, { label: this.props.closeText, buttonType: "outline-primary", onClick: this.close, inputRef: this.setCloseButton, onKeyDown: this.handleKeyDown })))));
        } }]), e;
    }();b.propTypes = { open: p.default.bool, title: p.default.oneOfType([p.default.string, p.default.element]).isRequired, body: p.default.oneOfType([p.default.string, p.default.element]).isRequired, buttons: p.default.arrayOf(p.default.oneOfType([p.default.element, p.default.shape(f.buttonPropTypes)])), closeText: p.default.string, onClose: p.default.func.isRequired, variant: p.default.shape({ status: p.default.string }), renderHeaderCloseButton: p.default.bool }, b.defaultProps = { open: !1, buttons: [], closeText: "Close", variant: {}, renderHeaderCloseButton: !0 }, e.default = b;
  }, function (a, e) {
    a.exports = { "modal-open": "paragon__modal-open", modal: "paragon__modal", "modal-dialog": "paragon__modal-dialog", fade: "paragon__fade", show: "paragon__show", "modal-dialog-centered": "paragon__modal-dialog-centered", "modal-content": "paragon__modal-content", "modal-backdrop": "paragon__modal-backdrop", "modal-header": "paragon__modal-header", close: "paragon__close", "modal-title": "paragon__modal-title", "modal-body": "paragon__modal-body", "modal-footer": "paragon__modal-footer", "modal-scrollbar-measure": "paragon__modal-scrollbar-measure", "modal-sm": "paragon__modal-sm", "modal-lg": "paragon__modal-lg", container: "paragon__container", "container-fluid": "paragon__container-fluid", row: "paragon__row", "no-gutters": "paragon__no-gutters", col: "paragon__col", "col-1": "paragon__col-1", "col-2": "paragon__col-2", "col-3": "paragon__col-3", "col-4": "paragon__col-4", "col-5": "paragon__col-5", "col-6": "paragon__col-6", "col-7": "paragon__col-7", "col-8": "paragon__col-8", "col-9": "paragon__col-9", "col-10": "paragon__col-10", "col-11": "paragon__col-11", "col-12": "paragon__col-12", "col-auto": "paragon__col-auto", "col-sm-1": "paragon__col-sm-1", "col-sm-2": "paragon__col-sm-2", "col-sm-3": "paragon__col-sm-3", "col-sm-4": "paragon__col-sm-4", "col-sm-5": "paragon__col-sm-5", "col-sm-6": "paragon__col-sm-6", "col-sm-7": "paragon__col-sm-7", "col-sm-8": "paragon__col-sm-8", "col-sm-9": "paragon__col-sm-9", "col-sm-10": "paragon__col-sm-10", "col-sm-11": "paragon__col-sm-11", "col-sm-12": "paragon__col-sm-12", "col-sm": "paragon__col-sm", "col-sm-auto": "paragon__col-sm-auto", "col-md-1": "paragon__col-md-1", "col-md-2": "paragon__col-md-2", "col-md-3": "paragon__col-md-3", "col-md-4": "paragon__col-md-4", "col-md-5": "paragon__col-md-5", "col-md-6": "paragon__col-md-6", "col-md-7": "paragon__col-md-7", "col-md-8": "paragon__col-md-8", "col-md-9": "paragon__col-md-9", "col-md-10": "paragon__col-md-10", "col-md-11": "paragon__col-md-11", "col-md-12": "paragon__col-md-12", "col-md": "paragon__col-md", "col-md-auto": "paragon__col-md-auto", "col-lg-1": "paragon__col-lg-1", "col-lg-2": "paragon__col-lg-2", "col-lg-3": "paragon__col-lg-3", "col-lg-4": "paragon__col-lg-4", "col-lg-5": "paragon__col-lg-5", "col-lg-6": "paragon__col-lg-6", "col-lg-7": "paragon__col-lg-7", "col-lg-8": "paragon__col-lg-8", "col-lg-9": "paragon__col-lg-9", "col-lg-10": "paragon__col-lg-10", "col-lg-11": "paragon__col-lg-11", "col-lg-12": "paragon__col-lg-12", "col-lg": "paragon__col-lg", "col-lg-auto": "paragon__col-lg-auto", "col-xl-1": "paragon__col-xl-1", "col-xl-2": "paragon__col-xl-2", "col-xl-3": "paragon__col-xl-3", "col-xl-4": "paragon__col-xl-4", "col-xl-5": "paragon__col-xl-5", "col-xl-6": "paragon__col-xl-6", "col-xl-7": "paragon__col-xl-7", "col-xl-8": "paragon__col-xl-8", "col-xl-9": "paragon__col-xl-9", "col-xl-10": "paragon__col-xl-10", "col-xl-11": "paragon__col-xl-11", "col-xl-12": "paragon__col-xl-12", "col-xl": "paragon__col-xl", "col-xl-auto": "paragon__col-xl-auto", "order-first": "paragon__order-first", "order-last": "paragon__order-last", "order-0": "paragon__order-0", "order-1": "paragon__order-1", "order-2": "paragon__order-2", "order-3": "paragon__order-3", "order-4": "paragon__order-4", "order-5": "paragon__order-5", "order-6": "paragon__order-6", "order-7": "paragon__order-7", "order-8": "paragon__order-8", "order-9": "paragon__order-9", "order-10": "paragon__order-10", "order-11": "paragon__order-11", "order-12": "paragon__order-12", "offset-1": "paragon__offset-1", "offset-2": "paragon__offset-2", "offset-3": "paragon__offset-3", "offset-4": "paragon__offset-4", "offset-5": "paragon__offset-5", "offset-6": "paragon__offset-6", "offset-7": "paragon__offset-7", "offset-8": "paragon__offset-8", "offset-9": "paragon__offset-9", "offset-10": "paragon__offset-10", "offset-11": "paragon__offset-11", "order-sm-first": "paragon__order-sm-first", "order-sm-last": "paragon__order-sm-last", "order-sm-0": "paragon__order-sm-0", "order-sm-1": "paragon__order-sm-1", "order-sm-2": "paragon__order-sm-2", "order-sm-3": "paragon__order-sm-3", "order-sm-4": "paragon__order-sm-4", "order-sm-5": "paragon__order-sm-5", "order-sm-6": "paragon__order-sm-6", "order-sm-7": "paragon__order-sm-7", "order-sm-8": "paragon__order-sm-8", "order-sm-9": "paragon__order-sm-9", "order-sm-10": "paragon__order-sm-10", "order-sm-11": "paragon__order-sm-11", "order-sm-12": "paragon__order-sm-12", "offset-sm-0": "paragon__offset-sm-0", "offset-sm-1": "paragon__offset-sm-1", "offset-sm-2": "paragon__offset-sm-2", "offset-sm-3": "paragon__offset-sm-3", "offset-sm-4": "paragon__offset-sm-4", "offset-sm-5": "paragon__offset-sm-5", "offset-sm-6": "paragon__offset-sm-6", "offset-sm-7": "paragon__offset-sm-7", "offset-sm-8": "paragon__offset-sm-8", "offset-sm-9": "paragon__offset-sm-9", "offset-sm-10": "paragon__offset-sm-10", "offset-sm-11": "paragon__offset-sm-11", "order-md-first": "paragon__order-md-first", "order-md-last": "paragon__order-md-last", "order-md-0": "paragon__order-md-0", "order-md-1": "paragon__order-md-1", "order-md-2": "paragon__order-md-2", "order-md-3": "paragon__order-md-3", "order-md-4": "paragon__order-md-4", "order-md-5": "paragon__order-md-5", "order-md-6": "paragon__order-md-6", "order-md-7": "paragon__order-md-7", "order-md-8": "paragon__order-md-8", "order-md-9": "paragon__order-md-9", "order-md-10": "paragon__order-md-10", "order-md-11": "paragon__order-md-11", "order-md-12": "paragon__order-md-12", "offset-md-0": "paragon__offset-md-0", "offset-md-1": "paragon__offset-md-1", "offset-md-2": "paragon__offset-md-2", "offset-md-3": "paragon__offset-md-3", "offset-md-4": "paragon__offset-md-4", "offset-md-5": "paragon__offset-md-5", "offset-md-6": "paragon__offset-md-6", "offset-md-7": "paragon__offset-md-7", "offset-md-8": "paragon__offset-md-8", "offset-md-9": "paragon__offset-md-9", "offset-md-10": "paragon__offset-md-10", "offset-md-11": "paragon__offset-md-11", "order-lg-first": "paragon__order-lg-first", "order-lg-last": "paragon__order-lg-last", "order-lg-0": "paragon__order-lg-0", "order-lg-1": "paragon__order-lg-1", "order-lg-2": "paragon__order-lg-2", "order-lg-3": "paragon__order-lg-3", "order-lg-4": "paragon__order-lg-4", "order-lg-5": "paragon__order-lg-5", "order-lg-6": "paragon__order-lg-6", "order-lg-7": "paragon__order-lg-7", "order-lg-8": "paragon__order-lg-8", "order-lg-9": "paragon__order-lg-9", "order-lg-10": "paragon__order-lg-10", "order-lg-11": "paragon__order-lg-11", "order-lg-12": "paragon__order-lg-12", "offset-lg-0": "paragon__offset-lg-0", "offset-lg-1": "paragon__offset-lg-1", "offset-lg-2": "paragon__offset-lg-2", "offset-lg-3": "paragon__offset-lg-3", "offset-lg-4": "paragon__offset-lg-4", "offset-lg-5": "paragon__offset-lg-5", "offset-lg-6": "paragon__offset-lg-6", "offset-lg-7": "paragon__offset-lg-7", "offset-lg-8": "paragon__offset-lg-8", "offset-lg-9": "paragon__offset-lg-9", "offset-lg-10": "paragon__offset-lg-10", "offset-lg-11": "paragon__offset-lg-11", "order-xl-first": "paragon__order-xl-first", "order-xl-last": "paragon__order-xl-last", "order-xl-0": "paragon__order-xl-0", "order-xl-1": "paragon__order-xl-1", "order-xl-2": "paragon__order-xl-2", "order-xl-3": "paragon__order-xl-3", "order-xl-4": "paragon__order-xl-4", "order-xl-5": "paragon__order-xl-5", "order-xl-6": "paragon__order-xl-6", "order-xl-7": "paragon__order-xl-7", "order-xl-8": "paragon__order-xl-8", "order-xl-9": "paragon__order-xl-9", "order-xl-10": "paragon__order-xl-10", "order-xl-11": "paragon__order-xl-11", "order-xl-12": "paragon__order-xl-12", "offset-xl-0": "paragon__offset-xl-0", "offset-xl-1": "paragon__offset-xl-1", "offset-xl-2": "paragon__offset-xl-2", "offset-xl-3": "paragon__offset-xl-3", "offset-xl-4": "paragon__offset-xl-4", "offset-xl-5": "paragon__offset-xl-5", "offset-xl-6": "paragon__offset-xl-6", "offset-xl-7": "paragon__offset-xl-7", "offset-xl-8": "paragon__offset-xl-8", "offset-xl-9": "paragon__offset-xl-9", "offset-xl-10": "paragon__offset-xl-10", "offset-xl-11": "paragon__offset-xl-11", "align-baseline": "paragon__align-baseline", "align-top": "paragon__align-top", "align-middle": "paragon__align-middle", "align-bottom": "paragon__align-bottom", "align-text-bottom": "paragon__align-text-bottom", "align-text-top": "paragon__align-text-top", "bg-primary": "paragon__bg-primary", "bg-secondary": "paragon__bg-secondary", "bg-success": "paragon__bg-success", "bg-info": "paragon__bg-info", "bg-warning": "paragon__bg-warning", "bg-danger": "paragon__bg-danger", "bg-light": "paragon__bg-light", "bg-dark": "paragon__bg-dark", "bg-inverse": "paragon__bg-inverse", "bg-disabled": "paragon__bg-disabled", "bg-purchase": "paragon__bg-purchase", "bg-lightest": "paragon__bg-lightest", "bg-darker": "paragon__bg-darker", "bg-darkest": "paragon__bg-darkest", "bg-white": "paragon__bg-white", "bg-transparent": "paragon__bg-transparent", border: "paragon__border", "border-top": "paragon__border-top", "border-right": "paragon__border-right", "border-bottom": "paragon__border-bottom", "border-left": "paragon__border-left", "border-0": "paragon__border-0", "border-top-0": "paragon__border-top-0", "border-right-0": "paragon__border-right-0", "border-bottom-0": "paragon__border-bottom-0", "border-left-0": "paragon__border-left-0", "border-primary": "paragon__border-primary", "border-secondary": "paragon__border-secondary", "border-success": "paragon__border-success", "border-info": "paragon__border-info", "border-warning": "paragon__border-warning", "border-danger": "paragon__border-danger", "border-light": "paragon__border-light", "border-dark": "paragon__border-dark", "border-inverse": "paragon__border-inverse", "border-disabled": "paragon__border-disabled", "border-purchase": "paragon__border-purchase", "border-lightest": "paragon__border-lightest", "border-darker": "paragon__border-darker", "border-darkest": "paragon__border-darkest", "border-white": "paragon__border-white", rounded: "paragon__rounded", "rounded-top": "paragon__rounded-top", "rounded-right": "paragon__rounded-right", "rounded-bottom": "paragon__rounded-bottom", "rounded-left": "paragon__rounded-left", "rounded-circle": "paragon__rounded-circle", "rounded-0": "paragon__rounded-0", clearfix: "paragon__clearfix", "d-none": "paragon__d-none", "d-inline": "paragon__d-inline", "d-inline-block": "paragon__d-inline-block", "d-block": "paragon__d-block", "d-table": "paragon__d-table", "d-table-row": "paragon__d-table-row", "d-table-cell": "paragon__d-table-cell", "d-flex": "paragon__d-flex", "d-inline-flex": "paragon__d-inline-flex", "d-sm-none": "paragon__d-sm-none", "d-sm-inline": "paragon__d-sm-inline", "d-sm-inline-block": "paragon__d-sm-inline-block", "d-sm-block": "paragon__d-sm-block", "d-sm-table": "paragon__d-sm-table", "d-sm-table-row": "paragon__d-sm-table-row", "d-sm-table-cell": "paragon__d-sm-table-cell", "d-sm-flex": "paragon__d-sm-flex", "d-sm-inline-flex": "paragon__d-sm-inline-flex", "d-md-none": "paragon__d-md-none", "d-md-inline": "paragon__d-md-inline", "d-md-inline-block": "paragon__d-md-inline-block", "d-md-block": "paragon__d-md-block", "d-md-table": "paragon__d-md-table", "d-md-table-row": "paragon__d-md-table-row", "d-md-table-cell": "paragon__d-md-table-cell", "d-md-flex": "paragon__d-md-flex", "d-md-inline-flex": "paragon__d-md-inline-flex", "d-lg-none": "paragon__d-lg-none", "d-lg-inline": "paragon__d-lg-inline", "d-lg-inline-block": "paragon__d-lg-inline-block", "d-lg-block": "paragon__d-lg-block", "d-lg-table": "paragon__d-lg-table", "d-lg-table-row": "paragon__d-lg-table-row", "d-lg-table-cell": "paragon__d-lg-table-cell", "d-lg-flex": "paragon__d-lg-flex", "d-lg-inline-flex": "paragon__d-lg-inline-flex", "d-xl-none": "paragon__d-xl-none", "d-xl-inline": "paragon__d-xl-inline", "d-xl-inline-block": "paragon__d-xl-inline-block", "d-xl-block": "paragon__d-xl-block", "d-xl-table": "paragon__d-xl-table", "d-xl-table-row": "paragon__d-xl-table-row", "d-xl-table-cell": "paragon__d-xl-table-cell", "d-xl-flex": "paragon__d-xl-flex", "d-xl-inline-flex": "paragon__d-xl-inline-flex", "d-print-none": "paragon__d-print-none", "d-print-inline": "paragon__d-print-inline", "d-print-inline-block": "paragon__d-print-inline-block", "d-print-block": "paragon__d-print-block", "d-print-table": "paragon__d-print-table", "d-print-table-row": "paragon__d-print-table-row", "d-print-table-cell": "paragon__d-print-table-cell", "d-print-flex": "paragon__d-print-flex", "d-print-inline-flex": "paragon__d-print-inline-flex", "embed-responsive": "paragon__embed-responsive", "embed-responsive-item": "paragon__embed-responsive-item", "embed-responsive-21by9": "paragon__embed-responsive-21by9", "embed-responsive-16by9": "paragon__embed-responsive-16by9", "embed-responsive-4by3": "paragon__embed-responsive-4by3", "embed-responsive-1by1": "paragon__embed-responsive-1by1", "flex-row": "paragon__flex-row", "flex-column": "paragon__flex-column", "flex-row-reverse": "paragon__flex-row-reverse", "flex-column-reverse": "paragon__flex-column-reverse", "flex-wrap": "paragon__flex-wrap", "flex-nowrap": "paragon__flex-nowrap", "flex-wrap-reverse": "paragon__flex-wrap-reverse", "justify-content-start": "paragon__justify-content-start", "justify-content-end": "paragon__justify-content-end", "justify-content-center": "paragon__justify-content-center", "justify-content-between": "paragon__justify-content-between", "justify-content-around": "paragon__justify-content-around", "align-items-start": "paragon__align-items-start", "align-items-end": "paragon__align-items-end", "align-items-center": "paragon__align-items-center", "align-items-baseline": "paragon__align-items-baseline", "align-items-stretch": "paragon__align-items-stretch", "align-content-start": "paragon__align-content-start", "align-content-end": "paragon__align-content-end", "align-content-center": "paragon__align-content-center", "align-content-between": "paragon__align-content-between", "align-content-around": "paragon__align-content-around", "align-content-stretch": "paragon__align-content-stretch", "align-self-auto": "paragon__align-self-auto", "align-self-start": "paragon__align-self-start", "align-self-end": "paragon__align-self-end", "align-self-center": "paragon__align-self-center", "align-self-baseline": "paragon__align-self-baseline", "align-self-stretch": "paragon__align-self-stretch", "flex-sm-row": "paragon__flex-sm-row", "flex-sm-column": "paragon__flex-sm-column", "flex-sm-row-reverse": "paragon__flex-sm-row-reverse", "flex-sm-column-reverse": "paragon__flex-sm-column-reverse", "flex-sm-wrap": "paragon__flex-sm-wrap", "flex-sm-nowrap": "paragon__flex-sm-nowrap", "flex-sm-wrap-reverse": "paragon__flex-sm-wrap-reverse", "justify-content-sm-start": "paragon__justify-content-sm-start", "justify-content-sm-end": "paragon__justify-content-sm-end", "justify-content-sm-center": "paragon__justify-content-sm-center", "justify-content-sm-between": "paragon__justify-content-sm-between", "justify-content-sm-around": "paragon__justify-content-sm-around", "align-items-sm-start": "paragon__align-items-sm-start", "align-items-sm-end": "paragon__align-items-sm-end", "align-items-sm-center": "paragon__align-items-sm-center", "align-items-sm-baseline": "paragon__align-items-sm-baseline", "align-items-sm-stretch": "paragon__align-items-sm-stretch", "align-content-sm-start": "paragon__align-content-sm-start", "align-content-sm-end": "paragon__align-content-sm-end", "align-content-sm-center": "paragon__align-content-sm-center", "align-content-sm-between": "paragon__align-content-sm-between", "align-content-sm-around": "paragon__align-content-sm-around", "align-content-sm-stretch": "paragon__align-content-sm-stretch", "align-self-sm-auto": "paragon__align-self-sm-auto", "align-self-sm-start": "paragon__align-self-sm-start", "align-self-sm-end": "paragon__align-self-sm-end", "align-self-sm-center": "paragon__align-self-sm-center", "align-self-sm-baseline": "paragon__align-self-sm-baseline", "align-self-sm-stretch": "paragon__align-self-sm-stretch", "flex-md-row": "paragon__flex-md-row", "flex-md-column": "paragon__flex-md-column", "flex-md-row-reverse": "paragon__flex-md-row-reverse", "flex-md-column-reverse": "paragon__flex-md-column-reverse", "flex-md-wrap": "paragon__flex-md-wrap", "flex-md-nowrap": "paragon__flex-md-nowrap", "flex-md-wrap-reverse": "paragon__flex-md-wrap-reverse", "justify-content-md-start": "paragon__justify-content-md-start", "justify-content-md-end": "paragon__justify-content-md-end", "justify-content-md-center": "paragon__justify-content-md-center", "justify-content-md-between": "paragon__justify-content-md-between", "justify-content-md-around": "paragon__justify-content-md-around", "align-items-md-start": "paragon__align-items-md-start", "align-items-md-end": "paragon__align-items-md-end", "align-items-md-center": "paragon__align-items-md-center", "align-items-md-baseline": "paragon__align-items-md-baseline", "align-items-md-stretch": "paragon__align-items-md-stretch", "align-content-md-start": "paragon__align-content-md-start", "align-content-md-end": "paragon__align-content-md-end", "align-content-md-center": "paragon__align-content-md-center", "align-content-md-between": "paragon__align-content-md-between", "align-content-md-around": "paragon__align-content-md-around", "align-content-md-stretch": "paragon__align-content-md-stretch", "align-self-md-auto": "paragon__align-self-md-auto", "align-self-md-start": "paragon__align-self-md-start", "align-self-md-end": "paragon__align-self-md-end", "align-self-md-center": "paragon__align-self-md-center", "align-self-md-baseline": "paragon__align-self-md-baseline", "align-self-md-stretch": "paragon__align-self-md-stretch", "flex-lg-row": "paragon__flex-lg-row", "flex-lg-column": "paragon__flex-lg-column", "flex-lg-row-reverse": "paragon__flex-lg-row-reverse", "flex-lg-column-reverse": "paragon__flex-lg-column-reverse", "flex-lg-wrap": "paragon__flex-lg-wrap", "flex-lg-nowrap": "paragon__flex-lg-nowrap", "flex-lg-wrap-reverse": "paragon__flex-lg-wrap-reverse", "justify-content-lg-start": "paragon__justify-content-lg-start", "justify-content-lg-end": "paragon__justify-content-lg-end", "justify-content-lg-center": "paragon__justify-content-lg-center", "justify-content-lg-between": "paragon__justify-content-lg-between", "justify-content-lg-around": "paragon__justify-content-lg-around", "align-items-lg-start": "paragon__align-items-lg-start", "align-items-lg-end": "paragon__align-items-lg-end", "align-items-lg-center": "paragon__align-items-lg-center", "align-items-lg-baseline": "paragon__align-items-lg-baseline", "align-items-lg-stretch": "paragon__align-items-lg-stretch", "align-content-lg-start": "paragon__align-content-lg-start", "align-content-lg-end": "paragon__align-content-lg-end", "align-content-lg-center": "paragon__align-content-lg-center", "align-content-lg-between": "paragon__align-content-lg-between", "align-content-lg-around": "paragon__align-content-lg-around", "align-content-lg-stretch": "paragon__align-content-lg-stretch", "align-self-lg-auto": "paragon__align-self-lg-auto", "align-self-lg-start": "paragon__align-self-lg-start", "align-self-lg-end": "paragon__align-self-lg-end", "align-self-lg-center": "paragon__align-self-lg-center", "align-self-lg-baseline": "paragon__align-self-lg-baseline", "align-self-lg-stretch": "paragon__align-self-lg-stretch", "flex-xl-row": "paragon__flex-xl-row", "flex-xl-column": "paragon__flex-xl-column", "flex-xl-row-reverse": "paragon__flex-xl-row-reverse", "flex-xl-column-reverse": "paragon__flex-xl-column-reverse", "flex-xl-wrap": "paragon__flex-xl-wrap", "flex-xl-nowrap": "paragon__flex-xl-nowrap", "flex-xl-wrap-reverse": "paragon__flex-xl-wrap-reverse", "justify-content-xl-start": "paragon__justify-content-xl-start", "justify-content-xl-end": "paragon__justify-content-xl-end", "justify-content-xl-center": "paragon__justify-content-xl-center", "justify-content-xl-between": "paragon__justify-content-xl-between", "justify-content-xl-around": "paragon__justify-content-xl-around", "align-items-xl-start": "paragon__align-items-xl-start", "align-items-xl-end": "paragon__align-items-xl-end", "align-items-xl-center": "paragon__align-items-xl-center", "align-items-xl-baseline": "paragon__align-items-xl-baseline", "align-items-xl-stretch": "paragon__align-items-xl-stretch", "align-content-xl-start": "paragon__align-content-xl-start", "align-content-xl-end": "paragon__align-content-xl-end", "align-content-xl-center": "paragon__align-content-xl-center", "align-content-xl-between": "paragon__align-content-xl-between", "align-content-xl-around": "paragon__align-content-xl-around", "align-content-xl-stretch": "paragon__align-content-xl-stretch", "align-self-xl-auto": "paragon__align-self-xl-auto", "align-self-xl-start": "paragon__align-self-xl-start", "align-self-xl-end": "paragon__align-self-xl-end", "align-self-xl-center": "paragon__align-self-xl-center", "align-self-xl-baseline": "paragon__align-self-xl-baseline", "align-self-xl-stretch": "paragon__align-self-xl-stretch", "float-left": "paragon__float-left", "float-right": "paragon__float-right", "float-none": "paragon__float-none", "float-sm-left": "paragon__float-sm-left", "float-sm-right": "paragon__float-sm-right", "float-sm-none": "paragon__float-sm-none", "float-md-left": "paragon__float-md-left", "float-md-right": "paragon__float-md-right", "float-md-none": "paragon__float-md-none", "float-lg-left": "paragon__float-lg-left", "float-lg-right": "paragon__float-lg-right", "float-lg-none": "paragon__float-lg-none", "float-xl-left": "paragon__float-xl-left", "float-xl-right": "paragon__float-xl-right", "float-xl-none": "paragon__float-xl-none", "position-static": "paragon__position-static", "position-relative": "paragon__position-relative", "position-absolute": "paragon__position-absolute", "position-fixed": "paragon__position-fixed", "position-sticky": "paragon__position-sticky", "fixed-top": "paragon__fixed-top", "fixed-bottom": "paragon__fixed-bottom", "sticky-top": "paragon__sticky-top", "sr-only": "paragon__sr-only", "sr-only-focusable": "paragon__sr-only-focusable", "w-25": "paragon__w-25", "w-50": "paragon__w-50", "w-75": "paragon__w-75", "w-100": "paragon__w-100", "h-25": "paragon__h-25", "h-50": "paragon__h-50", "h-75": "paragon__h-75", "h-100": "paragon__h-100", "mw-100": "paragon__mw-100", "mh-100": "paragon__mh-100", "m-0": "paragon__m-0", "mt-0": "paragon__mt-0", "my-0": "paragon__my-0", "mr-0": "paragon__mr-0", "mx-0": "paragon__mx-0", "mb-0": "paragon__mb-0", "ml-0": "paragon__ml-0", "m-1": "paragon__m-1", "mt-1": "paragon__mt-1", "my-1": "paragon__my-1", "mr-1": "paragon__mr-1", "mx-1": "paragon__mx-1", "mb-1": "paragon__mb-1", "ml-1": "paragon__ml-1", "m-2": "paragon__m-2", "mt-2": "paragon__mt-2", "my-2": "paragon__my-2", "mr-2": "paragon__mr-2", "mx-2": "paragon__mx-2", "mb-2": "paragon__mb-2", "ml-2": "paragon__ml-2", "m-3": "paragon__m-3", "mt-3": "paragon__mt-3", "my-3": "paragon__my-3", "mr-3": "paragon__mr-3", "mx-3": "paragon__mx-3", "mb-3": "paragon__mb-3", "ml-3": "paragon__ml-3", "m-4": "paragon__m-4", "mt-4": "paragon__mt-4", "my-4": "paragon__my-4", "mr-4": "paragon__mr-4", "mx-4": "paragon__mx-4", "mb-4": "paragon__mb-4", "ml-4": "paragon__ml-4", "m-5": "paragon__m-5", "mt-5": "paragon__mt-5", "my-5": "paragon__my-5", "mr-5": "paragon__mr-5", "mx-5": "paragon__mx-5", "mb-5": "paragon__mb-5", "ml-5": "paragon__ml-5", "p-0": "paragon__p-0", "pt-0": "paragon__pt-0", "py-0": "paragon__py-0", "pr-0": "paragon__pr-0", "px-0": "paragon__px-0", "pb-0": "paragon__pb-0", "pl-0": "paragon__pl-0", "p-1": "paragon__p-1", "pt-1": "paragon__pt-1", "py-1": "paragon__py-1", "pr-1": "paragon__pr-1", "px-1": "paragon__px-1", "pb-1": "paragon__pb-1", "pl-1": "paragon__pl-1", "p-2": "paragon__p-2", "pt-2": "paragon__pt-2", "py-2": "paragon__py-2", "pr-2": "paragon__pr-2", "px-2": "paragon__px-2", "pb-2": "paragon__pb-2", "pl-2": "paragon__pl-2", "p-3": "paragon__p-3", "pt-3": "paragon__pt-3", "py-3": "paragon__py-3", "pr-3": "paragon__pr-3", "px-3": "paragon__px-3", "pb-3": "paragon__pb-3", "pl-3": "paragon__pl-3", "p-4": "paragon__p-4", "pt-4": "paragon__pt-4", "py-4": "paragon__py-4", "pr-4": "paragon__pr-4", "px-4": "paragon__px-4", "pb-4": "paragon__pb-4", "pl-4": "paragon__pl-4", "p-5": "paragon__p-5", "pt-5": "paragon__pt-5", "py-5": "paragon__py-5", "pr-5": "paragon__pr-5", "px-5": "paragon__px-5", "pb-5": "paragon__pb-5", "pl-5": "paragon__pl-5", "m-auto": "paragon__m-auto", "mt-auto": "paragon__mt-auto", "my-auto": "paragon__my-auto", "mr-auto": "paragon__mr-auto", "mx-auto": "paragon__mx-auto", "mb-auto": "paragon__mb-auto", "ml-auto": "paragon__ml-auto", "m-sm-0": "paragon__m-sm-0", "mt-sm-0": "paragon__mt-sm-0", "my-sm-0": "paragon__my-sm-0", "mr-sm-0": "paragon__mr-sm-0", "mx-sm-0": "paragon__mx-sm-0", "mb-sm-0": "paragon__mb-sm-0", "ml-sm-0": "paragon__ml-sm-0", "m-sm-1": "paragon__m-sm-1", "mt-sm-1": "paragon__mt-sm-1", "my-sm-1": "paragon__my-sm-1", "mr-sm-1": "paragon__mr-sm-1", "mx-sm-1": "paragon__mx-sm-1", "mb-sm-1": "paragon__mb-sm-1", "ml-sm-1": "paragon__ml-sm-1", "m-sm-2": "paragon__m-sm-2", "mt-sm-2": "paragon__mt-sm-2", "my-sm-2": "paragon__my-sm-2", "mr-sm-2": "paragon__mr-sm-2", "mx-sm-2": "paragon__mx-sm-2", "mb-sm-2": "paragon__mb-sm-2", "ml-sm-2": "paragon__ml-sm-2", "m-sm-3": "paragon__m-sm-3", "mt-sm-3": "paragon__mt-sm-3", "my-sm-3": "paragon__my-sm-3", "mr-sm-3": "paragon__mr-sm-3", "mx-sm-3": "paragon__mx-sm-3", "mb-sm-3": "paragon__mb-sm-3", "ml-sm-3": "paragon__ml-sm-3", "m-sm-4": "paragon__m-sm-4", "mt-sm-4": "paragon__mt-sm-4", "my-sm-4": "paragon__my-sm-4", "mr-sm-4": "paragon__mr-sm-4", "mx-sm-4": "paragon__mx-sm-4", "mb-sm-4": "paragon__mb-sm-4", "ml-sm-4": "paragon__ml-sm-4", "m-sm-5": "paragon__m-sm-5", "mt-sm-5": "paragon__mt-sm-5", "my-sm-5": "paragon__my-sm-5", "mr-sm-5": "paragon__mr-sm-5", "mx-sm-5": "paragon__mx-sm-5", "mb-sm-5": "paragon__mb-sm-5", "ml-sm-5": "paragon__ml-sm-5", "p-sm-0": "paragon__p-sm-0", "pt-sm-0": "paragon__pt-sm-0", "py-sm-0": "paragon__py-sm-0", "pr-sm-0": "paragon__pr-sm-0", "px-sm-0": "paragon__px-sm-0", "pb-sm-0": "paragon__pb-sm-0", "pl-sm-0": "paragon__pl-sm-0", "p-sm-1": "paragon__p-sm-1", "pt-sm-1": "paragon__pt-sm-1", "py-sm-1": "paragon__py-sm-1", "pr-sm-1": "paragon__pr-sm-1", "px-sm-1": "paragon__px-sm-1", "pb-sm-1": "paragon__pb-sm-1", "pl-sm-1": "paragon__pl-sm-1", "p-sm-2": "paragon__p-sm-2", "pt-sm-2": "paragon__pt-sm-2", "py-sm-2": "paragon__py-sm-2", "pr-sm-2": "paragon__pr-sm-2", "px-sm-2": "paragon__px-sm-2", "pb-sm-2": "paragon__pb-sm-2", "pl-sm-2": "paragon__pl-sm-2", "p-sm-3": "paragon__p-sm-3", "pt-sm-3": "paragon__pt-sm-3", "py-sm-3": "paragon__py-sm-3", "pr-sm-3": "paragon__pr-sm-3", "px-sm-3": "paragon__px-sm-3", "pb-sm-3": "paragon__pb-sm-3", "pl-sm-3": "paragon__pl-sm-3", "p-sm-4": "paragon__p-sm-4", "pt-sm-4": "paragon__pt-sm-4", "py-sm-4": "paragon__py-sm-4", "pr-sm-4": "paragon__pr-sm-4", "px-sm-4": "paragon__px-sm-4", "pb-sm-4": "paragon__pb-sm-4", "pl-sm-4": "paragon__pl-sm-4", "p-sm-5": "paragon__p-sm-5", "pt-sm-5": "paragon__pt-sm-5", "py-sm-5": "paragon__py-sm-5", "pr-sm-5": "paragon__pr-sm-5", "px-sm-5": "paragon__px-sm-5", "pb-sm-5": "paragon__pb-sm-5", "pl-sm-5": "paragon__pl-sm-5", "m-sm-auto": "paragon__m-sm-auto", "mt-sm-auto": "paragon__mt-sm-auto", "my-sm-auto": "paragon__my-sm-auto", "mr-sm-auto": "paragon__mr-sm-auto", "mx-sm-auto": "paragon__mx-sm-auto", "mb-sm-auto": "paragon__mb-sm-auto", "ml-sm-auto": "paragon__ml-sm-auto", "m-md-0": "paragon__m-md-0", "mt-md-0": "paragon__mt-md-0", "my-md-0": "paragon__my-md-0", "mr-md-0": "paragon__mr-md-0", "mx-md-0": "paragon__mx-md-0", "mb-md-0": "paragon__mb-md-0", "ml-md-0": "paragon__ml-md-0", "m-md-1": "paragon__m-md-1", "mt-md-1": "paragon__mt-md-1", "my-md-1": "paragon__my-md-1", "mr-md-1": "paragon__mr-md-1", "mx-md-1": "paragon__mx-md-1", "mb-md-1": "paragon__mb-md-1", "ml-md-1": "paragon__ml-md-1", "m-md-2": "paragon__m-md-2", "mt-md-2": "paragon__mt-md-2", "my-md-2": "paragon__my-md-2", "mr-md-2": "paragon__mr-md-2", "mx-md-2": "paragon__mx-md-2", "mb-md-2": "paragon__mb-md-2", "ml-md-2": "paragon__ml-md-2", "m-md-3": "paragon__m-md-3", "mt-md-3": "paragon__mt-md-3", "my-md-3": "paragon__my-md-3", "mr-md-3": "paragon__mr-md-3", "mx-md-3": "paragon__mx-md-3", "mb-md-3": "paragon__mb-md-3", "ml-md-3": "paragon__ml-md-3", "m-md-4": "paragon__m-md-4", "mt-md-4": "paragon__mt-md-4", "my-md-4": "paragon__my-md-4", "mr-md-4": "paragon__mr-md-4", "mx-md-4": "paragon__mx-md-4", "mb-md-4": "paragon__mb-md-4", "ml-md-4": "paragon__ml-md-4", "m-md-5": "paragon__m-md-5", "mt-md-5": "paragon__mt-md-5", "my-md-5": "paragon__my-md-5", "mr-md-5": "paragon__mr-md-5", "mx-md-5": "paragon__mx-md-5", "mb-md-5": "paragon__mb-md-5", "ml-md-5": "paragon__ml-md-5", "p-md-0": "paragon__p-md-0", "pt-md-0": "paragon__pt-md-0", "py-md-0": "paragon__py-md-0", "pr-md-0": "paragon__pr-md-0", "px-md-0": "paragon__px-md-0", "pb-md-0": "paragon__pb-md-0", "pl-md-0": "paragon__pl-md-0", "p-md-1": "paragon__p-md-1", "pt-md-1": "paragon__pt-md-1", "py-md-1": "paragon__py-md-1", "pr-md-1": "paragon__pr-md-1", "px-md-1": "paragon__px-md-1", "pb-md-1": "paragon__pb-md-1", "pl-md-1": "paragon__pl-md-1", "p-md-2": "paragon__p-md-2", "pt-md-2": "paragon__pt-md-2", "py-md-2": "paragon__py-md-2", "pr-md-2": "paragon__pr-md-2", "px-md-2": "paragon__px-md-2", "pb-md-2": "paragon__pb-md-2", "pl-md-2": "paragon__pl-md-2", "p-md-3": "paragon__p-md-3", "pt-md-3": "paragon__pt-md-3", "py-md-3": "paragon__py-md-3", "pr-md-3": "paragon__pr-md-3", "px-md-3": "paragon__px-md-3", "pb-md-3": "paragon__pb-md-3", "pl-md-3": "paragon__pl-md-3", "p-md-4": "paragon__p-md-4", "pt-md-4": "paragon__pt-md-4", "py-md-4": "paragon__py-md-4", "pr-md-4": "paragon__pr-md-4", "px-md-4": "paragon__px-md-4", "pb-md-4": "paragon__pb-md-4", "pl-md-4": "paragon__pl-md-4", "p-md-5": "paragon__p-md-5", "pt-md-5": "paragon__pt-md-5", "py-md-5": "paragon__py-md-5", "pr-md-5": "paragon__pr-md-5", "px-md-5": "paragon__px-md-5", "pb-md-5": "paragon__pb-md-5", "pl-md-5": "paragon__pl-md-5", "m-md-auto": "paragon__m-md-auto", "mt-md-auto": "paragon__mt-md-auto", "my-md-auto": "paragon__my-md-auto", "mr-md-auto": "paragon__mr-md-auto", "mx-md-auto": "paragon__mx-md-auto", "mb-md-auto": "paragon__mb-md-auto", "ml-md-auto": "paragon__ml-md-auto", "m-lg-0": "paragon__m-lg-0", "mt-lg-0": "paragon__mt-lg-0", "my-lg-0": "paragon__my-lg-0", "mr-lg-0": "paragon__mr-lg-0", "mx-lg-0": "paragon__mx-lg-0", "mb-lg-0": "paragon__mb-lg-0", "ml-lg-0": "paragon__ml-lg-0", "m-lg-1": "paragon__m-lg-1", "mt-lg-1": "paragon__mt-lg-1", "my-lg-1": "paragon__my-lg-1", "mr-lg-1": "paragon__mr-lg-1", "mx-lg-1": "paragon__mx-lg-1", "mb-lg-1": "paragon__mb-lg-1", "ml-lg-1": "paragon__ml-lg-1", "m-lg-2": "paragon__m-lg-2", "mt-lg-2": "paragon__mt-lg-2", "my-lg-2": "paragon__my-lg-2", "mr-lg-2": "paragon__mr-lg-2", "mx-lg-2": "paragon__mx-lg-2", "mb-lg-2": "paragon__mb-lg-2", "ml-lg-2": "paragon__ml-lg-2", "m-lg-3": "paragon__m-lg-3", "mt-lg-3": "paragon__mt-lg-3", "my-lg-3": "paragon__my-lg-3", "mr-lg-3": "paragon__mr-lg-3", "mx-lg-3": "paragon__mx-lg-3", "mb-lg-3": "paragon__mb-lg-3", "ml-lg-3": "paragon__ml-lg-3", "m-lg-4": "paragon__m-lg-4", "mt-lg-4": "paragon__mt-lg-4", "my-lg-4": "paragon__my-lg-4", "mr-lg-4": "paragon__mr-lg-4", "mx-lg-4": "paragon__mx-lg-4", "mb-lg-4": "paragon__mb-lg-4", "ml-lg-4": "paragon__ml-lg-4", "m-lg-5": "paragon__m-lg-5", "mt-lg-5": "paragon__mt-lg-5", "my-lg-5": "paragon__my-lg-5", "mr-lg-5": "paragon__mr-lg-5", "mx-lg-5": "paragon__mx-lg-5", "mb-lg-5": "paragon__mb-lg-5", "ml-lg-5": "paragon__ml-lg-5", "p-lg-0": "paragon__p-lg-0", "pt-lg-0": "paragon__pt-lg-0", "py-lg-0": "paragon__py-lg-0", "pr-lg-0": "paragon__pr-lg-0", "px-lg-0": "paragon__px-lg-0", "pb-lg-0": "paragon__pb-lg-0", "pl-lg-0": "paragon__pl-lg-0", "p-lg-1": "paragon__p-lg-1", "pt-lg-1": "paragon__pt-lg-1", "py-lg-1": "paragon__py-lg-1", "pr-lg-1": "paragon__pr-lg-1", "px-lg-1": "paragon__px-lg-1", "pb-lg-1": "paragon__pb-lg-1", "pl-lg-1": "paragon__pl-lg-1", "p-lg-2": "paragon__p-lg-2", "pt-lg-2": "paragon__pt-lg-2", "py-lg-2": "paragon__py-lg-2", "pr-lg-2": "paragon__pr-lg-2", "px-lg-2": "paragon__px-lg-2", "pb-lg-2": "paragon__pb-lg-2", "pl-lg-2": "paragon__pl-lg-2", "p-lg-3": "paragon__p-lg-3", "pt-lg-3": "paragon__pt-lg-3", "py-lg-3": "paragon__py-lg-3", "pr-lg-3": "paragon__pr-lg-3", "px-lg-3": "paragon__px-lg-3", "pb-lg-3": "paragon__pb-lg-3", "pl-lg-3": "paragon__pl-lg-3", "p-lg-4": "paragon__p-lg-4", "pt-lg-4": "paragon__pt-lg-4", "py-lg-4": "paragon__py-lg-4", "pr-lg-4": "paragon__pr-lg-4", "px-lg-4": "paragon__px-lg-4", "pb-lg-4": "paragon__pb-lg-4", "pl-lg-4": "paragon__pl-lg-4", "p-lg-5": "paragon__p-lg-5", "pt-lg-5": "paragon__pt-lg-5", "py-lg-5": "paragon__py-lg-5", "pr-lg-5": "paragon__pr-lg-5", "px-lg-5": "paragon__px-lg-5", "pb-lg-5": "paragon__pb-lg-5", "pl-lg-5": "paragon__pl-lg-5", "m-lg-auto": "paragon__m-lg-auto", "mt-lg-auto": "paragon__mt-lg-auto", "my-lg-auto": "paragon__my-lg-auto", "mr-lg-auto": "paragon__mr-lg-auto", "mx-lg-auto": "paragon__mx-lg-auto", "mb-lg-auto": "paragon__mb-lg-auto", "ml-lg-auto": "paragon__ml-lg-auto", "m-xl-0": "paragon__m-xl-0", "mt-xl-0": "paragon__mt-xl-0", "my-xl-0": "paragon__my-xl-0", "mr-xl-0": "paragon__mr-xl-0", "mx-xl-0": "paragon__mx-xl-0", "mb-xl-0": "paragon__mb-xl-0", "ml-xl-0": "paragon__ml-xl-0", "m-xl-1": "paragon__m-xl-1", "mt-xl-1": "paragon__mt-xl-1", "my-xl-1": "paragon__my-xl-1", "mr-xl-1": "paragon__mr-xl-1", "mx-xl-1": "paragon__mx-xl-1", "mb-xl-1": "paragon__mb-xl-1", "ml-xl-1": "paragon__ml-xl-1", "m-xl-2": "paragon__m-xl-2", "mt-xl-2": "paragon__mt-xl-2", "my-xl-2": "paragon__my-xl-2", "mr-xl-2": "paragon__mr-xl-2", "mx-xl-2": "paragon__mx-xl-2", "mb-xl-2": "paragon__mb-xl-2", "ml-xl-2": "paragon__ml-xl-2", "m-xl-3": "paragon__m-xl-3", "mt-xl-3": "paragon__mt-xl-3", "my-xl-3": "paragon__my-xl-3", "mr-xl-3": "paragon__mr-xl-3", "mx-xl-3": "paragon__mx-xl-3", "mb-xl-3": "paragon__mb-xl-3", "ml-xl-3": "paragon__ml-xl-3", "m-xl-4": "paragon__m-xl-4", "mt-xl-4": "paragon__mt-xl-4", "my-xl-4": "paragon__my-xl-4", "mr-xl-4": "paragon__mr-xl-4", "mx-xl-4": "paragon__mx-xl-4", "mb-xl-4": "paragon__mb-xl-4", "ml-xl-4": "paragon__ml-xl-4", "m-xl-5": "paragon__m-xl-5", "mt-xl-5": "paragon__mt-xl-5", "my-xl-5": "paragon__my-xl-5", "mr-xl-5": "paragon__mr-xl-5", "mx-xl-5": "paragon__mx-xl-5", "mb-xl-5": "paragon__mb-xl-5", "ml-xl-5": "paragon__ml-xl-5", "p-xl-0": "paragon__p-xl-0", "pt-xl-0": "paragon__pt-xl-0", "py-xl-0": "paragon__py-xl-0", "pr-xl-0": "paragon__pr-xl-0", "px-xl-0": "paragon__px-xl-0", "pb-xl-0": "paragon__pb-xl-0", "pl-xl-0": "paragon__pl-xl-0", "p-xl-1": "paragon__p-xl-1", "pt-xl-1": "paragon__pt-xl-1", "py-xl-1": "paragon__py-xl-1", "pr-xl-1": "paragon__pr-xl-1", "px-xl-1": "paragon__px-xl-1", "pb-xl-1": "paragon__pb-xl-1", "pl-xl-1": "paragon__pl-xl-1", "p-xl-2": "paragon__p-xl-2", "pt-xl-2": "paragon__pt-xl-2", "py-xl-2": "paragon__py-xl-2", "pr-xl-2": "paragon__pr-xl-2", "px-xl-2": "paragon__px-xl-2", "pb-xl-2": "paragon__pb-xl-2", "pl-xl-2": "paragon__pl-xl-2", "p-xl-3": "paragon__p-xl-3", "pt-xl-3": "paragon__pt-xl-3", "py-xl-3": "paragon__py-xl-3", "pr-xl-3": "paragon__pr-xl-3", "px-xl-3": "paragon__px-xl-3", "pb-xl-3": "paragon__pb-xl-3", "pl-xl-3": "paragon__pl-xl-3", "p-xl-4": "paragon__p-xl-4", "pt-xl-4": "paragon__pt-xl-4", "py-xl-4": "paragon__py-xl-4", "pr-xl-4": "paragon__pr-xl-4", "px-xl-4": "paragon__px-xl-4", "pb-xl-4": "paragon__pb-xl-4", "pl-xl-4": "paragon__pl-xl-4", "p-xl-5": "paragon__p-xl-5", "pt-xl-5": "paragon__pt-xl-5", "py-xl-5": "paragon__py-xl-5", "pr-xl-5": "paragon__pr-xl-5", "px-xl-5": "paragon__px-xl-5", "pb-xl-5": "paragon__pb-xl-5", "pl-xl-5": "paragon__pl-xl-5", "m-xl-auto": "paragon__m-xl-auto", "mt-xl-auto": "paragon__mt-xl-auto", "my-xl-auto": "paragon__my-xl-auto", "mr-xl-auto": "paragon__mr-xl-auto", "mx-xl-auto": "paragon__mx-xl-auto", "mb-xl-auto": "paragon__mb-xl-auto", "ml-xl-auto": "paragon__ml-xl-auto", "text-justify": "paragon__text-justify", "text-nowrap": "paragon__text-nowrap", "text-truncate": "paragon__text-truncate", "text-left": "paragon__text-left", "text-right": "paragon__text-right", "text-center": "paragon__text-center", "text-sm-left": "paragon__text-sm-left", "text-sm-right": "paragon__text-sm-right", "text-sm-center": "paragon__text-sm-center", "text-md-left": "paragon__text-md-left", "text-md-right": "paragon__text-md-right", "text-md-center": "paragon__text-md-center", "text-lg-left": "paragon__text-lg-left", "text-lg-right": "paragon__text-lg-right", "text-lg-center": "paragon__text-lg-center", "text-xl-left": "paragon__text-xl-left", "text-xl-right": "paragon__text-xl-right", "text-xl-center": "paragon__text-xl-center", "text-lowercase": "paragon__text-lowercase", "text-uppercase": "paragon__text-uppercase", "text-capitalize": "paragon__text-capitalize", "font-weight-light": "paragon__font-weight-light", "font-weight-normal": "paragon__font-weight-normal", "font-weight-bold": "paragon__font-weight-bold", "font-italic": "paragon__font-italic", "text-white": "paragon__text-white", "text-primary": "paragon__text-primary", "text-secondary": "paragon__text-secondary", "text-success": "paragon__text-success", "text-info": "paragon__text-info", "text-warning": "paragon__text-warning", "text-danger": "paragon__text-danger", "text-light": "paragon__text-light", "text-dark": "paragon__text-dark", "text-inverse": "paragon__text-inverse", "text-disabled": "paragon__text-disabled", "text-purchase": "paragon__text-purchase", "text-lightest": "paragon__text-lightest", "text-darker": "paragon__text-darker", "text-darkest": "paragon__text-darkest", "text-muted": "paragon__text-muted", "text-hide": "paragon__text-hide", visible: "paragon__visible", invisible: "paragon__invisible" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.RadioButton = e.default = void 0;var n = Object.assign || function (a) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (a[n] = r[n]);
        }
      }return a;
    },
        o = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        t = _(r(0)),
        l = _(r(1)),
        p = _(r(14));function _(a) {
      return a && a.__esModule ? a : { default: a };
    }function g(a, e) {
      var r = {};for (var n in a) {
        e.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
      }return r;
    }function f(a, e) {
      if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
    }function s(a, e) {
      if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
    }function i(a, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
    }var m = function (a) {
      function e(a) {
        f(this, e);var r = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a)),
            n = a.onBlur,
            o = a.onClick,
            t = a.onFocus,
            l = a.onKeyDown;return r.onBlur = n.bind(r), r.onClick = o.bind(r), r.onFocus = t.bind(r), r.onKeyDown = l.bind(r), r;
      }return i(e, t.default.PureComponent), o(e, [{ key: "render", value: function value() {
          var a = this.props,
              e = a.children,
              r = a.index,
              o = a.isChecked,
              l = a.name,
              p = a.value,
              _ = g(a, ["children", "index", "isChecked", "name", "value"]);return t.default.createElement("div", null, t.default.createElement("input", n({ type: "radio", name: l, "aria-checked": o, defaultChecked: o, value: p, "aria-label": e, "data-index": r, onBlur: this.onBlur, onClick: this.onClick, onFocus: this.onFocus, onKeyDown: this.onKeyDown }, _)), e);
        } }]), e;
    }(),
        u = function (a) {
      function e(a) {
        f(this, e);var r = s(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));return r.renderChildren = r.renderChildren.bind(r), r.onChange = r.onChange.bind(r), r.state = { selectedIndex: a.selectedIndex }, r;
      }return i(e, t.default.Component), o(e, [{ key: "onChange", value: function value(a) {
          a.target.checked && a.target.hasAttribute("data-index") && this.setState({ selectedIndex: parseInt(a.target.getAttribute("data-index"), 10) }), this.props.onChange(a);
        } }, { key: "renderChildren", value: function value() {
          var a = this,
              e = this.props,
              r = e.children,
              n = e.name,
              o = e.onBlur,
              l = e.onClick,
              p = e.onFocus,
              _ = e.onKeyDown;return t.default.Children.map(r, function (e, r) {
            return t.default.cloneElement(e, { name: n, value: e.props.value, isChecked: r === a.state.selectedIndex, onBlur: o, onClick: l, onFocus: p, onKeyDown: _, index: r });
          });
        } }, { key: "render", value: function value() {
          var a = this.props,
              e = (a.children, a.label),
              r = (a.name, a.onBlur, a.onChange, a.onClick, a.onFocus, a.onKeyDown, a.selectedIndex, g(a, ["children", "label", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "selectedIndex"]));return t.default.createElement("div", n({ role: "radiogroup", "aria-label": e, onChange: this.onChange, tabIndex: -1 }, r), this.renderChildren());
        } }]), e;
    }();m.defaultProps = { children: void 0, index: void 0, isChecked: !1, name: void 0, onBlur: function onBlur() {}, onClick: function onClick() {}, onFocus: function onFocus() {}, onKeyDown: function onKeyDown() {} }, m.propTypes = { children: l.default.oneOfType([l.default.string, l.default.number, l.default.bool]), index: l.default.number, isChecked: l.default.bool, name: l.default.string, onBlur: l.default.func, onClick: l.default.func, onFocus: l.default.func, onKeyDown: l.default.func, value: l.default.oneOfType([l.default.string, l.default.number, l.default.bool]).isRequired }, u.defaultProps = { onBlur: function onBlur() {}, onChange: function onChange() {}, onClick: function onClick() {}, onFocus: function onFocus() {}, onKeyDown: function onKeyDown() {}, selectedIndex: void 0 }, u.propTypes = { children: l.default.arrayOf(p.default.elementOfType(m)).isRequired, label: l.default.string.isRequired, name: l.default.string.isRequired, onBlur: l.default.func, onChange: l.default.func, onClick: l.default.func, onFocus: l.default.func, onKeyDown: l.default.func, selectedIndex: l.default.number }, e.default = u, e.RadioButton = m;
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        o = f(r(0)),
        t = f(r(2)),
        l = f(r(1)),
        p = f(r(8)),
        _ = f(r(46)),
        g = f(r(5));function f(a) {
      return a && a.__esModule ? a : { default: a };
    }function s(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var i = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.close = r.close.bind(r), r.handleKeyDown = r.handleKeyDown.bind(r), r.renderDialog = r.renderDialog.bind(r), r.state = { open: a.open }, r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, o.default.Component), n(e, [{ key: "componentDidMount", value: function value() {
          this.xButton && this.xButton.focus();
        } }, { key: "componentWillReceiveProps", value: function value(a) {
          a.open !== this.props.open && this.setState({ open: a.open });
        } }, { key: "componentDidUpdate", value: function value(a) {
          this.state.open && !a.open && this.xButton && this.xButton.focus();
        } }, { key: "focus", value: function value() {
          this.xButton.focus();
        } }, { key: "close", value: function value() {
          this.setState({ open: !1 }), this.props.onClose();
        } }, { key: "handleKeyDown", value: function value(a) {
          "Enter" !== a.key && "Escape" !== a.key || (a.preventDefault(), this.close());
        } }, { key: "renderDialog", value: function value() {
          var a = this.props.dialog;return o.default.createElement("div", { className: "alert-dialog" }, a);
        } }, { key: "renderDismissible", value: function value() {
          var a = this,
              e = this.props,
              r = e.closeButtonAriaLabel;return e.dismissible ? o.default.createElement(g.default, { "aria-label": r, inputRef: function inputRef(e) {
              a.xButton = e;
            }, onClick: this.close, onKeyDown: this.handleKeyDown, label: o.default.createElement("span", { "aria-hidden": "true" }, "×"), isClose: !0 }) : null;
        } }, { key: "render", value: function value() {
          var a = this.props,
              e = a.alertType,
              r = a.className,
              n = a.dismissible;return o.default.createElement("div", { className: (0, t.default)([].concat(function (a) {
              if (Array.isArray(a)) {
                for (var e = 0, r = Array(a.length); e < a.length; e++) {
                  r[e] = a[e];
                }return r;
              }return Array.from(a);
            }(r), [_.default.alert, _.default.fade]), s({}, _.default["alert-dismissible"], n), s({}, _.default["alert-" + e], void 0 !== e), s({}, _.default.show, this.state.open)), role: "alert", hidden: !this.state.open }, this.renderDismissible(), this.renderDialog());
        } }]), e;
    }();i.propTypes = { alertType: l.default.string, className: l.default.arrayOf(l.default.string), dialog: l.default.oneOfType([l.default.string, l.default.element]).isRequired, dismissible: l.default.bool, closeButtonAriaLabel: l.default.string, onClose: (0, p.default)(l.default.func, function (a) {
        return a.dismissible;
      }), open: l.default.bool }, i.defaultProps = { alertType: "warning", className: [], closeButtonAriaLabel: "Close", dismissible: !0, open: !1 }, e.default = i;
  }, function (a, e) {
    a.exports = { alert: "paragon__alert", "alert-heading": "paragon__alert-heading", "alert-link": "paragon__alert-link", "alert-dismissible": "paragon__alert-dismissible", close: "paragon__close", "alert-primary": "paragon__alert-primary", "alert-secondary": "paragon__alert-secondary", "alert-success": "paragon__alert-success", "alert-info": "paragon__alert-info", "alert-warning": "paragon__alert-warning", "alert-danger": "paragon__alert-danger", "alert-light": "paragon__alert-light", "alert-dark": "paragon__alert-dark", "alert-inverse": "paragon__alert-inverse", "alert-disabled": "paragon__alert-disabled", "alert-purchase": "paragon__alert-purchase", "alert-lightest": "paragon__alert-lightest", "alert-darker": "paragon__alert-darker", "alert-darkest": "paragon__alert-darkest", btn: "paragon__btn", focus: "paragon__focus", disabled: "paragon__disabled", active: "paragon__active", "btn-primary": "paragon__btn-primary", show: "paragon__show", "dropdown-toggle": "paragon__dropdown-toggle", "btn-secondary": "paragon__btn-secondary", "btn-success": "paragon__btn-success", "btn-info": "paragon__btn-info", "btn-warning": "paragon__btn-warning", "btn-danger": "paragon__btn-danger", "btn-light": "paragon__btn-light", "btn-dark": "paragon__btn-dark", "btn-inverse": "paragon__btn-inverse", "btn-disabled": "paragon__btn-disabled", "btn-purchase": "paragon__btn-purchase", "btn-lightest": "paragon__btn-lightest", "btn-darker": "paragon__btn-darker", "btn-darkest": "paragon__btn-darkest", "btn-outline-primary": "paragon__btn-outline-primary", "btn-outline-secondary": "paragon__btn-outline-secondary", "btn-outline-success": "paragon__btn-outline-success", "btn-outline-info": "paragon__btn-outline-info", "btn-outline-warning": "paragon__btn-outline-warning", "btn-outline-danger": "paragon__btn-outline-danger", "btn-outline-light": "paragon__btn-outline-light", "btn-outline-dark": "paragon__btn-outline-dark", "btn-outline-inverse": "paragon__btn-outline-inverse", "btn-outline-disabled": "paragon__btn-outline-disabled", "btn-outline-purchase": "paragon__btn-outline-purchase", "btn-outline-lightest": "paragon__btn-outline-lightest", "btn-outline-darker": "paragon__btn-outline-darker", "btn-outline-darkest": "paragon__btn-outline-darkest", "btn-link": "paragon__btn-link", "btn-lg": "paragon__btn-lg", "btn-sm": "paragon__btn-sm", "btn-block": "paragon__btn-block", fade: "paragon__fade", collapse: "paragon__collapse", collapsing: "paragon__collapsing" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        o = s(r(0)),
        t = s(r(2)),
        l = s(r(6)),
        p = s(r(8)),
        _ = s(r(1)),
        g = s(r(48)),
        f = s(r(5));function s(a) {
      return a && a.__esModule ? a : { default: a };
    }function i(a) {
      if (Array.isArray(a)) {
        for (var e = 0, r = Array(a.length); e < a.length; e++) {
          r[e] = a[e];
        }return r;
      }return Array.from(a);
    }var m = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.state = { sortedColumn: a.tableSortable ? r.props.defaultSortedColumn : "", sortDirection: a.tableSortable ? r.props.defaultSortDirection : "" }, r.onSortClick = r.onSortClick.bind(r), r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, o.default.Component), n(e, [{ key: "onSortClick", value: function value(a) {
          var e = "desc";this.state.sortedColumn === a && (e = "desc" === this.state.sortDirection ? "asc" : "desc"), this.setState({ sortedColumn: a, sortDirection: e }), this.props.columns.find(function (e) {
            return a === e.key;
          }).onSort(e);
        } }, { key: "getCaption", value: function value() {
          return this.props.caption && o.default.createElement("caption", null, this.props.caption);
        } }, { key: "getSortButtonScreenReaderText", value: function value(a) {
          return this.state.sortedColumn === a ? this.props.sortButtonsScreenReaderText[this.state.sortDirection] : this.props.sortButtonsScreenReaderText.defaultText;
        } }, { key: "getSortIcon", value: function value(a) {
          var e = ["fa-sort", a].filter(function (a) {
            return a;
          }).join("-");return o.default.createElement("span", { className: (0, t.default)(l.default.fa, l.default[e]), "aria-hidden": !0 });
        } }, { key: "getTableHeading", value: function value(a) {
          var e = this;return this.props.tableSortable && a.columnSortable ? o.default.createElement(f.default, { className: [g.default["btn-header"]], label: o.default.createElement("span", null, a.label, o.default.createElement("span", { className: (0, t.default)(g.default["sr-only"]) }, " ", this.getSortButtonScreenReaderText(a.key)), " ", this.getSortIcon(a.key === this.state.sortedColumn ? this.state.sortDirection : "")), onClick: function onClick() {
              return e.onSortClick(a.key);
            } }) : a.hideHeader ? o.default.createElement("span", { className: (0, t.default)(g.default["sr-only"]) }, a.label) : a.label;
        } }, { key: "getHeadings", value: function value() {
          var a = this;return o.default.createElement("thead", { className: t.default.apply(void 0, i(this.props.headingClassName.map(function (a) {
              return g.default[a];
            })).concat([{ "d-inline": this.props.hasFixedColumnWidths }])) }, o.default.createElement("tr", { className: (0, t.default)({ "d-flex": this.props.hasFixedColumnWidths }) }, this.props.columns.map(function (e) {
            return o.default.createElement("th", { className: (0, t.default)({ sortable: a.props.tableSortable && e.columnSortable }, a.props.hasFixedColumnWidths ? e.width : null), key: e.key, scope: "col" }, a.getTableHeading(e));
          })));
        } }, { key: "getBody", value: function value() {
          var a = this;return o.default.createElement("tbody", { className: (0, t.default)({ "d-inline": this.props.hasFixedColumnWidths }) }, this.props.data.map(function (e, r) {
            return o.default.createElement("tr", { key: r, className: (0, t.default)({ "d-flex": a.props.hasFixedColumnWidths }) }, a.props.columns.map(function (r) {
              var n = r.key,
                  l = r.width;return o.default.createElement("td", { key: n, className: (0, t.default)(a.props.hasFixedColumnWidths ? l : null) }, e[n]);
            }));
          }));
        } }, { key: "render", value: function value() {
          return o.default.createElement("table", { className: t.default.apply(void 0, [g.default.table].concat(i(this.props.className.map(function (a) {
              return g.default[a];
            })))) }, this.getCaption(), this.getHeadings(), this.getBody());
        } }]), e;
    }();m.propTypes = { caption: _.default.oneOfType([_.default.string, _.default.element]), className: _.default.arrayOf(_.default.string), data: _.default.arrayOf(_.default.object).isRequired, columns: _.default.arrayOf(_.default.shape({ key: _.default.string.isRequired, label: _.default.oneOfType([_.default.string, _.default.element]).isRequired, columnSortable: (0, p.default)(_.default.bool, function (a) {
          return a.tableSortable;
        }), onSort: (0, p.default)(_.default.func, function (a) {
          return a.columnSortable;
        }), hideHeader: _.default.bool, width: (0, p.default)(_.default.string, function (a) {
          return a.hasFixedColumnWidths;
        }) })).isRequired, headingClassName: _.default.arrayOf(_.default.string), tableSortable: _.default.bool, hasFixedColumnWidths: _.default.bool, defaultSortedColumn: (0, p.default)(_.default.string, function (a) {
        return a.tableSortable;
      }), defaultSortDirection: (0, p.default)(_.default.string, function (a) {
        return a.tableSortable;
      }), sortButtonsScreenReaderText: (0, p.default)(_.default.shape({ asc: _.default.string, desc: _.default.string, defaultText: _.default.string }), function (a) {
        return a.tableSortable;
      }) }, m.defaultProps = { caption: null, className: [], headingClassName: [], tableSortable: !1, hasFixedColumnWidths: !1, sortButtonsScreenReaderText: { asc: "sort ascending", desc: "sort descending", defaultText: "click to sort" } }, e.default = m;
  }, function (a, e) {
    a.exports = { table: "paragon__table", "table-sm": "paragon__table-sm", "table-bordered": "paragon__table-bordered", "table-striped": "paragon__table-striped", "table-hover": "paragon__table-hover", "table-primary": "paragon__table-primary", "table-secondary": "paragon__table-secondary", "table-success": "paragon__table-success", "table-info": "paragon__table-info", "table-warning": "paragon__table-warning", "table-danger": "paragon__table-danger", "table-light": "paragon__table-light", "table-dark": "paragon__table-dark", "table-inverse": "paragon__table-inverse", "table-disabled": "paragon__table-disabled", "table-purchase": "paragon__table-purchase", "table-lightest": "paragon__table-lightest", "table-darker": "paragon__table-darker", "table-darkest": "paragon__table-darkest", "table-active": "paragon__table-active", "thead-dark": "paragon__thead-dark", "thead-light": "paragon__thead-light", "table-responsive-sm": "paragon__table-responsive-sm", "table-responsive-md": "paragon__table-responsive-md", "table-responsive-lg": "paragon__table-responsive-lg", "table-responsive-xl": "paragon__table-responsive-xl", "table-responsive": "paragon__table-responsive", "sr-only": "paragon__sr-only", "sr-only-focusable": "paragon__sr-only-focusable", "m-0": "paragon__m-0", "mt-0": "paragon__mt-0", "my-0": "paragon__my-0", "mr-0": "paragon__mr-0", "mx-0": "paragon__mx-0", "mb-0": "paragon__mb-0", "ml-0": "paragon__ml-0", "m-1": "paragon__m-1", "mt-1": "paragon__mt-1", "my-1": "paragon__my-1", "mr-1": "paragon__mr-1", "mx-1": "paragon__mx-1", "mb-1": "paragon__mb-1", "ml-1": "paragon__ml-1", "m-2": "paragon__m-2", "mt-2": "paragon__mt-2", "my-2": "paragon__my-2", "mr-2": "paragon__mr-2", "mx-2": "paragon__mx-2", "mb-2": "paragon__mb-2", "ml-2": "paragon__ml-2", "m-3": "paragon__m-3", "mt-3": "paragon__mt-3", "my-3": "paragon__my-3", "mr-3": "paragon__mr-3", "mx-3": "paragon__mx-3", "mb-3": "paragon__mb-3", "ml-3": "paragon__ml-3", "m-4": "paragon__m-4", "mt-4": "paragon__mt-4", "my-4": "paragon__my-4", "mr-4": "paragon__mr-4", "mx-4": "paragon__mx-4", "mb-4": "paragon__mb-4", "ml-4": "paragon__ml-4", "m-5": "paragon__m-5", "mt-5": "paragon__mt-5", "my-5": "paragon__my-5", "mr-5": "paragon__mr-5", "mx-5": "paragon__mx-5", "mb-5": "paragon__mb-5", "ml-5": "paragon__ml-5", "p-0": "paragon__p-0", "btn-header": "paragon__btn-header", "pt-0": "paragon__pt-0", "py-0": "paragon__py-0", "pr-0": "paragon__pr-0", "px-0": "paragon__px-0", "pb-0": "paragon__pb-0", "pl-0": "paragon__pl-0", "p-1": "paragon__p-1", "pt-1": "paragon__pt-1", "py-1": "paragon__py-1", "pr-1": "paragon__pr-1", "px-1": "paragon__px-1", "pb-1": "paragon__pb-1", "pl-1": "paragon__pl-1", "p-2": "paragon__p-2", "pt-2": "paragon__pt-2", "py-2": "paragon__py-2", "pr-2": "paragon__pr-2", "px-2": "paragon__px-2", "pb-2": "paragon__pb-2", "pl-2": "paragon__pl-2", "p-3": "paragon__p-3", "pt-3": "paragon__pt-3", "py-3": "paragon__py-3", "pr-3": "paragon__pr-3", "px-3": "paragon__px-3", "pb-3": "paragon__pb-3", "pl-3": "paragon__pl-3", "p-4": "paragon__p-4", "pt-4": "paragon__pt-4", "py-4": "paragon__py-4", "pr-4": "paragon__pr-4", "px-4": "paragon__px-4", "pb-4": "paragon__pb-4", "pl-4": "paragon__pl-4", "p-5": "paragon__p-5", "pt-5": "paragon__pt-5", "py-5": "paragon__py-5", "pr-5": "paragon__pr-5", "px-5": "paragon__px-5", "pb-5": "paragon__pb-5", "pl-5": "paragon__pl-5", "m-auto": "paragon__m-auto", "mt-auto": "paragon__mt-auto", "my-auto": "paragon__my-auto", "mr-auto": "paragon__mr-auto", "mx-auto": "paragon__mx-auto", "mb-auto": "paragon__mb-auto", "ml-auto": "paragon__ml-auto", "m-sm-0": "paragon__m-sm-0", "mt-sm-0": "paragon__mt-sm-0", "my-sm-0": "paragon__my-sm-0", "mr-sm-0": "paragon__mr-sm-0", "mx-sm-0": "paragon__mx-sm-0", "mb-sm-0": "paragon__mb-sm-0", "ml-sm-0": "paragon__ml-sm-0", "m-sm-1": "paragon__m-sm-1", "mt-sm-1": "paragon__mt-sm-1", "my-sm-1": "paragon__my-sm-1", "mr-sm-1": "paragon__mr-sm-1", "mx-sm-1": "paragon__mx-sm-1", "mb-sm-1": "paragon__mb-sm-1", "ml-sm-1": "paragon__ml-sm-1", "m-sm-2": "paragon__m-sm-2", "mt-sm-2": "paragon__mt-sm-2", "my-sm-2": "paragon__my-sm-2", "mr-sm-2": "paragon__mr-sm-2", "mx-sm-2": "paragon__mx-sm-2", "mb-sm-2": "paragon__mb-sm-2", "ml-sm-2": "paragon__ml-sm-2", "m-sm-3": "paragon__m-sm-3", "mt-sm-3": "paragon__mt-sm-3", "my-sm-3": "paragon__my-sm-3", "mr-sm-3": "paragon__mr-sm-3", "mx-sm-3": "paragon__mx-sm-3", "mb-sm-3": "paragon__mb-sm-3", "ml-sm-3": "paragon__ml-sm-3", "m-sm-4": "paragon__m-sm-4", "mt-sm-4": "paragon__mt-sm-4", "my-sm-4": "paragon__my-sm-4", "mr-sm-4": "paragon__mr-sm-4", "mx-sm-4": "paragon__mx-sm-4", "mb-sm-4": "paragon__mb-sm-4", "ml-sm-4": "paragon__ml-sm-4", "m-sm-5": "paragon__m-sm-5", "mt-sm-5": "paragon__mt-sm-5", "my-sm-5": "paragon__my-sm-5", "mr-sm-5": "paragon__mr-sm-5", "mx-sm-5": "paragon__mx-sm-5", "mb-sm-5": "paragon__mb-sm-5", "ml-sm-5": "paragon__ml-sm-5", "p-sm-0": "paragon__p-sm-0", "pt-sm-0": "paragon__pt-sm-0", "py-sm-0": "paragon__py-sm-0", "pr-sm-0": "paragon__pr-sm-0", "px-sm-0": "paragon__px-sm-0", "pb-sm-0": "paragon__pb-sm-0", "pl-sm-0": "paragon__pl-sm-0", "p-sm-1": "paragon__p-sm-1", "pt-sm-1": "paragon__pt-sm-1", "py-sm-1": "paragon__py-sm-1", "pr-sm-1": "paragon__pr-sm-1", "px-sm-1": "paragon__px-sm-1", "pb-sm-1": "paragon__pb-sm-1", "pl-sm-1": "paragon__pl-sm-1", "p-sm-2": "paragon__p-sm-2", "pt-sm-2": "paragon__pt-sm-2", "py-sm-2": "paragon__py-sm-2", "pr-sm-2": "paragon__pr-sm-2", "px-sm-2": "paragon__px-sm-2", "pb-sm-2": "paragon__pb-sm-2", "pl-sm-2": "paragon__pl-sm-2", "p-sm-3": "paragon__p-sm-3", "pt-sm-3": "paragon__pt-sm-3", "py-sm-3": "paragon__py-sm-3", "pr-sm-3": "paragon__pr-sm-3", "px-sm-3": "paragon__px-sm-3", "pb-sm-3": "paragon__pb-sm-3", "pl-sm-3": "paragon__pl-sm-3", "p-sm-4": "paragon__p-sm-4", "pt-sm-4": "paragon__pt-sm-4", "py-sm-4": "paragon__py-sm-4", "pr-sm-4": "paragon__pr-sm-4", "px-sm-4": "paragon__px-sm-4", "pb-sm-4": "paragon__pb-sm-4", "pl-sm-4": "paragon__pl-sm-4", "p-sm-5": "paragon__p-sm-5", "pt-sm-5": "paragon__pt-sm-5", "py-sm-5": "paragon__py-sm-5", "pr-sm-5": "paragon__pr-sm-5", "px-sm-5": "paragon__px-sm-5", "pb-sm-5": "paragon__pb-sm-5", "pl-sm-5": "paragon__pl-sm-5", "m-sm-auto": "paragon__m-sm-auto", "mt-sm-auto": "paragon__mt-sm-auto", "my-sm-auto": "paragon__my-sm-auto", "mr-sm-auto": "paragon__mr-sm-auto", "mx-sm-auto": "paragon__mx-sm-auto", "mb-sm-auto": "paragon__mb-sm-auto", "ml-sm-auto": "paragon__ml-sm-auto", "m-md-0": "paragon__m-md-0", "mt-md-0": "paragon__mt-md-0", "my-md-0": "paragon__my-md-0", "mr-md-0": "paragon__mr-md-0", "mx-md-0": "paragon__mx-md-0", "mb-md-0": "paragon__mb-md-0", "ml-md-0": "paragon__ml-md-0", "m-md-1": "paragon__m-md-1", "mt-md-1": "paragon__mt-md-1", "my-md-1": "paragon__my-md-1", "mr-md-1": "paragon__mr-md-1", "mx-md-1": "paragon__mx-md-1", "mb-md-1": "paragon__mb-md-1", "ml-md-1": "paragon__ml-md-1", "m-md-2": "paragon__m-md-2", "mt-md-2": "paragon__mt-md-2", "my-md-2": "paragon__my-md-2", "mr-md-2": "paragon__mr-md-2", "mx-md-2": "paragon__mx-md-2", "mb-md-2": "paragon__mb-md-2", "ml-md-2": "paragon__ml-md-2", "m-md-3": "paragon__m-md-3", "mt-md-3": "paragon__mt-md-3", "my-md-3": "paragon__my-md-3", "mr-md-3": "paragon__mr-md-3", "mx-md-3": "paragon__mx-md-3", "mb-md-3": "paragon__mb-md-3", "ml-md-3": "paragon__ml-md-3", "m-md-4": "paragon__m-md-4", "mt-md-4": "paragon__mt-md-4", "my-md-4": "paragon__my-md-4", "mr-md-4": "paragon__mr-md-4", "mx-md-4": "paragon__mx-md-4", "mb-md-4": "paragon__mb-md-4", "ml-md-4": "paragon__ml-md-4", "m-md-5": "paragon__m-md-5", "mt-md-5": "paragon__mt-md-5", "my-md-5": "paragon__my-md-5", "mr-md-5": "paragon__mr-md-5", "mx-md-5": "paragon__mx-md-5", "mb-md-5": "paragon__mb-md-5", "ml-md-5": "paragon__ml-md-5", "p-md-0": "paragon__p-md-0", "pt-md-0": "paragon__pt-md-0", "py-md-0": "paragon__py-md-0", "pr-md-0": "paragon__pr-md-0", "px-md-0": "paragon__px-md-0", "pb-md-0": "paragon__pb-md-0", "pl-md-0": "paragon__pl-md-0", "p-md-1": "paragon__p-md-1", "pt-md-1": "paragon__pt-md-1", "py-md-1": "paragon__py-md-1", "pr-md-1": "paragon__pr-md-1", "px-md-1": "paragon__px-md-1", "pb-md-1": "paragon__pb-md-1", "pl-md-1": "paragon__pl-md-1", "p-md-2": "paragon__p-md-2", "pt-md-2": "paragon__pt-md-2", "py-md-2": "paragon__py-md-2", "pr-md-2": "paragon__pr-md-2", "px-md-2": "paragon__px-md-2", "pb-md-2": "paragon__pb-md-2", "pl-md-2": "paragon__pl-md-2", "p-md-3": "paragon__p-md-3", "pt-md-3": "paragon__pt-md-3", "py-md-3": "paragon__py-md-3", "pr-md-3": "paragon__pr-md-3", "px-md-3": "paragon__px-md-3", "pb-md-3": "paragon__pb-md-3", "pl-md-3": "paragon__pl-md-3", "p-md-4": "paragon__p-md-4", "pt-md-4": "paragon__pt-md-4", "py-md-4": "paragon__py-md-4", "pr-md-4": "paragon__pr-md-4", "px-md-4": "paragon__px-md-4", "pb-md-4": "paragon__pb-md-4", "pl-md-4": "paragon__pl-md-4", "p-md-5": "paragon__p-md-5", "pt-md-5": "paragon__pt-md-5", "py-md-5": "paragon__py-md-5", "pr-md-5": "paragon__pr-md-5", "px-md-5": "paragon__px-md-5", "pb-md-5": "paragon__pb-md-5", "pl-md-5": "paragon__pl-md-5", "m-md-auto": "paragon__m-md-auto", "mt-md-auto": "paragon__mt-md-auto", "my-md-auto": "paragon__my-md-auto", "mr-md-auto": "paragon__mr-md-auto", "mx-md-auto": "paragon__mx-md-auto", "mb-md-auto": "paragon__mb-md-auto", "ml-md-auto": "paragon__ml-md-auto", "m-lg-0": "paragon__m-lg-0", "mt-lg-0": "paragon__mt-lg-0", "my-lg-0": "paragon__my-lg-0", "mr-lg-0": "paragon__mr-lg-0", "mx-lg-0": "paragon__mx-lg-0", "mb-lg-0": "paragon__mb-lg-0", "ml-lg-0": "paragon__ml-lg-0", "m-lg-1": "paragon__m-lg-1", "mt-lg-1": "paragon__mt-lg-1", "my-lg-1": "paragon__my-lg-1", "mr-lg-1": "paragon__mr-lg-1", "mx-lg-1": "paragon__mx-lg-1", "mb-lg-1": "paragon__mb-lg-1", "ml-lg-1": "paragon__ml-lg-1", "m-lg-2": "paragon__m-lg-2", "mt-lg-2": "paragon__mt-lg-2", "my-lg-2": "paragon__my-lg-2", "mr-lg-2": "paragon__mr-lg-2", "mx-lg-2": "paragon__mx-lg-2", "mb-lg-2": "paragon__mb-lg-2", "ml-lg-2": "paragon__ml-lg-2", "m-lg-3": "paragon__m-lg-3", "mt-lg-3": "paragon__mt-lg-3", "my-lg-3": "paragon__my-lg-3", "mr-lg-3": "paragon__mr-lg-3", "mx-lg-3": "paragon__mx-lg-3", "mb-lg-3": "paragon__mb-lg-3", "ml-lg-3": "paragon__ml-lg-3", "m-lg-4": "paragon__m-lg-4", "mt-lg-4": "paragon__mt-lg-4", "my-lg-4": "paragon__my-lg-4", "mr-lg-4": "paragon__mr-lg-4", "mx-lg-4": "paragon__mx-lg-4", "mb-lg-4": "paragon__mb-lg-4", "ml-lg-4": "paragon__ml-lg-4", "m-lg-5": "paragon__m-lg-5", "mt-lg-5": "paragon__mt-lg-5", "my-lg-5": "paragon__my-lg-5", "mr-lg-5": "paragon__mr-lg-5", "mx-lg-5": "paragon__mx-lg-5", "mb-lg-5": "paragon__mb-lg-5", "ml-lg-5": "paragon__ml-lg-5", "p-lg-0": "paragon__p-lg-0", "pt-lg-0": "paragon__pt-lg-0", "py-lg-0": "paragon__py-lg-0", "pr-lg-0": "paragon__pr-lg-0", "px-lg-0": "paragon__px-lg-0", "pb-lg-0": "paragon__pb-lg-0", "pl-lg-0": "paragon__pl-lg-0", "p-lg-1": "paragon__p-lg-1", "pt-lg-1": "paragon__pt-lg-1", "py-lg-1": "paragon__py-lg-1", "pr-lg-1": "paragon__pr-lg-1", "px-lg-1": "paragon__px-lg-1", "pb-lg-1": "paragon__pb-lg-1", "pl-lg-1": "paragon__pl-lg-1", "p-lg-2": "paragon__p-lg-2", "pt-lg-2": "paragon__pt-lg-2", "py-lg-2": "paragon__py-lg-2", "pr-lg-2": "paragon__pr-lg-2", "px-lg-2": "paragon__px-lg-2", "pb-lg-2": "paragon__pb-lg-2", "pl-lg-2": "paragon__pl-lg-2", "p-lg-3": "paragon__p-lg-3", "pt-lg-3": "paragon__pt-lg-3", "py-lg-3": "paragon__py-lg-3", "pr-lg-3": "paragon__pr-lg-3", "px-lg-3": "paragon__px-lg-3", "pb-lg-3": "paragon__pb-lg-3", "pl-lg-3": "paragon__pl-lg-3", "p-lg-4": "paragon__p-lg-4", "pt-lg-4": "paragon__pt-lg-4", "py-lg-4": "paragon__py-lg-4", "pr-lg-4": "paragon__pr-lg-4", "px-lg-4": "paragon__px-lg-4", "pb-lg-4": "paragon__pb-lg-4", "pl-lg-4": "paragon__pl-lg-4", "p-lg-5": "paragon__p-lg-5", "pt-lg-5": "paragon__pt-lg-5", "py-lg-5": "paragon__py-lg-5", "pr-lg-5": "paragon__pr-lg-5", "px-lg-5": "paragon__px-lg-5", "pb-lg-5": "paragon__pb-lg-5", "pl-lg-5": "paragon__pl-lg-5", "m-lg-auto": "paragon__m-lg-auto", "mt-lg-auto": "paragon__mt-lg-auto", "my-lg-auto": "paragon__my-lg-auto", "mr-lg-auto": "paragon__mr-lg-auto", "mx-lg-auto": "paragon__mx-lg-auto", "mb-lg-auto": "paragon__mb-lg-auto", "ml-lg-auto": "paragon__ml-lg-auto", "m-xl-0": "paragon__m-xl-0", "mt-xl-0": "paragon__mt-xl-0", "my-xl-0": "paragon__my-xl-0", "mr-xl-0": "paragon__mr-xl-0", "mx-xl-0": "paragon__mx-xl-0", "mb-xl-0": "paragon__mb-xl-0", "ml-xl-0": "paragon__ml-xl-0", "m-xl-1": "paragon__m-xl-1", "mt-xl-1": "paragon__mt-xl-1", "my-xl-1": "paragon__my-xl-1", "mr-xl-1": "paragon__mr-xl-1", "mx-xl-1": "paragon__mx-xl-1", "mb-xl-1": "paragon__mb-xl-1", "ml-xl-1": "paragon__ml-xl-1", "m-xl-2": "paragon__m-xl-2", "mt-xl-2": "paragon__mt-xl-2", "my-xl-2": "paragon__my-xl-2", "mr-xl-2": "paragon__mr-xl-2", "mx-xl-2": "paragon__mx-xl-2", "mb-xl-2": "paragon__mb-xl-2", "ml-xl-2": "paragon__ml-xl-2", "m-xl-3": "paragon__m-xl-3", "mt-xl-3": "paragon__mt-xl-3", "my-xl-3": "paragon__my-xl-3", "mr-xl-3": "paragon__mr-xl-3", "mx-xl-3": "paragon__mx-xl-3", "mb-xl-3": "paragon__mb-xl-3", "ml-xl-3": "paragon__ml-xl-3", "m-xl-4": "paragon__m-xl-4", "mt-xl-4": "paragon__mt-xl-4", "my-xl-4": "paragon__my-xl-4", "mr-xl-4": "paragon__mr-xl-4", "mx-xl-4": "paragon__mx-xl-4", "mb-xl-4": "paragon__mb-xl-4", "ml-xl-4": "paragon__ml-xl-4", "m-xl-5": "paragon__m-xl-5", "mt-xl-5": "paragon__mt-xl-5", "my-xl-5": "paragon__my-xl-5", "mr-xl-5": "paragon__mr-xl-5", "mx-xl-5": "paragon__mx-xl-5", "mb-xl-5": "paragon__mb-xl-5", "ml-xl-5": "paragon__ml-xl-5", "p-xl-0": "paragon__p-xl-0", "pt-xl-0": "paragon__pt-xl-0", "py-xl-0": "paragon__py-xl-0", "pr-xl-0": "paragon__pr-xl-0", "px-xl-0": "paragon__px-xl-0", "pb-xl-0": "paragon__pb-xl-0", "pl-xl-0": "paragon__pl-xl-0", "p-xl-1": "paragon__p-xl-1", "pt-xl-1": "paragon__pt-xl-1", "py-xl-1": "paragon__py-xl-1", "pr-xl-1": "paragon__pr-xl-1", "px-xl-1": "paragon__px-xl-1", "pb-xl-1": "paragon__pb-xl-1", "pl-xl-1": "paragon__pl-xl-1", "p-xl-2": "paragon__p-xl-2", "pt-xl-2": "paragon__pt-xl-2", "py-xl-2": "paragon__py-xl-2", "pr-xl-2": "paragon__pr-xl-2", "px-xl-2": "paragon__px-xl-2", "pb-xl-2": "paragon__pb-xl-2", "pl-xl-2": "paragon__pl-xl-2", "p-xl-3": "paragon__p-xl-3", "pt-xl-3": "paragon__pt-xl-3", "py-xl-3": "paragon__py-xl-3", "pr-xl-3": "paragon__pr-xl-3", "px-xl-3": "paragon__px-xl-3", "pb-xl-3": "paragon__pb-xl-3", "pl-xl-3": "paragon__pl-xl-3", "p-xl-4": "paragon__p-xl-4", "pt-xl-4": "paragon__pt-xl-4", "py-xl-4": "paragon__py-xl-4", "pr-xl-4": "paragon__pr-xl-4", "px-xl-4": "paragon__px-xl-4", "pb-xl-4": "paragon__pb-xl-4", "pl-xl-4": "paragon__pl-xl-4", "p-xl-5": "paragon__p-xl-5", "pt-xl-5": "paragon__pt-xl-5", "py-xl-5": "paragon__py-xl-5", "pr-xl-5": "paragon__pr-xl-5", "px-xl-5": "paragon__px-xl-5", "pb-xl-5": "paragon__pb-xl-5", "pl-xl-5": "paragon__pl-xl-5", "m-xl-auto": "paragon__m-xl-auto", "mt-xl-auto": "paragon__mt-xl-auto", "my-xl-auto": "paragon__my-xl-auto", "mr-xl-auto": "paragon__mr-xl-auto", "mx-xl-auto": "paragon__mx-xl-auto", "mb-xl-auto": "paragon__mb-xl-auto", "ml-xl-auto": "paragon__ml-xl-auto" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function a(a, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(a, n.key, n);
        }
      }return function (e, r, n) {
        return r && a(e.prototype, r), n && a(e, n), e;
      };
    }(),
        o = g(r(0)),
        t = g(r(2)),
        l = g(r(1)),
        p = g(r(50)),
        _ = g(r(7));function g(a) {
      return a && a.__esModule ? a : { default: a };
    }function f(a, e, r) {
      return e in a ? Object.defineProperty(a, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = r, a;
    }var s = function (a) {
      function e(a) {
        !function (a, e) {
          if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var r = function (a, e) {
          if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? a : e;
        }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, a));return r.toggle = r.toggle.bind(r), r.state = { activeTab: 0, uuid: (0, _.default)("tabInterface") }, r;
      }return function (a, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));a.prototype = Object.create(e && e.prototype, { constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(a, e) : a.__proto__ = e);
      }(e, o.default.Component), n(e, [{ key: "toggle", value: function value(a) {
          this.state.activeTab !== a && this.setState({ activeTab: a });
        } }, { key: "genLabelId", value: function value(a) {
          return "tab-label-" + this.state.uuid + "-" + a;
        } }, { key: "genPanelId", value: function value(a) {
          return "tab-panel-" + this.state.uuid + "-" + a;
        } }, { key: "buildLabels", value: function value() {
          var a = this;return this.props.labels.map(function (e, r) {
            var n = a.state.activeTab === r,
                l = a.genLabelId(r);return o.default.createElement("li", { className: p.default["nav-item"], id: l, key: l }, o.default.createElement("a", { "aria-selected": n, "aria-controls": a.genPanelId(r), className: (0, t.default)(p.default["nav-link"], f({}, p.default.active, n)), onClick: function onClick() {
                a.toggle(r);
              }, role: "tab", tabIndex: n ? 0 : -1 }, e));
          });
        } }, { key: "buildPanels", value: function value() {
          var a = this;return this.props.children.map(function (e, r) {
            var n = a.state.activeTab === r,
                l = a.genPanelId(r);return o.default.createElement("div", { "aria-hidden": !n, "aria-labelledby": a.genLabelId(r), className: (0, t.default)(p.default["tab-pane"], f({}, p.default.active, n)), id: l, key: l, role: "tabpanel" }, e);
          });
        } }, { key: "render", value: function value() {
          var a = this.buildLabels(),
              e = this.buildPanels();return o.default.createElement("div", null, o.default.createElement("ul", { className: (0, t.default)([p.default.nav, p.default["nav-tabs"]]), role: "tablist" }, a), o.default.createElement("div", { className: p.default["tab-content"] }, e));
        } }]), e;
    }();s.propTypes = { labels: l.default.oneOfType([l.default.arrayOf(l.default.string), l.default.arrayOf(l.default.element)]).isRequired, children: l.default.arrayOf(l.default.element).isRequired }, e.default = s;
  }, function (a, e) {
    a.exports = { nav: "paragon__nav", "nav-link": "paragon__nav-link", disabled: "paragon__disabled", "nav-tabs": "paragon__nav-tabs", "nav-item": "paragon__nav-item", active: "paragon__active", show: "paragon__show", "dropdown-menu": "paragon__dropdown-menu", "nav-pills": "paragon__nav-pills", "nav-fill": "paragon__nav-fill", "nav-justified": "paragon__nav-justified", "tab-content": "paragon__tab-content", "tab-pane": "paragon__tab-pane" };
  }, function (a, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = p(r(0)),
        o = p(r(2)),
        t = r(3),
        l = p(t);function p(a) {
      return a && a.__esModule ? a : { default: a };
    }function _(a) {
      return n.default.createElement("textarea", { id: a.id, className: (0, o.default)(a.className), name: a.name, value: a.value, placeholder: a.placeholder, "aria-describedby": a.describedBy, onChange: a.onChange, onBlur: a.onBlur, "aria-invalid": !a.isValid, disabled: a.disabled, required: a.required, ref: a.inputRef, themes: ["danger"] });
    }_.propTypes = t.inputProps;var g = (0, l.default)(_);e.default = g;
  }]);
});
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/fbjs/lib/EventListener.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__("./node_modules/fbjs/lib/emptyFunction.js");

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (true) {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;

/***/ }),

/***/ "./node_modules/fbjs/lib/ExecutionEnvironment.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),

/***/ "./node_modules/fbjs/lib/camelize.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),

/***/ "./node_modules/fbjs/lib/camelizeStyleName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__("./node_modules/fbjs/lib/camelize.js");

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),

/***/ "./node_modules/fbjs/lib/containsNode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__("./node_modules/fbjs/lib/isTextNode.js");

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/focusNode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/getActiveElement.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),

/***/ "./node_modules/fbjs/lib/hyphenate.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),

/***/ "./node_modules/fbjs/lib/hyphenateStyleName.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__("./node_modules/fbjs/lib/hyphenate.js");

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),

/***/ "./node_modules/fbjs/lib/isNode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/isTextNode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__("./node_modules/fbjs/lib/isNode.js");

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),

/***/ "./node_modules/fbjs/lib/shallowEqual.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*** IMPORTS FROM imports-loader ***/
(function () {

	/*!
  * JavaScript Cookie v2.2.0
  * https://github.com/js-cookie/js-cookie
  *
  * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
  * Released under the MIT license
  */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (( false ? 'undefined' : _typeof(exports)) === 'object') {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	})(function () {
		function extend() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[i];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init(converter) {
			function api(key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					var stringifiedAttributes = '';

					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return document.cookie = key + '=' + value + stringifiedAttributes;
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (!this.json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	});
}).call(window);

/***/ }),

/***/ "./node_modules/react-dom/cjs/react-dom.development.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.1.2
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__("./node_modules/react/index.js");
var invariant = __webpack_require__("./node_modules/fbjs/lib/invariant.js");
var warning = __webpack_require__("./node_modules/fbjs/lib/warning.js");
var ExecutionEnvironment = __webpack_require__("./node_modules/fbjs/lib/ExecutionEnvironment.js");
var _assign = __webpack_require__("./node_modules/object-assign/index.js");
var emptyFunction$1 = __webpack_require__("./node_modules/fbjs/lib/emptyFunction.js");
var EventListener = __webpack_require__("./node_modules/fbjs/lib/EventListener.js");
var getActiveElement = __webpack_require__("./node_modules/fbjs/lib/getActiveElement.js");
var shallowEqual = __webpack_require__("./node_modules/fbjs/lib/shallowEqual.js");
var containsNode = __webpack_require__("./node_modules/fbjs/lib/containsNode.js");
var focusNode = __webpack_require__("./node_modules/fbjs/lib/focusNode.js");
var emptyObject = __webpack_require__("./node_modules/fbjs/lib/emptyObject.js");
var checkPropTypes = __webpack_require__("./node_modules/prop-types/checkPropTypes.js");
var hyphenateStyleName = __webpack_require__("./node_modules/fbjs/lib/hyphenateStyleName.js");
var camelizeStyleName = __webpack_require__("./node_modules/fbjs/lib/camelizeStyleName.js");

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

!React ? invariant(false, 'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.') : void 0;

// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS = {
  children: true,
  dangerouslySetInnerHTML: true,
  defaultValue: true,
  defaultChecked: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  suppressHydrationWarning: true,
  style: true
};

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
  HAS_STRING_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    for (var propName in Properties) {
      !!properties.hasOwnProperty(propName) ? invariant(false, "injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.", propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE),
        hasStringBooleanValue: checkMask(propConfig, Injection.HAS_STRING_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant(false, "DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s", propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];

        propertyInfo.attributeName = attributeName;
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      // Downcase references to whitelist properties to check for membership
      // without case-sensitivity. This allows the whitelist to pick up
      // `allowfullscreen`, which should be written using the property configuration
      // for `allowFullscreen`
      properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
/* eslint-enable max-len */
var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";


var ROOT_ATTRIBUTE_NAME = 'data-reactroot';

/**
 * Map from property "standard name" to an object with info about how to set
 * the property in the DOM. Each object contains:
 *
 * attributeName:
 *   Used when rendering markup or with `*Attribute()`.
 * attributeNamespace
 * propertyName:
 *   Used on DOM node instances. (This includes properties that mutate due to
 *   external factors.)
 * mutationMethod:
 *   If non-null, used instead of the property or `setAttribute()` after
 *   initial render.
 * mustUseProperty:
 *   Whether the property must be accessed and mutated as an object property.
 * hasBooleanValue:
 *   Whether the property should be removed when set to a falsey value.
 * hasNumericValue:
 *   Whether the property must be numeric or parse as a numeric and should be
 *   removed when set to a falsey value.
 * hasPositiveNumericValue:
 *   Whether the property must be positive numeric or parse as a positive
 *   numeric and should be removed when set to a falsey value.
 * hasOverloadedBooleanValue:
 *   Whether the property can be used as a flag as well as with a value.
 *   Removed when strictly equal to false; present without a value when
 *   strictly equal to true; present with a value otherwise.
 */
var properties = {};

/**
 * Checks whether a property name is a writeable attribute.
 * @method
 */
function shouldSetAttribute(name, value) {
  if (isReservedProp(name)) {
    return false;
  }
  if (name.length > 2 && (name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
    return false;
  }
  if (value === null) {
    return true;
  }
  switch (typeof value) {
    case 'boolean':
      return shouldAttributeAcceptBooleanValue(name);
    case 'undefined':
    case 'number':
    case 'string':
    case 'object':
      return true;
    default:
      // function, symbol
      return false;
  }
}

function getPropertyInfo(name) {
  return properties.hasOwnProperty(name) ? properties[name] : null;
}

function shouldAttributeAcceptBooleanValue(name) {
  if (isReservedProp(name)) {
    return true;
  }
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    return propertyInfo.hasBooleanValue || propertyInfo.hasStringBooleanValue || propertyInfo.hasOverloadedBooleanValue;
  }
  var prefix = name.toLowerCase().slice(0, 5);
  return prefix === 'data-' || prefix === 'aria-';
}

/**
 * Checks to see if a property name is within the list of properties
 * reserved for internal React operations. These properties should
 * not be set on an HTML element.
 *
 * @private
 * @param {string} name
 * @return {boolean} If the name is within reserved props
 */
function isReservedProp(name) {
  return RESERVED_PROPS.hasOwnProperty(name);
}

var injection = DOMPropertyInjection;

var MUST_USE_PROPERTY = injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = injection.HAS_OVERLOADED_BOOLEAN_VALUE;
var HAS_STRING_BOOLEAN_VALUE = injection.HAS_STRING_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  // When adding attributes to this list, be sure to also add them to
  // the `possibleStandardNames` module to ensure casing and incorrect
  // name warnings.
  Properties: {
    allowFullScreen: HAS_BOOLEAN_VALUE,
    // specifies target context for links with `preload` type
    async: HAS_BOOLEAN_VALUE,
    // Note: there is a special case that prevents it from being written to the DOM
    // on the client side because the browsers are inconsistent. Instead we call focus().
    autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_OVERLOADED_BOOLEAN_VALUE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    contentEditable: HAS_STRING_BOOLEAN_VALUE,
    controls: HAS_BOOLEAN_VALUE,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: HAS_STRING_BOOLEAN_VALUE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    hidden: HAS_BOOLEAN_VALUE,
    loop: HAS_BOOLEAN_VALUE,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    playsInline: HAS_BOOLEAN_VALUE,
    readOnly: HAS_BOOLEAN_VALUE,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    scoped: HAS_BOOLEAN_VALUE,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    start: HAS_NUMERIC_VALUE,
    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: HAS_STRING_BOOLEAN_VALUE,
    // Style must be explicitly set in the attribute list. React components
    // expect a style object
    style: 0,
    // Keep it in the whitelist because it is case-sensitive for SVG.
    tabIndex: 0,
    // itemScope is for for Microdata support.
    // See http://schema.org/docs/gs.html
    itemScope: HAS_BOOLEAN_VALUE,
    // These attributes must stay in the white-list because they have
    // different attribute names (see DOMAttributeNames below)
    acceptCharset: 0,
    className: 0,
    htmlFor: 0,
    httpEquiv: 0,
    // Attributes with mutation methods must be specified in the whitelist
    // Set the string boolean flag to allow the behavior
    value: HAS_STRING_BOOLEAN_VALUE
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HAS_STRING_BOOLEAN_VALUE$1 = injection.HAS_STRING_BOOLEAN_VALUE;


var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */
var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];

var SVGDOMPropertyConfig = {
  Properties: {
    autoReverse: HAS_STRING_BOOLEAN_VALUE$1,
    externalResourcesRequired: HAS_STRING_BOOLEAN_VALUE$1,
    preserveAlpha: HAS_STRING_BOOLEAN_VALUE$1
  },
  DOMAttributeNames: {
    autoReverse: 'autoReverse',
    externalResourcesRequired: 'externalResourcesRequired',
    preserveAlpha: 'preserveAlpha'
  },
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  }
};

var CAMELIZE = /[\-\:]([a-z])/g;
var capitalize = function (token) {
  return token[1].toUpperCase();
};

ATTRS.forEach(function (original) {
  var reactName = original.replace(CAMELIZE, capitalize);

  SVGDOMPropertyConfig.Properties[reactName] = 0;
  SVGDOMPropertyConfig.DOMAttributeNames[reactName] = original;
});

injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
injection.injectDOMPropertyConfig(SVGDOMPropertyConfig);

var ReactErrorUtils = {
  // Used by Fiber to simulate a try-catch.
  _caughtError: null,
  _hasCaughtError: false,

  // Used by event system to capture/rethrow the first error.
  _rethrowError: null,
  _hasRethrowError: false,

  injection: {
    injectErrorUtils: function (injectedErrorUtils) {
      !(typeof injectedErrorUtils.invokeGuardedCallback === 'function') ? invariant(false, 'Injected invokeGuardedCallback() must be a function.') : void 0;
      invokeGuardedCallback = injectedErrorUtils.invokeGuardedCallback;
    }
  },

  /**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(ReactErrorUtils, arguments);
  },

  /**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
    ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
    if (ReactErrorUtils.hasCaughtError()) {
      var error = ReactErrorUtils.clearCaughtError();
      if (!ReactErrorUtils._hasRethrowError) {
        ReactErrorUtils._hasRethrowError = true;
        ReactErrorUtils._rethrowError = error;
      }
    }
  },

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    return rethrowCaughtError.apply(ReactErrorUtils, arguments);
  },

  hasCaughtError: function () {
    return ReactErrorUtils._hasCaughtError;
  },

  clearCaughtError: function () {
    if (ReactErrorUtils._hasCaughtError) {
      var error = ReactErrorUtils._caughtError;
      ReactErrorUtils._caughtError = null;
      ReactErrorUtils._hasCaughtError = false;
      return error;
    } else {
      invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
    }
  }
};

var invokeGuardedCallback = function (name, func, context, a, b, c, d, e, f) {
  ReactErrorUtils._hasCaughtError = false;
  ReactErrorUtils._caughtError = null;
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    ReactErrorUtils._caughtError = error;
    ReactErrorUtils._hasCaughtError = true;
  }
};

{
  // In DEV mode, we swap out invokeGuardedCallback for a special version
  // that plays more nicely with the browser's DevTools. The idea is to preserve
  // "Pause on exceptions" behavior. Because React wraps all user-provided
  // functions in invokeGuardedCallback, and the production version of
  // invokeGuardedCallback uses a try-catch, all user exceptions are treated
  // like caught exceptions, and the DevTools won't pause unless the developer
  // takes the extra step of enabling pause on caught exceptions. This is
  // untintuitive, though, because even though React has caught the error, from
  // the developer's perspective, the error is uncaught.
  //
  // To preserve the expected "Pause on exceptions" behavior, we don't use a
  // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
  // DOM node, and call the user-provided callback from inside an event handler
  // for that fake event. If the callback throws, the error is "captured" using
  // a global event handler. But because the error happens in a different
  // event loop context, it does not interrupt the normal program flow.
  // Effectively, this gives us try-catch behavior without actually using
  // try-catch. Neat!

  // Check that the browser supports the APIs we need to implement our special
  // DEV version of invokeGuardedCallback
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');

    var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
      // Keeps track of whether the user-provided callback threw an error. We
      // set this to true at the beginning, then set it to false right after
      // calling the function. If the function errors, `didError` will never be
      // set to false. This strategy works even if the browser is flaky and
      // fails to call our global error handler, because it doesn't rely on
      // the error event at all.
      var didError = true;

      // Create an event handler for our fake event. We will synchronously
      // dispatch our fake event using `dispatchEvent`. Inside the handler, we
      // call the user-provided callback.
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      function callCallback() {
        // We immediately remove the callback from event listeners so that
        // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
        // nested call would trigger the fake event handlers of any call higher
        // in the stack.
        fakeNode.removeEventListener(evtType, callCallback, false);
        func.apply(context, funcArgs);
        didError = false;
      }

      // Create a global error event handler. We use this to capture the value
      // that was thrown. It's possible that this error handler will fire more
      // than once; for example, if non-React code also calls `dispatchEvent`
      // and a handler for that event throws. We should be resilient to most of
      // those cases. Even if our error event handler fires more than once, the
      // last error event is always used. If the callback actually does error,
      // we know that the last error event is the correct one, because it's not
      // possible for anything else to have happened in between our callback
      // erroring and the code that follows the `dispatchEvent` call below. If
      // the callback doesn't error, but the error event was fired, we know to
      // ignore it because `didError` will be false, as described above.
      var error = void 0;
      // Use this to track whether the error event is ever called.
      var didSetError = false;
      var isCrossOriginError = false;

      function onError(event) {
        error = event.error;
        didSetError = true;
        if (error === null && event.colno === 0 && event.lineno === 0) {
          isCrossOriginError = true;
        }
      }

      // Create a fake event type.
      var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

      // Attach our event handlers
      window.addEventListener('error', onError);
      fakeNode.addEventListener(evtType, callCallback, false);

      // Synchronously dispatch our fake event. If the user-provided function
      // errors, it will trigger our global error handler.
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);

      if (didError) {
        if (!didSetError) {
          // The callback errored, but the error event never fired.
          error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
        } else if (isCrossOriginError) {
          error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
        }
        ReactErrorUtils._hasCaughtError = true;
        ReactErrorUtils._caughtError = error;
      } else {
        ReactErrorUtils._hasCaughtError = false;
        ReactErrorUtils._caughtError = null;
      }

      // Remove our event listeners
      window.removeEventListener('error', onError);
    };

    invokeGuardedCallback = invokeGuardedCallbackDev;
  }
}

var rethrowCaughtError = function () {
  if (ReactErrorUtils._hasRethrowError) {
    var error = ReactErrorUtils._rethrowError;
    ReactErrorUtils._rethrowError = null;
    ReactErrorUtils._hasRethrowError = false;
    throw error;
  }
};

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
    if (plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
    plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
  eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  {
    var lowerCasedName = registrationName.toLowerCase();
    possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */

/**
 * Ordered list of injected plugins.
 */
var plugins = [];

/**
 * Mapping from event name to dispatch config
 */
var eventNameDispatchConfigs = {};

/**
 * Mapping from registration name to plugin module
 */
var registrationNameModules = {};

/**
 * Mapping from registration name to event name
 */
var registrationNameDependencies = {};

/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */
var possibleRegistrationNames = {};
// Trust the developer to only use possibleRegistrationNames in true

/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */
function injectEventPluginOrder(injectedEventPluginOrder) {
  !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
  // Clone the ordering so it cannot be dynamically mutated.
  eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
  recomputePluginOrdering();
}

/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */
function injectEventPluginsByName(injectedNamesToPlugins) {
  var isOrderingDirty = false;
  for (var pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      continue;
    }
    var pluginModule = injectedNamesToPlugins[pluginName];
    if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
      !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) {
    recomputePluginOrdering();
  }
}

var EventPluginRegistry = Object.freeze({
	plugins: plugins,
	eventNameDispatchConfigs: eventNameDispatchConfigs,
	registrationNameModules: registrationNameModules,
	registrationNameDependencies: registrationNameDependencies,
	possibleRegistrationNames: possibleRegistrationNames,
	injectEventPluginOrder: injectEventPluginOrder,
	injectEventPluginsByName: injectEventPluginsByName
});

var getFiberCurrentPropsFromNode = null;
var getInstanceFromNode = null;
var getNodeFromInstance = null;

var injection$2 = {
  injectComponentTree: function (Injected) {
    getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode;
    getInstanceFromNode = Injected.getInstanceFromNode;
    getNodeFromInstance = Injected.getNodeFromInstance;

    {
      warning(getNodeFromInstance && getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.');
    }
  }
};






var validateEventDispatches;
{
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.');
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = getNodeFromInstance(inst);
  ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */


/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */


/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */
function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */

/**
 * Methods for injecting dependencies.
 */
var injection$1 = {
  /**
   * @param {array} InjectedEventPluginOrder
   * @public
   */
  injectEventPluginOrder: injectEventPluginOrder,

  /**
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   */
  injectEventPluginsByName: injectEventPluginsByName
};

/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */
function getListener(inst, registrationName) {
  var listener;

  // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
  // live here; needs to be moved to a better place soon
  var stateNode = inst.stateNode;
  if (!stateNode) {
    // Work in progress (ex: onload events in incremental mode).
    return null;
  }
  var props = getFiberCurrentPropsFromNode(stateNode);
  if (!props) {
    // Work in progress.
    return null;
  }
  listener = props[registrationName];
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
    return null;
  }
  !(!listener || typeof listener === 'function') ? invariant(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.', registrationName, typeof listener) : void 0;
  return listener;
}

/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */
function extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var events;
  for (var i = 0; i < plugins.length; i++) {
    // Not every plugin in the ordering may be loaded at runtime.
    var possiblePlugin = plugins[i];
    if (possiblePlugin) {
      var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
      if (extractedEvents) {
        events = accumulateInto(events, extractedEvents);
      }
    }
  }
  return events;
}

/**
 * Enqueues a synthetic event that should be dispatched when
 * `processEventQueue` is invoked.
 *
 * @param {*} events An accumulation of synthetic events.
 * @internal
 */
function enqueueEvents(events) {
  if (events) {
    eventQueue = accumulateInto(eventQueue, events);
  }
}

/**
 * Dispatches all synthetic events on the event queue.
 *
 * @internal
 */
function processEventQueue(simulated) {
  // Set `eventQueue` to null before processing it so that we can tell if more
  // events get enqueued while processing.
  var processingEventQueue = eventQueue;
  eventQueue = null;
  if (simulated) {
    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
  } else {
    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
  }
  !!eventQueue ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : void 0;
  // This would be a good time to rethrow if any of the event handlers threw.
  ReactErrorUtils.rethrowCaughtError();
}

var EventPluginHub = Object.freeze({
	injection: injection$1,
	getListener: getListener,
	extractEvents: extractEvents,
	enqueueEvents: enqueueEvents,
	processEventQueue: processEventQueue
});

var IndeterminateComponent = 0; // Before we know whether it is functional or class
var FunctionalComponent = 1;
var ClassComponent = 2;
var HostRoot = 3; // Root of a host tree. Could be nested inside another node.
var HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
var HostComponent = 5;
var HostText = 6;
var CallComponent = 7;
var CallHandlerPhase = 8;
var ReturnComponent = 9;
var Fragment = 10;

var randomKey = Math.random().toString(36).slice(2);
var internalInstanceKey = '__reactInternalInstance$' + randomKey;
var internalEventHandlersKey = '__reactEventHandlers$' + randomKey;

function precacheFiberNode$1(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest = void 0;
  var inst = node[internalInstanceKey];
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber, this will always be the deepest root.
    return inst;
  }
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode$1(node) {
  var inst = node[internalInstanceKey];
  if (inst) {
    if (inst.tag === HostComponent || inst.tag === HostText) {
      return inst;
    } else {
      return null;
    }
  }
  return null;
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance$1(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) {
    // In Fiber this, is just the state node right now. We assume it will be
    // a host component or host text.
    return inst.stateNode;
  }

  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  invariant(false, 'getNodeFromInstance: Invalid argument.');
}

function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}

function updateFiberProps$1(node, props) {
  node[internalEventHandlersKey] = props;
}

var ReactDOMComponentTree = Object.freeze({
	precacheFiberNode: precacheFiberNode$1,
	getClosestInstanceFromNode: getClosestInstanceFromNode,
	getInstanceFromNode: getInstanceFromNode$1,
	getNodeFromInstance: getNodeFromInstance$1,
	getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
	updateFiberProps: updateFiberProps$1
});

function getParent(inst) {
  do {
    inst = inst['return'];
    // TODO: If this is a HostRoot we might want to bail out.
    // That is depending on if we want nested subtrees (layers) to bubble
    // events to their parent. We could also go through parentNode on the
    // host node but that wouldn't work for React Native and doesn't let us
    // do the portal feature.
  } while (inst && inst.tag !== HostComponent);
  if (inst) {
    return inst;
  }
  return null;
}

/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */
function getLowestCommonAncestor(instA, instB) {
  var depthA = 0;
  for (var tempA = instA; tempA; tempA = getParent(tempA)) {
    depthA++;
  }
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = getParent(tempB)) {
    depthB++;
  }

  // If A is deeper, crawl up.
  while (depthA - depthB > 0) {
    instA = getParent(instA);
    depthA--;
  }

  // If B is deeper, crawl up.
  while (depthB - depthA > 0) {
    instB = getParent(instB);
    depthB--;
  }

  // Walk in lockstep until we find a match.
  var depth = depthA;
  while (depth--) {
    if (instA === instB || instA === instB.alternate) {
      return instA;
    }
    instA = getParent(instA);
    instB = getParent(instB);
  }
  return null;
}

/**
 * Return if A is an ancestor of B.
 */


/**
 * Return the parent instance of the passed-in instance.
 */
function getParentInstance(inst) {
  return getParent(inst);
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }
  var i;
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}

/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (true) {
    if (!from) {
      break;
    }
    if (from === common) {
      break;
    }
    var alternate = from.alternate;
    if (alternate !== null && alternate === common) {
      break;
    }
    pathFrom.push(from);
    from = getParent(from);
  }
  var pathTo = [];
  while (true) {
    if (!to) {
      break;
    }
    if (to === common) {
      break;
    }
    var _alternate = to.alternate;
    if (_alternate !== null && _alternate === common) {
      break;
    }
    pathTo.push(to);
    to = getParent(to);
  }
  for (var i = 0; i < pathFrom.length; i++) {
    fn(pathFrom[i], 'bubbled', argFrom);
  }
  for (var _i = pathTo.length; _i-- > 0;) {
    fn(pathTo[_i], 'captured', argTo);
  }
}

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 */

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  {
    warning(inst, 'Dispatching inst must not be null');
  }
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? getParentInstance(targetInst) : null;
    traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

var EventPropagators = Object.freeze({
	accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
	accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
	accumulateDirectDispatches: accumulateDirectDispatches
});

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

/**
 * This helper object stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */
var compositionState = {
  _root: null,
  _startText: null,
  _fallbackText: null
};

function initialize(nativeEventTarget) {
  compositionState._root = nativeEventTarget;
  compositionState._startText = getText();
  return true;
}

function reset() {
  compositionState._root = null;
  compositionState._startText = null;
  compositionState._fallbackText = null;
}

function getData() {
  if (compositionState._fallbackText) {
    return compositionState._fallbackText;
  }

  var start;
  var startValue = compositionState._startText;
  var startLength = startValue.length;
  var end;
  var endValue = getText();
  var endLength = endValue.length;

  for (start = 0; start < startLength; start++) {
    if (startValue[start] !== endValue[start]) {
      break;
    }
  }

  var minEnd = startLength - start;
  for (end = 1; end <= minEnd; end++) {
    if (startValue[startLength - end] !== endValue[endLength - end]) {
      break;
    }
  }

  var sliceTail = end > 1 ? 1 - end : undefined;
  compositionState._fallbackText = endValue.slice(start, sliceTail);
  return compositionState._fallbackText;
}

function getText() {
  if ('value' in compositionState._root) {
    return compositionState._root.value;
  }
  return compositionState._root[getTextContentAccessor()];
}

/* eslint valid-typeof: 0 */

var didWarnForAddedNewProperty = false;
var isProxySupported = typeof Proxy === 'function';
var EVENT_POOL_SIZE = 10;

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction$1.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    {
      delete this[propName]; // this has a getter/setter for warnings
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction$1.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction$1.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction$1.thatReturnsFalse;
  return this;
}

_assign(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction$1.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction$1.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction$1.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction$1.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      {
        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    {
      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction$1));
      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction$1));
    }
  }
});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  _assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = _assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;
  addEventPoolingTo(Class);
};

/** Proxying after everything set on SyntheticEvent
 * to resolve Proxy issue on some WebKit browsers
 * in which some Event properties are set to undefined (GH#10010)
 */
{
  if (isProxySupported) {
    /*eslint-disable no-func-assign */
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function (target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function (constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function (target, prop, value) {
            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
              warning(didWarnForAddedNewProperty || target.isPersistent(), "This synthetic event is reused for performance reasons. If you're " + "seeing this, you're adding a new property in the synthetic event object. " + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.');
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
    });
    /*eslint-enable no-func-assign */
  }
}

addEventPoolingTo(SyntheticEvent);

/**
 * Helper to nullify syntheticEvent instance properties when destructing
 *
 * @param {String} propName
 * @param {?object} getVal
 * @return {object} defineProperty object
 */
function getPooledWarningPropertyDefinition(propName, getVal) {
  var isFunction = typeof getVal === 'function';
  return {
    configurable: true,
    set: set,
    get: get
  };

  function set(val) {
    var action = isFunction ? 'setting the method' : 'setting the property';
    warn(action, 'This is effectively a no-op');
    return val;
  }

  function get() {
    var action = isFunction ? 'accessing the method' : 'accessing the property';
    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
    warn(action, result);
    return getVal;
  }

  function warn(action, result) {
    var warningCondition = false;
    warning(warningCondition, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result);
  }
}

function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  var EventConstructor = this;
  if (EventConstructor.eventPool.length) {
    var instance = EventConstructor.eventPool.pop();
    EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
}

function releasePooledEvent(event) {
  var EventConstructor = this;
  !(event instanceof EventConstructor) ? invariant(false, 'Trying to release an event instance  into a pool of a different type.') : void 0;
  event.destructor();
  if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
    EventConstructor.eventPool.push(event);
  }
}

function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}

var SyntheticEvent$1 = SyntheticEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticInputEvent, InputEventInterface);

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture'
    },
    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture'
    },
    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture'
    },
    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture'
    },
    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case 'topCompositionStart':
      return eventTypes.compositionStart;
    case 'topCompositionEnd':
      return eventTypes.compositionEnd;
    case 'topCompositionUpdate':
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topKeyUp':
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case 'topKeyDown':
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case 'topKeyPress':
    case 'topMouseDown':
    case 'topBlur':
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition status, if any.
var isComposing = false;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!isComposing) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!isComposing && eventType === eventTypes.compositionStart) {
      isComposing = initialize(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (isComposing) {
        fallbackData = getData();
      }
    }
  }

  var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {TopLevelTypes} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topCompositionEnd':
      return getDataFromCustomEvent(nativeEvent);
    case 'topKeyPress':
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case 'topTextInput':
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (isComposing) {
    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = getData();
      reset();
      isComposing = false;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case 'topPaste':
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case 'topKeyPress':
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (!isKeypressCommand(nativeEvent)) {
        // IE fires the `keypress` event when a user types an emoji via
        // Touch keyboard of Windows.  In such a case, the `char` property
        // holds an emoji character like `\uD83D\uDE0A`.  Because its length
        // is 2, the property `which` does not represent an emoji correctly.
        // In such a case, we directly return the `char` property instead of
        // using `which`.
        if (nativeEvent.char && nativeEvent.char.length > 1) {
          return nativeEvent.char;
        } else if (nativeEvent.which) {
          return String.fromCharCode(nativeEvent.which);
        }
      }
      return null;
    case 'topCompositionEnd':
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {
  eventTypes: eventTypes,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

// Use to restore controlled state after a change event has fired.

var fiberHostComponent = null;

var ReactControlledComponentInjection = {
  injectFiberControlledHostComponent: function (hostComponentImpl) {
    // The fiber implementation doesn't use dynamic dispatch so we need to
    // inject the implementation.
    fiberHostComponent = hostComponentImpl;
  }
};

var restoreTarget = null;
var restoreQueue = null;

function restoreStateOfTarget(target) {
  // We perform this translation at the end of the event loop so that we
  // always receive the correct fiber here
  var internalInstance = getInstanceFromNode(target);
  if (!internalInstance) {
    // Unmounted
    return;
  }
  !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
  fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
}

var injection$3 = ReactControlledComponentInjection;

function enqueueStateRestore(target) {
  if (restoreTarget) {
    if (restoreQueue) {
      restoreQueue.push(target);
    } else {
      restoreQueue = [target];
    }
  } else {
    restoreTarget = target;
  }
}

function restoreStateIfNeeded() {
  if (!restoreTarget) {
    return;
  }
  var target = restoreTarget;
  var queuedTargets = restoreQueue;
  restoreTarget = null;
  restoreQueue = null;

  restoreStateOfTarget(target);
  if (queuedTargets) {
    for (var i = 0; i < queuedTargets.length; i++) {
      restoreStateOfTarget(queuedTargets[i]);
    }
  }
}

var ReactControlledComponent = Object.freeze({
	injection: injection$3,
	enqueueStateRestore: enqueueStateRestore,
	restoreStateIfNeeded: restoreStateIfNeeded
});

// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.

// Defaults
var fiberBatchedUpdates = function (fn, bookkeeping) {
  return fn(bookkeeping);
};

var isNestingBatched = false;
function batchedUpdates(fn, bookkeeping) {
  if (isNestingBatched) {
    // If we are currently inside another batch, we need to wait until it
    // fully completes before restoring state. Therefore, we add the target to
    // a queue of work.
    return fiberBatchedUpdates(fn, bookkeeping);
  }
  isNestingBatched = true;
  try {
    return fiberBatchedUpdates(fn, bookkeeping);
  } finally {
    // Here we wait until all updates have propagated, which is important
    // when using controlled components within layers:
    // https://github.com/facebook/react/issues/1698
    // Then we restore state of any controlled component.
    isNestingBatched = false;
    restoreStateIfNeeded();
  }
}

var ReactGenericBatchingInjection = {
  injectFiberBatchedUpdates: function (_batchedUpdates) {
    fiberBatchedUpdates = _batchedUpdates;
  }
};

var injection$4 = ReactGenericBatchingInjection;

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */
var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  'datetime-local': true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

  if (nodeName === 'input') {
    return !!supportedInputTypes[elem.type];
  }

  if (nodeName === 'textarea') {
    return true;
  }

  return false;
}

/**
 * HTML nodeType values that represent the type of the node
 */

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === TEXT_NODE ? target.parentNode : target;
}

var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}

function getTracker(node) {
  return node._valueTracker;
}

function detachTracker(node) {
  node._valueTracker = null;
}

function getValueFromNode(node) {
  var value = '';
  if (!node) {
    return value;
  }

  if (isCheckable(node)) {
    value = node.checked ? 'true' : 'false';
  } else {
    value = node.value;
  }

  return value;
}

function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? 'checked' : 'value';
  var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

  var currentValue = '' + node[valueField];

  // if someone has already defined a value or Safari, then bail
  // and don't track value will cause over reporting of changes,
  // but it's better then a hard failure
  // (needed for certain tests that spyOn input values and Safari)
  if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
    return;
  }

  Object.defineProperty(node, valueField, {
    enumerable: descriptor.enumerable,
    configurable: true,
    get: function () {
      return descriptor.get.call(this);
    },
    set: function (value) {
      currentValue = '' + value;
      descriptor.set.call(this, value);
    }
  });

  var tracker = {
    getValue: function () {
      return currentValue;
    },
    setValue: function (value) {
      currentValue = '' + value;
    },
    stopTracking: function () {
      detachTracker(node);
      delete node[valueField];
    }
  };
  return tracker;
}

function track(node) {
  if (getTracker(node)) {
    return;
  }

  // TODO: Once it's just Fiber we can move this to node._wrapperState
  node._valueTracker = trackValueOnNode(node);
}

function updateValueIfChanged(node) {
  if (!node) {
    return false;
  }

  var tracker = getTracker(node);
  // if there is no tracker at this point it's unlikely
  // that trying again will succeed
  if (!tracker) {
    return true;
  }

  var lastValue = tracker.getValue();
  var nextValue = getValueFromNode(node);
  if (nextValue !== lastValue) {
    tracker.setValue(nextValue);
    return true;
  }
  return false;
}

var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: 'onChange',
      captured: 'onChangeCapture'
    },
    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
  }
};

function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  event.type = 'change';
  // Flag this event loop as needing state restore.
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(event);
  return event;
}
/**
 * For IE shims
 */
var activeElement = null;
var activeElementInst = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent));

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  enqueueEvents(event);
  processEventQueue(false);
}

function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) {
    return targetInst;
  }
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topChange') {
    return targetInst;
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events.
  isInputEventSupported = isEventSupported('input') && (!document.documentMode || document.documentMode > 9);
}

/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onpropertychange', handlePropertyChange);
  activeElement = null;
  activeElementInst = null;
}

/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  if (getInstIfValueChanged(activeElementInst)) {
    manualDispatchChangeEvent(nativeEvent);
  }
}

function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  if (topLevelType === 'topFocus') {
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === 'topBlur') {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    return getInstIfValueChanged(activeElementInst);
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst) {
  if (topLevelType === 'topClick') {
    return getInstIfValueChanged(targetInst);
  }
}

function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
    return getInstIfValueChanged(targetInst);
  }
}

function handleControlledInputBlur(inst, node) {
  // TODO: In IE, inst is occasionally null. Why?
  if (inst == null) {
    return;
  }

  // Fiber and ReactDOM keep wrapper state in separate places
  var state = inst._wrapperState || node._wrapperState;

  if (!state || !state.controlled || node.type !== 'number') {
    return;
  }

  // If controlled, assign the value attribute to the current value on blur
  var value = '' + node.value;
  if (node.getAttribute('value') !== value) {
    node.setAttribute('value', value);
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,

  _isInputEventSupported: isInputEventSupported,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForChangeEvent;
    } else if (isTextInputElement(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst);
      if (inst) {
        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }

    // When blurring, set the value attribute for number inputs
    if (topLevelType === 'topBlur') {
      handleControlledInputBlur(targetInst, targetNode);
    }
  }
};

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */
var DOMEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: null,
  detail: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticUIEvent, UIEventInterface);

/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */

var modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  pageX: null,
  pageY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState,
  button: null,
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

var eventTypes$2 = {
  mouseEnter: {
    registrationName: 'onMouseEnter',
    dependencies: ['topMouseOut', 'topMouseOver']
  },
  mouseLeave: {
    registrationName: 'onMouseLeave',
    dependencies: ['topMouseOut', 'topMouseOver']
  }
};

var EnterLeaveEventPlugin = {
  eventTypes: eventTypes$2,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === 'topMouseOut') {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : getNodeFromInstance$1(from);
    var toNode = to == null ? win : getNodeFromInstance$1(to);

    var leave = SyntheticMouseEvent.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }
};

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */

/**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */


function get(key) {
  return key._reactInternalFiber;
}

function has(key) {
  return key._reactInternalFiber !== undefined;
}

function set(key, value) {
  key._reactInternalFiber = value;
}

var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactCurrentOwner = ReactInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame;

function getComponentName(fiber) {
  var type = fiber.type;

  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  return null;
}

// Don't change these two values:
var NoEffect = 0; //           0b00000000
var PerformedWork = 1; //      0b00000001

// You can change the rest (and add more).
var Placement = 2; //          0b00000010
var Update = 4; //             0b00000100
var PlacementAndUpdate = 6; // 0b00000110
var Deletion = 8; //           0b00001000
var ContentReset = 16; //      0b00010000
var Callback = 32; //          0b00100000
var Err = 64; //               0b01000000
var Ref = 128; //              0b10000000

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    if ((node.effectTag & Placement) !== NoEffect) {
      return MOUNTING;
    }
    while (node['return']) {
      node = node['return'];
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
    }
  } else {
    while (node['return']) {
      node = node['return'];
    }
  }
  if (node.tag === HostRoot) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return MOUNTED;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return UNMOUNTED;
}

function isFiberMounted(fiber) {
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function isMounted(component) {
  {
    var owner = ReactCurrentOwner.current;
    if (owner !== null && owner.tag === ClassComponent) {
      var ownerFiber = owner;
      var instance = ownerFiber.stateNode;
      warning(instance._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(ownerFiber) || 'A component');
      instance._warnedAboutRefsInRender = true;
    }
  }

  var fiber = get(component);
  if (!fiber) {
    return false;
  }
  return isFiberMountedImpl(fiber) === MOUNTED;
}

function assertIsMounted(fiber) {
  !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var state = isFiberMountedImpl(fiber);
    !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    if (state === MOUNTING) {
      return null;
    }
    return fiber;
  }
  // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a['return'];
    var parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) {
      // We're at the root.
      break;
    }

    // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.
      invariant(false, 'Unable to find node on an unmounted component.');
    }

    if (a['return'] !== b['return']) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
      }
    }

    !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  }
  // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.
  !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  }
  // Otherwise B has to be current branch.
  return alternate;
}

function findCurrentHostFiber(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

function findCurrentHostFiberWithNoPortals(parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent || node.tag === HostText) {
      return node;
    } else if (node.child && node.tag !== HostPortal) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
}

var CALLBACK_BOOKKEEPING_POOL_SIZE = 10;
var callbackBookkeepingPool = [];

/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */
function findRootContainerNode(inst) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  while (inst['return']) {
    inst = inst['return'];
  }
  if (inst.tag !== HostRoot) {
    // This can happen if we're in a detached tree.
    return null;
  }
  return inst.stateNode.containerInfo;
}

// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst) {
  if (callbackBookkeepingPool.length) {
    var instance = callbackBookkeepingPool.pop();
    instance.topLevelType = topLevelType;
    instance.nativeEvent = nativeEvent;
    instance.targetInst = targetInst;
    return instance;
  }
  return {
    topLevelType: topLevelType,
    nativeEvent: nativeEvent,
    targetInst: targetInst,
    ancestors: []
  };
}

function releaseTopLevelCallbackBookKeeping(instance) {
  instance.topLevelType = null;
  instance.nativeEvent = null;
  instance.targetInst = null;
  instance.ancestors.length = 0;
  if (callbackBookkeepingPool.length < CALLBACK_BOOKKEEPING_POOL_SIZE) {
    callbackBookkeepingPool.push(instance);
  }
}

function handleTopLevelImpl(bookKeeping) {
  var targetInst = bookKeeping.targetInst;

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root = findRootContainerNode(ancestor);
    if (!root) {
      break;
    }
    bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    _handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
  }
}

// TODO: can we stop exporting these?
var _enabled = true;
var _handleTopLevel = void 0;

function setHandleTopLevel(handleTopLevel) {
  _handleTopLevel = handleTopLevel;
}

function setEnabled(enabled) {
  _enabled = !!enabled;
}

function isEnabled() {
  return _enabled;
}

/**
 * Traps top-level events by using event bubbling.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */
function trapBubbledEvent(topLevelType, handlerBaseName, element) {
  if (!element) {
    return null;
  }
  return EventListener.listen(element, handlerBaseName, dispatchEvent.bind(null, topLevelType));
}

/**
 * Traps a top-level event by using event capturing.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */
function trapCapturedEvent(topLevelType, handlerBaseName, element) {
  if (!element) {
    return null;
  }
  return EventListener.capture(element, handlerBaseName, dispatchEvent.bind(null, topLevelType));
}

function dispatchEvent(topLevelType, nativeEvent) {
  if (!_enabled) {
    return;
  }

  var nativeEventTarget = getEventTarget(nativeEvent);
  var targetInst = getClosestInstanceFromNode(nativeEventTarget);
  if (targetInst !== null && typeof targetInst.tag === 'number' && !isFiberMounted(targetInst)) {
    // If we get an event (ex: img onload) before committing that
    // component's mount, ignore it for now (that is, treat it as if it was an
    // event on a non-React tree). We might also consider queueing events and
    // dispatching them after the mount.
    targetInst = null;
  }

  var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst);

  try {
    // Event queue being processed in the same cycle allows
    // `preventDefault`.
    batchedUpdates(handleTopLevelImpl, bookKeeping);
  } finally {
    releaseTopLevelCallbackBookKeeping(bookKeeping);
  }
}

var ReactDOMEventListener = Object.freeze({
	get _enabled () { return _enabled; },
	get _handleTopLevel () { return _handleTopLevel; },
	setHandleTopLevel: setHandleTopLevel,
	setEnabled: setEnabled,
	isEnabled: isEnabled,
	trapBubbledEvent: trapBubbledEvent,
	trapCapturedEvent: trapCapturedEvent,
	dispatchEvent: dispatchEvent
});

/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

/**
 * A list of event names to a configurable list of vendor prefixes.
 */
var vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
  animationstart: makePrefixMap('Animation', 'AnimationStart'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
 * Event names that have already been detected and prefixed (if applicable).
 */
var prefixedEventNames = {};

/**
 * Element to check for prefixes on.
 */
var style = {};

/**
 * Bootstrap if a DOM exists.
 */
if (ExecutionEnvironment.canUseDOM) {
  style = document.createElement('div').style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are usable, and if not remove them from the map.
  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }

  // Same as above
  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  } else if (!vendorPrefixes[eventName]) {
    return eventName;
  }

  var prefixMap = vendorPrefixes[eventName];

  for (var styleProp in prefixMap) {
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
      return prefixedEventNames[eventName] = prefixMap[styleProp];
    }
  }

  return '';
}

/**
 * Types of raw signals from the browser caught at the top level.
 *
 * For events like 'submit' which don't consistently bubble (which we
 * trap at a lower node than `document`), binding at `document` would
 * cause duplicate events so we don't include them here.
 */
var topLevelTypes$1 = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCancel: 'cancel',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topClose: 'close',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoad: 'load',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topToggle: 'toggle',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

var BrowserEventConstants = {
  topLevelTypes: topLevelTypes$1
};

function runEventQueueInBatch(events) {
  enqueueEvents(events);
  processEventQueue(false);
}

/**
 * Streams a fired top-level event to `EventPluginHub` where plugins have the
 * opportunity to create `ReactEvent`s to be dispatched.
 */
function handleTopLevel(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var events = extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
  runEventQueueInBatch(events);
}

var topLevelTypes = BrowserEventConstants.topLevelTypes;

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var alreadyListeningTo = {};
var reactTopListenersCounter = 0;

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + ('' + Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * We listen for bubbled touch events on the document object.
 *
 * Firefox v8.01 (and possibly others) exhibited strange behavior when
 * mounting `onmousemove` events at some node that was not the document
 * element. The symptoms were that if your mouse is not moving over something
 * contained within that mount point (for example on the background) the
 * top-level listeners for `onmousemove` won't be called. However, if you
 * register the `mousemove` on the document object, then it will of course
 * catch all `mousemove`s. This along with iOS quirks, justifies restricting
 * top-level listeners to the document object only, at least for these
 * movement types of events and possibly all events.
 *
 * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 *
 * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
 * they bubble to document.
 *
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @param {object} contentDocumentHandle Document which owns the container
 */
function listenTo(registrationName, contentDocumentHandle) {
  var mountAt = contentDocumentHandle;
  var isListening = getListeningForDocument(mountAt);
  var dependencies = registrationNameDependencies[registrationName];

  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
      if (dependency === 'topWheel') {
        if (isEventSupported('wheel')) {
          trapBubbledEvent('topWheel', 'wheel', mountAt);
        } else if (isEventSupported('mousewheel')) {
          trapBubbledEvent('topWheel', 'mousewheel', mountAt);
        } else {
          // Firefox needs to capture a different mouse scroll event.
          // @see http://www.quirksmode.org/dom/events/tests/scroll.html
          trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
        }
      } else if (dependency === 'topScroll') {
        trapCapturedEvent('topScroll', 'scroll', mountAt);
      } else if (dependency === 'topFocus' || dependency === 'topBlur') {
        trapCapturedEvent('topFocus', 'focus', mountAt);
        trapCapturedEvent('topBlur', 'blur', mountAt);

        // to make sure blur and focus event listeners are only attached once
        isListening.topBlur = true;
        isListening.topFocus = true;
      } else if (dependency === 'topCancel') {
        if (isEventSupported('cancel', true)) {
          trapCapturedEvent('topCancel', 'cancel', mountAt);
        }
        isListening.topCancel = true;
      } else if (dependency === 'topClose') {
        if (isEventSupported('close', true)) {
          trapCapturedEvent('topClose', 'close', mountAt);
        }
        isListening.topClose = true;
      } else if (topLevelTypes.hasOwnProperty(dependency)) {
        trapBubbledEvent(dependency, topLevelTypes[dependency], mountAt);
      }

      isListening[dependency] = true;
    }
  }
}

function isListeningToAllDependencies(registrationName, mountAt) {
  var isListening = getListeningForDocument(mountAt);
  var dependencies = registrationNameDependencies[registrationName];
  for (var i = 0; i < dependencies.length; i++) {
    var dependency = dependencies[i];
    if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
      return false;
    }
  }
  return true;
}

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */
function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === TEXT_NODE) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */
function getOffsets(outerNode) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode$$1 = selection.focusNode;
  var focusOffset = selection.focusOffset;

  // In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
  // up/down buttons on an <input type="number">. Anonymous divs do not seem to
  // expose properties, triggering a "Permission denied error" if any of its
  // properties are accessed. The only seemingly possible way to avoid erroring
  // is to access a property that typically works for non-anonymous divs and
  // catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
  try {
    /* eslint-disable no-unused-expressions */
    anchorNode.nodeType;
    focusNode$$1.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  return getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode$$1, focusOffset);
}

/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */
function getModernOffsetsFromPoints(outerNode, anchorNode, anchorOffset, focusNode$$1, focusOffset) {
  var length = 0;
  var start = -1;
  var end = -1;
  var indexWithinAnchor = 0;
  var indexWithinFocus = 0;
  var node = outerNode;
  var parentNode = null;

  outer: while (true) {
    var next = null;

    while (true) {
      if (node === anchorNode && (anchorOffset === 0 || node.nodeType === TEXT_NODE)) {
        start = length + anchorOffset;
      }
      if (node === focusNode$$1 && (focusOffset === 0 || node.nodeType === TEXT_NODE)) {
        end = length + focusOffset;
      }

      if (node.nodeType === TEXT_NODE) {
        length += node.nodeValue.length;
      }

      if ((next = node.firstChild) === null) {
        break;
      }
      // Moving from `node` to its first child `next`.
      parentNode = node;
      node = next;
    }

    while (true) {
      if (node === outerNode) {
        // If `outerNode` has children, this is always the second time visiting
        // it. If it has no children, this is still the first loop, and the only
        // valid selection is anchorNode and focusNode both equal to this node
        // and both offsets 0, in which case we will have handled above.
        break outer;
      }
      if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset) {
        start = length;
      }
      if (parentNode === focusNode$$1 && ++indexWithinFocus === focusOffset) {
        end = length;
      }
      if ((next = node.nextSibling) !== null) {
        break;
      }
      node = parentNode;
      parentNode = node.parentNode;
    }

    // Moving from `node` to its next sibling `next`.
    node = next;
  }

  if (start === -1 || end === -1) {
    // This should never happen. (Would happen if the anchor/focus nodes aren't
    // actually inside the passed-in node.)
    return null;
  }

  return {
    start: start,
    end: end
  };
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor()].length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset(node, start);
  var endMarker = getNodeForCharacterOffset(node, end);

  if (startMarker && endMarker) {
    if (selection.rangeCount === 1 && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) {
      return;
    }
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

function isInDocument(node) {
  return containsNode(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */

function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
}

function getSelectionInformation() {
  var focusedElem = getActiveElement();
  return {
    focusedElem: focusedElem,
    selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
  };
}

/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */
function restoreSelection(priorSelectionInformation) {
  var curFocusedElem = getActiveElement();
  var priorFocusedElem = priorSelectionInformation.focusedElem;
  var priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
    if (hasSelectionCapabilities(priorFocusedElem)) {
      setSelection(priorFocusedElem, priorSelectionRange);
    }

    // Focusing a node can change the scroll position, which is undesirable
    var ancestors = [];
    var ancestor = priorFocusedElem;
    while (ancestor = ancestor.parentNode) {
      if (ancestor.nodeType === ELEMENT_NODE) {
        ancestors.push({
          element: ancestor,
          left: ancestor.scrollLeft,
          top: ancestor.scrollTop
        });
      }
    }

    focusNode(priorFocusedElem);

    for (var i = 0; i < ancestors.length; i++) {
      var info = ancestors[i];
      info.element.scrollLeft = info.left;
      info.element.scrollTop = info.top;
    }
  }
}

/**
 * @getSelection: Gets the selection bounds of a focused textarea, input or
 * contentEditable node.
 * -@input: Look up selection bounds of this input
 * -@return {start: selectionStart, end: selectionEnd}
 */
function getSelection$1(input) {
  var selection = void 0;

  if ('selectionStart' in input) {
    // Modern browser with input or textarea.
    selection = {
      start: input.selectionStart,
      end: input.selectionEnd
    };
  } else {
    // Content editable or old IE textarea.
    selection = getOffsets(input);
  }

  return selection || { start: 0, end: 0 };
}

/**
 * @setSelection: Sets the selection bounds of a textarea or input and focuses
 * the input.
 * -@input     Set selection bounds of this input or textarea
 * -@offsets   Object of same form that is returned from get*
 */
function setSelection(input, offsets) {
  var start = offsets.start,
      end = offsets.end;

  if (end === undefined) {
    end = start;
  }

  if ('selectionStart' in input) {
    input.selectionStart = start;
    input.selectionEnd = Math.min(end, input.value.length);
  } else {
    setOffsets(input, offsets);
  }
}

var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: 'onSelect',
      captured: 'onSelectCapture'
    },
    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
  }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement$1);
  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement$1;

    accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {
  eventTypes: eventTypes$3,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === DOCUMENT_NODE ? nativeEventTarget : nativeEventTarget.ownerDocument;
    // Track whether all listeners exists for this plugin. If none exist, we do
    // not extract events. See #3639.
    if (!doc || !isListeningToAllDependencies('onSelect', doc)) {
      return null;
    }

    var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case 'topFocus':
        if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case 'topBlur':
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;
      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case 'topMouseDown':
        mouseDown = true;
        break;
      case 'topContextMenu':
      case 'topMouseUp':
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);
      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case 'topSelectionChange':
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case 'topKeyDown':
      case 'topKeyUp':
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  }
};

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */
function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  '8': 'Backspace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '19': 'Pause',
  '20': 'CapsLock',
  '27': 'Escape',
  '32': ' ',
  '33': 'PageUp',
  '34': 'PageDown',
  '35': 'End',
  '36': 'Home',
  '37': 'ArrowLeft',
  '38': 'ArrowUp',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '45': 'Insert',
  '46': 'Delete',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
  '144': 'NumLock',
  '145': 'ScrollLock',
  '224': 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */
var TransitionEventInterface = {
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent$1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent$1.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */
var eventTypes$4 = {};
var topLevelEventsToDispatchConfig = {};
['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'cancel', 'canPlay', 'canPlayThrough', 'click', 'close', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'toggle', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  var onEvent = 'on' + capitalizedEvent;
  var topEvent = 'top' + capitalizedEvent;

  var type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture'
    },
    dependencies: [topEvent]
  };
  eventTypes$4[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
});

// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes = ['topAbort', 'topCancel', 'topCanPlay', 'topCanPlayThrough', 'topClose', 'topDurationChange', 'topEmptied', 'topEncrypted', 'topEnded', 'topError', 'topInput', 'topInvalid', 'topLoad', 'topLoadedData', 'topLoadedMetadata', 'topLoadStart', 'topPause', 'topPlay', 'topPlaying', 'topProgress', 'topRateChange', 'topReset', 'topSeeked', 'topSeeking', 'topStalled', 'topSubmit', 'topSuspend', 'topTimeUpdate', 'topToggle', 'topVolumeChange', 'topWaiting'];

var SimpleEventPlugin = {
  eventTypes: eventTypes$4,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case 'topKeyPress':
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case 'topKeyDown':
      case 'topKeyUp':
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case 'topBlur':
      case 'topFocus':
        EventConstructor = SyntheticFocusEvent;
        break;
      case 'topClick':
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case 'topDoubleClick':
      case 'topMouseDown':
      case 'topMouseMove':
      case 'topMouseUp':
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case 'topMouseOut':
      case 'topMouseOver':
      case 'topContextMenu':
        EventConstructor = SyntheticMouseEvent;
        break;
      case 'topDrag':
      case 'topDragEnd':
      case 'topDragEnter':
      case 'topDragExit':
      case 'topDragLeave':
      case 'topDragOver':
      case 'topDragStart':
      case 'topDrop':
        EventConstructor = SyntheticDragEvent;
        break;
      case 'topTouchCancel':
      case 'topTouchEnd':
      case 'topTouchMove':
      case 'topTouchStart':
        EventConstructor = SyntheticTouchEvent;
        break;
      case 'topAnimationEnd':
      case 'topAnimationIteration':
      case 'topAnimationStart':
        EventConstructor = SyntheticAnimationEvent;
        break;
      case 'topTransitionEnd':
        EventConstructor = SyntheticTransitionEvent;
        break;
      case 'topScroll':
        EventConstructor = SyntheticUIEvent;
        break;
      case 'topWheel':
        EventConstructor = SyntheticWheelEvent;
        break;
      case 'topCopy':
      case 'topCut':
      case 'topPaste':
        EventConstructor = SyntheticClipboardEvent;
        break;
      default:
        {
          if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
            warning(false, 'SimpleEventPlugin: Unhandled event type, `%s`. This warning ' + 'is likely caused by a bug in React. Please file an issue.', topLevelType);
          }
        }
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent$1;
        break;
    }
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    accumulateTwoPhaseDispatches(event);
    return event;
  }
};

setHandleTopLevel(handleTopLevel);

/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */
injection$1.injectEventPluginOrder(DOMEventPluginOrder);
injection$2.injectComponentTree(ReactDOMComponentTree);

/**
 * Some important event plugins included by default (without having to require
 * them).
 */
injection$1.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});

var enableAsyncSubtreeAPI = true;
var enableAsyncSchedulingByDefaultInReactDOM = false;
// Exports React.Fragment
var enableReactFragment = false;
// Exports ReactDOM.createRoot
var enableCreateRoot = false;
var enableUserTimingAPI = true;

// Mutating mode (React DOM, React ART, React Native):
var enableMutatingReconciler = true;
// Experimental noop mode (currently unused):
var enableNoopReconciler = false;
// Experimental persistent mode (CS):
var enablePersistentReconciler = false;

// Only used in www builds.

var valueStack = [];

{
  var fiberStack = [];
}

var index = -1;

function createCursor(defaultValue) {
  return {
    current: defaultValue
  };
}



function pop(cursor, fiber) {
  if (index < 0) {
    {
      warning(false, 'Unexpected pop.');
    }
    return;
  }

  {
    if (fiber !== fiberStack[index]) {
      warning(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  {
    fiberStack[index] = null;
  }

  index--;
}

function push(cursor, value, fiber) {
  index++;

  valueStack[index] = cursor.current;

  {
    fiberStack[index] = fiber;
  }

  cursor.current = value;
}

function reset$1() {
  while (index > -1) {
    valueStack[index] = null;

    {
      fiberStack[index] = null;
    }

    index--;
  }
}

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName(owner);
      }
      return describeComponentFrame(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

function getCurrentFiberOwnerName() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    var owner = fiber._debugOwner;
    if (owner !== null && typeof owner !== 'undefined') {
      return getComponentName(owner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFiber.current = null;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber) {
  ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber.current = fiber;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentPhase(phase) {
  ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
  current: null,
  phase: null,
  resetCurrentFiber: resetCurrentFiber,
  setCurrentFiber: setCurrentFiber,
  setCurrentPhase: setCurrentPhase,
  getCurrentFiberOwnerName: getCurrentFiberOwnerName,
  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
};

// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji = '\u269B';
var warningEmoji = '\u26D4';
var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber = null;
// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase = null;
var currentPhaseFiber = null;
// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting = false;
var hasScheduledUpdateInCurrentCommit = false;
var hasScheduledUpdateInCurrentPhase = false;
var commitCountInCurrentWorkLoop = 0;
var effectCountInCurrentCommit = 0;
var isWaitingForCallback = false;
// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit = new Set();

var formatMarkName = function (markName) {
  return reactEmoji + ' ' + markName;
};

var formatLabel = function (label, warning$$1) {
  var prefix = warning$$1 ? warningEmoji + ' ' : reactEmoji + ' ';
  var suffix = warning$$1 ? ' Warning: ' + warning$$1 : '';
  return '' + prefix + label + suffix;
};

var beginMark = function (markName) {
  performance.mark(formatMarkName(markName));
};

var clearMark = function (markName) {
  performance.clearMarks(formatMarkName(markName));
};

var endMark = function (label, markName, warning$$1) {
  var formattedMarkName = formatMarkName(markName);
  var formattedLabel = formatLabel(label, warning$$1);
  try {
    performance.measure(formattedLabel, formattedMarkName);
  } catch (err) {}
  // If previous mark was missing for some reason, this will throw.
  // This could only happen if React crashed in an unexpected place earlier.
  // Don't pile on with more errors.

  // Clear marks immediately to avoid growing buffer.
  performance.clearMarks(formattedMarkName);
  performance.clearMeasures(formattedLabel);
};

var getFiberMarkName = function (label, debugID) {
  return label + ' (#' + debugID + ')';
};

var getFiberLabel = function (componentName, isMounted, phase) {
  if (phase === null) {
    // These are composite component total time measurements.
    return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
  } else {
    // Composite component methods.
    return componentName + '.' + phase;
  }
};

var beginFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);

  if (isCommitting && labelsInCurrentCommit.has(label)) {
    // During the commit phase, we don't show duplicate labels because
    // there is a fixed overhead for every measurement, and we don't
    // want to stretch the commit phase beyond necessary.
    return false;
  }
  labelsInCurrentCommit.add(label);

  var markName = getFiberMarkName(label, debugID);
  beginMark(markName);
  return true;
};

var clearFiberMark = function (fiber, phase) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  clearMark(markName);
};

var endFiberMark = function (fiber, phase, warning$$1) {
  var componentName = getComponentName(fiber) || 'Unknown';
  var debugID = fiber._debugID;
  var isMounted = fiber.alternate !== null;
  var label = getFiberLabel(componentName, isMounted, phase);
  var markName = getFiberMarkName(label, debugID);
  endMark(label, markName, warning$$1);
};

var shouldIgnoreFiber = function (fiber) {
  // Host components should be skipped in the timeline.
  // We could check typeof fiber.type, but does this work with RN?
  switch (fiber.tag) {
    case HostRoot:
    case HostComponent:
    case HostText:
    case HostPortal:
    case ReturnComponent:
    case Fragment:
      return true;
    default:
      return false;
  }
};

var clearPendingPhaseMeasurement = function () {
  if (currentPhase !== null && currentPhaseFiber !== null) {
    clearFiberMark(currentPhaseFiber, currentPhase);
  }
  currentPhaseFiber = null;
  currentPhase = null;
  hasScheduledUpdateInCurrentPhase = false;
};

var pauseTimers = function () {
  // Stops all currently active measurements so that they can be resumed
  // if we continue in a later deferred loop from the same unit of work.
  var fiber = currentFiber;
  while (fiber) {
    if (fiber._debugIsCurrentlyTiming) {
      endFiberMark(fiber, null, null);
    }
    fiber = fiber['return'];
  }
};

var resumeTimersRecursively = function (fiber) {
  if (fiber['return'] !== null) {
    resumeTimersRecursively(fiber['return']);
  }
  if (fiber._debugIsCurrentlyTiming) {
    beginFiberMark(fiber, null);
  }
};

var resumeTimers = function () {
  // Resumes all measurements that were active during the last deferred loop.
  if (currentFiber !== null) {
    resumeTimersRecursively(currentFiber);
  }
};

function recordEffect() {
  if (enableUserTimingAPI) {
    effectCountInCurrentCommit++;
  }
}

function recordScheduleUpdate() {
  if (enableUserTimingAPI) {
    if (isCommitting) {
      hasScheduledUpdateInCurrentCommit = true;
    }
    if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
      hasScheduledUpdateInCurrentPhase = true;
    }
  }
}

function startRequestCallbackTimer() {
  if (enableUserTimingAPI) {
    if (supportsUserTiming && !isWaitingForCallback) {
      isWaitingForCallback = true;
      beginMark('(Waiting for async callback...)');
    }
  }
}

function stopRequestCallbackTimer(didExpire) {
  if (enableUserTimingAPI) {
    if (supportsUserTiming) {
      isWaitingForCallback = false;
      var warning$$1 = didExpire ? 'React was blocked by main thread' : null;
      endMark('(Waiting for async callback...)', '(Waiting for async callback...)', warning$$1);
    }
  }
}

function startWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, this is the fiber to unwind from.
    currentFiber = fiber;
    if (!beginFiberMark(fiber, null)) {
      return;
    }
    fiber._debugIsCurrentlyTiming = true;
  }
}

function cancelWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // Remember we shouldn't complete measurement for this fiber.
    // Otherwise flamechart will be deep even for small updates.
    fiber._debugIsCurrentlyTiming = false;
    clearFiberMark(fiber, null);
  }
}

function stopWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber['return'];
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    endFiberMark(fiber, null, null);
  }
}

function stopFailedWorkTimer(fiber) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
      return;
    }
    // If we pause, its parent is the fiber to unwind from.
    currentFiber = fiber['return'];
    if (!fiber._debugIsCurrentlyTiming) {
      return;
    }
    fiber._debugIsCurrentlyTiming = false;
    var warning$$1 = 'An error was thrown inside this error boundary';
    endFiberMark(fiber, null, warning$$1);
  }
}

function startPhaseTimer(fiber, phase) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    clearPendingPhaseMeasurement();
    if (!beginFiberMark(fiber, phase)) {
      return;
    }
    currentPhaseFiber = fiber;
    currentPhase = phase;
  }
}

function stopPhaseTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    if (currentPhase !== null && currentPhaseFiber !== null) {
      var warning$$1 = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
      endFiberMark(currentPhaseFiber, currentPhase, warning$$1);
    }
    currentPhase = null;
    currentPhaseFiber = null;
  }
}

function startWorkLoopTimer(nextUnitOfWork) {
  if (enableUserTimingAPI) {
    currentFiber = nextUnitOfWork;
    if (!supportsUserTiming) {
      return;
    }
    commitCountInCurrentWorkLoop = 0;
    // This is top level call.
    // Any other measurements are performed within.
    beginMark('(React Tree Reconciliation)');
    // Resume any measurements that were in progress during the last loop.
    resumeTimers();
  }
}

function stopWorkLoopTimer(interruptedBy) {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var warning$$1 = null;
    if (interruptedBy !== null) {
      if (interruptedBy.tag === HostRoot) {
        warning$$1 = 'A top-level update interrupted the previous render';
      } else {
        var componentName = getComponentName(interruptedBy) || 'Unknown';
        warning$$1 = 'An update to ' + componentName + ' interrupted the previous render';
      }
    } else if (commitCountInCurrentWorkLoop > 1) {
      warning$$1 = 'There were cascading updates';
    }
    commitCountInCurrentWorkLoop = 0;
    // Pause any measurements until the next loop.
    pauseTimers();
    endMark('(React Tree Reconciliation)', '(React Tree Reconciliation)', warning$$1);
  }
}

function startCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    isCommitting = true;
    hasScheduledUpdateInCurrentCommit = false;
    labelsInCurrentCommit.clear();
    beginMark('(Committing Changes)');
  }
}

function stopCommitTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }

    var warning$$1 = null;
    if (hasScheduledUpdateInCurrentCommit) {
      warning$$1 = 'Lifecycle hook scheduled a cascading update';
    } else if (commitCountInCurrentWorkLoop > 0) {
      warning$$1 = 'Caused by a cascading update in earlier commit';
    }
    hasScheduledUpdateInCurrentCommit = false;
    commitCountInCurrentWorkLoop++;
    isCommitting = false;
    labelsInCurrentCommit.clear();

    endMark('(Committing Changes)', '(Committing Changes)', warning$$1);
  }
}

function startCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Committing Host Effects)');
  }
}

function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
  }
}

function startCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    effectCountInCurrentCommit = 0;
    beginMark('(Calling Lifecycle Methods)');
  }
}

function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI) {
    if (!supportsUserTiming) {
      return;
    }
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
  }
}

{
  var warnedAboutMissingGetChildContext = {};
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyObject);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyObject;

function getUnmaskedContext(workInProgress) {
  var hasOwnContext = isContextProvider(workInProgress);
  if (hasOwnContext) {
    // If the fiber is a context provider itself, when we read its context
    // we have already pushed its own child context on the stack. A context
    // provider should not "see" its own child context. Therefore we read the
    // previous (parent) context instead for a context provider.
    return previousContext;
  }
  return contextStackCursor.current;
}

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  var instance = workInProgress.stateNode;
  instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
  instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}

function getMaskedContext(workInProgress, unmaskedContext) {
  var type = workInProgress.type;
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject;
  }

  // Avoid recreating masked context unless unmasked context has changed.
  // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
  // This may trigger infinite loops if componentWillReceiveProps calls setState.
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
    return instance.__reactInternalMemoizedMaskedChildContext;
  }

  var context = {};
  for (var key in contextTypes) {
    context[key] = unmaskedContext[key];
  }

  {
    var name = getComponentName(workInProgress) || 'Unknown';
    checkPropTypes(contextTypes, context, 'context', name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // Context is created before the class component is instantiated so check for instance.
  if (instance) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return context;
}

function hasContextChanged() {
  return didPerformWorkStackCursor.current;
}

function isContextConsumer(fiber) {
  return fiber.tag === ClassComponent && fiber.type.contextTypes != null;
}

function isContextProvider(fiber) {
  return fiber.tag === ClassComponent && fiber.type.childContextTypes != null;
}

function popContextProvider(fiber) {
  if (!isContextProvider(fiber)) {
    return;
  }

  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}

function pushTopLevelContextObject(fiber, context, didChange) {
  !(contextStackCursor.cursor == null) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}

function processChildContext(fiber, parentContext) {
  var instance = fiber.stateNode;
  var childContextTypes = fiber.type.childContextTypes;

  // TODO (bvaughn) Replace this behavior with an invariant() in the future.
  // It has only been added in Fiber to match the (unintentional) behavior in Stack.
  if (typeof instance.getChildContext !== 'function') {
    {
      var componentName = getComponentName(fiber) || 'Unknown';

      if (!warnedAboutMissingGetChildContext[componentName]) {
        warnedAboutMissingGetChildContext[componentName] = true;
        warning(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
      }
    }
    return parentContext;
  }

  var childContext = void 0;
  {
    ReactDebugCurrentFiber.setCurrentPhase('getChildContext');
  }
  startPhaseTimer(fiber, 'getChildContext');
  childContext = instance.getChildContext();
  stopPhaseTimer();
  {
    ReactDebugCurrentFiber.setCurrentPhase(null);
  }
  for (var contextKey in childContext) {
    !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || 'Unknown', contextKey) : void 0;
  }
  {
    var name = getComponentName(fiber) || 'Unknown';
    checkPropTypes(childContextTypes, childContext, 'child context', name,
    // In practice, there is one case in which we won't get a stack. It's when
    // somebody calls unstable_renderSubtreeIntoContainer() and we process
    // context from the parent component instance. The stack will be missing
    // because it's outside of the reconciliation, and so the pointer has not
    // been set. This is rare and doesn't matter. We'll also remove that API.
    ReactDebugCurrentFiber.getCurrentFiberStackAddendum);
  }

  return _assign({}, parentContext, childContext);
}

function pushContextProvider(workInProgress) {
  if (!isContextProvider(workInProgress)) {
    return false;
  }

  var instance = workInProgress.stateNode;
  // We push the context as early as possible to ensure stack integrity.
  // If the instance does not exist yet, we will push null at first,
  // and replace it on the stack later when invalidating the context.
  var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

  // Remember the parent context so we can merge with it later.
  // Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
  previousContext = contextStackCursor.current;
  push(contextStackCursor, memoizedMergedChildContext, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

  return true;
}

function invalidateContextProvider(workInProgress, didChange) {
  var instance = workInProgress.stateNode;
  !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  if (didChange) {
    // Merge parent and own context.
    // Skip this if we're not updating due to sCU.
    // This avoids unnecessarily recomputing memoized values.
    var mergedContext = processChildContext(workInProgress, previousContext);
    instance.__reactInternalMemoizedMergedChildContext = mergedContext;

    // Replace the old (or empty) context with the new one.
    // It is important to unwind the context in the reverse order.
    pop(didPerformWorkStackCursor, workInProgress);
    pop(contextStackCursor, workInProgress);
    // Now push the new context and mark that it has changed.
    push(contextStackCursor, mergedContext, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  } else {
    pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }
}

function resetContext() {
  previousContext = emptyObject;
  contextStackCursor.current = emptyObject;
  didPerformWorkStackCursor.current = false;
}

function findCurrentUnmaskedContext(fiber) {
  // Currently this is only used with renderSubtreeIntoContainer; not sure if it
  // makes sense elsewhere
  !(isFiberMounted(fiber) && fiber.tag === ClassComponent) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  var node = fiber;
  while (node.tag !== HostRoot) {
    if (isContextProvider(node)) {
      return node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    var parent = node['return'];
    !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    node = parent;
  }
  return node.stateNode.context;
}

var NoWork = 0; // TODO: Use an opaque type once ESLint et al support the syntax

var Sync = 1;
var Never = 2147483647; // Max int32: Math.pow(2, 31) - 1

var UNIT_SIZE = 10;
var MAGIC_NUMBER_OFFSET = 2;

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return (ms / UNIT_SIZE | 0) + MAGIC_NUMBER_OFFSET;
}

function ceiling(num, precision) {
  return ((num / precision | 0) + 1) * precision;
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return ceiling(currentTime + expirationInMs / UNIT_SIZE, bucketSizeMs / UNIT_SIZE);
}

var NoContext = 0;
var AsyncUpdates = 1;

{
  var hasBadMapPolyfill = false;
  try {
    var nonExtensibleObject = Object.preventExtensions({});
    /* eslint-disable no-new */
    new Map([[nonExtensibleObject, null]]);
    new Set([nonExtensibleObject]);
    /* eslint-enable no-new */
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


{
  var debugCounter = 1;
}

function FiberNode(tag, key, internalContextTag) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this['return'] = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = null;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;

  this.internalContextTag = internalContextTag;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;

  this.alternate = null;

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}

// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, key, internalContextTag) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, key, internalContextTag);
};

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current, pendingProps, expirationTime) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(current.tag, current.key, current.internalContextTag);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    {
      // DEV-only fields
      workInProgress._debugID = current._debugID;
      workInProgress._debugSource = current._debugSource;
      workInProgress._debugOwner = current._debugOwner;
    }

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  workInProgress.expirationTime = expirationTime;
  workInProgress.pendingProps = pendingProps;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  return workInProgress;
}

function createHostRootFiber() {
  var fiber = createFiber(HostRoot, null, NoContext);
  return fiber;
}

function createFiberFromElement(element, internalContextTag, expirationTime) {
  var owner = null;
  {
    owner = element._owner;
  }

  var fiber = void 0;
  var type = element.type,
      key = element.key;

  if (typeof type === 'function') {
    fiber = shouldConstruct(type) ? createFiber(ClassComponent, key, internalContextTag) : createFiber(IndeterminateComponent, key, internalContextTag);
    fiber.type = type;
    fiber.pendingProps = element.props;
  } else if (typeof type === 'string') {
    fiber = createFiber(HostComponent, key, internalContextTag);
    fiber.type = type;
    fiber.pendingProps = element.props;
  } else if (typeof type === 'object' && type !== null && typeof type.tag === 'number') {
    // Currently assumed to be a continuation and therefore is a fiber already.
    // TODO: The yield system is currently broken for updates in some cases.
    // The reified yield stores a fiber, but we don't know which fiber that is;
    // the current or a workInProgress? When the continuation gets rendered here
    // we don't know if we can reuse that fiber or if we need to clone it.
    // There is probably a clever way to restructure this.
    fiber = type;
    fiber.pendingProps = element.props;
  } else {
    var info = '';
    {
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }
      var ownerName = owner ? getComponentName(owner) : null;
      if (ownerName) {
        info += '\n\nCheck the render method of `' + ownerName + '`.';
      }
    }
    invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
  }

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }

  fiber.expirationTime = expirationTime;

  return fiber;
}

function createFiberFromFragment(elements, internalContextTag, expirationTime, key) {
  var fiber = createFiber(Fragment, key, internalContextTag);
  fiber.pendingProps = elements;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromText(content, internalContextTag, expirationTime) {
  var fiber = createFiber(HostText, null, internalContextTag);
  fiber.pendingProps = content;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromHostInstanceForDeletion() {
  var fiber = createFiber(HostComponent, null, NoContext);
  fiber.type = 'DELETED';
  return fiber;
}

function createFiberFromCall(call, internalContextTag, expirationTime) {
  var fiber = createFiber(CallComponent, call.key, internalContextTag);
  fiber.type = call.handler;
  fiber.pendingProps = call;
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromReturn(returnNode, internalContextTag, expirationTime) {
  var fiber = createFiber(ReturnComponent, null, internalContextTag);
  fiber.expirationTime = expirationTime;
  return fiber;
}

function createFiberFromPortal(portal, internalContextTag, expirationTime) {
  var fiber = createFiber(HostPortal, portal.key, internalContextTag);
  fiber.pendingProps = portal.children || [];
  fiber.expirationTime = expirationTime;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null, // Used by persistent updates
    implementation: portal.implementation
  };
  return fiber;
}

function createFiberRoot(containerInfo, hydrate) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    pendingChildren: null,
    remainingExpirationTime: NoWork,
    isReadyForCommit: false,
    finishedWork: null,
    context: null,
    pendingContext: null,
    hydrate: hydrate,
    nextScheduledRoot: null
  };
  uninitializedFiber.stateNode = root;
  return root;
}

var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;

function catchErrors(fn) {
  return function (arg) {
    try {
      return fn(arg);
    } catch (err) {
      if (true && !hasLoggedError) {
        hasLoggedError = true;
        warning(false, 'React DevTools encountered an error: %s', err);
      }
    }
  };
}

function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    // No DevTools
    return false;
  }
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled) {
    // This isn't a real property on the hook, but it can be set to opt out
    // of DevTools integration and associated warnings and logs.
    // https://github.com/facebook/react/issues/3877
    return true;
  }
  if (!hook.supportsFiber) {
    {
      warning(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
    }
    // DevTools exists, even though it doesn't support Fiber.
    return true;
  }
  try {
    var rendererID = hook.inject(internals);
    // We have successfully injected, so now it is safe to set up hooks.
    onCommitFiberRoot = catchErrors(function (root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function (fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {
    // Catch all errors because it is unsafe to throw during initialization.
    {
      warning(false, 'React DevTools encountered an error: %s.', err);
    }
  }
  // DevTools exists
  return true;
}

function onCommitRoot(root) {
  if (typeof onCommitFiberRoot === 'function') {
    onCommitFiberRoot(root);
  }
}

function onCommitUnmount(fiber) {
  if (typeof onCommitFiberUnmount === 'function') {
    onCommitFiberUnmount(fiber);
  }
}

{
  var didWarnUpdateInsideUpdate = false;
}

// Callbacks are not validated until invocation


// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.


function createUpdateQueue(baseState) {
  var queue = {
    baseState: baseState,
    expirationTime: NoWork,
    first: null,
    last: null,
    callbackList: null,
    hasForceUpdate: false,
    isInitialized: false
  };
  {
    queue.isProcessing = false;
  }
  return queue;
}

function insertUpdateIntoQueue(queue, update) {
  // Append the update to the end of the list.
  if (queue.last === null) {
    // Queue is empty
    queue.first = queue.last = update;
  } else {
    queue.last.next = update;
    queue.last = update;
  }
  if (queue.expirationTime === NoWork || queue.expirationTime > update.expirationTime) {
    queue.expirationTime = update.expirationTime;
  }
}

function insertUpdateIntoFiber(fiber, update) {
  // We'll have at least one and at most two distinct update queues.
  var alternateFiber = fiber.alternate;
  var queue1 = fiber.updateQueue;
  if (queue1 === null) {
    // TODO: We don't know what the base state will be until we begin work.
    // It depends on which fiber is the next current. Initialize with an empty
    // base state, then set to the memoizedState when rendering. Not super
    // happy with this approach.
    queue1 = fiber.updateQueue = createUpdateQueue(null);
  }

  var queue2 = void 0;
  if (alternateFiber !== null) {
    queue2 = alternateFiber.updateQueue;
    if (queue2 === null) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue(null);
    }
  } else {
    queue2 = null;
  }
  queue2 = queue2 !== queue1 ? queue2 : null;

  // Warn if an update is scheduled from inside an updater function.
  {
    if ((queue1.isProcessing || queue2 !== null && queue2.isProcessing) && !didWarnUpdateInsideUpdate) {
      warning(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
      didWarnUpdateInsideUpdate = true;
    }
  }

  // If there's only one queue, add the update to that queue and exit.
  if (queue2 === null) {
    insertUpdateIntoQueue(queue1, update);
    return;
  }

  // If either queue is empty, we need to add to both queues.
  if (queue1.last === null || queue2.last === null) {
    insertUpdateIntoQueue(queue1, update);
    insertUpdateIntoQueue(queue2, update);
    return;
  }

  // If both lists are not empty, the last update is the same for both lists
  // because of structural sharing. So, we should only append to one of
  // the lists.
  insertUpdateIntoQueue(queue1, update);
  // But we still need to update the `last` pointer of queue2.
  queue2.last = update;
}

function getUpdateExpirationTime(fiber) {
  if (fiber.tag !== ClassComponent && fiber.tag !== HostRoot) {
    return NoWork;
  }
  var updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return NoWork;
  }
  return updateQueue.expirationTime;
}

function getStateFromUpdate(update, instance, prevState, props) {
  var partialState = update.partialState;
  if (typeof partialState === 'function') {
    var updateFn = partialState;
    return updateFn.call(instance, prevState, props);
  } else {
    return partialState;
  }
}

function processUpdateQueue(current, workInProgress, queue, instance, props, renderExpirationTime) {
  if (current !== null && current.updateQueue === queue) {
    // We need to create a work-in-progress queue, by cloning the current queue.
    var currentQueue = queue;
    queue = workInProgress.updateQueue = {
      baseState: currentQueue.baseState,
      expirationTime: currentQueue.expirationTime,
      first: currentQueue.first,
      last: currentQueue.last,
      isInitialized: currentQueue.isInitialized,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    };
  }

  {
    // Set this flag so we can warn if setState is called inside the update
    // function of another setState.
    queue.isProcessing = true;
  }

  // Reset the remaining expiration time. If we skip over any updates, we'll
  // increase this accordingly.
  queue.expirationTime = NoWork;

  // TODO: We don't know what the base state will be until we begin work.
  // It depends on which fiber is the next current. Initialize with an empty
  // base state, then set to the memoizedState when rendering. Not super
  // happy with this approach.
  var state = void 0;
  if (queue.isInitialized) {
    state = queue.baseState;
  } else {
    state = queue.baseState = workInProgress.memoizedState;
    queue.isInitialized = true;
  }
  var dontMutatePrevState = true;
  var update = queue.first;
  var didSkip = false;
  while (update !== null) {
    var updateExpirationTime = update.expirationTime;
    if (updateExpirationTime > renderExpirationTime) {
      // This update does not have sufficient priority. Skip it.
      var remainingExpirationTime = queue.expirationTime;
      if (remainingExpirationTime === NoWork || remainingExpirationTime > updateExpirationTime) {
        // Update the remaining expiration time.
        queue.expirationTime = updateExpirationTime;
      }
      if (!didSkip) {
        didSkip = true;
        queue.baseState = state;
      }
      // Continue to the next update.
      update = update.next;
      continue;
    }

    // This update does have sufficient priority.

    // If no previous updates were skipped, drop this update from the queue by
    // advancing the head of the list.
    if (!didSkip) {
      queue.first = update.next;
      if (queue.first === null) {
        queue.last = null;
      }
    }

    // Process the update
    var _partialState = void 0;
    if (update.isReplace) {
      state = getStateFromUpdate(update, instance, state, props);
      dontMutatePrevState = true;
    } else {
      _partialState = getStateFromUpdate(update, instance, state, props);
      if (_partialState) {
        if (dontMutatePrevState) {
          // $FlowFixMe: Idk how to type this properly.
          state = _assign({}, state, _partialState);
        } else {
          state = _assign(state, _partialState);
        }
        dontMutatePrevState = false;
      }
    }
    if (update.isForced) {
      queue.hasForceUpdate = true;
    }
    if (update.callback !== null) {
      // Append to list of callbacks.
      var _callbackList = queue.callbackList;
      if (_callbackList === null) {
        _callbackList = queue.callbackList = [];
      }
      _callbackList.push(update);
    }
    update = update.next;
  }

  if (queue.callbackList !== null) {
    workInProgress.effectTag |= Callback;
  } else if (queue.first === null && !queue.hasForceUpdate) {
    // The queue is empty. We can reset it.
    workInProgress.updateQueue = null;
  }

  if (!didSkip) {
    didSkip = true;
    queue.baseState = state;
  }

  {
    // No longer processing.
    queue.isProcessing = false;
  }

  return state;
}

function commitCallbacks(queue, context) {
  var callbackList = queue.callbackList;
  if (callbackList === null) {
    return;
  }
  // Set the list to null to make sure they don't get called more than once.
  queue.callbackList = null;
  for (var i = 0; i < callbackList.length; i++) {
    var update = callbackList[i];
    var _callback = update.callback;
    // This update might be processed again. Clear the callback so it's only
    // called once.
    update.callback = null;
    !(typeof _callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback) : void 0;
    _callback.call(context);
  }
}

var fakeInternalInstance = {};
var isArray = Array.isArray;

{
  var didWarnAboutStateAssignmentForComponent = {};

  var warnOnInvalidCallback = function (callback, callerName) {
    warning(callback === null || typeof callback === 'function', '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
  };

  // This is so gross but it's at least non-critical and can be removed if
  // it causes problems. This is meant to give a nicer error message for
  // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
  // ...)) which otherwise throws a "_processChildContext is not a function"
  // exception.
  Object.defineProperty(fakeInternalInstance, '_processChildContext', {
    enumerable: false,
    value: function () {
      invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
    }
  });
  Object.freeze(fakeInternalInstance);
}

var ReactFiberClassComponent = function (scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState) {
  // Class component state updater
  var updater = {
    isMounted: isMounted,
    enqueueSetState: function (instance, partialState, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'setState');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: partialState,
        callback: callback,
        isReplace: false,
        isForced: false,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    },
    enqueueReplaceState: function (instance, state, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: state,
        callback: callback,
        isReplace: true,
        isForced: false,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    },
    enqueueForceUpdate: function (instance, callback) {
      var fiber = get(instance);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      var expirationTime = computeExpirationForFiber(fiber);
      var update = {
        expirationTime: expirationTime,
        partialState: null,
        callback: callback,
        isReplace: false,
        isForced: true,
        nextCallback: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    }
  };

  function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      // If the workInProgress already has an Update effect, return true
      return true;
    }

    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    if (typeof instance.shouldComponentUpdate === 'function') {
      startPhaseTimer(workInProgress, 'shouldComponentUpdate');
      var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
      stopPhaseTimer();

      {
        warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName(workInProgress) || 'Unknown');
      }

      return shouldUpdate;
    }

    if (type.prototype && type.prototype.isPureReactComponent) {
      return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
    }

    return true;
  }

  function checkClassInstance(workInProgress) {
    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    {
      var name = getComponentName(workInProgress);
      var renderPresent = instance.render;

      if (!renderPresent) {
        if (type.prototype && typeof type.prototype.render === 'function') {
          warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: did you accidentally return an object from the constructor?', name);
        } else {
          warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
        }
      }

      var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
      warning(noGetInitialStateOnES6, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
      var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
      warning(noGetDefaultPropsOnES6, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
      var noInstancePropTypes = !instance.propTypes;
      warning(noInstancePropTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
      var noInstanceContextTypes = !instance.contextTypes;
      warning(noInstanceContextTypes, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
      var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
      warning(noComponentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
      if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
        warning(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName(workInProgress) || 'A pure component');
      }
      var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
      warning(noComponentDidUnmount, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
      var noComponentDidReceiveProps = typeof instance.componentDidReceiveProps !== 'function';
      warning(noComponentDidReceiveProps, '%s has a method called ' + 'componentDidReceiveProps(). But there is no such lifecycle method. ' + 'If you meant to update the state in response to changing props, ' + 'use componentWillReceiveProps(). If you meant to fetch data or ' + 'run side-effects or mutations after React has updated the UI, use componentDidUpdate().', name);
      var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
      warning(noComponentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
      var hasMutatedProps = instance.props !== workInProgress.pendingProps;
      warning(instance.props === undefined || !hasMutatedProps, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
      var noInstanceDefaultProps = !instance.defaultProps;
      warning(noInstanceDefaultProps, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
    }

    var state = instance.state;
    if (state && (typeof state !== 'object' || isArray(state))) {
      invariant(false, '%s.state: must be set to an object or null', getComponentName(workInProgress));
    }
    if (typeof instance.getChildContext === 'function') {
      !(typeof workInProgress.type.childContextTypes === 'object') ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', getComponentName(workInProgress)) : void 0;
    }
  }

  function resetInputPointers(workInProgress, instance) {
    instance.props = workInProgress.memoizedProps;
    instance.state = workInProgress.memoizedState;
  }

  function adoptClassInstance(workInProgress, instance) {
    instance.updater = updater;
    workInProgress.stateNode = instance;
    // The instance needs access to the fiber so that it can schedule updates
    set(instance, workInProgress);
    {
      instance._reactInternalInstance = fakeInternalInstance;
    }
  }

  function constructClassInstance(workInProgress, props) {
    var ctor = workInProgress.type;
    var unmaskedContext = getUnmaskedContext(workInProgress);
    var needsContext = isContextConsumer(workInProgress);
    var context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;
    var instance = new ctor(props, context);
    adoptClassInstance(workInProgress, instance);

    // Cache unmasked context so we can avoid recreating masked context unless necessary.
    // ReactFiberContext usually updates this cache but can't for newly-created instances.
    if (needsContext) {
      cacheContext(workInProgress, unmaskedContext, context);
    }

    return instance;
  }

  function callComponentWillMount(workInProgress, instance) {
    startPhaseTimer(workInProgress, 'componentWillMount');
    var oldState = instance.state;
    instance.componentWillMount();

    stopPhaseTimer();

    if (oldState !== instance.state) {
      {
        warning(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName(workInProgress));
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
    startPhaseTimer(workInProgress, 'componentWillReceiveProps');
    var oldState = instance.state;
    instance.componentWillReceiveProps(newProps, newContext);
    stopPhaseTimer();

    if (instance.state !== oldState) {
      {
        var componentName = getComponentName(workInProgress) || 'Component';
        if (!didWarnAboutStateAssignmentForComponent[componentName]) {
          warning(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', componentName);
          didWarnAboutStateAssignmentForComponent[componentName] = true;
        }
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  // Invokes the mount life-cycles on a previously never rendered instance.
  function mountClassInstance(workInProgress, renderExpirationTime) {
    var current = workInProgress.alternate;

    {
      checkClassInstance(workInProgress);
    }

    var instance = workInProgress.stateNode;
    var state = instance.state || null;

    var props = workInProgress.pendingProps;
    !props ? invariant(false, 'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    var unmaskedContext = getUnmaskedContext(workInProgress);

    instance.props = props;
    instance.state = workInProgress.memoizedState = state;
    instance.refs = emptyObject;
    instance.context = getMaskedContext(workInProgress, unmaskedContext);

    if (enableAsyncSubtreeAPI && workInProgress.type != null && workInProgress.type.prototype != null && workInProgress.type.prototype.unstable_isAsyncReactComponent === true) {
      workInProgress.internalContextTag |= AsyncUpdates;
    }

    if (typeof instance.componentWillMount === 'function') {
      callComponentWillMount(workInProgress, instance);
      // If we had additional state updates during this life-cycle, let's
      // process them now.
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        instance.state = processUpdateQueue(current, workInProgress, updateQueue, instance, props, renderExpirationTime);
      }
    }
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update;
    }
  }

  // Called on a preexisting class instance. Returns false if a resumed render
  // could be reused.
  // function resumeMountClassInstance(
  //   workInProgress: Fiber,
  //   priorityLevel: PriorityLevel,
  // ): boolean {
  //   const instance = workInProgress.stateNode;
  //   resetInputPointers(workInProgress, instance);

  //   let newState = workInProgress.memoizedState;
  //   let newProps = workInProgress.pendingProps;
  //   if (!newProps) {
  //     // If there isn't any new props, then we'll reuse the memoized props.
  //     // This could be from already completed work.
  //     newProps = workInProgress.memoizedProps;
  //     invariant(
  //       newProps != null,
  //       'There should always be pending or memoized props. This error is ' +
  //         'likely caused by a bug in React. Please file an issue.',
  //     );
  //   }
  //   const newUnmaskedContext = getUnmaskedContext(workInProgress);
  //   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

  //   const oldContext = instance.context;
  //   const oldProps = workInProgress.memoizedProps;

  //   if (
  //     typeof instance.componentWillReceiveProps === 'function' &&
  //     (oldProps !== newProps || oldContext !== newContext)
  //   ) {
  //     callComponentWillReceiveProps(
  //       workInProgress,
  //       instance,
  //       newProps,
  //       newContext,
  //     );
  //   }

  //   // Process the update queue before calling shouldComponentUpdate
  //   const updateQueue = workInProgress.updateQueue;
  //   if (updateQueue !== null) {
  //     newState = processUpdateQueue(
  //       workInProgress,
  //       updateQueue,
  //       instance,
  //       newState,
  //       newProps,
  //       priorityLevel,
  //     );
  //   }

  //   // TODO: Should we deal with a setState that happened after the last
  //   // componentWillMount and before this componentWillMount? Probably
  //   // unsupported anyway.

  //   if (
  //     !checkShouldComponentUpdate(
  //       workInProgress,
  //       workInProgress.memoizedProps,
  //       newProps,
  //       workInProgress.memoizedState,
  //       newState,
  //       newContext,
  //     )
  //   ) {
  //     // Update the existing instance's state, props, and context pointers even
  //     // though we're bailing out.
  //     instance.props = newProps;
  //     instance.state = newState;
  //     instance.context = newContext;
  //     return false;
  //   }

  //   // Update the input pointers now so that they are correct when we call
  //   // componentWillMount
  //   instance.props = newProps;
  //   instance.state = newState;
  //   instance.context = newContext;

  //   if (typeof instance.componentWillMount === 'function') {
  //     callComponentWillMount(workInProgress, instance);
  //     // componentWillMount may have called setState. Process the update queue.
  //     const newUpdateQueue = workInProgress.updateQueue;
  //     if (newUpdateQueue !== null) {
  //       newState = processUpdateQueue(
  //         workInProgress,
  //         newUpdateQueue,
  //         instance,
  //         newState,
  //         newProps,
  //         priorityLevel,
  //       );
  //     }
  //   }

  //   if (typeof instance.componentDidMount === 'function') {
  //     workInProgress.effectTag |= Update;
  //   }

  //   instance.state = newState;

  //   return true;
  // }

  // Invokes the update life-cycles and returns false if it shouldn't rerender.
  function updateClassInstance(current, workInProgress, renderExpirationTime) {
    var instance = workInProgress.stateNode;
    resetInputPointers(workInProgress, instance);

    var oldProps = workInProgress.memoizedProps;
    var newProps = workInProgress.pendingProps;
    if (!newProps) {
      // If there aren't any new props, then we'll reuse the memoized props.
      // This could be from already completed work.
      newProps = oldProps;
      !(newProps != null) ? invariant(false, 'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var oldContext = instance.context;
    var newUnmaskedContext = getUnmaskedContext(workInProgress);
    var newContext = getMaskedContext(workInProgress, newUnmaskedContext);

    // Note: During these life-cycles, instance.props/instance.state are what
    // ever the previously attempted to render - not the "current". However,
    // during componentDidUpdate we pass the "current" props.

    if (typeof instance.componentWillReceiveProps === 'function' && (oldProps !== newProps || oldContext !== newContext)) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
    }

    // Compute the next state using the memoized state and the update queue.
    var oldState = workInProgress.memoizedState;
    // TODO: Previous state can be null.
    var newState = void 0;
    if (workInProgress.updateQueue !== null) {
      newState = processUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, newProps, renderExpirationTime);
    } else {
      newState = oldState;
    }

    if (oldProps === newProps && oldState === newState && !hasContextChanged() && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update;
        }
      }
      return false;
    }

    var shouldUpdate = checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

    if (shouldUpdate) {
      if (typeof instance.componentWillUpdate === 'function') {
        startPhaseTimer(workInProgress, 'componentWillUpdate');
        instance.componentWillUpdate(newProps, newState, newContext);
        stopPhaseTimer();
      }
      if (typeof instance.componentDidUpdate === 'function') {
        workInProgress.effectTag |= Update;
      }
    } else {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update;
        }
      }

      // If shouldComponentUpdate returned false, we should still update the
      // memoized props/state to indicate that this work can be reused.
      memoizeProps(workInProgress, newProps);
      memoizeState(workInProgress, newState);
    }

    // Update the existing instance's state, props, and context pointers even
    // if shouldComponentUpdate returns false.
    instance.props = newProps;
    instance.state = newState;
    instance.context = newContext;

    return shouldUpdate;
  }

  return {
    adoptClassInstance: adoptClassInstance,
    constructClassInstance: constructClassInstance,
    mountClassInstance: mountClassInstance,
    // resumeMountClassInstance,
    updateClassInstance: updateClassInstance
  };
};

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_PORTAL_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.portal') || 0xeaca;

function createPortal$1(children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}

var getCurrentFiberStackAddendum$1 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


{
  var didWarnAboutMaps = false;
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  var ownerHasKeyUseWarning = {};
  var ownerHasFunctionTypeWarning = {};

  var warnForMissingKey = function (child) {
    if (child === null || typeof child !== 'object') {
      return;
    }
    if (!child._store || child._store.validated || child.key != null) {
      return;
    }
    !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    child._store.validated = true;

    var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$1() || '');
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    warning(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$1());
  };
}

var isArray$1 = Array.isArray;

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE;
var REACT_CALL_TYPE;
var REACT_RETURN_TYPE;
var REACT_FRAGMENT_TYPE;
if (typeof Symbol === 'function' && Symbol['for']) {
  REACT_ELEMENT_TYPE = Symbol['for']('react.element');
  REACT_CALL_TYPE = Symbol['for']('react.call');
  REACT_RETURN_TYPE = Symbol['for']('react.return');
  REACT_FRAGMENT_TYPE = Symbol['for']('react.fragment');
} else {
  REACT_ELEMENT_TYPE = 0xeac7;
  REACT_CALL_TYPE = 0xeac8;
  REACT_RETURN_TYPE = 0xeac9;
  REACT_FRAGMENT_TYPE = 0xeacb;
}

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var iteratorFn = ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
  return null;
}

function coerceRef(current, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== 'function') {
    if (element._owner) {
      var owner = element._owner;
      var inst = void 0;
      if (owner) {
        var ownerFiber = owner;
        !(ownerFiber.tag === ClassComponent) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
        inst = ownerFiber.stateNode;
      }
      !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
      var stringRef = '' + mixedRef;
      // Check if previous string ref matches new string ref
      if (current !== null && current.ref !== null && current.ref._stringRef === stringRef) {
        return current.ref;
      }
      var ref = function (value) {
        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    } else {
      !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
      !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).', mixedRef) : void 0;
    }
  }
  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== 'textarea') {
    var addendum = '';
    {
      addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$1() || '');
    }
    invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
  }
}

function warnOnFunctionType() {
  var currentComponentErrorInfo = 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.' + (getCurrentFiberStackAddendum$1() || '');

  if (ownerHasFunctionTypeWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasFunctionTypeWarning[currentComponentErrorInfo] = true;

  warning(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$1() || '');
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldClone, shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    if (!shouldClone) {
      // When we're reconciling in place we have a work in progress copy. We
      // actually want the current copy. If there is no current copy, then we
      // don't need to track deletion side-effects.
      if (childToDelete.alternate === null) {
        return;
      }
      childToDelete = childToDelete.alternate;
    }
    // Deletions are added in reversed order so we add it to the front.
    // At this point, the return fiber's effect list is empty except for
    // deletions, so we can just append the deletion to the list. The remaining
    // effects aren't added until the complete phase. Once we implement
    // resuming, this may not be true.
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    var existingChildren = new Map();

    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, pendingProps, expirationTime) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    if (shouldClone) {
      var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
      clone.index = 0;
      clone.sibling = null;
      return clone;
    } else {
      // We override the expiration time even if it is earlier, because if
      // we're reconciling at a later time that means that this was
      // down-prioritized.
      fiber.expirationTime = expirationTime;
      fiber.effectTag = NoEffect;
      fiber.index = 0;
      fiber.sibling = null;
      fiber.pendingProps = pendingProps;
      return fiber;
    }
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    var current = newFiber.alternate;
    if (current !== null) {
      var oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, expirationTime) {
    if (current === null || current.tag !== HostText) {
      // Insert
      var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, textContent, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, expirationTime) {
    if (current !== null && current.type === element.type) {
      // Move based on index
      var existing = useFiber(current, element.props, expirationTime);
      existing.ref = coerceRef(current, element);
      existing['return'] = returnFiber;
      {
        existing._debugSource = element._source;
        existing._debugOwner = element._owner;
      }
      return existing;
    } else {
      // Insert
      var created = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
      created.ref = coerceRef(current, element);
      created['return'] = returnFiber;
      return created;
    }
  }

  function updateCall(returnFiber, current, call, expirationTime) {
    // TODO: Should this also compare handler to determine whether to reuse?
    if (current === null || current.tag !== CallComponent) {
      // Insert
      var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, call, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateReturn(returnFiber, current, returnNode, expirationTime) {
    if (current === null || current.tag !== ReturnComponent) {
      // Insert
      var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
      created.type = returnNode.value;
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, null, expirationTime);
      existing.type = returnNode.value;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updatePortal(returnFiber, current, portal, expirationTime) {
    if (current === null || current.tag !== HostPortal || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, portal.children || [], expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, expirationTime, key) {
    if (current === null || current.tag !== Fragment) {
      // Insert
      var created = createFiberFromFragment(fragment, returnFiber.internalContextTag, expirationTime, key);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, fragment, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText('' + newChild, returnFiber.internalContextTag, expirationTime);
      created['return'] = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              var _created = createFiberFromFragment(newChild.props.children, returnFiber.internalContextTag, expirationTime, newChild.key);
              _created['return'] = returnFiber;
              return _created;
            } else {
              var _created2 = createFiberFromElement(newChild, returnFiber.internalContextTag, expirationTime);
              _created2.ref = coerceRef(null, newChild);
              _created2['return'] = returnFiber;
              return _created2;
            }
          }

        case REACT_CALL_TYPE:
          {
            var _created3 = createFiberFromCall(newChild, returnFiber.internalContextTag, expirationTime);
            _created3['return'] = returnFiber;
            return _created3;
          }

        case REACT_RETURN_TYPE:
          {
            var _created4 = createFiberFromReturn(newChild, returnFiber.internalContextTag, expirationTime);
            _created4.type = newChild.value;
            _created4['return'] = returnFiber;
            return _created4;
          }

        case REACT_PORTAL_TYPE:
          {
            var _created5 = createFiberFromPortal(newChild, returnFiber.internalContextTag, expirationTime);
            _created5['return'] = returnFiber;
            return _created5;
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        var _created6 = createFiberFromFragment(newChild, returnFiber.internalContextTag, expirationTime, null);
        _created6['return'] = returnFiber;
        return _created6;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    // Update the fiber if the keys match, otherwise return null.

    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              if (newChild.type === REACT_FRAGMENT_TYPE) {
                return updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key);
              }
              return updateElement(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_CALL_TYPE:
          {
            if (newChild.key === key) {
              return updateCall(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_RETURN_TYPE:
          {
            // Returns don't have keys. If the previous node is implicitly keyed
            // we can continue to replace it without aborting even if it is not a
            // yield.
            if (key === null) {
              return updateReturn(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }

        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, expirationTime);
            } else {
              return null;
            }
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        if (key !== null) {
          return null;
        }

        return updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes don't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, expirationTime);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            if (newChild.type === REACT_FRAGMENT_TYPE) {
              return updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key);
            }
            return updateElement(returnFiber, _matchedFiber, newChild, expirationTime);
          }

        case REACT_CALL_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateCall(returnFiber, _matchedFiber2, newChild, expirationTime);
          }

        case REACT_RETURN_TYPE:
          {
            // Returns don't have keys, so we neither have to check the old nor
            // new node for the key. If both are returns, they match.
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateReturn(returnFiber, _matchedFiber3, newChild, expirationTime);
          }

        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber4 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber4, newChild, expirationTime);
          }
      }

      if (isArray$1(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber5 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber5, newChild, expirationTime, null);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  /**
   * Warns if there is a duplicate or missing key
   */
  function warnOnInvalidKey(child, knownKeys) {
    {
      if (typeof child !== 'object' || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_CALL_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(child);
          var key = child.key;
          if (typeof key !== 'string') {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          warning(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$1());
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, expirationTime) {
    // This algorithm can't optimize by searching from boths ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    {
      // First, validate keys.
      var knownKeys = null;
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys);
      }
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
        if (!_newFiber) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
      if (_newFiber2) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    var iteratorFn = getIteratorFn(newChildrenIterable);
    !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    {
      // Warn about using Maps as children
      if (typeof newChildrenIterable.entries === 'function') {
        var possibleMap = newChildrenIterable;
        if (possibleMap.entries === iteratorFn) {
          warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$1());
          didWarnAboutMaps = true;
        }
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      var _newChildren = iteratorFn.call(newChildrenIterable);
      if (_newChildren) {
        var knownKeys = null;
        var _step = _newChildren.next();
        for (; !_step.done; _step = _newChildren.next()) {
          var child = _step.value;
          knownKeys = warnOnInvalidKey(child, knownKeys);
        }
      }
    }

    var newChildren = iteratorFn.call(newChildrenIterable);
    !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (!oldFiber) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
        if (_newFiber3 === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }
        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, textContent, expirationTime);
      existing['return'] = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText(textContent, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === Fragment ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
          existing.ref = coerceRef(child, element);
          existing['return'] = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
      var created = createFiberFromFragment(element.props.children, returnFiber.internalContextTag, expirationTime, element.key);
      created['return'] = returnFiber;
      return created;
    } else {
      var _created7 = createFiberFromElement(element, returnFiber.internalContextTag, expirationTime);
      _created7.ref = coerceRef(currentFirstChild, element);
      _created7['return'] = returnFiber;
      return _created7;
    }
  }

  function reconcileSingleCall(returnFiber, currentFirstChild, call, expirationTime) {
    var key = call.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === CallComponent) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, call, expirationTime);
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromCall(call, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleReturn(returnFiber, currentFirstChild, returnNode, expirationTime) {
    // There's no need to check for keys on yields since they're stateless.
    var child = currentFirstChild;
    if (child !== null) {
      if (child.tag === ReturnComponent) {
        deleteRemainingChildren(returnFiber, child.sibling);
        var existing = useFiber(child, null, expirationTime);
        existing.type = returnNode.value;
        existing['return'] = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
      }
    }

    var created = createFiberFromReturn(returnNode, returnFiber.internalContextTag, expirationTime);
    created.type = returnNode.value;
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, expirationTime) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, portal.children || [], expirationTime);
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromPortal(portal, returnFiber.internalContextTag, expirationTime);
    created['return'] = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle top level unkeyed fragments as if they were arrays.
    // This leads to an ambiguity between <>{[...]}</> and <>...</>.
    // We treat the ambiguous cases above the same.
    if (enableReactFragment && typeof newChild === 'object' && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null) {
      newChild = newChild.props.children;
    }

    // Handle object types
    var isObject = typeof newChild === 'object' && newChild !== null;

    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime));

        case REACT_CALL_TYPE:
          return placeSingleChild(reconcileSingleCall(returnFiber, currentFirstChild, newChild, expirationTime));
        case REACT_RETURN_TYPE:
          return placeSingleChild(reconcileSingleReturn(returnFiber, currentFirstChild, newChild, expirationTime));
        case REACT_PORTAL_TYPE:
          return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, expirationTime));
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, expirationTime));
    }

    if (isArray$1(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, expirationTime);
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }
    if (typeof newChild === 'undefined') {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent:
          {
            {
              var instance = returnFiber.stateNode;
              if (instance.render._isMockFunction) {
                // We allow auto-mocks to proceed as if they're returning null.
                break;
              }
            }
          }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionalComponent:
          {
            var Component = returnFiber.type;
            invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
          }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers = ChildReconciler(true, true);

var reconcileChildFibersInPlace = ChildReconciler(false, true);

var mountChildFibersInPlace = ChildReconciler(false, false);

function cloneChildFibers(current, workInProgress) {
  !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

  if (workInProgress.child === null) {
    return;
  }

  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
  workInProgress.child = newChild;

  newChild['return'] = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
    newChild['return'] = workInProgress;
  }
  newChild.sibling = null;
}

{
  var warnedAboutStatelessRefs = {};
}

var ReactFiberBeginWork = function (config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber) {
  var shouldSetTextContent = config.shouldSetTextContent,
      useSyncScheduling = config.useSyncScheduling,
      shouldDeprioritizeSubtree = config.shouldDeprioritizeSubtree;
  var pushHostContext = hostContext.pushHostContext,
      pushHostContainer = hostContext.pushHostContainer;
  var enterHydrationState = hydrationContext.enterHydrationState,
      resetHydrationState = hydrationContext.resetHydrationState,
      tryToClaimNextHydratableInstance = hydrationContext.tryToClaimNextHydratableInstance;

  var _ReactFiberClassCompo = ReactFiberClassComponent(scheduleWork, computeExpirationForFiber, memoizeProps, memoizeState),
      adoptClassInstance = _ReactFiberClassCompo.adoptClassInstance,
      constructClassInstance = _ReactFiberClassCompo.constructClassInstance,
      mountClassInstance = _ReactFiberClassCompo.mountClassInstance,
      updateClassInstance = _ReactFiberClassCompo.updateClassInstance;

  // TODO: Remove this and use reconcileChildrenAtExpirationTime directly.


  function reconcileChildren(current, workInProgress, nextChildren) {
    reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
  }

  function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
    if (current === null) {
      // If this is a fresh new component that hasn't been rendered yet, we
      // won't update its child set by applying minimal side-effects. Instead,
      // we will add them all to the child before it gets rendered. That means
      // we can optimize this reconciliation pass by not tracking side-effects.
      workInProgress.child = mountChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, renderExpirationTime);
    } else if (current.child === workInProgress.child) {
      // If the current child is the same as the work in progress, it means that
      // we haven't yet started any work on these children. Therefore, we use
      // the clone algorithm to create a copy of all the current children.

      // If we had any progressed work already, that is invalid at this point so
      // let's throw it out.
      workInProgress.child = reconcileChildFibers(workInProgress, workInProgress.child, nextChildren, renderExpirationTime);
    } else {
      // If, on the other hand, it is already using a clone, that means we've
      // already begun some work on this tree and we can continue where we left
      // off by reconciling against the existing children.
      workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, renderExpirationTime);
    }
  }

  function updateFragment(current, workInProgress) {
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = workInProgress.memoizedProps;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextChildren);
    return workInProgress.child;
  }

  function markRef(current, workInProgress) {
    var ref = workInProgress.ref;
    if (ref !== null && (!current || current.ref !== ref)) {
      // Schedule a Ref effect
      workInProgress.effectTag |= Ref;
    }
  }

  function updateFunctionalComponent(current, workInProgress) {
    var fn = workInProgress.type;
    var nextProps = workInProgress.pendingProps;

    var memoizedProps = workInProgress.memoizedProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextProps === null) {
        nextProps = memoizedProps;
      }
    } else {
      if (nextProps === null || memoizedProps === nextProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      // TODO: consider bringing fn.shouldComponentUpdate() back.
      // It used to be here.
    }

    var unmaskedContext = getUnmaskedContext(workInProgress);
    var context = getMaskedContext(workInProgress, unmaskedContext);

    var nextChildren;

    {
      ReactCurrentOwner.current = workInProgress;
      ReactDebugCurrentFiber.setCurrentPhase('render');
      nextChildren = fn(nextProps, context);
      ReactDebugCurrentFiber.setCurrentPhase(null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateClassComponent(current, workInProgress, renderExpirationTime) {
    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    var hasContext = pushContextProvider(workInProgress);

    var shouldUpdate = void 0;
    if (current === null) {
      if (!workInProgress.stateNode) {
        // In the initial pass we might need to construct the instance.
        constructClassInstance(workInProgress, workInProgress.pendingProps);
        mountClassInstance(workInProgress, renderExpirationTime);
        shouldUpdate = true;
      } else {
        invariant(false, 'Resuming work not yet implemented.');
        // In a resume, we'll already have an instance we can reuse.
        // shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
      }
    } else {
      shouldUpdate = updateClassInstance(current, workInProgress, renderExpirationTime);
    }
    return finishClassComponent(current, workInProgress, shouldUpdate, hasContext);
  }

  function finishClassComponent(current, workInProgress, shouldUpdate, hasContext) {
    // Refs should update even if shouldComponentUpdate returns false
    markRef(current, workInProgress);

    if (!shouldUpdate) {
      // Context providers should defer to sCU for rendering
      if (hasContext) {
        invalidateContextProvider(workInProgress, false);
      }

      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var instance = workInProgress.stateNode;

    // Rerender
    ReactCurrentOwner.current = workInProgress;
    var nextChildren = void 0;
    {
      ReactDebugCurrentFiber.setCurrentPhase('render');
      nextChildren = instance.render();
      ReactDebugCurrentFiber.setCurrentPhase(null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;
    reconcileChildren(current, workInProgress, nextChildren);
    // Memoize props and state using the values we just used to render.
    // TODO: Restructure so we never read values from the instance.
    memoizeState(workInProgress, instance.state);
    memoizeProps(workInProgress, instance.props);

    // The context might have changed so we need to recalculate it.
    if (hasContext) {
      invalidateContextProvider(workInProgress, true);
    }

    return workInProgress.child;
  }

  function pushHostRootContext(workInProgress) {
    var root = workInProgress.stateNode;
    if (root.pendingContext) {
      pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context);
    } else if (root.context) {
      // Should always be set
      pushTopLevelContextObject(workInProgress, root.context, false);
    }
    pushHostContainer(workInProgress, root.containerInfo);
  }

  function updateHostRoot(current, workInProgress, renderExpirationTime) {
    pushHostRootContext(workInProgress);
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      var prevState = workInProgress.memoizedState;
      var state = processUpdateQueue(current, workInProgress, updateQueue, null, null, renderExpirationTime);
      if (prevState === state) {
        // If the state is the same as before, that's a bailout because we had
        // no work that expires at this time.
        resetHydrationState();
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      var element = state.element;
      var root = workInProgress.stateNode;
      if ((current === null || current.child === null) && root.hydrate && enterHydrationState(workInProgress)) {
        // If we don't have any current children this might be the first pass.
        // We always try to hydrate. If this isn't a hydration pass there won't
        // be any children to hydrate which is effectively the same thing as
        // not hydrating.

        // This is a bit of a hack. We track the host root as a placement to
        // know that we're currently in a mounting state. That way isMounted
        // works as expected. We must reset this before committing.
        // TODO: Delete this when we delete isMounted and findDOMNode.
        workInProgress.effectTag |= Placement;

        // Ensure that children mount into this root without tracking
        // side-effects. This ensures that we don't store Placement effects on
        // nodes that will be hydrated.
        workInProgress.child = mountChildFibersInPlace(workInProgress, workInProgress.child, element, renderExpirationTime);
      } else {
        // Otherwise reset hydration state in case we aborted and resumed another
        // root.
        resetHydrationState();
        reconcileChildren(current, workInProgress, element);
      }
      memoizeState(workInProgress, state);
      return workInProgress.child;
    }
    resetHydrationState();
    // If there is no update queue, that's a bailout because the root has no props.
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  function updateHostComponent(current, workInProgress, renderExpirationTime) {
    pushHostContext(workInProgress);

    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }

    var type = workInProgress.type;
    var memoizedProps = workInProgress.memoizedProps;
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = memoizedProps;
      !(nextProps !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var prevProps = current !== null ? current.memoizedProps : null;

    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
    } else if (nextProps === null || memoizedProps === nextProps) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextProps.children;
    var isDirectTextChild = shouldSetTextContent(type, nextProps);

    if (isDirectTextChild) {
      // We special case a direct text child of a host node. This is a common
      // case. We won't handle it as a reified child. We will instead handle
      // this in the host environment that also have access to this prop. That
      // avoids allocating another HostText fiber and traversing it.
      nextChildren = null;
    } else if (prevProps && shouldSetTextContent(type, prevProps)) {
      // If we're switching from a direct text child to a normal child, or to
      // empty, we need to schedule the text content to be reset.
      workInProgress.effectTag |= ContentReset;
    }

    markRef(current, workInProgress);

    // Check the host config to see if the children are offscreen/hidden.
    if (renderExpirationTime !== Never && !useSyncScheduling && shouldDeprioritizeSubtree(type, nextProps)) {
      // Down-prioritize the children.
      workInProgress.expirationTime = Never;
      // Bailout and come back to this fiber later.
      return null;
    }

    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateHostText(current, workInProgress) {
    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = workInProgress.memoizedProps;
    }
    memoizeProps(workInProgress, nextProps);
    // Nothing to do here. This is terminal. We'll do the completion step
    // immediately after.
    return null;
  }

  function mountIndeterminateComponent(current, workInProgress, renderExpirationTime) {
    !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    var fn = workInProgress.type;
    var props = workInProgress.pendingProps;
    var unmaskedContext = getUnmaskedContext(workInProgress);
    var context = getMaskedContext(workInProgress, unmaskedContext);

    var value;

    {
      if (fn.prototype && typeof fn.prototype.render === 'function') {
        var componentName = getComponentName(workInProgress);
        warning(false, "The <%s /> component appears to have a render method, but doesn't extend React.Component. " + 'This is likely to cause errors. Change %s to extend React.Component instead.', componentName, componentName);
      }
      ReactCurrentOwner.current = workInProgress;
      value = fn(props, context);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork;

    if (typeof value === 'object' && value !== null && typeof value.render === 'function') {
      // Proceed under the assumption that this is a class instance
      workInProgress.tag = ClassComponent;

      // Push context providers early to prevent context stack mismatches.
      // During mounting we don't know the child context yet as the instance doesn't exist.
      // We will invalidate the child context in finishClassComponent() right after rendering.
      var hasContext = pushContextProvider(workInProgress);
      adoptClassInstance(workInProgress, value);
      mountClassInstance(workInProgress, renderExpirationTime);
      return finishClassComponent(current, workInProgress, true, hasContext);
    } else {
      // Proceed under the assumption that this is a functional component
      workInProgress.tag = FunctionalComponent;
      {
        var Component = workInProgress.type;

        if (Component) {
          warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component');
        }
        if (workInProgress.ref !== null) {
          var info = '';
          var ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
          if (ownerName) {
            info += '\n\nCheck the render method of `' + ownerName + '`.';
          }

          var warningKey = ownerName || workInProgress._debugID || '';
          var debugSource = workInProgress._debugSource;
          if (debugSource) {
            warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
          }
          if (!warnedAboutStatelessRefs[warningKey]) {
            warnedAboutStatelessRefs[warningKey] = true;
            warning(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum());
          }
        }
      }
      reconcileChildren(current, workInProgress, value);
      memoizeProps(workInProgress, props);
      return workInProgress.child;
    }
  }

  function updateCallComponent(current, workInProgress, renderExpirationTime) {
    var nextCall = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextCall === null) {
        nextCall = current && current.memoizedProps;
        !(nextCall !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextCall === null || workInProgress.memoizedProps === nextCall) {
      nextCall = workInProgress.memoizedProps;
      // TODO: When bailing out, we might need to return the stateNode instead
      // of the child. To check it for work.
      // return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextCall.children;

    // The following is a fork of reconcileChildrenAtExpirationTime but using
    // stateNode to store the child.
    if (current === null) {
      workInProgress.stateNode = mountChildFibersInPlace(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
    } else if (current.child === workInProgress.child) {
      workInProgress.stateNode = reconcileChildFibers(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
    } else {
      workInProgress.stateNode = reconcileChildFibersInPlace(workInProgress, workInProgress.stateNode, nextChildren, renderExpirationTime);
    }

    memoizeProps(workInProgress, nextCall);
    // This doesn't take arbitrary time so we could synchronously just begin
    // eagerly do the work of workInProgress.child as an optimization.
    return workInProgress.stateNode;
  }

  function updatePortalComponent(current, workInProgress, renderExpirationTime) {
    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = current && current.memoizedProps;
        !(nextChildren != null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    if (current === null) {
      // Portals are special because we don't append the children during mount
      // but at commit. Therefore we need to track insertions which the normal
      // flow doesn't do during mount. This doesn't happen at the root because
      // the root always starts with a "current" with a null child.
      // TODO: Consider unifying this with how the root works.
      workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, renderExpirationTime);
      memoizeProps(workInProgress, nextChildren);
    } else {
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
    }
    return workInProgress.child;
  }

  /*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */

  function bailoutOnAlreadyFinishedWork(current, workInProgress) {
    cancelWorkTimer(workInProgress);

    // TODO: We should ideally be able to bail out early if the children have no
    // more work to do. However, since we don't have a separation of this
    // Fiber's priority and its children yet - we don't know without doing lots
    // of the same work we do anyway. Once we have that separation we can just
    // bail out here if the children has no more work at this priority level.
    // if (workInProgress.priorityOfChildren <= priorityLevel) {
    //   // If there are side-effects in these children that have not yet been
    //   // committed we need to ensure that they get properly transferred up.
    //   if (current && current.child !== workInProgress.child) {
    //     reuseChildrenEffects(workInProgress, child);
    //   }
    //   return null;
    // }

    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }

  function bailoutOnLowPriority(current, workInProgress) {
    cancelWorkTimer(workInProgress);

    // TODO: Handle HostComponent tags here as well and call pushHostContext()?
    // See PR 8590 discussion for context
    switch (workInProgress.tag) {
      case HostRoot:
        pushHostRootContext(workInProgress);
        break;
      case ClassComponent:
        pushContextProvider(workInProgress);
        break;
      case HostPortal:
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        break;
    }
    // TODO: What if this is currently in progress?
    // How can that happen? How is this not being cloned?
    return null;
  }

  // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
  function memoizeProps(workInProgress, nextProps) {
    workInProgress.memoizedProps = nextProps;
  }

  function memoizeState(workInProgress, nextState) {
    workInProgress.memoizedState = nextState;
    // Don't reset the updateQueue, in case there are pending updates. Resetting
    // is handled by processUpdateQueue.
  }

  function beginWork(current, workInProgress, renderExpirationTime) {
    if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    switch (workInProgress.tag) {
      case IndeterminateComponent:
        return mountIndeterminateComponent(current, workInProgress, renderExpirationTime);
      case FunctionalComponent:
        return updateFunctionalComponent(current, workInProgress);
      case ClassComponent:
        return updateClassComponent(current, workInProgress, renderExpirationTime);
      case HostRoot:
        return updateHostRoot(current, workInProgress, renderExpirationTime);
      case HostComponent:
        return updateHostComponent(current, workInProgress, renderExpirationTime);
      case HostText:
        return updateHostText(current, workInProgress);
      case CallHandlerPhase:
        // This is a restart. Reset the tag to the initial phase.
        workInProgress.tag = CallComponent;
      // Intentionally fall through since this is now the same.
      case CallComponent:
        return updateCallComponent(current, workInProgress, renderExpirationTime);
      case ReturnComponent:
        // A return component is just a placeholder, we can just run through the
        // next one immediately.
        return null;
      case HostPortal:
        return updatePortalComponent(current, workInProgress, renderExpirationTime);
      case Fragment:
        return updateFragment(current, workInProgress);
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function beginFailedWork(current, workInProgress, renderExpirationTime) {
    // Push context providers here to avoid a push/pop context mismatch.
    switch (workInProgress.tag) {
      case ClassComponent:
        pushContextProvider(workInProgress);
        break;
      case HostRoot:
        pushHostRootContext(workInProgress);
        break;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }

    // Add an error effect so we can handle the error during the commit phase
    workInProgress.effectTag |= Err;

    // This is a weird case where we do "resume" work — work that failed on
    // our first attempt. Because we no longer have a notion of "progressed
    // deletions," reset the child to the current child to make sure we delete
    // it again. TODO: Find a better way to handle this, perhaps during a more
    // general overhaul of error handling.
    if (current === null) {
      workInProgress.child = null;
    } else if (workInProgress.child !== current.child) {
      workInProgress.child = current.child;
    }

    if (workInProgress.expirationTime === NoWork || workInProgress.expirationTime > renderExpirationTime) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    // If we don't bail out, we're going be recomputing our children so we need
    // to drop our effect list.
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

    // Unmount the current children as if the component rendered null
    var nextChildren = null;
    reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime);

    if (workInProgress.tag === ClassComponent) {
      var instance = workInProgress.stateNode;
      workInProgress.memoizedProps = instance.props;
      workInProgress.memoizedState = instance.state;
    }

    return workInProgress.child;
  }

  return {
    beginWork: beginWork,
    beginFailedWork: beginFailedWork
  };
};

var ReactFiberCompleteWork = function (config, hostContext, hydrationContext) {
  var createInstance = config.createInstance,
      createTextInstance = config.createTextInstance,
      appendInitialChild = config.appendInitialChild,
      finalizeInitialChildren = config.finalizeInitialChildren,
      prepareUpdate = config.prepareUpdate,
      mutation = config.mutation,
      persistence = config.persistence;
  var getRootHostContainer = hostContext.getRootHostContainer,
      popHostContext = hostContext.popHostContext,
      getHostContext = hostContext.getHostContext,
      popHostContainer = hostContext.popHostContainer;
  var prepareToHydrateHostInstance = hydrationContext.prepareToHydrateHostInstance,
      prepareToHydrateHostTextInstance = hydrationContext.prepareToHydrateHostTextInstance,
      popHydrationState = hydrationContext.popHydrationState;


  function markUpdate(workInProgress) {
    // Tag the fiber with an update effect. This turns a Placement into
    // an UpdateAndPlacement.
    workInProgress.effectTag |= Update;
  }

  function markRef(workInProgress) {
    workInProgress.effectTag |= Ref;
  }

  function appendAllReturns(returns, workInProgress) {
    var node = workInProgress.stateNode;
    if (node) {
      node['return'] = workInProgress;
    }
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText || node.tag === HostPortal) {
        invariant(false, 'A call cannot have host component children.');
      } else if (node.tag === ReturnComponent) {
        returns.push(node.type);
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function moveCallToHandlerPhase(current, workInProgress, renderExpirationTime) {
    var call = workInProgress.memoizedProps;
    !call ? invariant(false, 'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    // First step of the call has completed. Now we need to do the second.
    // TODO: It would be nice to have a multi stage call represented by a
    // single component, or at least tail call optimize nested ones. Currently
    // that requires additional fields that we don't want to add to the fiber.
    // So this requires nested handlers.
    // Note: This doesn't mutate the alternate node. I don't think it needs to
    // since this stage is reset for every pass.
    workInProgress.tag = CallHandlerPhase;

    // Build up the returns.
    // TODO: Compare this to a generator or opaque helpers like Children.
    var returns = [];
    appendAllReturns(returns, workInProgress);
    var fn = call.handler;
    var props = call.props;
    var nextChildren = fn(props, returns);

    var currentFirstChild = current !== null ? current.child : null;
    workInProgress.child = reconcileChildFibers(workInProgress, currentFirstChild, nextChildren, renderExpirationTime);
    return workInProgress.child;
  }

  function appendAllChildren(parent, workInProgress) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent || node.tag === HostText) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.tag === HostPortal) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  var updateHostContainer = void 0;
  var updateHostComponent = void 0;
  var updateHostText = void 0;
  if (mutation) {
    if (enableMutatingReconciler) {
      // Mutation mode
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // TODO: Type this specific to this type of component.
        workInProgress.updateQueue = updatePayload;
        // If the update payload indicates that there is a change or if there
        // is a new ref we mark this as an update. All the work is done in commitWork.
        if (updatePayload) {
          markUpdate(workInProgress);
        }
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        // If the text differs, mark it as an update. All the work in done in commitWork.
        if (oldText !== newText) {
          markUpdate(workInProgress);
        }
      };
    } else {
      invariant(false, 'Mutating reconciler is disabled.');
    }
  } else if (persistence) {
    if (enablePersistentReconciler) {
      // Persistent host tree mode
      var cloneInstance = persistence.cloneInstance,
          createContainerChildSet = persistence.createContainerChildSet,
          appendChildToContainerChildSet = persistence.appendChildToContainerChildSet,
          finalizeContainerChildren = persistence.finalizeContainerChildren;

      // An unfortunate fork of appendAllChildren because we have two different parent types.

      var appendAllChildrenToContainer = function (containerChildSet, workInProgress) {
        // We only have the top Fiber that was created but we need recurse down its
        // children to find all the terminal nodes.
        var node = workInProgress.child;
        while (node !== null) {
          if (node.tag === HostComponent || node.tag === HostText) {
            appendChildToContainerChildSet(containerChildSet, node.stateNode);
          } else if (node.tag === HostPortal) {
            // If we have a portal child, then we don't want to traverse
            // down its children. Instead, we'll get insertions from each child in
            // the portal directly.
          } else if (node.child !== null) {
            node.child['return'] = node;
            node = node.child;
            continue;
          }
          if (node === workInProgress) {
            return;
          }
          while (node.sibling === null) {
            if (node['return'] === null || node['return'] === workInProgress) {
              return;
            }
            node = node['return'];
          }
          node.sibling['return'] = node['return'];
          node = node.sibling;
        }
      };
      updateHostContainer = function (workInProgress) {
        var portalOrRoot = workInProgress.stateNode;
        var childrenUnchanged = workInProgress.firstEffect === null;
        if (childrenUnchanged) {
          // No changes, just reuse the existing instance.
        } else {
          var container = portalOrRoot.containerInfo;
          var newChildSet = createContainerChildSet(container);
          if (finalizeContainerChildren(container, newChildSet)) {
            markUpdate(workInProgress);
          }
          portalOrRoot.pendingChildren = newChildSet;
          // If children might have changed, we have to add them all to the set.
          appendAllChildrenToContainer(newChildSet, workInProgress);
          // Schedule an update on the container to swap out the container.
          markUpdate(workInProgress);
        }
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // If there are no effects associated with this node, then none of our children had any updates.
        // This guarantees that we can reuse all of them.
        var childrenUnchanged = workInProgress.firstEffect === null;
        var currentInstance = current.stateNode;
        if (childrenUnchanged && updatePayload === null) {
          // No changes, just reuse the existing instance.
          // Note that this might release a previous clone.
          workInProgress.stateNode = currentInstance;
        } else {
          var recyclableInstance = workInProgress.stateNode;
          var newInstance = cloneInstance(currentInstance, updatePayload, type, oldProps, newProps, workInProgress, childrenUnchanged, recyclableInstance);
          if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance)) {
            markUpdate(workInProgress);
          }
          workInProgress.stateNode = newInstance;
          if (childrenUnchanged) {
            // If there are no other effects in this tree, we need to flag this node as having one.
            // Even though we're not going to use it for anything.
            // Otherwise parents won't know that there are new children to propagate upwards.
            markUpdate(workInProgress);
          } else {
            // If children might have changed, we have to add them all to the set.
            appendAllChildren(newInstance, workInProgress);
          }
        }
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        if (oldText !== newText) {
          // If the text content differs, we'll create a new text instance for it.
          var rootContainerInstance = getRootHostContainer();
          var currentHostContext = getHostContext();
          workInProgress.stateNode = createTextInstance(newText, rootContainerInstance, currentHostContext, workInProgress);
          // We'll have to mark it as having an effect, even though we won't use the effect for anything.
          // This lets the parents know that at least one of their children has changed.
          markUpdate(workInProgress);
        }
      };
    } else {
      invariant(false, 'Persistent reconciler is disabled.');
    }
  } else {
    if (enableNoopReconciler) {
      // No host operations
      updateHostContainer = function (workInProgress) {
        // Noop
      };
      updateHostComponent = function (current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance) {
        // Noop
      };
      updateHostText = function (current, workInProgress, oldText, newText) {
        // Noop
      };
    } else {
      invariant(false, 'Noop reconciler is disabled.');
    }
  }

  function completeWork(current, workInProgress, renderExpirationTime) {
    // Get the latest props.
    var newProps = workInProgress.pendingProps;
    if (newProps === null) {
      newProps = workInProgress.memoizedProps;
    } else if (workInProgress.expirationTime !== Never || renderExpirationTime === Never) {
      // Reset the pending props, unless this was a down-prioritization.
      workInProgress.pendingProps = null;
    }

    switch (workInProgress.tag) {
      case FunctionalComponent:
        return null;
      case ClassComponent:
        {
          // We are leaving this subtree, so pop context if any.
          popContextProvider(workInProgress);
          return null;
        }
      case HostRoot:
        {
          popHostContainer(workInProgress);
          popTopLevelContextObject(workInProgress);
          var fiberRoot = workInProgress.stateNode;
          if (fiberRoot.pendingContext) {
            fiberRoot.context = fiberRoot.pendingContext;
            fiberRoot.pendingContext = null;
          }

          if (current === null || current.child === null) {
            // If we hydrated, pop so that we can delete any remaining children
            // that weren't hydrated.
            popHydrationState(workInProgress);
            // This resets the hacky state to fix isMounted before committing.
            // TODO: Delete this when we delete isMounted and findDOMNode.
            workInProgress.effectTag &= ~Placement;
          }
          updateHostContainer(workInProgress);
          return null;
        }
      case HostComponent:
        {
          popHostContext(workInProgress);
          var rootContainerInstance = getRootHostContainer();
          var type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null) {
            // If we have an alternate, that means this is an update and we need to
            // schedule a side-effect to do the updates.
            var oldProps = current.memoizedProps;
            // If we get updated because one of our children updated, we don't
            // have newProps so we'll have to reuse them.
            // TODO: Split the update API as separate for the props vs. children.
            // Even better would be if children weren't special cased at all tho.
            var instance = workInProgress.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

            updateHostComponent(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance);

            if (current.ref !== workInProgress.ref) {
              markRef(workInProgress);
            }
          } else {
            if (!newProps) {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }

            var _currentHostContext = getHostContext();
            // TODO: Move createInstance to beginWork and keep it on a context
            // "stack" as the parent. Then append children as we go in beginWork
            // or completeWork depending on we want to add then top->down or
            // bottom->up. Top->down is faster in IE11.
            var wasHydrated = popHydrationState(workInProgress);
            if (wasHydrated) {
              // TODO: Move this and createInstance step into the beginPhase
              // to consolidate.
              if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                // If changes to the hydrated node needs to be applied at the
                // commit-phase we mark this as such.
                markUpdate(workInProgress);
              }
            } else {
              var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

              appendAllChildren(_instance, workInProgress);

              // Certain renderers require commit-time effects for initial mount.
              // (eg DOM renderer supports auto-focus for certain elements).
              // Make sure such renderers get scheduled for later work.
              if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance)) {
                markUpdate(workInProgress);
              }
              workInProgress.stateNode = _instance;
            }

            if (workInProgress.ref !== null) {
              // If there is a ref on a host node we need to schedule a callback
              markRef(workInProgress);
            }
          }
          return null;
        }
      case HostText:
        {
          var newText = newProps;
          if (current && workInProgress.stateNode != null) {
            var oldText = current.memoizedProps;
            // If we have an alternate, that means this is an update and we need
            // to schedule a side-effect to do the updates.
            updateHostText(current, workInProgress, oldText, newText);
          } else {
            if (typeof newText !== 'string') {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }
            var _rootContainerInstance = getRootHostContainer();
            var _currentHostContext2 = getHostContext();
            var _wasHydrated = popHydrationState(workInProgress);
            if (_wasHydrated) {
              if (prepareToHydrateHostTextInstance(workInProgress)) {
                markUpdate(workInProgress);
              }
            } else {
              workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
            }
          }
          return null;
        }
      case CallComponent:
        return moveCallToHandlerPhase(current, workInProgress, renderExpirationTime);
      case CallHandlerPhase:
        // Reset the tag to now be a first phase call.
        workInProgress.tag = CallComponent;
        return null;
      case ReturnComponent:
        // Does nothing.
        return null;
      case Fragment:
        return null;
      case HostPortal:
        popHostContainer(workInProgress);
        updateHostContainer(workInProgress);
        return null;
      // Error cases
      case IndeterminateComponent:
        invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
      // eslint-disable-next-line no-fallthrough
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  return {
    completeWork: completeWork
  };
};

var invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError$1 = ReactErrorUtils.hasCaughtError;
var clearCaughtError$1 = ReactErrorUtils.clearCaughtError;


var ReactFiberCommitWork = function (config, captureError) {
  var getPublicInstance = config.getPublicInstance,
      mutation = config.mutation,
      persistence = config.persistence;


  var callComponentWillUnmountWithTimer = function (current, instance) {
    startPhaseTimer(current, 'componentWillUnmount');
    instance.props = current.memoizedProps;
    instance.state = current.memoizedState;
    instance.componentWillUnmount();
    stopPhaseTimer();
  };

  // Capture errors so they don't interrupt unmounting.
  function safelyCallComponentWillUnmount(current, instance) {
    {
      invokeGuardedCallback$2(null, callComponentWillUnmountWithTimer, null, current, instance);
      if (hasCaughtError$1()) {
        var unmountError = clearCaughtError$1();
        captureError(current, unmountError);
      }
    }
  }

  function safelyDetachRef(current) {
    var ref = current.ref;
    if (ref !== null) {
      {
        invokeGuardedCallback$2(null, ref, null, null);
        if (hasCaughtError$1()) {
          var refError = clearCaughtError$1();
          captureError(current, refError);
        }
      }
    }
  }

  function commitLifeCycles(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          var instance = finishedWork.stateNode;
          if (finishedWork.effectTag & Update) {
            if (current === null) {
              startPhaseTimer(finishedWork, 'componentDidMount');
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidMount();
              stopPhaseTimer();
            } else {
              var prevProps = current.memoizedProps;
              var prevState = current.memoizedState;
              startPhaseTimer(finishedWork, 'componentDidUpdate');
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidUpdate(prevProps, prevState);
              stopPhaseTimer();
            }
          }
          var updateQueue = finishedWork.updateQueue;
          if (updateQueue !== null) {
            commitCallbacks(updateQueue, instance);
          }
          return;
        }
      case HostRoot:
        {
          var _updateQueue = finishedWork.updateQueue;
          if (_updateQueue !== null) {
            var _instance = finishedWork.child !== null ? finishedWork.child.stateNode : null;
            commitCallbacks(_updateQueue, _instance);
          }
          return;
        }
      case HostComponent:
        {
          var _instance2 = finishedWork.stateNode;

          // Renderers may schedule work to be done after host components are mounted
          // (eg DOM renderer may schedule auto-focus for inputs and form controls).
          // These effects should only be committed when components are first mounted,
          // aka when there is no current/alternate.
          if (current === null && finishedWork.effectTag & Update) {
            var type = finishedWork.type;
            var props = finishedWork.memoizedProps;
            commitMount(_instance2, type, props, finishedWork);
          }

          return;
        }
      case HostText:
        {
          // We have no life-cycles associated with text.
          return;
        }
      case HostPortal:
        {
          // We have no life-cycles associated with portals.
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitAttachRef(finishedWork) {
    var ref = finishedWork.ref;
    if (ref !== null) {
      var instance = finishedWork.stateNode;
      switch (finishedWork.tag) {
        case HostComponent:
          ref(getPublicInstance(instance));
          break;
        default:
          ref(instance);
      }
    }
  }

  function commitDetachRef(current) {
    var currentRef = current.ref;
    if (currentRef !== null) {
      currentRef(null);
    }
  }

  // User-originating errors (lifecycles and refs) should not interrupt
  // deletion, so don't let them throw. Host-originating errors should
  // interrupt deletion, so it's okay
  function commitUnmount(current) {
    if (typeof onCommitUnmount === 'function') {
      onCommitUnmount(current);
    }

    switch (current.tag) {
      case ClassComponent:
        {
          safelyDetachRef(current);
          var instance = current.stateNode;
          if (typeof instance.componentWillUnmount === 'function') {
            safelyCallComponentWillUnmount(current, instance);
          }
          return;
        }
      case HostComponent:
        {
          safelyDetachRef(current);
          return;
        }
      case CallComponent:
        {
          commitNestedUnmounts(current.stateNode);
          return;
        }
      case HostPortal:
        {
          // TODO: this is recursive.
          // We are also not using this parent because
          // the portal will get pushed immediately.
          if (enableMutatingReconciler && mutation) {
            unmountHostComponents(current);
          } else if (enablePersistentReconciler && persistence) {
            emptyPortalContainer(current);
          }
          return;
        }
    }
  }

  function commitNestedUnmounts(root) {
    // While we're inside a removed host node we don't want to call
    // removeChild on the inner nodes because they're removed by the top
    // call anyway. We also want to call componentWillUnmount on all
    // composites before this host node is removed from the tree. Therefore
    var node = root;
    while (true) {
      commitUnmount(node);
      // Visit children because they may contain more composite or host nodes.
      // Skip portals because commitUnmount() currently visits them recursively.
      if (node.child !== null && (
      // If we use mutation we drill down into portals using commitUnmount above.
      // If we don't use mutation we drill down into portals here instead.
      !mutation || node.tag !== HostPortal)) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === root) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === root) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function detachFiber(current) {
    // Cut off the return pointers to disconnect it from the tree. Ideally, we
    // should clear the child pointer of the parent alternate to let this
    // get GC:ed but we don't know which for sure which parent is the current
    // one so we'll settle for GC:ing the subtree of this child. This child
    // itself will be GC:ed when the parent updates the next time.
    current['return'] = null;
    current.child = null;
    if (current.alternate) {
      current.alternate.child = null;
      current.alternate['return'] = null;
    }
  }

  if (!mutation) {
    var commitContainer = void 0;
    if (persistence) {
      var replaceContainerChildren = persistence.replaceContainerChildren,
          createContainerChildSet = persistence.createContainerChildSet;

      var emptyPortalContainer = function (current) {
        var portal = current.stateNode;
        var containerInfo = portal.containerInfo;

        var emptyChildSet = createContainerChildSet(containerInfo);
        replaceContainerChildren(containerInfo, emptyChildSet);
      };
      commitContainer = function (finishedWork) {
        switch (finishedWork.tag) {
          case ClassComponent:
            {
              return;
            }
          case HostComponent:
            {
              return;
            }
          case HostText:
            {
              return;
            }
          case HostRoot:
          case HostPortal:
            {
              var portalOrRoot = finishedWork.stateNode;
              var containerInfo = portalOrRoot.containerInfo,
                  _pendingChildren = portalOrRoot.pendingChildren;

              replaceContainerChildren(containerInfo, _pendingChildren);
              return;
            }
          default:
            {
              invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
            }
        }
      };
    } else {
      commitContainer = function (finishedWork) {
        // Noop
      };
    }
    if (enablePersistentReconciler || enableNoopReconciler) {
      return {
        commitResetTextContent: function (finishedWork) {},
        commitPlacement: function (finishedWork) {},
        commitDeletion: function (current) {
          // Detach refs and call componentWillUnmount() on the whole subtree.
          commitNestedUnmounts(current);
          detachFiber(current);
        },
        commitWork: function (current, finishedWork) {
          commitContainer(finishedWork);
        },

        commitLifeCycles: commitLifeCycles,
        commitAttachRef: commitAttachRef,
        commitDetachRef: commitDetachRef
      };
    } else if (persistence) {
      invariant(false, 'Persistent reconciler is disabled.');
    } else {
      invariant(false, 'Noop reconciler is disabled.');
    }
  }
  var commitMount = mutation.commitMount,
      commitUpdate = mutation.commitUpdate,
      resetTextContent = mutation.resetTextContent,
      commitTextUpdate = mutation.commitTextUpdate,
      appendChild = mutation.appendChild,
      appendChildToContainer = mutation.appendChildToContainer,
      insertBefore = mutation.insertBefore,
      insertInContainerBefore = mutation.insertInContainerBefore,
      removeChild = mutation.removeChild,
      removeChildFromContainer = mutation.removeChildFromContainer;


  function getHostParentFiber(fiber) {
    var parent = fiber['return'];
    while (parent !== null) {
      if (isHostParent(parent)) {
        return parent;
      }
      parent = parent['return'];
    }
    invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
  }

  function isHostParent(fiber) {
    return fiber.tag === HostComponent || fiber.tag === HostRoot || fiber.tag === HostPortal;
  }

  function getHostSibling(fiber) {
    // We're going to search forward into the tree until we find a sibling host
    // node. Unfortunately, if multiple insertions are done in a row we have to
    // search past them. This leads to exponential search for the next sibling.
    var node = fiber;
    siblings: while (true) {
      // If we didn't find anything, let's try the next sibling.
      while (node.sibling === null) {
        if (node['return'] === null || isHostParent(node['return'])) {
          // If we pop out of the root or hit the parent the fiber we are the
          // last sibling.
          return null;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
      while (node.tag !== HostComponent && node.tag !== HostText) {
        // If it is not host node and, we might have a host node inside it.
        // Try to search down until we find one.
        if (node.effectTag & Placement) {
          // If we don't have a child, try the siblings instead.
          continue siblings;
        }
        // If we don't have a child, try the siblings instead.
        // We also skip portals because they are not part of this host tree.
        if (node.child === null || node.tag === HostPortal) {
          continue siblings;
        } else {
          node.child['return'] = node;
          node = node.child;
        }
      }
      // Check if this host node is stable or about to be placed.
      if (!(node.effectTag & Placement)) {
        // Found it!
        return node.stateNode;
      }
    }
  }

  function commitPlacement(finishedWork) {
    // Recursively insert all host nodes into the parent.
    var parentFiber = getHostParentFiber(finishedWork);
    var parent = void 0;
    var isContainer = void 0;
    switch (parentFiber.tag) {
      case HostComponent:
        parent = parentFiber.stateNode;
        isContainer = false;
        break;
      case HostRoot:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      case HostPortal:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      default:
        invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
    }
    if (parentFiber.effectTag & ContentReset) {
      // Reset the text content of the parent before doing any insertions
      resetTextContent(parent);
      // Clear ContentReset from the effect tag
      parentFiber.effectTag &= ~ContentReset;
    }

    var before = getHostSibling(finishedWork);
    // We only have the top Fiber that was inserted but we need recurse down its
    // children to find all the terminal nodes.
    var node = finishedWork;
    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        if (before) {
          if (isContainer) {
            insertInContainerBefore(parent, node.stateNode, before);
          } else {
            insertBefore(parent, node.stateNode, before);
          }
        } else {
          if (isContainer) {
            appendChildToContainer(parent, node.stateNode);
          } else {
            appendChild(parent, node.stateNode);
          }
        }
      } else if (node.tag === HostPortal) {
        // If the insertion itself is a portal, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === finishedWork) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function unmountHostComponents(current) {
    // We only have the top Fiber that was inserted but we need recurse down its
    var node = current;

    // Each iteration, currentParent is populated with node's host parent if not
    // currentParentIsValid.
    var currentParentIsValid = false;
    var currentParent = void 0;
    var currentParentIsContainer = void 0;

    while (true) {
      if (!currentParentIsValid) {
        var parent = node['return'];
        findParent: while (true) {
          !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          switch (parent.tag) {
            case HostComponent:
              currentParent = parent.stateNode;
              currentParentIsContainer = false;
              break findParent;
            case HostRoot:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
            case HostPortal:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
          }
          parent = parent['return'];
        }
        currentParentIsValid = true;
      }

      if (node.tag === HostComponent || node.tag === HostText) {
        commitNestedUnmounts(node);
        // After all the children have unmounted, it is now safe to remove the
        // node from the tree.
        if (currentParentIsContainer) {
          removeChildFromContainer(currentParent, node.stateNode);
        } else {
          removeChild(currentParent, node.stateNode);
        }
        // Don't visit children because we already visited them.
      } else if (node.tag === HostPortal) {
        // When we go into a portal, it becomes the parent to remove from.
        // We will reassign it back when we pop the portal on the way up.
        currentParent = node.stateNode.containerInfo;
        // Visit children because portals might contain host components.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      } else {
        commitUnmount(node);
        // Visit children because we may find more host components below.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      }
      if (node === current) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === current) {
          return;
        }
        node = node['return'];
        if (node.tag === HostPortal) {
          // When we go out of the portal, we need to restore the parent.
          // Since we don't keep a stack of them, we will search for it.
          currentParentIsValid = false;
        }
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function commitDeletion(current) {
    // Recursively delete all host nodes from the parent.
    // Detach refs and call componentWillUnmount() on the whole subtree.
    unmountHostComponents(current);
    detachFiber(current);
  }

  function commitWork(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent:
        {
          return;
        }
      case HostComponent:
        {
          var instance = finishedWork.stateNode;
          if (instance != null) {
            // Commit the work prepared earlier.
            var newProps = finishedWork.memoizedProps;
            // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.
            var oldProps = current !== null ? current.memoizedProps : newProps;
            var type = finishedWork.type;
            // TODO: Type the updateQueue to be specific to host components.
            var updatePayload = finishedWork.updateQueue;
            finishedWork.updateQueue = null;
            if (updatePayload !== null) {
              commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
            }
          }
          return;
        }
      case HostText:
        {
          !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          var textInstance = finishedWork.stateNode;
          var newText = finishedWork.memoizedProps;
          // For hydration we reuse the update path but we treat the oldProps
          // as the newProps. The updatePayload will contain the real change in
          // this case.
          var oldText = current !== null ? current.memoizedProps : newText;
          commitTextUpdate(textInstance, oldText, newText);
          return;
        }
      case HostRoot:
        {
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitResetTextContent(current) {
    resetTextContent(current.stateNode);
  }

  if (enableMutatingReconciler) {
    return {
      commitResetTextContent: commitResetTextContent,
      commitPlacement: commitPlacement,
      commitDeletion: commitDeletion,
      commitWork: commitWork,
      commitLifeCycles: commitLifeCycles,
      commitAttachRef: commitAttachRef,
      commitDetachRef: commitDetachRef
    };
  } else {
    invariant(false, 'Mutating reconciler is disabled.');
  }
};

var NO_CONTEXT = {};

var ReactFiberHostContext = function (config) {
  var getChildHostContext = config.getChildHostContext,
      getRootHostContext = config.getRootHostContext;


  var contextStackCursor = createCursor(NO_CONTEXT);
  var contextFiberStackCursor = createCursor(NO_CONTEXT);
  var rootInstanceStackCursor = createCursor(NO_CONTEXT);

  function requiredContext(c) {
    !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    return c;
  }

  function getRootHostContainer() {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    return rootInstance;
  }

  function pushHostContainer(fiber, nextRootInstance) {
    // Push current root instance onto the stack;
    // This allows us to reset root when portals are popped.
    push(rootInstanceStackCursor, nextRootInstance, fiber);

    var nextRootContext = getRootHostContext(nextRootInstance);

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor, nextRootContext, fiber);
  }

  function popHostContainer(fiber) {
    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
    pop(rootInstanceStackCursor, fiber);
  }

  function getHostContext() {
    var context = requiredContext(contextStackCursor.current);
    return context;
  }

  function pushHostContext(fiber) {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    var context = requiredContext(contextStackCursor.current);
    var nextContext = getChildHostContext(context, fiber.type, rootInstance);

    // Don't push this Fiber's context unless it's unique.
    if (context === nextContext) {
      return;
    }

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push(contextFiberStackCursor, fiber, fiber);
    push(contextStackCursor, nextContext, fiber);
  }

  function popHostContext(fiber) {
    // Do not pop unless this Fiber provided the current context.
    // pushHostContext() only pushes Fibers that provide unique contexts.
    if (contextFiberStackCursor.current !== fiber) {
      return;
    }

    pop(contextStackCursor, fiber);
    pop(contextFiberStackCursor, fiber);
  }

  function resetHostContainer() {
    contextStackCursor.current = NO_CONTEXT;
    rootInstanceStackCursor.current = NO_CONTEXT;
  }

  return {
    getHostContext: getHostContext,
    getRootHostContainer: getRootHostContainer,
    popHostContainer: popHostContainer,
    popHostContext: popHostContext,
    pushHostContainer: pushHostContainer,
    pushHostContext: pushHostContext,
    resetHostContainer: resetHostContainer
  };
};

var ReactFiberHydrationContext = function (config) {
  var shouldSetTextContent = config.shouldSetTextContent,
      hydration = config.hydration;

  // If this doesn't have hydration mode.

  if (!hydration) {
    return {
      enterHydrationState: function () {
        return false;
      },
      resetHydrationState: function () {},
      tryToClaimNextHydratableInstance: function () {},
      prepareToHydrateHostInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      prepareToHydrateHostTextInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      popHydrationState: function (fiber) {
        return false;
      }
    };
  }

  var canHydrateInstance = hydration.canHydrateInstance,
      canHydrateTextInstance = hydration.canHydrateTextInstance,
      getNextHydratableSibling = hydration.getNextHydratableSibling,
      getFirstHydratableChild = hydration.getFirstHydratableChild,
      hydrateInstance = hydration.hydrateInstance,
      hydrateTextInstance = hydration.hydrateTextInstance,
      didNotMatchHydratedContainerTextInstance = hydration.didNotMatchHydratedContainerTextInstance,
      didNotMatchHydratedTextInstance = hydration.didNotMatchHydratedTextInstance,
      didNotHydrateContainerInstance = hydration.didNotHydrateContainerInstance,
      didNotHydrateInstance = hydration.didNotHydrateInstance,
      didNotFindHydratableContainerInstance = hydration.didNotFindHydratableContainerInstance,
      didNotFindHydratableContainerTextInstance = hydration.didNotFindHydratableContainerTextInstance,
      didNotFindHydratableInstance = hydration.didNotFindHydratableInstance,
      didNotFindHydratableTextInstance = hydration.didNotFindHydratableTextInstance;

  // The deepest Fiber on the stack involved in a hydration context.
  // This may have been an insertion or a hydration.

  var hydrationParentFiber = null;
  var nextHydratableInstance = null;
  var isHydrating = false;

  function enterHydrationState(fiber) {
    var parentInstance = fiber.stateNode.containerInfo;
    nextHydratableInstance = getFirstHydratableChild(parentInstance);
    hydrationParentFiber = fiber;
    isHydrating = true;
    return true;
  }

  function deleteHydratableInstance(returnFiber, instance) {
    {
      switch (returnFiber.tag) {
        case HostRoot:
          didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo, instance);
          break;
        case HostComponent:
          didNotHydrateInstance(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
          break;
      }
    }

    var childToDelete = createFiberFromHostInstanceForDeletion();
    childToDelete.stateNode = instance;
    childToDelete['return'] = returnFiber;
    childToDelete.effectTag = Deletion;

    // This might seem like it belongs on progressedFirstDeletion. However,
    // these children are not part of the reconciliation list of children.
    // Even if we abort and rereconcile the children, that will try to hydrate
    // again and the nodes are still in the host tree so these will be
    // recreated.
    if (returnFiber.lastEffect !== null) {
      returnFiber.lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
  }

  function insertNonHydratedInstance(returnFiber, fiber) {
    fiber.effectTag |= Placement;
    {
      switch (returnFiber.tag) {
        case HostRoot:
          {
            var parentContainer = returnFiber.stateNode.containerInfo;
            switch (fiber.tag) {
              case HostComponent:
                var type = fiber.type;
                var props = fiber.pendingProps;
                didNotFindHydratableContainerInstance(parentContainer, type, props);
                break;
              case HostText:
                var text = fiber.pendingProps;
                didNotFindHydratableContainerTextInstance(parentContainer, text);
                break;
            }
            break;
          }
        case HostComponent:
          {
            var parentType = returnFiber.type;
            var parentProps = returnFiber.memoizedProps;
            var parentInstance = returnFiber.stateNode;
            switch (fiber.tag) {
              case HostComponent:
                var _type = fiber.type;
                var _props = fiber.pendingProps;
                didNotFindHydratableInstance(parentType, parentProps, parentInstance, _type, _props);
                break;
              case HostText:
                var _text = fiber.pendingProps;
                didNotFindHydratableTextInstance(parentType, parentProps, parentInstance, _text);
                break;
            }
            break;
          }
        default:
          return;
      }
    }
  }

  function tryHydrate(fiber, nextInstance) {
    switch (fiber.tag) {
      case HostComponent:
        {
          var type = fiber.type;
          var props = fiber.pendingProps;
          var instance = canHydrateInstance(nextInstance, type, props);
          if (instance !== null) {
            fiber.stateNode = instance;
            return true;
          }
          return false;
        }
      case HostText:
        {
          var text = fiber.pendingProps;
          var textInstance = canHydrateTextInstance(nextInstance, text);
          if (textInstance !== null) {
            fiber.stateNode = textInstance;
            return true;
          }
          return false;
        }
      default:
        return false;
    }
  }

  function tryToClaimNextHydratableInstance(fiber) {
    if (!isHydrating) {
      return;
    }
    var nextInstance = nextHydratableInstance;
    if (!nextInstance) {
      // Nothing to hydrate. Make it an insertion.
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    }
    if (!tryHydrate(fiber, nextInstance)) {
      // If we can't hydrate this instance let's try the next one.
      // We use this as a heuristic. It's based on intuition and not data so it
      // might be flawed or unnecessary.
      nextInstance = getNextHydratableSibling(nextInstance);
      if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
        // Nothing to hydrate. Make it an insertion.
        insertNonHydratedInstance(hydrationParentFiber, fiber);
        isHydrating = false;
        hydrationParentFiber = fiber;
        return;
      }
      // We matched the next one, we'll now assume that the first one was
      // superfluous and we'll delete it. Since we can't eagerly delete it
      // we'll have to schedule a deletion. To do that, this node needs a dummy
      // fiber associated with it.
      deleteHydratableInstance(hydrationParentFiber, nextHydratableInstance);
    }
    hydrationParentFiber = fiber;
    nextHydratableInstance = getFirstHydratableChild(nextInstance);
  }

  function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
    var instance = fiber.stateNode;
    var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
    // TODO: Type this specific to this type of component.
    fiber.updateQueue = updatePayload;
    // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update.
    if (updatePayload !== null) {
      return true;
    }
    return false;
  }

  function prepareToHydrateHostTextInstance(fiber) {
    var textInstance = fiber.stateNode;
    var textContent = fiber.memoizedProps;
    var shouldUpdate = hydrateTextInstance(textInstance, textContent, fiber);
    {
      if (shouldUpdate) {
        // We assume that prepareToHydrateHostTextInstance is called in a context where the
        // hydration parent is the parent host component of this host text.
        var returnFiber = hydrationParentFiber;
        if (returnFiber !== null) {
          switch (returnFiber.tag) {
            case HostRoot:
              {
                var parentContainer = returnFiber.stateNode.containerInfo;
                didNotMatchHydratedContainerTextInstance(parentContainer, textInstance, textContent);
                break;
              }
            case HostComponent:
              {
                var parentType = returnFiber.type;
                var parentProps = returnFiber.memoizedProps;
                var parentInstance = returnFiber.stateNode;
                didNotMatchHydratedTextInstance(parentType, parentProps, parentInstance, textInstance, textContent);
                break;
              }
          }
        }
      }
    }
    return shouldUpdate;
  }

  function popToNextHostParent(fiber) {
    var parent = fiber['return'];
    while (parent !== null && parent.tag !== HostComponent && parent.tag !== HostRoot) {
      parent = parent['return'];
    }
    hydrationParentFiber = parent;
  }

  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) {
      // We're deeper than the current hydration context, inside an inserted
      // tree.
      return false;
    }
    if (!isHydrating) {
      // If we're not currently hydrating but we're in a hydration context, then
      // we were an insertion and now need to pop up reenter hydration of our
      // siblings.
      popToNextHostParent(fiber);
      isHydrating = true;
      return false;
    }

    var type = fiber.type;

    // If we have any remaining hydratable nodes, we need to delete them now.
    // We only do this deeper than head and body since they tend to have random
    // other nodes in them. We also ignore components with pure text content in
    // side of them.
    // TODO: Better heuristic.
    if (fiber.tag !== HostComponent || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
      var nextInstance = nextHydratableInstance;
      while (nextInstance) {
        deleteHydratableInstance(fiber, nextInstance);
        nextInstance = getNextHydratableSibling(nextInstance);
      }
    }

    popToNextHostParent(fiber);
    nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
    return true;
  }

  function resetHydrationState() {
    hydrationParentFiber = null;
    nextHydratableInstance = null;
    isHydrating = false;
  }

  return {
    enterHydrationState: enterHydrationState,
    resetHydrationState: resetHydrationState,
    tryToClaimNextHydratableInstance: tryToClaimNextHydratableInstance,
    prepareToHydrateHostInstance: prepareToHydrateHostInstance,
    prepareToHydrateHostTextInstance: prepareToHydrateHostTextInstance,
    popHydrationState: popHydrationState
  };
};

// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation = {
  debugTool: null
};

var ReactFiberInstrumentation_1 = ReactFiberInstrumentation;

var defaultShowDialog = function (capturedError) {
  return true;
};

var showDialog = defaultShowDialog;

function logCapturedError(capturedError) {
  var logError = showDialog(capturedError);

  // Allow injected showDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  {
    var componentName = capturedError.componentName,
        componentStack = capturedError.componentStack,
        errorBoundaryName = capturedError.errorBoundaryName,
        errorBoundaryFound = capturedError.errorBoundaryFound,
        willRetry = capturedError.willRetry;


    var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

    var errorBoundaryMessage = void 0;
    // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
    if (errorBoundaryFound && errorBoundaryName) {
      if (willRetry) {
        errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
      } else {
        errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
      }
    } else {
      errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';
    }
    var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

    // In development, we provide our own message with just the component stack.
    // We don't include the original error message and JS stack because the browser
    // has already printed it. Even if the application swallows the error, it is still
    // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
    console.error(combinedMessage);
  }
}

var invokeGuardedCallback$1 = ReactErrorUtils.invokeGuardedCallback;
var hasCaughtError = ReactErrorUtils.hasCaughtError;
var clearCaughtError = ReactErrorUtils.clearCaughtError;


{
  var didWarnAboutStateTransition = false;
  var didWarnSetStateChildContext = false;
  var didWarnStateUpdateForUnmountedComponent = {};

  var warnAboutUpdateOnUnmounted = function (fiber) {
    var componentName = getComponentName(fiber) || 'ReactClass';
    if (didWarnStateUpdateForUnmountedComponent[componentName]) {
      return;
    }
    warning(false, 'Can only update a mounted or mounting ' + 'component. This usually means you called setState, replaceState, ' + 'or forceUpdate on an unmounted component. This is a no-op.\n\nPlease ' + 'check the code for the %s component.', componentName);
    didWarnStateUpdateForUnmountedComponent[componentName] = true;
  };

  var warnAboutInvalidUpdates = function (instance) {
    switch (ReactDebugCurrentFiber.phase) {
      case 'getChildContext':
        if (didWarnSetStateChildContext) {
          return;
        }
        warning(false, 'setState(...): Cannot call setState() inside getChildContext()');
        didWarnSetStateChildContext = true;
        break;
      case 'render':
        if (didWarnAboutStateTransition) {
          return;
        }
        warning(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
        didWarnAboutStateTransition = true;
        break;
    }
  };
}

var ReactFiberScheduler = function (config) {
  var hostContext = ReactFiberHostContext(config);
  var hydrationContext = ReactFiberHydrationContext(config);
  var popHostContainer = hostContext.popHostContainer,
      popHostContext = hostContext.popHostContext,
      resetHostContainer = hostContext.resetHostContainer;

  var _ReactFiberBeginWork = ReactFiberBeginWork(config, hostContext, hydrationContext, scheduleWork, computeExpirationForFiber),
      beginWork = _ReactFiberBeginWork.beginWork,
      beginFailedWork = _ReactFiberBeginWork.beginFailedWork;

  var _ReactFiberCompleteWo = ReactFiberCompleteWork(config, hostContext, hydrationContext),
      completeWork = _ReactFiberCompleteWo.completeWork;

  var _ReactFiberCommitWork = ReactFiberCommitWork(config, captureError),
      commitResetTextContent = _ReactFiberCommitWork.commitResetTextContent,
      commitPlacement = _ReactFiberCommitWork.commitPlacement,
      commitDeletion = _ReactFiberCommitWork.commitDeletion,
      commitWork = _ReactFiberCommitWork.commitWork,
      commitLifeCycles = _ReactFiberCommitWork.commitLifeCycles,
      commitAttachRef = _ReactFiberCommitWork.commitAttachRef,
      commitDetachRef = _ReactFiberCommitWork.commitDetachRef;

  var now = config.now,
      scheduleDeferredCallback = config.scheduleDeferredCallback,
      useSyncScheduling = config.useSyncScheduling,
      prepareForCommit = config.prepareForCommit,
      resetAfterCommit = config.resetAfterCommit;

  // Represents the current time in ms.

  var startTime = now();
  var mostRecentCurrentTime = msToExpirationTime(0);

  // Represents the expiration time that incoming updates should use. (If this
  // is NoWork, use the default strategy: async updates in async mode, sync
  // updates in sync mode.)
  var expirationContext = NoWork;

  var isWorking = false;

  // The next work in progress fiber that we're currently working on.
  var nextUnitOfWork = null;
  var nextRoot = null;
  // The time at which we're currently rendering work.
  var nextRenderExpirationTime = NoWork;

  // The next fiber with an effect that we're currently committing.
  var nextEffect = null;

  // Keep track of which fibers have captured an error that need to be handled.
  // Work is removed from this collection after componentDidCatch is called.
  var capturedErrors = null;
  // Keep track of which fibers have failed during the current batch of work.
  // This is a different set than capturedErrors, because it is not reset until
  // the end of the batch. This is needed to propagate errors correctly if a
  // subtree fails more than once.
  var failedBoundaries = null;
  // Error boundaries that captured an error during the current commit.
  var commitPhaseBoundaries = null;
  var firstUncaughtError = null;
  var didFatal = false;

  var isCommitting = false;
  var isUnmounting = false;

  // Used for performance tracking.
  var interruptedBy = null;

  function resetContextStack() {
    // Reset the stack
    reset$1();
    // Reset the cursors
    resetContext();
    resetHostContainer();
  }

  function commitAllHostEffects() {
    while (nextEffect !== null) {
      {
        ReactDebugCurrentFiber.setCurrentFiber(nextEffect);
      }
      recordEffect();

      var effectTag = nextEffect.effectTag;
      if (effectTag & ContentReset) {
        commitResetTextContent(nextEffect);
      }

      if (effectTag & Ref) {
        var current = nextEffect.alternate;
        if (current !== null) {
          commitDetachRef(current);
        }
      }

      // The following switch statement is only concerned about placement,
      // updates, and deletions. To avoid needing to add a case for every
      // possible bitmap value, we remove the secondary effects from the
      // effect tag and switch on that value.
      var primaryEffectTag = effectTag & ~(Callback | Err | ContentReset | Ref | PerformedWork);
      switch (primaryEffectTag) {
        case Placement:
          {
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            // TODO: findDOMNode doesn't rely on this any more but isMounted
            // does and isMounted is deprecated anyway so we should be able
            // to kill this.
            nextEffect.effectTag &= ~Placement;
            break;
          }
        case PlacementAndUpdate:
          {
            // Placement
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            nextEffect.effectTag &= ~Placement;

            // Update
            var _current = nextEffect.alternate;
            commitWork(_current, nextEffect);
            break;
          }
        case Update:
          {
            var _current2 = nextEffect.alternate;
            commitWork(_current2, nextEffect);
            break;
          }
        case Deletion:
          {
            isUnmounting = true;
            commitDeletion(nextEffect);
            isUnmounting = false;
            break;
          }
      }
      nextEffect = nextEffect.nextEffect;
    }

    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
  }

  function commitAllLifeCycles() {
    while (nextEffect !== null) {
      var effectTag = nextEffect.effectTag;

      if (effectTag & (Update | Callback)) {
        recordEffect();
        var current = nextEffect.alternate;
        commitLifeCycles(current, nextEffect);
      }

      if (effectTag & Ref) {
        recordEffect();
        commitAttachRef(nextEffect);
      }

      if (effectTag & Err) {
        recordEffect();
        commitErrorHandling(nextEffect);
      }

      var next = nextEffect.nextEffect;
      // Ensure that we clean these up so that we don't accidentally keep them.
      // I'm not actually sure this matters because we can't reset firstEffect
      // and lastEffect since they're on every node, not just the effectful
      // ones. So we have to clean everything as we reuse nodes anyway.
      nextEffect.nextEffect = null;
      // Ensure that we reset the effectTag here so that we can rely on effect
      // tags to reason about the current life-cycle.
      nextEffect = next;
    }
  }

  function commitRoot(finishedWork) {
    // We keep track of this so that captureError can collect any boundaries
    // that capture an error during the commit phase. The reason these aren't
    // local to this function is because errors that occur during cWU are
    // captured elsewhere, to prevent the unmount from being interrupted.
    isWorking = true;
    isCommitting = true;
    startCommitTimer();

    var root = finishedWork.stateNode;
    !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    root.isReadyForCommit = false;

    // Reset this to null before calling lifecycles
    ReactCurrentOwner.current = null;

    var firstEffect = void 0;
    if (finishedWork.effectTag > PerformedWork) {
      // A fiber's effect list consists only of its children, not itself. So if
      // the root has an effect, we need to add it to the end of the list. The
      // resulting list is the set that would belong to the root's parent, if
      // it had one; that is, all the effects in the tree including the root.
      if (finishedWork.lastEffect !== null) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      // There is no effect on the root.
      firstEffect = finishedWork.firstEffect;
    }

    prepareForCommit();

    // Commit all the side-effects within a tree. We'll do this in two passes.
    // The first pass performs all the host insertions, updates, deletions and
    // ref unmounts.
    nextEffect = firstEffect;
    startCommitHostEffectsTimer();
    while (nextEffect !== null) {
      var didError = false;
      var _error = void 0;
      {
        invokeGuardedCallback$1(null, commitAllHostEffects, null);
        if (hasCaughtError()) {
          didError = true;
          _error = clearCaughtError();
        }
      }
      if (didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error);
        // Clean-up
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }
    stopCommitHostEffectsTimer();

    resetAfterCommit();

    // The work-in-progress tree is now the current tree. This must come after
    // the first pass of the commit phase, so that the previous tree is still
    // current during componentWillUnmount, but before the second pass, so that
    // the finished work is current during componentDidMount/Update.
    root.current = finishedWork;

    // In the second pass we'll perform all life-cycles and ref callbacks.
    // Life-cycles happen as a separate pass so that all placements, updates,
    // and deletions in the entire tree have already been invoked.
    // This pass also triggers any renderer-specific initial effects.
    nextEffect = firstEffect;
    startCommitLifeCyclesTimer();
    while (nextEffect !== null) {
      var _didError = false;
      var _error2 = void 0;
      {
        invokeGuardedCallback$1(null, commitAllLifeCycles, null);
        if (hasCaughtError()) {
          _didError = true;
          _error2 = clearCaughtError();
        }
      }
      if (_didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error2);
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }

    isCommitting = false;
    isWorking = false;
    stopCommitLifeCyclesTimer();
    stopCommitTimer();
    if (typeof onCommitRoot === 'function') {
      onCommitRoot(finishedWork.stateNode);
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
    }

    // If we caught any errors during this commit, schedule their boundaries
    // to update.
    if (commitPhaseBoundaries) {
      commitPhaseBoundaries.forEach(scheduleErrorRecovery);
      commitPhaseBoundaries = null;
    }

    if (firstUncaughtError !== null) {
      var _error3 = firstUncaughtError;
      firstUncaughtError = null;
      onUncaughtError(_error3);
    }

    var remainingTime = root.current.expirationTime;

    if (remainingTime === NoWork) {
      capturedErrors = null;
      failedBoundaries = null;
    }

    return remainingTime;
  }

  function resetExpirationTime(workInProgress, renderTime) {
    if (renderTime !== Never && workInProgress.expirationTime === Never) {
      // The children of this component are hidden. Don't bubble their
      // expiration times.
      return;
    }

    // Check for pending updates.
    var newExpirationTime = getUpdateExpirationTime(workInProgress);

    // TODO: Calls need to visit stateNode

    // Bubble up the earliest expiration time.
    var child = workInProgress.child;
    while (child !== null) {
      if (child.expirationTime !== NoWork && (newExpirationTime === NoWork || newExpirationTime > child.expirationTime)) {
        newExpirationTime = child.expirationTime;
      }
      child = child.sibling;
    }
    workInProgress.expirationTime = newExpirationTime;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;
      {
        ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
      }
      var next = completeWork(current, workInProgress, nextRenderExpirationTime);
      {
        ReactDebugCurrentFiber.resetCurrentFiber();
      }

      var returnFiber = workInProgress['return'];
      var siblingFiber = workInProgress.sibling;

      resetExpirationTime(workInProgress, nextRenderExpirationTime);

      if (next !== null) {
        stopWorkTimer(workInProgress);
        if (true && ReactFiberInstrumentation_1.debugTool) {
          ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
        }
        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        return next;
      }

      if (returnFiber !== null) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if
        // needed, by doing multiple passes over the effect list. We don't want
        // to schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        var effectTag = workInProgress.effectTag;
        // Skip both NoWork and PerformedWork tags when creating the effect list.
        // PerformedWork effect is read by React DevTools but shouldn't be committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      stopWorkTimer(workInProgress);
      if (true && ReactFiberInstrumentation_1.debugTool) {
        ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // We've reached the root.
        var root = workInProgress.stateNode;
        root.isReadyForCommit = true;
        return null;
      }
    }

    // Without this explicit null return Flow complains of invalid return type
    // TODO Remove the above while(true) loop
    // eslint-disable-next-line no-unreachable
    return null;
  }

  function performUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    startWorkTimer(workInProgress);
    {
      ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
    }
    var next = beginWork(current, workInProgress, nextRenderExpirationTime);
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner.current = null;

    return next;
  }

  function performFailedUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    startWorkTimer(workInProgress);
    {
      ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
    }
    var next = beginFailedWork(current, workInProgress, nextRenderExpirationTime);
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }
    if (true && ReactFiberInstrumentation_1.debugTool) {
      ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner.current = null;

    return next;
  }

  function workLoop(expirationTime) {
    if (capturedErrors !== null) {
      // If there are unhandled errors, switch to the slow work loop.
      // TODO: How to avoid this check in the fast path? Maybe the renderer
      // could keep track of which roots have unhandled errors and call a
      // forked version of renderRoot.
      slowWorkLoopThatChecksForFailedWork(expirationTime);
      return;
    }
    if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
      return;
    }

    if (nextRenderExpirationTime <= mostRecentCurrentTime) {
      // Flush all expired work.
      while (nextUnitOfWork !== null) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    } else {
      // Flush asynchronous work until the deadline runs out of time.
      while (nextUnitOfWork !== null && !shouldYield()) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      }
    }
  }

  function slowWorkLoopThatChecksForFailedWork(expirationTime) {
    if (nextRenderExpirationTime === NoWork || nextRenderExpirationTime > expirationTime) {
      return;
    }

    if (nextRenderExpirationTime <= mostRecentCurrentTime) {
      // Flush all expired work.
      while (nextUnitOfWork !== null) {
        if (hasCapturedError(nextUnitOfWork)) {
          // Use a forked version of performUnitOfWork
          nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
        } else {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      }
    } else {
      // Flush asynchronous work until the deadline runs out of time.
      while (nextUnitOfWork !== null && !shouldYield()) {
        if (hasCapturedError(nextUnitOfWork)) {
          // Use a forked version of performUnitOfWork
          nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
        } else {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
      }
    }
  }

  function renderRootCatchBlock(root, failedWork, boundary, expirationTime) {
    // We're going to restart the error boundary that captured the error.
    // Conceptually, we're unwinding the stack. We need to unwind the
    // context stack, too.
    unwindContexts(failedWork, boundary);

    // Restart the error boundary using a forked version of
    // performUnitOfWork that deletes the boundary's children. The entire
    // failed subree will be unmounted. During the commit phase, a special
    // lifecycle method is called on the error boundary, which triggers
    // a re-render.
    nextUnitOfWork = performFailedUnitOfWork(boundary);

    // Continue working.
    workLoop(expirationTime);
  }

  function renderRoot(root, expirationTime) {
    !!isWorking ? invariant(false, 'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    isWorking = true;

    // We're about to mutate the work-in-progress tree. If the root was pending
    // commit, it no longer is: we'll need to complete it again.
    root.isReadyForCommit = false;

    // Check if we're starting from a fresh stack, or if we're resuming from
    // previously yielded work.
    if (root !== nextRoot || expirationTime !== nextRenderExpirationTime || nextUnitOfWork === null) {
      // Reset the stack and start working from the root.
      resetContextStack();
      nextRoot = root;
      nextRenderExpirationTime = expirationTime;
      nextUnitOfWork = createWorkInProgress(nextRoot.current, null, expirationTime);
    }

    startWorkLoopTimer(nextUnitOfWork);

    var didError = false;
    var error = null;
    {
      invokeGuardedCallback$1(null, workLoop, null, expirationTime);
      if (hasCaughtError()) {
        didError = true;
        error = clearCaughtError();
      }
    }

    // An error was thrown during the render phase.
    while (didError) {
      if (didFatal) {
        // This was a fatal error. Don't attempt to recover from it.
        firstUncaughtError = error;
        break;
      }

      var failedWork = nextUnitOfWork;
      if (failedWork === null) {
        // An error was thrown but there's no current unit of work. This can
        // happen during the commit phase if there's a bug in the renderer.
        didFatal = true;
        continue;
      }

      // "Capture" the error by finding the nearest boundary. If there is no
      // error boundary, we use the root.
      var boundary = captureError(failedWork, error);
      !(boundary !== null) ? invariant(false, 'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didFatal) {
        // The error we just captured was a fatal error. This happens
        // when the error propagates to the root more than once.
        continue;
      }

      didError = false;
      error = null;
      {
        invokeGuardedCallback$1(null, renderRootCatchBlock, null, root, failedWork, boundary, expirationTime);
        if (hasCaughtError()) {
          didError = true;
          error = clearCaughtError();
          continue;
        }
      }
      // We're finished working. Exit the error loop.
      break;
    }

    var uncaughtError = firstUncaughtError;

    // We're done performing work. Time to clean up.
    stopWorkLoopTimer(interruptedBy);
    interruptedBy = null;
    isWorking = false;
    didFatal = false;
    firstUncaughtError = null;

    if (uncaughtError !== null) {
      onUncaughtError(uncaughtError);
    }

    return root.isReadyForCommit ? root.current.alternate : null;
  }

  // Returns the boundary that captured the error, or null if the error is ignored
  function captureError(failedWork, error) {
    // It is no longer valid because we exited the user code.
    ReactCurrentOwner.current = null;
    {
      ReactDebugCurrentFiber.resetCurrentFiber();
    }

    // Search for the nearest error boundary.
    var boundary = null;

    // Passed to logCapturedError()
    var errorBoundaryFound = false;
    var willRetry = false;
    var errorBoundaryName = null;

    // Host containers are a special case. If the failed work itself is a host
    // container, then it acts as its own boundary. In all other cases, we
    // ignore the work itself and only search through the parents.
    if (failedWork.tag === HostRoot) {
      boundary = failedWork;

      if (isFailedBoundary(failedWork)) {
        // If this root already failed, there must have been an error when
        // attempting to unmount it. This is a worst-case scenario and
        // should only be possible if there's a bug in the renderer.
        didFatal = true;
      }
    } else {
      var node = failedWork['return'];
      while (node !== null && boundary === null) {
        if (node.tag === ClassComponent) {
          var instance = node.stateNode;
          if (typeof instance.componentDidCatch === 'function') {
            errorBoundaryFound = true;
            errorBoundaryName = getComponentName(node);

            // Found an error boundary!
            boundary = node;
            willRetry = true;
          }
        } else if (node.tag === HostRoot) {
          // Treat the root like a no-op error boundary
          boundary = node;
        }

        if (isFailedBoundary(node)) {
          // This boundary is already in a failed state.

          // If we're currently unmounting, that means this error was
          // thrown while unmounting a failed subtree. We should ignore
          // the error.
          if (isUnmounting) {
            return null;
          }

          // If we're in the commit phase, we should check to see if
          // this boundary already captured an error during this commit.
          // This case exists because multiple errors can be thrown during
          // a single commit without interruption.
          if (commitPhaseBoundaries !== null && (commitPhaseBoundaries.has(node) || node.alternate !== null && commitPhaseBoundaries.has(node.alternate))) {
            // If so, we should ignore this error.
            return null;
          }

          // The error should propagate to the next boundary -— we keep looking.
          boundary = null;
          willRetry = false;
        }

        node = node['return'];
      }
    }

    if (boundary !== null) {
      // Add to the collection of failed boundaries. This lets us know that
      // subsequent errors in this subtree should propagate to the next boundary.
      if (failedBoundaries === null) {
        failedBoundaries = new Set();
      }
      failedBoundaries.add(boundary);

      // This method is unsafe outside of the begin and complete phases.
      // We might be in the commit phase when an error is captured.
      // The risk is that the return path from this Fiber may not be accurate.
      // That risk is acceptable given the benefit of providing users more context.
      var _componentStack = getStackAddendumByWorkInProgressFiber(failedWork);
      var _componentName = getComponentName(failedWork);

      // Add to the collection of captured errors. This is stored as a global
      // map of errors and their component stack location keyed by the boundaries
      // that capture them. We mostly use this Map as a Set; it's a Map only to
      // avoid adding a field to Fiber to store the error.
      if (capturedErrors === null) {
        capturedErrors = new Map();
      }

      var capturedError = {
        componentName: _componentName,
        componentStack: _componentStack,
        error: error,
        errorBoundary: errorBoundaryFound ? boundary.stateNode : null,
        errorBoundaryFound: errorBoundaryFound,
        errorBoundaryName: errorBoundaryName,
        willRetry: willRetry
      };

      capturedErrors.set(boundary, capturedError);

      try {
        logCapturedError(capturedError);
      } catch (e) {
        // Prevent cycle if logCapturedError() throws.
        // A cycle may still occur if logCapturedError renders a component that throws.
        console.error(e);
      }

      // If we're in the commit phase, defer scheduling an update on the
      // boundary until after the commit is complete
      if (isCommitting) {
        if (commitPhaseBoundaries === null) {
          commitPhaseBoundaries = new Set();
        }
        commitPhaseBoundaries.add(boundary);
      } else {
        // Otherwise, schedule an update now.
        // TODO: Is this actually necessary during the render phase? Is it
        // possible to unwind and continue rendering at the same priority,
        // without corrupting internal state?
        scheduleErrorRecovery(boundary);
      }
      return boundary;
    } else if (firstUncaughtError === null) {
      // If no boundary is found, we'll need to throw the error
      firstUncaughtError = error;
    }
    return null;
  }

  function hasCapturedError(fiber) {
    // TODO: capturedErrors should store the boundary instance, to avoid needing
    // to check the alternate.
    return capturedErrors !== null && (capturedErrors.has(fiber) || fiber.alternate !== null && capturedErrors.has(fiber.alternate));
  }

  function isFailedBoundary(fiber) {
    // TODO: failedBoundaries should store the boundary instance, to avoid
    // needing to check the alternate.
    return failedBoundaries !== null && (failedBoundaries.has(fiber) || fiber.alternate !== null && failedBoundaries.has(fiber.alternate));
  }

  function commitErrorHandling(effectfulFiber) {
    var capturedError = void 0;
    if (capturedErrors !== null) {
      capturedError = capturedErrors.get(effectfulFiber);
      capturedErrors['delete'](effectfulFiber);
      if (capturedError == null) {
        if (effectfulFiber.alternate !== null) {
          effectfulFiber = effectfulFiber.alternate;
          capturedError = capturedErrors.get(effectfulFiber);
          capturedErrors['delete'](effectfulFiber);
        }
      }
    }

    !(capturedError != null) ? invariant(false, 'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    switch (effectfulFiber.tag) {
      case ClassComponent:
        var instance = effectfulFiber.stateNode;

        var info = {
          componentStack: capturedError.componentStack
        };

        // Allow the boundary to handle the error, usually by scheduling
        // an update to itself
        instance.componentDidCatch(capturedError.error, info);
        return;
      case HostRoot:
        if (firstUncaughtError === null) {
          firstUncaughtError = capturedError.error;
        }
        return;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function unwindContexts(from, to) {
    var node = from;
    while (node !== null) {
      switch (node.tag) {
        case ClassComponent:
          popContextProvider(node);
          break;
        case HostComponent:
          popHostContext(node);
          break;
        case HostRoot:
          popHostContainer(node);
          break;
        case HostPortal:
          popHostContainer(node);
          break;
      }
      if (node === to || node.alternate === to) {
        stopFailedWorkTimer(node);
        break;
      } else {
        stopWorkTimer(node);
      }
      node = node['return'];
    }
  }

  function computeAsyncExpiration() {
    // Given the current clock time, returns an expiration time. We use rounding
    // to batch like updates together.
    // Should complete within ~1000ms. 1200ms max.
    var currentTime = recalculateCurrentTime();
    var expirationMs = 1000;
    var bucketSizeMs = 200;
    return computeExpirationBucket(currentTime, expirationMs, bucketSizeMs);
  }

  function computeExpirationForFiber(fiber) {
    var expirationTime = void 0;
    if (expirationContext !== NoWork) {
      // An explicit expiration context was set;
      expirationTime = expirationContext;
    } else if (isWorking) {
      if (isCommitting) {
        // Updates that occur during the commit phase should have sync priority
        // by default.
        expirationTime = Sync;
      } else {
        // Updates during the render phase should expire at the same time as
        // the work that is being rendered.
        expirationTime = nextRenderExpirationTime;
      }
    } else {
      // No explicit expiration context was set, and we're not currently
      // performing work. Calculate a new expiration time.
      if (useSyncScheduling && !(fiber.internalContextTag & AsyncUpdates)) {
        // This is a sync update
        expirationTime = Sync;
      } else {
        // This is an async update
        expirationTime = computeAsyncExpiration();
      }
    }
    return expirationTime;
  }

  function scheduleWork(fiber, expirationTime) {
    return scheduleWorkImpl(fiber, expirationTime, false);
  }

  function scheduleWorkImpl(fiber, expirationTime, isErrorRecovery) {
    recordScheduleUpdate();

    {
      if (!isErrorRecovery && fiber.tag === ClassComponent) {
        var instance = fiber.stateNode;
        warnAboutInvalidUpdates(instance);
      }
    }

    var node = fiber;
    while (node !== null) {
      // Walk the parent path to the root and update each node's
      // expiration time.
      if (node.expirationTime === NoWork || node.expirationTime > expirationTime) {
        node.expirationTime = expirationTime;
      }
      if (node.alternate !== null) {
        if (node.alternate.expirationTime === NoWork || node.alternate.expirationTime > expirationTime) {
          node.alternate.expirationTime = expirationTime;
        }
      }
      if (node['return'] === null) {
        if (node.tag === HostRoot) {
          var root = node.stateNode;
          if (!isWorking && root === nextRoot && expirationTime <= nextRenderExpirationTime) {
            // Restart the root from the top.
            if (nextUnitOfWork !== null) {
              // This is an interruption. (Used for performance tracking.)
              interruptedBy = fiber;
            }
            nextRoot = null;
            nextUnitOfWork = null;
            nextRenderExpirationTime = NoWork;
          }
          requestWork(root, expirationTime);
        } else {
          {
            if (!isErrorRecovery && fiber.tag === ClassComponent) {
              warnAboutUpdateOnUnmounted(fiber);
            }
          }
          return;
        }
      }
      node = node['return'];
    }
  }

  function scheduleErrorRecovery(fiber) {
    scheduleWorkImpl(fiber, Sync, true);
  }

  function recalculateCurrentTime() {
    // Subtract initial time so it fits inside 32bits
    var ms = now() - startTime;
    mostRecentCurrentTime = msToExpirationTime(ms);
    return mostRecentCurrentTime;
  }

  function deferredUpdates(fn) {
    var previousExpirationContext = expirationContext;
    expirationContext = computeAsyncExpiration();
    try {
      return fn();
    } finally {
      expirationContext = previousExpirationContext;
    }
  }

  function syncUpdates(fn) {
    var previousExpirationContext = expirationContext;
    expirationContext = Sync;
    try {
      return fn();
    } finally {
      expirationContext = previousExpirationContext;
    }
  }

  // TODO: Everything below this is written as if it has been lifted to the
  // renderers. I'll do this in a follow-up.

  // Linked-list of roots
  var firstScheduledRoot = null;
  var lastScheduledRoot = null;

  var isCallbackScheduled = false;
  var isRendering = false;
  var nextFlushedRoot = null;
  var nextFlushedExpirationTime = NoWork;
  var deadlineDidExpire = false;
  var hasUnhandledError = false;
  var unhandledError = null;
  var deadline = null;

  var isBatchingUpdates = false;
  var isUnbatchingUpdates = false;

  // Use these to prevent an infinite loop of nested updates
  var NESTED_UPDATE_LIMIT = 1000;
  var nestedUpdateCount = 0;

  var timeHeuristicForUnitOfWork = 1;

  // requestWork is called by the scheduler whenever a root receives an update.
  // It's up to the renderer to call renderRoot at some point in the future.
  function requestWork(root, expirationTime) {
    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
      invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
    }

    // Add the root to the schedule.
    // Check if this root is already part of the schedule.
    if (root.nextScheduledRoot === null) {
      // This root is not already scheduled. Add it.
      root.remainingExpirationTime = expirationTime;
      if (lastScheduledRoot === null) {
        firstScheduledRoot = lastScheduledRoot = root;
        root.nextScheduledRoot = root;
      } else {
        lastScheduledRoot.nextScheduledRoot = root;
        lastScheduledRoot = root;
        lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
      }
    } else {
      // This root is already scheduled, but its priority may have increased.
      var remainingExpirationTime = root.remainingExpirationTime;
      if (remainingExpirationTime === NoWork || expirationTime < remainingExpirationTime) {
        // Update the priority.
        root.remainingExpirationTime = expirationTime;
      }
    }

    if (isRendering) {
      // Prevent reentrancy. Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (isBatchingUpdates) {
      // Flush work at the end of the batch.
      if (isUnbatchingUpdates) {
        // ...unless we're inside unbatchedUpdates, in which case we should
        // flush it now.
        performWorkOnRoot(root, Sync);
      }
      return;
    }

    // TODO: Get rid of Sync and use current time?
    if (expirationTime === Sync) {
      performWork(Sync, null);
    } else if (!isCallbackScheduled) {
      isCallbackScheduled = true;
      startRequestCallbackTimer();
      scheduleDeferredCallback(performAsyncWork);
    }
  }

  function findHighestPriorityRoot() {
    var highestPriorityWork = NoWork;
    var highestPriorityRoot = null;

    if (lastScheduledRoot !== null) {
      var previousScheduledRoot = lastScheduledRoot;
      var root = firstScheduledRoot;
      while (root !== null) {
        var remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === NoWork) {
          // This root no longer has work. Remove it from the scheduler.

          // TODO: This check is redudant, but Flow is confused by the branch
          // below where we set lastScheduledRoot to null, even though we break
          // from the loop right after.
          !(previousScheduledRoot !== null && lastScheduledRoot !== null) ? invariant(false, 'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          if (root === root.nextScheduledRoot) {
            // This is the only root in the list.
            root.nextScheduledRoot = null;
            firstScheduledRoot = lastScheduledRoot = null;
            break;
          } else if (root === firstScheduledRoot) {
            // This is the first root in the list.
            var next = root.nextScheduledRoot;
            firstScheduledRoot = next;
            lastScheduledRoot.nextScheduledRoot = next;
            root.nextScheduledRoot = null;
          } else if (root === lastScheduledRoot) {
            // This is the last root in the list.
            lastScheduledRoot = previousScheduledRoot;
            lastScheduledRoot.nextScheduledRoot = firstScheduledRoot;
            root.nextScheduledRoot = null;
            break;
          } else {
            previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot;
            root.nextScheduledRoot = null;
          }
          root = previousScheduledRoot.nextScheduledRoot;
        } else {
          if (highestPriorityWork === NoWork || remainingExpirationTime < highestPriorityWork) {
            // Update the priority, if it's higher
            highestPriorityWork = remainingExpirationTime;
            highestPriorityRoot = root;
          }
          if (root === lastScheduledRoot) {
            break;
          }
          previousScheduledRoot = root;
          root = root.nextScheduledRoot;
        }
      }
    }

    // If the next root is the same as the previous root, this is a nested
    // update. To prevent an infinite loop, increment the nested update count.
    var previousFlushedRoot = nextFlushedRoot;
    if (previousFlushedRoot !== null && previousFlushedRoot === highestPriorityRoot) {
      nestedUpdateCount++;
    } else {
      // Reset whenever we switch roots.
      nestedUpdateCount = 0;
    }
    nextFlushedRoot = highestPriorityRoot;
    nextFlushedExpirationTime = highestPriorityWork;
  }

  function performAsyncWork(dl) {
    performWork(NoWork, dl);
  }

  function performWork(minExpirationTime, dl) {
    deadline = dl;

    // Keep working on roots until there's no more work, or until the we reach
    // the deadline.
    findHighestPriorityRoot();

    if (enableUserTimingAPI && deadline !== null) {
      var didExpire = nextFlushedExpirationTime < recalculateCurrentTime();
      stopRequestCallbackTimer(didExpire);
    }

    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && (minExpirationTime === NoWork || nextFlushedExpirationTime <= minExpirationTime) && !deadlineDidExpire) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime);
      // Find the next highest priority work.
      findHighestPriorityRoot();
    }

    // We're done flushing work. Either we ran out of time in this callback,
    // or there's no more work left with sufficient priority.

    // If we're inside a callback, set this to false since we just completed it.
    if (deadline !== null) {
      isCallbackScheduled = false;
    }
    // If there's work left over, schedule a new callback.
    if (nextFlushedRoot !== null && !isCallbackScheduled) {
      isCallbackScheduled = true;
      startRequestCallbackTimer();
      scheduleDeferredCallback(performAsyncWork);
    }

    // Clean-up.
    deadline = null;
    deadlineDidExpire = false;
    nestedUpdateCount = 0;

    if (hasUnhandledError) {
      var _error4 = unhandledError;
      unhandledError = null;
      hasUnhandledError = false;
      throw _error4;
    }
  }

  function performWorkOnRoot(root, expirationTime) {
    !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    isRendering = true;

    // Check if this is async work or sync/expired work.
    // TODO: Pass current time as argument to renderRoot, commitRoot
    if (expirationTime <= recalculateCurrentTime()) {
      // Flush sync work.
      var finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(finishedWork);
      } else {
        root.finishedWork = null;
        finishedWork = renderRoot(root, expirationTime);
        if (finishedWork !== null) {
          // We've completed the root. Commit it.
          root.remainingExpirationTime = commitRoot(finishedWork);
        }
      }
    } else {
      // Flush async work.
      var _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // This root is already complete. We can commit it.
        root.finishedWork = null;
        root.remainingExpirationTime = commitRoot(_finishedWork);
      } else {
        root.finishedWork = null;
        _finishedWork = renderRoot(root, expirationTime);
        if (_finishedWork !== null) {
          // We've completed the root. Check the deadline one more time
          // before committing.
          if (!shouldYield()) {
            // Still time left. Commit the root.
            root.remainingExpirationTime = commitRoot(_finishedWork);
          } else {
            // There's no time left. Mark this root as complete. We'll come
            // back and commit it later.
            root.finishedWork = _finishedWork;
          }
        }
      }
    }

    isRendering = false;
  }

  // When working on async work, the reconciler asks the renderer if it should
  // yield execution. For DOM, we implement this with requestIdleCallback.
  function shouldYield() {
    if (deadline === null) {
      return false;
    }
    if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
      return false;
    }
    deadlineDidExpire = true;
    return true;
  }

  // TODO: Not happy about this hook. Conceptually, renderRoot should return a
  // tuple of (isReadyForCommit, didError, error)
  function onUncaughtError(error) {
    !(nextFlushedRoot !== null) ? invariant(false, 'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    // Unschedule this root so we don't work on it again until there's
    // another update.
    nextFlushedRoot.remainingExpirationTime = NoWork;
    if (!hasUnhandledError) {
      hasUnhandledError = true;
      unhandledError = error;
    }
  }

  // TODO: Batching should be implemented at the renderer level, not inside
  // the reconciler.
  function batchedUpdates(fn, a) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      if (!isBatchingUpdates && !isRendering) {
        performWork(Sync, null);
      }
    }
  }

  // TODO: Batching should be implemented at the renderer level, not inside
  // the reconciler.
  function unbatchedUpdates(fn) {
    if (isBatchingUpdates && !isUnbatchingUpdates) {
      isUnbatchingUpdates = true;
      try {
        return fn();
      } finally {
        isUnbatchingUpdates = false;
      }
    }
    return fn();
  }

  // TODO: Batching should be implemented at the renderer level, not within
  // the reconciler.
  function flushSync(fn) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = true;
    try {
      return syncUpdates(fn);
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      !!isRendering ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
      performWork(Sync, null);
    }
  }

  return {
    computeAsyncExpiration: computeAsyncExpiration,
    computeExpirationForFiber: computeExpirationForFiber,
    scheduleWork: scheduleWork,
    batchedUpdates: batchedUpdates,
    unbatchedUpdates: unbatchedUpdates,
    flushSync: flushSync,
    deferredUpdates: deferredUpdates
  };
};

{
  var didWarnAboutNestedUpdates = false;
}

// 0 is PROD, 1 is DEV.
// Might add PROFILE later.


function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyObject;
  }

  var fiber = get(parentComponent);
  var parentContext = findCurrentUnmaskedContext(fiber);
  return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
}

var ReactFiberReconciler$1 = function (config) {
  var getPublicInstance = config.getPublicInstance;

  var _ReactFiberScheduler = ReactFiberScheduler(config),
      computeAsyncExpiration = _ReactFiberScheduler.computeAsyncExpiration,
      computeExpirationForFiber = _ReactFiberScheduler.computeExpirationForFiber,
      scheduleWork = _ReactFiberScheduler.scheduleWork,
      batchedUpdates = _ReactFiberScheduler.batchedUpdates,
      unbatchedUpdates = _ReactFiberScheduler.unbatchedUpdates,
      flushSync = _ReactFiberScheduler.flushSync,
      deferredUpdates = _ReactFiberScheduler.deferredUpdates;

  function scheduleTopLevelUpdate(current, element, callback) {
    {
      if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null && !didWarnAboutNestedUpdates) {
        didWarnAboutNestedUpdates = true;
        warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
      }
    }

    callback = callback === undefined ? null : callback;
    {
      warning(callback === null || typeof callback === 'function', 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);
    }

    var expirationTime = void 0;
    // Check if the top-level element is an async wrapper component. If so,
    // treat updates to the root as async. This is a bit weird but lets us
    // avoid a separate `renderAsync` API.
    if (enableAsyncSubtreeAPI && element != null && element.type != null && element.type.prototype != null && element.type.prototype.unstable_isAsyncReactComponent === true) {
      expirationTime = computeAsyncExpiration();
    } else {
      expirationTime = computeExpirationForFiber(current);
    }

    var update = {
      expirationTime: expirationTime,
      partialState: { element: element },
      callback: callback,
      isReplace: false,
      isForced: false,
      nextCallback: null,
      next: null
    };
    insertUpdateIntoFiber(current, update);
    scheduleWork(current, expirationTime);
  }

  function findHostInstance(fiber) {
    var hostFiber = findCurrentHostFiber(fiber);
    if (hostFiber === null) {
      return null;
    }
    return hostFiber.stateNode;
  }

  return {
    createContainer: function (containerInfo, hydrate) {
      return createFiberRoot(containerInfo, hydrate);
    },
    updateContainer: function (element, container, parentComponent, callback) {
      // TODO: If this is a nested container, this won't be the root.
      var current = container.current;

      {
        if (ReactFiberInstrumentation_1.debugTool) {
          if (current.alternate === null) {
            ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
          }
        }
      }

      var context = getContextForSubtree(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      scheduleTopLevelUpdate(current, element, callback);
    },


    batchedUpdates: batchedUpdates,

    unbatchedUpdates: unbatchedUpdates,

    deferredUpdates: deferredUpdates,

    flushSync: flushSync,

    getPublicRootInstance: function (container) {
      var containerFiber = container.current;
      if (!containerFiber.child) {
        return null;
      }
      switch (containerFiber.child.tag) {
        case HostComponent:
          return getPublicInstance(containerFiber.child.stateNode);
        default:
          return containerFiber.child.stateNode;
      }
    },


    findHostInstance: findHostInstance,

    findHostInstanceWithNoPortals: function (fiber) {
      var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    },
    injectIntoDevTools: function (devToolsConfig) {
      var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;

      return injectInternals(_assign({}, devToolsConfig, {
        findHostInstanceByFiber: function (fiber) {
          return findHostInstance(fiber);
        },
        findFiberByHostInstance: function (instance) {
          if (!findFiberByHostInstance) {
            // Might not be implemented by the renderer.
            return null;
          }
          return findFiberByHostInstance(instance);
        }
      }));
    }
  };
};

var ReactFiberReconciler$2 = Object.freeze({
	default: ReactFiberReconciler$1
});

var ReactFiberReconciler$3 = ( ReactFiberReconciler$2 && ReactFiberReconciler$1 ) || ReactFiberReconciler$2;

// TODO: bundle Flow types with the package.



// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactReconciler = ReactFiberReconciler$3['default'] ? ReactFiberReconciler$3['default'] : ReactFiberReconciler$3;

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.1.2';

// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.

{
  if (ExecutionEnvironment.canUseDOM && typeof requestAnimationFrame !== 'function') {
    warning(false, 'React depends on requestAnimationFrame. Make sure that you load a ' + 'polyfill in older browsers. http://fb.me/react-polyfills');
  }
}

var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

var now = void 0;
if (hasNativePerformanceNow) {
  now = function () {
    return performance.now();
  };
} else {
  now = function () {
    return Date.now();
  };
}

// TODO: There's no way to cancel, because Fiber doesn't atm.
var rIC = void 0;

if (!ExecutionEnvironment.canUseDOM) {
  rIC = function (frameCallback) {
    setTimeout(function () {
      frameCallback({
        timeRemaining: function () {
          return Infinity;
        }
      });
    });
    return 0;
  };
} else if (typeof requestIdleCallback !== 'function') {
  // Polyfill requestIdleCallback.

  var scheduledRICCallback = null;

  var isIdleScheduled = false;
  var isAnimationFrameScheduled = false;

  var frameDeadline = 0;
  // We start out assuming that we run at 30fps but then the heuristic tracking
  // will adjust this value to a faster fps if we get more frequent animation
  // frames.
  var previousFrameTime = 33;
  var activeFrameTime = 33;

  var frameDeadlineObject;
  if (hasNativePerformanceNow) {
    frameDeadlineObject = {
      timeRemaining: function () {
        // We assume that if we have a performance timer that the rAF callback
        // gets a performance timer value. Not sure if this is always true.
        return frameDeadline - performance.now();
      }
    };
  } else {
    frameDeadlineObject = {
      timeRemaining: function () {
        // Fallback to Date.now()
        return frameDeadline - Date.now();
      }
    };
  }

  // We use the postMessage trick to defer idle work until after the repaint.
  var messageKey = '__reactIdleCallback$' + Math.random().toString(36).slice(2);
  var idleTick = function (event) {
    if (event.source !== window || event.data !== messageKey) {
      return;
    }
    isIdleScheduled = false;
    var callback = scheduledRICCallback;
    scheduledRICCallback = null;
    if (callback !== null) {
      callback(frameDeadlineObject);
    }
  };
  // Assumes that we have addEventListener in this environment. Might need
  // something better for old IE.
  window.addEventListener('message', idleTick, false);

  var animationTick = function (rafTime) {
    isAnimationFrameScheduled = false;
    var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
    if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
      if (nextFrameTime < 8) {
        // Defensive coding. We don't support higher frame rates than 120hz.
        // If we get lower than that, it is probably a bug.
        nextFrameTime = 8;
      }
      // If one frame goes long, then the next one can be short to catch up.
      // If two frames are short in a row, then that's an indication that we
      // actually have a higher frame rate than what we're currently optimizing.
      // We adjust our heuristic dynamically accordingly. For example, if we're
      // running on 120hz display or 90hz VR display.
      // Take the max of the two in case one of them was an anomaly due to
      // missed frame deadlines.
      activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
    } else {
      previousFrameTime = nextFrameTime;
    }
    frameDeadline = rafTime + activeFrameTime;
    if (!isIdleScheduled) {
      isIdleScheduled = true;
      window.postMessage(messageKey, '*');
    }
  };

  rIC = function (callback) {
    // This assumes that we only schedule one callback at a time because that's
    // how Fiber uses it.
    scheduledRICCallback = callback;
    if (!isAnimationFrameScheduled) {
      // If rAF didn't already schedule one, we need to schedule a frame.
      // TODO: If this rAF doesn't materialize because the browser throttles, we
      // might want to still have setTimeout trigger rIC as a backup to ensure
      // that we keep performing work.
      isAnimationFrameScheduled = true;
      requestAnimationFrame(animationTick);
    }
    return 0;
  };
} else {
  rIC = requestIdleCallback;
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

// isAttributeNameSafe() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + ATTRIBUTE_NAME_START_CHAR + '][' + ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  {
    warning(false, 'Invalid attribute name: `%s`', attributeName);
  }
  return false;
}

// shouldIgnoreValue() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */





/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */
function getValueForProperty(node, name, expected) {
  {
    var propertyInfo = getPropertyInfo(name);
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod || propertyInfo.mustUseProperty) {
        return node[propertyInfo.propertyName];
      } else {
        var attributeName = propertyInfo.attributeName;

        var stringValue = null;

        if (propertyInfo.hasOverloadedBooleanValue) {
          if (node.hasAttribute(attributeName)) {
            var value = node.getAttribute(attributeName);
            if (value === '') {
              return true;
            }
            if (shouldIgnoreValue(propertyInfo, expected)) {
              return value;
            }
            if (value === '' + expected) {
              return expected;
            }
            return value;
          }
        } else if (node.hasAttribute(attributeName)) {
          if (shouldIgnoreValue(propertyInfo, expected)) {
            // We had an attribute but shouldn't have had one, so read it
            // for the error message.
            return node.getAttribute(attributeName);
          }
          if (propertyInfo.hasBooleanValue) {
            // If this was a boolean, it doesn't matter what the value is
            // the fact that we have it is the same as the expected.
            return expected;
          }
          // Even if this property uses a namespace we use getAttribute
          // because we assume its namespaced name is the same as our config.
          // To use getAttributeNS we need the local name which we don't have
          // in our config atm.
          stringValue = node.getAttribute(attributeName);
        }

        if (shouldIgnoreValue(propertyInfo, expected)) {
          return stringValue === null ? expected : stringValue;
        } else if (stringValue === '' + expected) {
          return expected;
        } else {
          return stringValue;
        }
      }
    }
  }
}

/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */
function getValueForAttribute(node, name, expected) {
  {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (!node.hasAttribute(name)) {
      return expected === undefined ? undefined : null;
    }
    var value = node.getAttribute(name);
    if (value === '' + expected) {
      return expected;
    }
    return value;
  }
}

/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */
function setValueForProperty(node, name, value) {
  var propertyInfo = getPropertyInfo(name);

  if (propertyInfo && shouldSetAttribute(name, value)) {
    var mutationMethod = propertyInfo.mutationMethod;
    if (mutationMethod) {
      mutationMethod(node, value);
    } else if (shouldIgnoreValue(propertyInfo, value)) {
      deleteValueForProperty(node, name);
      return;
    } else if (propertyInfo.mustUseProperty) {
      // Contrary to `setAttribute`, object properties are properly
      // `toString`ed by IE8/9.
      node[propertyInfo.propertyName] = value;
    } else {
      var attributeName = propertyInfo.attributeName;
      var namespace = propertyInfo.attributeNamespace;
      // `setAttribute` with objects becomes only `[object]` in IE8/9,
      // ('' + value) makes it output the correct toString()-value.
      if (namespace) {
        node.setAttributeNS(namespace, attributeName, '' + value);
      } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        node.setAttribute(attributeName, '');
      } else {
        node.setAttribute(attributeName, '' + value);
      }
    }
  } else {
    setValueForAttribute(node, name, shouldSetAttribute(name, value) ? value : null);
    return;
  }

  {
    
  }
}

function setValueForAttribute(node, name, value) {
  if (!isAttributeNameSafe(name)) {
    return;
  }
  if (value == null) {
    node.removeAttribute(name);
  } else {
    node.setAttribute(name, '' + value);
  }

  {
    
  }
}

/**
 * Deletes an attributes from a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
function deleteValueForAttribute(node, name) {
  node.removeAttribute(name);
}

/**
 * Deletes the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */
function deleteValueForProperty(node, name) {
  var propertyInfo = getPropertyInfo(name);
  if (propertyInfo) {
    var mutationMethod = propertyInfo.mutationMethod;
    if (mutationMethod) {
      mutationMethod(node, undefined);
    } else if (propertyInfo.mustUseProperty) {
      var propName = propertyInfo.propertyName;
      if (propertyInfo.hasBooleanValue) {
        node[propName] = false;
      } else {
        node[propName] = '';
      }
    } else {
      node.removeAttribute(propertyInfo.attributeName);
    }
  } else {
    node.removeAttribute(name);
  }
}

var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };

  var propTypes = {
    value: function (props, propName, componentName) {
      if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    }
  };

  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */
  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
    checkPropTypes(propTypes, props, 'prop', tagName, getStack);
  };
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValueDefaultValue = false;
var didWarnCheckedDefaultChecked = false;
var didWarnControlledToUncontrolled = false;
var didWarnUncontrolledToControlled = false;

function isControlled(props) {
  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
  return usesChecked ? props.checked != null : props.value != null;
}

/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */

function getHostProps(element, props) {
  var node = element;
  var value = props.value;
  var checked = props.checked;

  var hostProps = _assign({
    // Make sure we set .type before any other properties (setting .value
    // before .type means .value is lost in IE11 and below)
    type: undefined,
    // Make sure we set .step before .value (setting .value before .step
    // means .value is rounded on mount, based upon step precision)
    step: undefined,
    // Make sure we set .min & .max before .value (to ensure proper order
    // in corner cases such as min or max deriving from value, e.g. Issue #7170)
    min: undefined,
    max: undefined
  }, props, {
    defaultChecked: undefined,
    defaultValue: undefined,
    value: value != null ? value : node._wrapperState.initialValue,
    checked: checked != null ? checked : node._wrapperState.initialChecked
  });

  return hostProps;
}

function initWrapperState(element, props) {
  {
    ReactControlledValuePropTypes.checkPropTypes('input', props, getCurrentFiberStackAddendum$3);

    if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
      warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$2() || 'A component', props.type);
      didWarnCheckedDefaultChecked = true;
    }
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
      warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', getCurrentFiberOwnerName$2() || 'A component', props.type);
      didWarnValueDefaultValue = true;
    }
  }

  var defaultValue = props.defaultValue;
  var node = element;
  node._wrapperState = {
    initialChecked: props.checked != null ? props.checked : props.defaultChecked,
    initialValue: props.value != null ? props.value : defaultValue,
    controlled: isControlled(props)
  };
}

function updateWrapper(element, props) {
  var node = element;
  {
    var controlled = isControlled(props);

    if (!node._wrapperState.controlled && controlled && !didWarnUncontrolledToControlled) {
      warning(false, 'A component is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum$3());
      didWarnUncontrolledToControlled = true;
    }
    if (node._wrapperState.controlled && !controlled && !didWarnControlledToUncontrolled) {
      warning(false, 'A component is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s', props.type, getCurrentFiberStackAddendum$3());
      didWarnControlledToUncontrolled = true;
    }
  }

  var checked = props.checked;
  if (checked != null) {
    setValueForProperty(node, 'checked', checked || false);
  }

  var value = props.value;
  if (value != null) {
    if (value === 0 && node.value === '') {
      node.value = '0';
      // Note: IE9 reports a number inputs as 'text', so check props instead.
    } else if (props.type === 'number') {
      // Simulate `input.valueAsNumber`. IE9 does not support it
      var valueAsNumber = parseFloat(node.value) || 0;

      if (
      // eslint-disable-next-line
      value != valueAsNumber ||
      // eslint-disable-next-line
      value == valueAsNumber && node.value != value) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        node.value = '' + value;
      }
    } else if (node.value !== '' + value) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      node.value = '' + value;
    }
  } else {
    if (props.value == null && props.defaultValue != null) {
      // In Chrome, assigning defaultValue to certain input types triggers input validation.
      // For number inputs, the display value loses trailing decimal points. For email inputs,
      // Chrome raises "The specified value <x> is not a valid email address".
      //
      // Here we check to see if the defaultValue has actually changed, avoiding these problems
      // when the user is inputting text
      //
      // https://github.com/facebook/react/issues/7253
      if (node.defaultValue !== '' + props.defaultValue) {
        node.defaultValue = '' + props.defaultValue;
      }
    }
    if (props.checked == null && props.defaultChecked != null) {
      node.defaultChecked = !!props.defaultChecked;
    }
  }
}

function postMountWrapper(element, props) {
  var node = element;

  // Detach value from defaultValue. We won't do anything if we're working on
  // submit or reset inputs as those values & defaultValues are linked. They
  // are not resetable nodes so this operation doesn't matter and actually
  // removes browser-default values (eg "Submit Query") when no value is
  // provided.

  switch (props.type) {
    case 'submit':
    case 'reset':
      break;
    case 'color':
    case 'date':
    case 'datetime':
    case 'datetime-local':
    case 'month':
    case 'time':
    case 'week':
      // This fixes the no-show issue on iOS Safari and Android Chrome:
      // https://github.com/facebook/react/issues/7233
      node.value = '';
      node.value = node.defaultValue;
      break;
    default:
      node.value = node.value;
      break;
  }

  // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
  // this is needed to work around a chrome bug where setting defaultChecked
  // will sometimes influence the value of checked (even after detachment).
  // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
  // We need to temporarily unset name to avoid disrupting radio button groups.
  var name = node.name;
  if (name !== '') {
    node.name = '';
  }
  node.defaultChecked = !node.defaultChecked;
  node.defaultChecked = !node.defaultChecked;
  if (name !== '') {
    node.name = name;
  }
}

function restoreControlledState$1(element, props) {
  var node = element;
  updateWrapper(node, props);
  updateNamedCousins(node, props);
}

function updateNamedCousins(rootNode, props) {
  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form. It might not even be in the
    // document. Let's just use the local `querySelectorAll` to ensure we don't
    // miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React radio buttons with non-React ones.
      var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
      !otherProps ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : void 0;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      updateWrapper(otherNode, otherProps);
    }
  }
}

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  // We can silently skip them because invalid DOM nesting warning
  // catches these cases in Fiber.
  React.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */

function validateProps(element, props) {
  // TODO (yungsters): Remove support for `selected` in <option>.
  {
    warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.');
  }
}

function postMountWrapper$1(element, props) {
  // value="" should make a value attribute (#6219)
  if (props.value != null) {
    element.setAttribute('value', props.value);
  }
}

function getHostProps$1(element, props) {
  var hostProps = _assign({ children: undefined }, props);

  var content = flattenChildren(props.children);

  if (content) {
    hostProps.children = content;
  }

  return hostProps;
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;


{
  var didWarnValueDefaultValue$1 = false;
}

function getDeclarationErrorAddendum() {
  var ownerName = getCurrentFiberOwnerName$3();
  if (ownerName) {
    return '\n\nCheck the render method of `' + ownerName + '`.';
  }
  return '';
}

var valuePropNames = ['value', 'defaultValue'];

/**
 * Validation function for `value` and `defaultValue`.
 */
function checkSelectPropTypes(props) {
  ReactControlledValuePropTypes.checkPropTypes('select', props, getCurrentFiberStackAddendum$4);

  for (var i = 0; i < valuePropNames.length; i++) {
    var propName = valuePropNames[i];
    if (props[propName] == null) {
      continue;
    }
    var isArray = Array.isArray(props[propName]);
    if (props.multiple && !isArray) {
      warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum());
    } else if (!props.multiple && isArray) {
      warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum());
    }
  }
}

function updateOptions(node, multiple, propValue, setDefaultSelected) {
  var options = node.options;

  if (multiple) {
    var selectedValues = propValue;
    var selectedValue = {};
    for (var i = 0; i < selectedValues.length; i++) {
      // Prefix to avoid chaos with special keys.
      selectedValue['$' + selectedValues[i]] = true;
    }
    for (var _i = 0; _i < options.length; _i++) {
      var selected = selectedValue.hasOwnProperty('$' + options[_i].value);
      if (options[_i].selected !== selected) {
        options[_i].selected = selected;
      }
      if (selected && setDefaultSelected) {
        options[_i].defaultSelected = true;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    var _selectedValue = '' + propValue;
    var defaultSelected = null;
    for (var _i2 = 0; _i2 < options.length; _i2++) {
      if (options[_i2].value === _selectedValue) {
        options[_i2].selected = true;
        if (setDefaultSelected) {
          options[_i2].defaultSelected = true;
        }
        return;
      }
      if (defaultSelected === null && !options[_i2].disabled) {
        defaultSelected = options[_i2];
      }
    }
    if (defaultSelected !== null) {
      defaultSelected.selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */

function getHostProps$2(element, props) {
  return _assign({}, props, {
    value: undefined
  });
}

function initWrapperState$1(element, props) {
  var node = element;
  {
    checkSelectPropTypes(props);
  }

  var value = props.value;
  node._wrapperState = {
    initialValue: value != null ? value : props.defaultValue,
    wasMultiple: !!props.multiple
  };

  {
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
      warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
      didWarnValueDefaultValue$1 = true;
    }
  }
}

function postMountWrapper$2(element, props) {
  var node = element;
  node.multiple = !!props.multiple;
  var value = props.value;
  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  } else if (props.defaultValue != null) {
    updateOptions(node, !!props.multiple, props.defaultValue, true);
  }
}

function postUpdateWrapper(element, props) {
  var node = element;
  // After the initial mount, we control selected-ness manually so don't pass
  // this value down
  node._wrapperState.initialValue = undefined;

  var wasMultiple = node._wrapperState.wasMultiple;
  node._wrapperState.wasMultiple = !!props.multiple;

  var value = props.value;
  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  } else if (wasMultiple !== !!props.multiple) {
    // For simplicity, reapply `defaultValue` if `multiple` is toggled.
    if (props.defaultValue != null) {
      updateOptions(node, !!props.multiple, props.defaultValue, true);
    } else {
      // Revert the select back to its default unselected state.
      updateOptions(node, !!props.multiple, props.multiple ? [] : '', false);
    }
  }
}

function restoreControlledState$2(element, props) {
  var node = element;
  var value = props.value;

  if (value != null) {
    updateOptions(node, !!props.multiple, value, false);
  }
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnValDefaultVal = false;

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */

function getHostProps$3(element, props) {
  var node = element;
  !(props.dangerouslySetInnerHTML == null) ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : void 0;

  // Always set children to the same thing. In IE9, the selection range will
  // get reset if `textContent` is mutated.  We could add a check in setTextContent
  // to only set the value if/when the value differs from the node value (which would
  // completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
  // solution. The value can be a boolean or object so that's why it's forced
  // to be a string.
  var hostProps = _assign({}, props, {
    value: undefined,
    defaultValue: undefined,
    children: '' + node._wrapperState.initialValue
  });

  return hostProps;
}

function initWrapperState$2(element, props) {
  var node = element;
  {
    ReactControlledValuePropTypes.checkPropTypes('textarea', props, getCurrentFiberStackAddendum$5);
    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
      warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
      didWarnValDefaultVal = true;
    }
  }

  var value = props.value;
  var initialValue = value;

  // Only bother fetching default value if we're going to use it
  if (value == null) {
    var defaultValue = props.defaultValue;
    // TODO (yungsters): Remove support for children content in <textarea>.
    var children = props.children;
    if (children != null) {
      {
        warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
      }
      !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
      if (Array.isArray(children)) {
        !(children.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
        children = children[0];
      }

      defaultValue = '' + children;
    }
    if (defaultValue == null) {
      defaultValue = '';
    }
    initialValue = defaultValue;
  }

  node._wrapperState = {
    initialValue: '' + initialValue
  };
}

function updateWrapper$1(element, props) {
  var node = element;
  var value = props.value;
  if (value != null) {
    // Cast `value` to a string to ensure the value is set correctly. While
    // browsers typically do this as necessary, jsdom doesn't.
    var newValue = '' + value;

    // To avoid side effects (such as losing text selection), only set value if changed
    if (newValue !== node.value) {
      node.value = newValue;
    }
    if (props.defaultValue == null) {
      node.defaultValue = newValue;
    }
  }
  if (props.defaultValue != null) {
    node.defaultValue = props.defaultValue;
  }
}

function postMountWrapper$3(element, props) {
  var node = element;
  // This is in postMount because we need access to the DOM node, which is not
  // available until after the component has mounted.
  var textContent = node.textContent;

  // Only set node.value if textContent is equal to the expected
  // initial value. In IE10/IE11 there is a bug where the placeholder attribute
  // will populate textContent as well.
  // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
  if (textContent === node._wrapperState.initialValue) {
    node.value = textContent;
  }
}

function restoreControlledState$3(element, props) {
  // DOM component is still mounted; update
  updateWrapper$1(element, props);
}

var HTML_NAMESPACE$1 = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var Namespaces = {
  html: HTML_NAMESPACE$1,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};

// Assumes there is no parent namespace.
function getIntrinsicNamespace(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE$1;
  }
}

function getChildNamespace(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE$1) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace(type);
  }
  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE$1;
  }
  // By default, pass namespace below.
  return parentNamespace;
}

/* globals MSApp */

/**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */
var createMicrosoftUnsafeLocalFunction = function (func) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

// SVG temp container for IE lacking innerHTML
var reusableSVGContainer = void 0;

/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = createMicrosoftUnsafeLocalFunction(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node

  if (node.namespaceURI === Namespaces.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var svgNode = reusableSVGContainer.firstChild;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    while (svgNode.firstChild) {
      node.appendChild(svgNode.firstChild);
    }
  } else {
    node.innerHTML = html;
  }
});

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

if (ExecutionEnvironment.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function (node, text) {
      if (node.nodeType === TEXT_NODE) {
        node.nodeValue = text;
        return;
      }
      setInnerHTML(node, escapeTextContentForBrowser(text));
    };
  }
}

var setTextContent$1 = setTextContent;

/**
 * CSS properties which accept numbers but are not in units of "px".
 */
var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var warnValidStyle = emptyFunction$1;

{
  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var warnHyphenatedStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), getStack());
  };

  var warnBadVendoredStyleName = function (name, getStack) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), getStack());
  };

  var warnStyleValueWithSemicolon = function (name, value, getStack) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    warning(false, "Style property values shouldn't contain a semicolon. " + 'Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ''), getStack());
  };

  var warnStyleValueIsNaN = function (name, value, getStack) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  var warnStyleValueIsInfinity = function (name, value, getStack) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;
    warning(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, getStack());
  };

  warnValidStyle = function (name, value, getStack) {
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, getStack);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, getStack);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, getStack);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value, getStack);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value, getStack);
      }
    }
  };
}

var warnValidStyle$1 = warnValidStyle;

/**
 * Operations for dealing with CSS properties.
 */

/**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */
function createDangerousStringForStyles(styles) {
  {
    var serialized = '';
    var delimiter = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var styleValue = styles[styleName];
      if (styleValue != null) {
        var isCustomProperty = styleName.indexOf('--') === 0;
        serialized += delimiter + hyphenateStyleName(styleName) + ':';
        serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);

        delimiter = ';';
      }
    }
    return serialized || null;
  }
}

/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */
function setValueForStyles(node, styles, getStack) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var isCustomProperty = styleName.indexOf('--') === 0;
    {
      if (!isCustomProperty) {
        warnValidStyle$1(styleName, styles[styleName], getStack);
      }
    }
    var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    if (isCustomProperty) {
      style.setProperty(styleName, styleValue);
    } else {
      style[styleName] = styleValue;
    }
  }
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = _assign({
  menuitem: true
}, omittedCloseTags);

var HTML$1 = '__html';

function assertValidProps(tag, props, getStack) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getStack()) : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML$1 in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
  }
  {
    warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.%s', getStack());
  }
  !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getStack()) : void 0;
}

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;
    default:
      return true;
  }
}

var ariaProperties = {
  'aria-current': 0, // state
  'aria-details': 0,
  'aria-disabled': 0, // state
  'aria-hidden': 0, // state
  'aria-invalid': 0, // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty = Object.prototype.hasOwnProperty;

function getStackAddendum() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperty(tagName, name) {
  if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
    return true;
  }

  if (rARIACamel.test(name)) {
    var ariaName = 'aria-' + name.slice(4).toLowerCase();
    var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (correctName == null) {
      warning(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== correctName) {
      warning(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
  }

  if (rARIA.test(name)) {
    var lowerCasedName = name.toLowerCase();
    var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (standardName == null) {
      warnedProperties[name] = true;
      return false;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== standardName) {
      warning(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum());
      warnedProperties[name] = true;
      return true;
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props) {
  var invalidProps = [];

  for (var key in props) {
    var isValid = validateProperty(type, key);
    if (!isValid) {
      invalidProps.push(key);
    }
  }

  var unknownPropString = invalidProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (invalidProps.length === 1) {
    warning(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
  } else if (invalidProps.length > 1) {
    warning(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum());
  }
}

function validateProperties(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnInvalidARIAProps(type, props);
}

var didWarnValueNull = false;

function getStackAddendum$1() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

function validateProperties$1(type, props) {
  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
    return;
  }

  if (props != null && props.value === null && !didWarnValueNull) {
    didWarnValueNull = true;
    if (type === 'select' && props.multiple) {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty array when `multiple` is set to `true` ' + 'to clear the component or `undefined` for uncontrolled components.%s', type, getStackAddendum$1());
    } else {
      warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using an empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$1());
    }
  }
}

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  'class': 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  'default': 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  'for': 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',

  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  'in': 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  suppresshydrationwarning: 'suppressHydrationWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  'typeof': 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

function getStackAddendum$2() {
  var stack = ReactDebugCurrentFrame.getStackAddendum();
  return stack != null ? stack : '';
}

{
  var warnedProperties$1 = {};
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on[A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + ATTRIBUTE_NAME_CHAR + ']*$');

  var validateProperty$1 = function (tagName, name, value) {
    if (hasOwnProperty$1.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    if (registrationNameModules.hasOwnProperty(name)) {
      return true;
    }

    if (plugins.length === 0 && EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we might be in a server environment.
      // Don't check events in this case.
      return true;
    }

    var lowerCasedName = name.toLowerCase();
    var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;

    if (registrationName != null) {
      warning(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName.indexOf('on') === 0 && lowerCasedName.length > 2) {
      warning(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    // Let the ARIA attribute hook validate ARIA attributes
    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      warning(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      warning(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      warning(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      warning(false, 'Received a `%s` for a string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      warning(false, 'Received NaN for the `%s` attribute. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    var isReserved = isReservedProp(name);

    // Known attributes should match the casing specified in the property config.
    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];
      if (standardName !== name) {
        warning(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$2());
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      warning(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$2());
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean' && !shouldAttributeAcceptBooleanValue(name)) {
      if (value) {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2());
      } else {
        warning(false, 'Received `%s` for a non-boolean attribute `%s`.\n\n' + 'If you want to write it to the DOM, pass a string instead: ' + '%s="%s" or %s={value.toString()}.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2());
      }
      warnedProperties$1[name] = true;
      return true;
    }

    // Now that we've validated casing, do not validate
    // data types for reserved props
    if (isReserved) {
      return true;
    }

    // Warn when a known attribute is a bad type
    if (!shouldSetAttribute(name, value)) {
      warnedProperties$1[name] = true;
      return false;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props) {
  var unknownProps = [];
  for (var key in props) {
    var isValid = validateProperty$1(type, key, props[key]);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');
  if (unknownProps.length === 1) {
    warning(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
  } else if (unknownProps.length > 1) {
    warning(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$2());
  }
};

function validateProperties$2(type, props) {
  if (isCustomComponent(type, props)) {
    return;
  }
  warnUnknownProperties(type, props);
}

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$1 = ReactDebugCurrentFiber.getCurrentFiberOwnerName;
var getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var didWarnInvalidHydration = false;
var didWarnShadyDOM = false;

var DANGEROUSLY_SET_INNER_HTML = 'dangerouslySetInnerHTML';
var SUPPRESS_CONTENT_EDITABLE_WARNING = 'suppressContentEditableWarning';
var SUPPRESS_HYDRATION_WARNING$1 = 'suppressHydrationWarning';
var AUTOFOCUS = 'autoFocus';
var CHILDREN = 'children';
var STYLE = 'style';
var HTML = '__html';

var HTML_NAMESPACE = Namespaces.html;


var getStack = emptyFunction$1.thatReturns('');

{
  getStack = getCurrentFiberStackAddendum$2;

  var warnedUnknownTags = {
    // Chrome is the only major browser not shipping <time>. But as of July
    // 2017 it intends to ship it due to widespread usage. We intentionally
    // *don't* warn for <time> even if it's unrecognized by Chrome because
    // it soon will be, and many apps have been using it anyway.
    time: true,
    // There are working polyfills for <dialog>. Let people use it.
    dialog: true
  };

  var validatePropertiesInDevelopment = function (type, props) {
    validateProperties(type, props);
    validateProperties$1(type, props);
    validateProperties$2(type, props);
  };

  // HTML parsing normalizes CR and CRLF to LF.
  // It also can turn \u0000 into \uFFFD inside attributes.
  // https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
  // If we have a mismatch, it might be caused by that.
  // We will still patch up in this case but not fire the warning.
  var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
  var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;

  var normalizeMarkupForTextOrAttribute = function (markup) {
    var markupString = typeof markup === 'string' ? markup : '' + markup;
    return markupString.replace(NORMALIZE_NEWLINES_REGEX, '\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, '');
  };

  var warnForTextDifference = function (serverText, clientText) {
    if (didWarnInvalidHydration) {
      return;
    }
    var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText);
    var normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
    if (normalizedServerText === normalizedClientText) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText);
  };

  var warnForPropDifference = function (propName, serverValue, clientValue) {
    if (didWarnInvalidHydration) {
      return;
    }
    var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue);
    var normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
    if (normalizedServerValue === normalizedClientValue) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Prop `%s` did not match. Server: %s Client: %s', propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue));
  };

  var warnForExtraAttributes = function (attributeNames) {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    var names = [];
    attributeNames.forEach(function (name) {
      names.push(name);
    });
    warning(false, 'Extra attributes from the server: %s', names);
  };

  var warnForInvalidEventListener = function (registrationName, listener) {
    if (listener === false) {
      warning(false, 'Expected `%s` listener to be a function, instead got `false`.\n\n' + 'If you used to conditionally omit it with %s={condition && value}, ' + 'pass %s={condition ? value : undefined} instead.%s', registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2());
    } else {
      warning(false, 'Expected `%s` listener to be a function, instead got a value of `%s` type.%s', registrationName, typeof listener, getCurrentFiberStackAddendum$2());
    }
  };

  // Parse the HTML and read it back to normalize the HTML string so that it
  // can be used for comparison.
  var normalizeHTML = function (parent, html) {
    // We could have created a separate document here to avoid
    // re-initializing custom elements if they exist. But this breaks
    // how <noscript> is being handled. So we use the same document.
    // See the discussion in https://github.com/facebook/react/pull/11157.
    var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
    testElement.innerHTML = html;
    return testElement.innerHTML;
  };
}

function ensureListeningTo(rootContainerElement, registrationName) {
  var isDocumentOrFragment = rootContainerElement.nodeType === DOCUMENT_NODE || rootContainerElement.nodeType === DOCUMENT_FRAGMENT_NODE;
  var doc = isDocumentOrFragment ? rootContainerElement : rootContainerElement.ownerDocument;
  listenTo(registrationName, doc);
}

function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trapClickOnNonInteractiveElement(node) {
  // Mobile Safari does not fire properly bubble click events on
  // non-interactive elements, which means delegated click listeners do not
  // fire. The workaround for this bug involves attaching an empty click
  // listener on the target node.
  // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
  // Just set it using the onclick property so that we don't have to manage any
  // bookkeeping for it. Not sure if we need to clear it when the listener is
  // removed.
  // TODO: Only do this for the relevant Safaris maybe?
  node.onclick = emptyFunction$1;
}

function setInitialDOMProperties(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
  for (var propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      continue;
    }
    var nextProp = nextProps[propKey];
    if (propKey === STYLE) {
      {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      // Relies on `updateStylesByID` not mutating `styleUpdates`.
      setValueForStyles(domElement, nextProp, getStack);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      if (nextHtml != null) {
        setInnerHTML(domElement, nextHtml);
      }
    } else if (propKey === CHILDREN) {
      if (typeof nextProp === 'string') {
        // Avoid setting initial textContent when the text is empty. In IE11 setting
        // textContent on a <textarea> will cause the placeholder to not
        // show within the <textarea> until it has been focused and blurred again.
        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
        var canSetTextContent = tag !== 'textarea' || nextProp !== '';
        if (canSetTextContent) {
          setTextContent$1(domElement, nextProp);
        }
      } else if (typeof nextProp === 'number') {
        setTextContent$1(domElement, '' + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (propKey === AUTOFOCUS) {
      // We polyfill it separately on the client during commit.
      // We blacklist it here rather than in the property list because we emit it in SSR.
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
    } else if (isCustomComponentTag) {
      setValueForAttribute(domElement, propKey, nextProp);
    } else if (nextProp != null) {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      setValueForProperty(domElement, propKey, nextProp);
    }
  }
}

function updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
  // TODO: Handle wasCustomComponentTag
  for (var i = 0; i < updatePayload.length; i += 2) {
    var propKey = updatePayload[i];
    var propValue = updatePayload[i + 1];
    if (propKey === STYLE) {
      setValueForStyles(domElement, propValue, getStack);
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      setInnerHTML(domElement, propValue);
    } else if (propKey === CHILDREN) {
      setTextContent$1(domElement, propValue);
    } else if (isCustomComponentTag) {
      if (propValue != null) {
        setValueForAttribute(domElement, propKey, propValue);
      } else {
        deleteValueForAttribute(domElement, propKey);
      }
    } else if (propValue != null) {
      setValueForProperty(domElement, propKey, propValue);
    } else {
      // If we're updating to null or undefined, we should remove the property
      // from the DOM node instead of inadvertently setting to a string. This
      // brings us in line with the same behavior we have on initial render.
      deleteValueForProperty(domElement, propKey);
    }
  }
}

function createElement$1(type, props, rootContainerElement, parentNamespace) {
  // We create tags in the namespace of their parent container, except HTML
  var ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement);
  var domElement;
  var namespaceURI = parentNamespace;
  if (namespaceURI === HTML_NAMESPACE) {
    namespaceURI = getIntrinsicNamespace(type);
  }
  if (namespaceURI === HTML_NAMESPACE) {
    {
      var isCustomComponentTag = isCustomComponent(type, props);
      // Should this check be gated by parent namespace? Not sure we want to
      // allow <SVG> or <mATH>.
      warning(isCustomComponentTag || type === type.toLowerCase(), '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', type);
    }

    if (type === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      // set to true and it does not execute
      var div = ownerDocument.createElement('div');
      div.innerHTML = '<script><' + '/script>'; // eslint-disable-line
      // This is guaranteed to yield a script element.
      var firstChild = div.firstChild;
      domElement = div.removeChild(firstChild);
    } else if (typeof props.is === 'string') {
      // $FlowIssue `createElement` should be updated for Web Components
      domElement = ownerDocument.createElement(type, { is: props.is });
    } else {
      // Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
      // See discussion in https://github.com/facebook/react/pull/6896
      // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
      domElement = ownerDocument.createElement(type);
    }
  } else {
    domElement = ownerDocument.createElementNS(namespaceURI, type);
  }

  {
    if (namespaceURI === HTML_NAMESPACE) {
      if (!isCustomComponentTag && Object.prototype.toString.call(domElement) === '[object HTMLUnknownElement]' && !Object.prototype.hasOwnProperty.call(warnedUnknownTags, type)) {
        warnedUnknownTags[type] = true;
        warning(false, 'The tag <%s> is unrecognized in this browser. ' + 'If you meant to render a React component, start its name with ' + 'an uppercase letter.', type);
      }
    }
  }

  return domElement;
}

function createTextNode$1(text, rootContainerElement) {
  return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
}

function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
  var isCustomComponentTag = isCustomComponent(tag, rawProps);
  {
    validatePropertiesInDevelopment(tag, rawProps);
    if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
      warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$1() || 'A component');
      didWarnShadyDOM = true;
    }
  }

  // TODO: Make sure that we check isMounted before firing any of these events.
  var props;
  switch (tag) {
    case 'iframe':
    case 'object':
      trapBubbledEvent('topLoad', 'load', domElement);
      props = rawProps;
      break;
    case 'video':
    case 'audio':
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          trapBubbledEvent(event, mediaEvents[event], domElement);
        }
      }
      props = rawProps;
      break;
    case 'source':
      trapBubbledEvent('topError', 'error', domElement);
      props = rawProps;
      break;
    case 'img':
    case 'image':
      trapBubbledEvent('topError', 'error', domElement);
      trapBubbledEvent('topLoad', 'load', domElement);
      props = rawProps;
      break;
    case 'form':
      trapBubbledEvent('topReset', 'reset', domElement);
      trapBubbledEvent('topSubmit', 'submit', domElement);
      props = rawProps;
      break;
    case 'details':
      trapBubbledEvent('topToggle', 'toggle', domElement);
      props = rawProps;
      break;
    case 'input':
      initWrapperState(domElement, rawProps);
      props = getHostProps(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'option':
      validateProps(domElement, rawProps);
      props = getHostProps$1(domElement, rawProps);
      break;
    case 'select':
      initWrapperState$1(domElement, rawProps);
      props = getHostProps$2(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'textarea':
      initWrapperState$2(domElement, rawProps);
      props = getHostProps$3(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    default:
      props = rawProps;
  }

  assertValidProps(tag, props, getStack);

  setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);

  switch (tag) {
    case 'input':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper(domElement, rawProps);
      break;
    case 'textarea':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper$3(domElement, rawProps);
      break;
    case 'option':
      postMountWrapper$1(domElement, rawProps);
      break;
    case 'select':
      postMountWrapper$2(domElement, rawProps);
      break;
    default:
      if (typeof props.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }
}

// Calculate the diff between the two objects.
function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
  {
    validatePropertiesInDevelopment(tag, nextRawProps);
  }

  var updatePayload = null;

  var lastProps;
  var nextProps;
  switch (tag) {
    case 'input':
      lastProps = getHostProps(domElement, lastRawProps);
      nextProps = getHostProps(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'option':
      lastProps = getHostProps$1(domElement, lastRawProps);
      nextProps = getHostProps$1(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'select':
      lastProps = getHostProps$2(domElement, lastRawProps);
      nextProps = getHostProps$2(domElement, nextRawProps);
      updatePayload = [];
      break;
    case 'textarea':
      lastProps = getHostProps$3(domElement, lastRawProps);
      nextProps = getHostProps$3(domElement, nextRawProps);
      updatePayload = [];
      break;
    default:
      lastProps = lastRawProps;
      nextProps = nextRawProps;
      if (typeof lastProps.onClick !== 'function' && typeof nextProps.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }

  assertValidProps(tag, nextProps, getStack);

  var propKey;
  var styleName;
  var styleUpdates = null;
  for (propKey in lastProps) {
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
      continue;
    }
    if (propKey === STYLE) {
      var lastStyle = lastProps[propKey];
      for (styleName in lastStyle) {
        if (lastStyle.hasOwnProperty(styleName)) {
          if (!styleUpdates) {
            styleUpdates = {};
          }
          styleUpdates[styleName] = '';
        }
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML || propKey === CHILDREN) {
      // Noop. This is handled by the clear text mechanism.
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (propKey === AUTOFOCUS) {
      // Noop. It doesn't work on updates anyway.
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      // This is a special case. If any listener updates we need to ensure
      // that the "current" fiber pointer gets updated so we need a commit
      // to update this element.
      if (!updatePayload) {
        updatePayload = [];
      }
    } else {
      // For all other deleted properties we add it to the queue. We use
      // the whitelist in the commit phase instead.
      (updatePayload = updatePayload || []).push(propKey, null);
    }
  }
  for (propKey in nextProps) {
    var nextProp = nextProps[propKey];
    var lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
      continue;
    }
    if (propKey === STYLE) {
      {
        if (nextProp) {
          // Freeze the next style object so that we can assume it won't be
          // mutated. We have already warned for this in the past.
          Object.freeze(nextProp);
        }
      }
      if (lastProp) {
        // Unset styles on `lastProp` but not on `nextProp`.
        for (styleName in lastProp) {
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
        // Update styles that changed since `lastProp`.
        for (styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = nextProp[styleName];
          }
        }
      } else {
        // Relies on `updateStylesByID` not mutating `styleUpdates`.
        if (!styleUpdates) {
          if (!updatePayload) {
            updatePayload = [];
          }
          updatePayload.push(propKey, styleUpdates);
        }
        styleUpdates = nextProp;
      }
    } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
      var nextHtml = nextProp ? nextProp[HTML] : undefined;
      var lastHtml = lastProp ? lastProp[HTML] : undefined;
      if (nextHtml != null) {
        if (lastHtml !== nextHtml) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextHtml);
        }
      } else {
        // TODO: It might be too late to clear this if we have children
        // inserted already.
      }
    } else if (propKey === CHILDREN) {
      if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
        (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
      }
    } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1) {
      // Noop
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        // We eagerly listen to this even though we haven't committed yet.
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
      if (!updatePayload && lastProp !== nextProp) {
        // This is a special case. If any listener updates we need to ensure
        // that the "current" props pointer gets updated so we need a commit
        // to update this element.
        updatePayload = [];
      }
    } else {
      // For any other property we always add it to the queue and then we
      // filter it out using the whitelist during the commit.
      (updatePayload = updatePayload || []).push(propKey, nextProp);
    }
  }
  if (styleUpdates) {
    (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
  }
  return updatePayload;
}

// Apply the diff.
function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
  var wasCustomComponentTag = isCustomComponent(tag, lastRawProps);
  var isCustomComponentTag = isCustomComponent(tag, nextRawProps);
  // Apply the diff.
  updateDOMProperties(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag);

  // TODO: Ensure that an update gets scheduled if any of the special props
  // changed.
  switch (tag) {
    case 'input':
      // Update the wrapper around inputs *after* updating props. This has to
      // happen after `updateDOMProperties`. Otherwise HTML5 input validations
      // raise warnings and prevent the new value from being assigned.
      updateWrapper(domElement, nextRawProps);

      // We also check that we haven't missed a value update, such as a
      // Radio group shifting the checked value to another named radio input.
      updateValueIfChanged(domElement);
      break;
    case 'textarea':
      updateWrapper$1(domElement, nextRawProps);
      break;
    case 'select':
      // <select> value update needs to occur after <option> children
      // reconciliation
      postUpdateWrapper(domElement, nextRawProps);
      break;
  }
}

function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
  {
    var suppressHydrationWarning = rawProps[SUPPRESS_HYDRATION_WARNING$1] === true;
    var isCustomComponentTag = isCustomComponent(tag, rawProps);
    validatePropertiesInDevelopment(tag, rawProps);
    if (isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot) {
      warning(false, '%s is using shady DOM. Using shady DOM with React can ' + 'cause things to break subtly.', getCurrentFiberOwnerName$1() || 'A component');
      didWarnShadyDOM = true;
    }
  }

  // TODO: Make sure that we check isMounted before firing any of these events.
  switch (tag) {
    case 'iframe':
    case 'object':
      trapBubbledEvent('topLoad', 'load', domElement);
      break;
    case 'video':
    case 'audio':
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          trapBubbledEvent(event, mediaEvents[event], domElement);
        }
      }
      break;
    case 'source':
      trapBubbledEvent('topError', 'error', domElement);
      break;
    case 'img':
    case 'image':
      trapBubbledEvent('topError', 'error', domElement);
      trapBubbledEvent('topLoad', 'load', domElement);
      break;
    case 'form':
      trapBubbledEvent('topReset', 'reset', domElement);
      trapBubbledEvent('topSubmit', 'submit', domElement);
      break;
    case 'details':
      trapBubbledEvent('topToggle', 'toggle', domElement);
      break;
    case 'input':
      initWrapperState(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'option':
      validateProps(domElement, rawProps);
      break;
    case 'select':
      initWrapperState$1(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
    case 'textarea':
      initWrapperState$2(domElement, rawProps);
      trapBubbledEvent('topInvalid', 'invalid', domElement);
      // For controlled components we always need to ensure we're listening
      // to onChange. Even if there is no listener.
      ensureListeningTo(rootContainerElement, 'onChange');
      break;
  }

  assertValidProps(tag, rawProps, getStack);

  {
    var extraAttributeNames = new Set();
    var attributes = domElement.attributes;
    for (var i = 0; i < attributes.length; i++) {
      var name = attributes[i].name.toLowerCase();
      switch (name) {
        // Built-in SSR attribute is whitelisted
        case 'data-reactroot':
          break;
        // Controlled attributes are not validated
        // TODO: Only ignore them on controlled tags.
        case 'value':
          break;
        case 'checked':
          break;
        case 'selected':
          break;
        default:
          // Intentionally use the original name.
          // See discussion in https://github.com/facebook/react/pull/10676.
          extraAttributeNames.add(attributes[i].name);
      }
    }
  }

  var updatePayload = null;
  for (var propKey in rawProps) {
    if (!rawProps.hasOwnProperty(propKey)) {
      continue;
    }
    var nextProp = rawProps[propKey];
    if (propKey === CHILDREN) {
      // For text content children we compare against textContent. This
      // might match additional HTML that is hidden when we read it using
      // textContent. E.g. "foo" will match "f<span>oo</span>" but that still
      // satisfies our requirement. Our requirement is not to produce perfect
      // HTML and attributes. Ideally we should preserve structure but it's
      // ok not to if the visible content is still enough to indicate what
      // even listeners these nodes might be wired up to.
      // TODO: Warn if there is more than a single textNode as a child.
      // TODO: Should we use domElement.firstChild.nodeValue to compare?
      if (typeof nextProp === 'string') {
        if (domElement.textContent !== nextProp) {
          if (true && !suppressHydrationWarning) {
            warnForTextDifference(domElement.textContent, nextProp);
          }
          updatePayload = [CHILDREN, nextProp];
        }
      } else if (typeof nextProp === 'number') {
        if (domElement.textContent !== '' + nextProp) {
          if (true && !suppressHydrationWarning) {
            warnForTextDifference(domElement.textContent, nextProp);
          }
          updatePayload = [CHILDREN, '' + nextProp];
        }
      }
    } else if (registrationNameModules.hasOwnProperty(propKey)) {
      if (nextProp != null) {
        if (true && typeof nextProp !== 'function') {
          warnForInvalidEventListener(propKey, nextProp);
        }
        ensureListeningTo(rootContainerElement, propKey);
      }
    } else {
      // Validate that the properties correspond to their expected values.
      var serverValue;
      var propertyInfo;
      if (suppressHydrationWarning) {
        // Don't bother comparing. We're ignoring all these warnings.
      } else if (propKey === SUPPRESS_CONTENT_EDITABLE_WARNING || propKey === SUPPRESS_HYDRATION_WARNING$1 ||
      // Controlled attributes are not validated
      // TODO: Only ignore them on controlled tags.
      propKey === 'value' || propKey === 'checked' || propKey === 'selected') {
        // Noop
      } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
        var rawHtml = nextProp ? nextProp[HTML] || '' : '';
        var serverHTML = domElement.innerHTML;
        var expectedHTML = normalizeHTML(domElement, rawHtml);
        if (expectedHTML !== serverHTML) {
          warnForPropDifference(propKey, serverHTML, expectedHTML);
        }
      } else if (propKey === STYLE) {
        // $FlowFixMe - Should be inferred as not undefined.
        extraAttributeNames['delete'](propKey);
        var expectedStyle = createDangerousStringForStyles(nextProp);
        serverValue = domElement.getAttribute('style');
        if (expectedStyle !== serverValue) {
          warnForPropDifference(propKey, serverValue, expectedStyle);
        }
      } else if (isCustomComponentTag) {
        // $FlowFixMe - Should be inferred as not undefined.
        extraAttributeNames['delete'](propKey.toLowerCase());
        serverValue = getValueForAttribute(domElement, propKey, nextProp);

        if (nextProp !== serverValue) {
          warnForPropDifference(propKey, serverValue, nextProp);
        }
      } else if (shouldSetAttribute(propKey, nextProp)) {
        if (propertyInfo = getPropertyInfo(propKey)) {
          // $FlowFixMe - Should be inferred as not undefined.
          extraAttributeNames['delete'](propertyInfo.attributeName);
          serverValue = getValueForProperty(domElement, propKey, nextProp);
        } else {
          var ownNamespace = parentNamespace;
          if (ownNamespace === HTML_NAMESPACE) {
            ownNamespace = getIntrinsicNamespace(tag);
          }
          if (ownNamespace === HTML_NAMESPACE) {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames['delete'](propKey.toLowerCase());
          } else {
            // $FlowFixMe - Should be inferred as not undefined.
            extraAttributeNames['delete'](propKey);
          }
          serverValue = getValueForAttribute(domElement, propKey, nextProp);
        }

        if (nextProp !== serverValue) {
          warnForPropDifference(propKey, serverValue, nextProp);
        }
      }
    }
  }

  {
    // $FlowFixMe - Should be inferred as not undefined.
    if (extraAttributeNames.size > 0 && !suppressHydrationWarning) {
      // $FlowFixMe - Should be inferred as not undefined.
      warnForExtraAttributes(extraAttributeNames);
    }
  }

  switch (tag) {
    case 'input':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper(domElement, rawProps);
      break;
    case 'textarea':
      // TODO: Make sure we check if this is still unmounted or do any clean
      // up necessary since we never stop tracking anymore.
      track(domElement);
      postMountWrapper$3(domElement, rawProps);
      break;
    case 'select':
    case 'option':
      // For input and textarea we current always set the value property at
      // post mount to force it to diverge from attributes. However, for
      // option and select we don't quite do the same thing and select
      // is not resilient to the DOM state changing so we don't do that here.
      // TODO: Consider not doing this for input and textarea.
      break;
    default:
      if (typeof rawProps.onClick === 'function') {
        // TODO: This cast may not be sound for SVG, MathML or custom elements.
        trapClickOnNonInteractiveElement(domElement);
      }
      break;
  }

  return updatePayload;
}

function diffHydratedText$1(textNode, text) {
  var isDifferent = textNode.nodeValue !== text;
  return isDifferent;
}

function warnForUnmatchedText$1(textNode, text) {
  {
    warnForTextDifference(textNode.nodeValue, text);
  }
}

function warnForDeletedHydratableElement$1(parentNode, child) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Did not expect server HTML to contain a <%s> in <%s>.', child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase());
  }
}

function warnForDeletedHydratableText$1(parentNode, child) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase());
  }
}

function warnForInsertedHydratedElement$1(parentNode, tag, props) {
  {
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Expected server HTML to contain a matching <%s> in <%s>.', tag, parentNode.nodeName.toLowerCase());
  }
}

function warnForInsertedHydratedText$1(parentNode, text) {
  {
    if (text === '') {
      // We expect to insert empty text nodes since they're not represented in
      // the HTML.
      // TODO: Remove this special case if we can just avoid inserting empty
      // text nodes.
      return;
    }
    if (didWarnInvalidHydration) {
      return;
    }
    didWarnInvalidHydration = true;
    warning(false, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase());
  }
}

function restoreControlledState(domElement, tag, props) {
  switch (tag) {
    case 'input':
      restoreControlledState$1(domElement, props);
      return;
    case 'textarea':
      restoreControlledState$3(domElement, props);
      return;
    case 'select':
      restoreControlledState$2(domElement, props);
      return;
  }
}

var ReactDOMFiberComponent = Object.freeze({
	createElement: createElement$1,
	createTextNode: createTextNode$1,
	setInitialProperties: setInitialProperties$1,
	diffProperties: diffProperties$1,
	updateProperties: updateProperties$1,
	diffHydratedProperties: diffHydratedProperties$1,
	diffHydratedText: diffHydratedText$1,
	warnForUnmatchedText: warnForUnmatchedText$1,
	warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
	warnForDeletedHydratableText: warnForDeletedHydratableText$1,
	warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
	warnForInsertedHydratedText: warnForInsertedHydratedText$1,
	restoreControlledState: restoreControlledState
});

// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum;

var validateDOMNesting = emptyFunction$1;

{
  // This validation code was written based on the HTML5 parsing spec:
  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  //
  // Note: this does not catch all invalid nesting, nor does it try to (as it's
  // not clear what practical benefit doing so provides); instead, we warn only
  // for cases where the parser will give a parse tree differing from what React
  // intended. For example, <b><div></div></b> is invalid but we don't warn
  // because it still parses correctly; we do warn for other cases like nested
  // <p> tags where the beginning of the second element implicitly closes the
  // first, causing a confusing mess.

  // https://html.spec.whatwg.org/multipage/syntax.html#special
  var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

  // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
  // TODO: Distinguish by namespace here -- for <title>, including it here
  // errs on the side of fewer warnings
  'foreignObject', 'desc', 'title'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
  var buttonScopeTags = inScopeTags.concat(['button']);

  // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
  var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

  var emptyAncestorInfo = {
    current: null,

    formTag: null,
    aTagInScope: null,
    buttonTagInScope: null,
    nobrTagInScope: null,
    pTagInButtonScope: null,

    listItemTagAutoclosing: null,
    dlItemTagAutoclosing: null
  };

  var updatedAncestorInfo$1 = function (oldInfo, tag, instance) {
    var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
    var info = { tag: tag, instance: instance };

    if (inScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.aTagInScope = null;
      ancestorInfo.buttonTagInScope = null;
      ancestorInfo.nobrTagInScope = null;
    }
    if (buttonScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.pTagInButtonScope = null;
    }

    // See rules for 'li', 'dd', 'dt' start tags in
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
      ancestorInfo.listItemTagAutoclosing = null;
      ancestorInfo.dlItemTagAutoclosing = null;
    }

    ancestorInfo.current = info;

    if (tag === 'form') {
      ancestorInfo.formTag = info;
    }
    if (tag === 'a') {
      ancestorInfo.aTagInScope = info;
    }
    if (tag === 'button') {
      ancestorInfo.buttonTagInScope = info;
    }
    if (tag === 'nobr') {
      ancestorInfo.nobrTagInScope = info;
    }
    if (tag === 'p') {
      ancestorInfo.pTagInButtonScope = info;
    }
    if (tag === 'li') {
      ancestorInfo.listItemTagAutoclosing = info;
    }
    if (tag === 'dd' || tag === 'dt') {
      ancestorInfo.dlItemTagAutoclosing = info;
    }

    return ancestorInfo;
  };

  /**
   * Returns whether
   */
  var isTagValidWithParent = function (tag, parentTag) {
    // First, let's check if we're in an unusual parsing mode...
    switch (parentTag) {
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
      case 'select':
        return tag === 'option' || tag === 'optgroup' || tag === '#text';
      case 'optgroup':
        return tag === 'option' || tag === '#text';
      // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
      // but
      case 'option':
        return tag === '#text';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
      // No special behavior since these rules fall back to "in body" mode for
      // all except special table nodes which cause bad parsing behavior anyway.

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
      case 'tr':
        return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
      case 'tbody':
      case 'thead':
      case 'tfoot':
        return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
      case 'colgroup':
        return tag === 'col' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
      case 'table':
        return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
      case 'head':
        return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
      // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
      case 'html':
        return tag === 'head' || tag === 'body';
      case '#document':
        return tag === 'html';
    }

    // Probably in the "in body" parsing mode, so we outlaw only tag combos
    // where the parsing rules cause implicit opens or closes to be added.
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

      case 'rp':
      case 'rt':
        return impliedEndTags.indexOf(parentTag) === -1;

      case 'body':
      case 'caption':
      case 'col':
      case 'colgroup':
      case 'frame':
      case 'head':
      case 'html':
      case 'tbody':
      case 'td':
      case 'tfoot':
      case 'th':
      case 'thead':
      case 'tr':
        // These tags are only valid with a few parents that have special child
        // parsing rules -- if we're down here, then none of those matched and
        // so we allow it only if we don't know what the parent is, as all other
        // cases are invalid.
        return parentTag == null;
    }

    return true;
  };

  /**
   * Returns whether
   */
  var findInvalidAncestorForTag = function (tag, ancestorInfo) {
    switch (tag) {
      case 'address':
      case 'article':
      case 'aside':
      case 'blockquote':
      case 'center':
      case 'details':
      case 'dialog':
      case 'dir':
      case 'div':
      case 'dl':
      case 'fieldset':
      case 'figcaption':
      case 'figure':
      case 'footer':
      case 'header':
      case 'hgroup':
      case 'main':
      case 'menu':
      case 'nav':
      case 'ol':
      case 'p':
      case 'section':
      case 'summary':
      case 'ul':
      case 'pre':
      case 'listing':
      case 'table':
      case 'hr':
      case 'xmp':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return ancestorInfo.pTagInButtonScope;

      case 'form':
        return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

      case 'li':
        return ancestorInfo.listItemTagAutoclosing;

      case 'dd':
      case 'dt':
        return ancestorInfo.dlItemTagAutoclosing;

      case 'button':
        return ancestorInfo.buttonTagInScope;

      case 'a':
        // Spec says something about storing a list of markers, but it sounds
        // equivalent to this check.
        return ancestorInfo.aTagInScope;

      case 'nobr':
        return ancestorInfo.nobrTagInScope;
    }

    return null;
  };

  var didWarn = {};

  validateDOMNesting = function (childTag, childText, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;

    if (childText != null) {
      warning(childTag == null, 'validateDOMNesting: when childText is passed, childTag should be null');
      childTag = '#text';
    }

    var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
    var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
    var invalidParentOrAncestor = invalidParent || invalidAncestor;
    if (!invalidParentOrAncestor) {
      return;
    }

    var ancestorTag = invalidParentOrAncestor.tag;
    var addendum = getCurrentFiberStackAddendum$6();

    var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + addendum;
    if (didWarn[warnKey]) {
      return;
    }
    didWarn[warnKey] = true;

    var tagDisplayName = childTag;
    var whitespaceInfo = '';
    if (childTag === '#text') {
      if (/\S/.test(childText)) {
        tagDisplayName = 'Text nodes';
      } else {
        tagDisplayName = 'Whitespace text nodes';
        whitespaceInfo = " Make sure you don't have any extra whitespace between tags on " + 'each line of your source code.';
      }
    } else {
      tagDisplayName = '<' + childTag + '>';
    }

    if (invalidParent) {
      var info = '';
      if (ancestorTag === 'table' && childTag === 'tr') {
        info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
      }
      warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s', tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
    } else {
      warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>.%s', tagDisplayName, ancestorTag, addendum);
    }
  };

  // TODO: turn this into a named export
  validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo$1;

  // For testing
  validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;
    return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
  };
}

var validateDOMNesting$1 = validateDOMNesting;

// TODO: direct imports like some-package/src/* are bad. Fix me.
var createElement = createElement$1;
var createTextNode = createTextNode$1;
var setInitialProperties = setInitialProperties$1;
var diffProperties = diffProperties$1;
var updateProperties = updateProperties$1;
var diffHydratedProperties = diffHydratedProperties$1;
var diffHydratedText = diffHydratedText$1;
var warnForUnmatchedText = warnForUnmatchedText$1;
var warnForDeletedHydratableElement = warnForDeletedHydratableElement$1;
var warnForDeletedHydratableText = warnForDeletedHydratableText$1;
var warnForInsertedHydratedElement = warnForInsertedHydratedElement$1;
var warnForInsertedHydratedText = warnForInsertedHydratedText$1;
var updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo;
var precacheFiberNode = precacheFiberNode$1;
var updateFiberProps = updateFiberProps$1;


{
  var SUPPRESS_HYDRATION_WARNING = 'suppressHydrationWarning';
  if (typeof Map !== 'function' || Map.prototype == null || typeof Map.prototype.forEach !== 'function' || typeof Set !== 'function' || Set.prototype == null || typeof Set.prototype.clear !== 'function' || typeof Set.prototype.forEach !== 'function') {
    warning(false, 'React depends on Map and Set built-in types. Make sure that you load a ' + 'polyfill in older browsers. http://fb.me/react-polyfills');
  }
}

injection$3.injectFiberControlledHostComponent(ReactDOMFiberComponent);

var eventsEnabled = null;
var selectionInformation = null;

/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */
function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE || node.nodeType === COMMENT_NODE && node.nodeValue === ' react-mount-point-unstable '));
}

function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function shouldHydrateDueToLegacyHeuristic(container) {
  var rootElement = getReactRootElementInContainer(container);
  return !!(rootElement && rootElement.nodeType === ELEMENT_NODE && rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));
}

function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case 'button':
    case 'input':
    case 'select':
    case 'textarea':
      return !!props.autoFocus;
  }
  return false;
}

var DOMRenderer = reactReconciler({
  getRootHostContext: function (rootContainerInstance) {
    var type = void 0;
    var namespace = void 0;
    var nodeType = rootContainerInstance.nodeType;
    switch (nodeType) {
      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        {
          type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
          var root = rootContainerInstance.documentElement;
          namespace = root ? root.namespaceURI : getChildNamespace(null, '');
          break;
        }
      default:
        {
          var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
          var ownNamespace = container.namespaceURI || null;
          type = container.tagName;
          namespace = getChildNamespace(ownNamespace, type);
          break;
        }
    }
    {
      var validatedTag = type.toLowerCase();
      var _ancestorInfo = updatedAncestorInfo(null, validatedTag, null);
      return { namespace: namespace, ancestorInfo: _ancestorInfo };
    }
    return namespace;
  },
  getChildHostContext: function (parentHostContext, type) {
    {
      var parentHostContextDev = parentHostContext;
      var _namespace = getChildNamespace(parentHostContextDev.namespace, type);
      var _ancestorInfo2 = updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null);
      return { namespace: _namespace, ancestorInfo: _ancestorInfo2 };
    }
    var parentNamespace = parentHostContext;
    return getChildNamespace(parentNamespace, type);
  },
  getPublicInstance: function (instance) {
    return instance;
  },
  prepareForCommit: function () {
    eventsEnabled = isEnabled();
    selectionInformation = getSelectionInformation();
    setEnabled(false);
  },
  resetAfterCommit: function () {
    restoreSelection(selectionInformation);
    selectionInformation = null;
    setEnabled(eventsEnabled);
    eventsEnabled = null;
  },
  createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    var parentNamespace = void 0;
    {
      // TODO: take namespace into account when validating.
      var hostContextDev = hostContext;
      validateDOMNesting$1(type, null, hostContextDev.ancestorInfo);
      if (typeof props.children === 'string' || typeof props.children === 'number') {
        var string = '' + props.children;
        var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
        validateDOMNesting$1(null, string, ownAncestorInfo);
      }
      parentNamespace = hostContextDev.namespace;
    }
    var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
    precacheFiberNode(internalInstanceHandle, domElement);
    updateFiberProps(domElement, props);
    return domElement;
  },
  appendInitialChild: function (parentInstance, child) {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren: function (domElement, type, props, rootContainerInstance) {
    setInitialProperties(domElement, type, props, rootContainerInstance);
    return shouldAutoFocusHostComponent(type, props);
  },
  prepareUpdate: function (domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
    {
      var hostContextDev = hostContext;
      if (typeof newProps.children !== typeof oldProps.children && (typeof newProps.children === 'string' || typeof newProps.children === 'number')) {
        var string = '' + newProps.children;
        var ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
        validateDOMNesting$1(null, string, ownAncestorInfo);
      }
    }
    return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
  },
  shouldSetTextContent: function (type, props) {
    return type === 'textarea' || typeof props.children === 'string' || typeof props.children === 'number' || typeof props.dangerouslySetInnerHTML === 'object' && props.dangerouslySetInnerHTML !== null && typeof props.dangerouslySetInnerHTML.__html === 'string';
  },
  shouldDeprioritizeSubtree: function (type, props) {
    return !!props.hidden;
  },
  createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
    {
      var hostContextDev = hostContext;
      validateDOMNesting$1(null, text, hostContextDev.ancestorInfo);
    }
    var textNode = createTextNode(text, rootContainerInstance);
    precacheFiberNode(internalInstanceHandle, textNode);
    return textNode;
  },


  now: now,

  mutation: {
    commitMount: function (domElement, type, newProps, internalInstanceHandle) {
      domElement.focus();
    },
    commitUpdate: function (domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
      // Update the props handle so that we know which props are the ones with
      // with current event handlers.
      updateFiberProps(domElement, newProps);
      // Apply the diff to the DOM node.
      updateProperties(domElement, updatePayload, type, oldProps, newProps);
    },
    resetTextContent: function (domElement) {
      domElement.textContent = '';
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
      textInstance.nodeValue = newText;
    },
    appendChild: function (parentInstance, child) {
      parentInstance.appendChild(child);
    },
    appendChildToContainer: function (container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, container);
      } else {
        container.appendChild(child);
      }
    },
    insertBefore: function (parentInstance, child, beforeChild) {
      parentInstance.insertBefore(child, beforeChild);
    },
    insertInContainerBefore: function (container, child, beforeChild) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.insertBefore(child, beforeChild);
      } else {
        container.insertBefore(child, beforeChild);
      }
    },
    removeChild: function (parentInstance, child) {
      parentInstance.removeChild(child);
    },
    removeChildFromContainer: function (container, child) {
      if (container.nodeType === COMMENT_NODE) {
        container.parentNode.removeChild(child);
      } else {
        container.removeChild(child);
      }
    }
  },

  hydration: {
    canHydrateInstance: function (instance, type, props) {
      if (instance.nodeType !== ELEMENT_NODE || type.toLowerCase() !== instance.nodeName.toLowerCase()) {
        return null;
      }
      // This has now been refined to an element node.
      return instance;
    },
    canHydrateTextInstance: function (instance, text) {
      if (text === '' || instance.nodeType !== TEXT_NODE) {
        // Empty strings are not parsed by HTML so there won't be a correct match here.
        return null;
      }
      // This has now been refined to a text node.
      return instance;
    },
    getNextHydratableSibling: function (instance) {
      var node = instance.nextSibling;
      // Skip non-hydratable nodes.
      while (node && node.nodeType !== ELEMENT_NODE && node.nodeType !== TEXT_NODE) {
        node = node.nextSibling;
      }
      return node;
    },
    getFirstHydratableChild: function (parentInstance) {
      var next = parentInstance.firstChild;
      // Skip non-hydratable nodes.
      while (next && next.nodeType !== ELEMENT_NODE && next.nodeType !== TEXT_NODE) {
        next = next.nextSibling;
      }
      return next;
    },
    hydrateInstance: function (instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
      precacheFiberNode(internalInstanceHandle, instance);
      // TODO: Possibly defer this until the commit phase where all the events
      // get attached.
      updateFiberProps(instance, props);
      var parentNamespace = void 0;
      {
        var hostContextDev = hostContext;
        parentNamespace = hostContextDev.namespace;
      }
      return diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
    },
    hydrateTextInstance: function (textInstance, text, internalInstanceHandle) {
      precacheFiberNode(internalInstanceHandle, textInstance);
      return diffHydratedText(textInstance, text);
    },
    didNotMatchHydratedContainerTextInstance: function (parentContainer, textInstance, text) {
      {
        warnForUnmatchedText(textInstance, text);
      }
    },
    didNotMatchHydratedTextInstance: function (parentType, parentProps, parentInstance, textInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForUnmatchedText(textInstance, text);
      }
    },
    didNotHydrateContainerInstance: function (parentContainer, instance) {
      {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentContainer, instance);
        } else {
          warnForDeletedHydratableText(parentContainer, instance);
        }
      }
    },
    didNotHydrateInstance: function (parentType, parentProps, parentInstance, instance) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        if (instance.nodeType === 1) {
          warnForDeletedHydratableElement(parentInstance, instance);
        } else {
          warnForDeletedHydratableText(parentInstance, instance);
        }
      }
    },
    didNotFindHydratableContainerInstance: function (parentContainer, type, props) {
      {
        warnForInsertedHydratedElement(parentContainer, type, props);
      }
    },
    didNotFindHydratableContainerTextInstance: function (parentContainer, text) {
      {
        warnForInsertedHydratedText(parentContainer, text);
      }
    },
    didNotFindHydratableInstance: function (parentType, parentProps, parentInstance, type, props) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedElement(parentInstance, type, props);
      }
    },
    didNotFindHydratableTextInstance: function (parentType, parentProps, parentInstance, text) {
      if (true && parentProps[SUPPRESS_HYDRATION_WARNING] !== true) {
        warnForInsertedHydratedText(parentInstance, text);
      }
    }
  },

  scheduleDeferredCallback: rIC,

  useSyncScheduling: !enableAsyncSchedulingByDefaultInReactDOM
});

injection$4.injectFiberBatchedUpdates(DOMRenderer.batchedUpdates);

var warnedAboutHydrateAPI = false;

function renderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;

  {
    if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
      var hostInstance = DOMRenderer.findHostInstanceWithNoPortals(container._reactRootContainer.current);
      if (hostInstance) {
        warning(hostInstance.parentNode === container, 'render(...): It looks like the React-rendered content of this ' + 'container was removed without using React. This is not ' + 'supported and will cause errors. Instead, call ' + 'ReactDOM.unmountComponentAtNode to empty a container.');
      }
    }

    var isRootRenderedBySomeReact = !!container._reactRootContainer;
    var rootEl = getReactRootElementInContainer(container);
    var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

    warning(!hasNonRootReactChild || isRootRenderedBySomeReact, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.');

    warning(container.nodeType !== ELEMENT_NODE || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.');
  }

  var root = container._reactRootContainer;
  if (!root) {
    var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
    // First clear any existing content.
    if (!shouldHydrate) {
      var warned = false;
      var rootSibling = void 0;
      while (rootSibling = container.lastChild) {
        {
          if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
            warned = true;
            warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
          }
        }
        container.removeChild(rootSibling);
      }
    }
    {
      if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
        warnedAboutHydrateAPI = true;
        lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
      }
    }
    var newRoot = DOMRenderer.createContainer(container, shouldHydrate);
    root = container._reactRootContainer = newRoot;
    // Initial mount should not be batched.
    DOMRenderer.unbatchedUpdates(function () {
      DOMRenderer.updateContainer(children, newRoot, parentComponent, callback);
    });
  } else {
    DOMRenderer.updateContainer(children, root, parentComponent, callback);
  }
  return DOMRenderer.getPublicRootInstance(root);
}

function createPortal(children, container) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  !isValidContainer(container) ? invariant(false, 'Target container is not a DOM element.') : void 0;
  // TODO: pass ReactDOM portal implementation as third argument
  return createPortal$1(children, container, null, key);
}

function ReactRoot(container, hydrate) {
  var root = DOMRenderer.createContainer(container, hydrate);
  this._reactRootContainer = root;
}
ReactRoot.prototype.render = function (children, callback) {
  var root = this._reactRootContainer;
  DOMRenderer.updateContainer(children, root, null, callback);
};
ReactRoot.prototype.unmount = function (callback) {
  var root = this._reactRootContainer;
  DOMRenderer.updateContainer(null, root, null, callback);
};

var ReactDOM = {
  createPortal: createPortal,

  findDOMNode: function (componentOrElement) {
    {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        var warnedAboutRefsInRender = owner.stateNode._warnedAboutRefsInRender;
        warning(warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName(owner) || 'A component');
        owner.stateNode._warnedAboutRefsInRender = true;
      }
    }
    if (componentOrElement == null) {
      return null;
    }
    if (componentOrElement.nodeType === ELEMENT_NODE) {
      return componentOrElement;
    }

    var inst = get(componentOrElement);
    if (inst) {
      return DOMRenderer.findHostInstance(inst);
    }

    if (typeof componentOrElement.render === 'function') {
      invariant(false, 'Unable to find node on an unmounted component.');
    } else {
      invariant(false, 'Element appears to be neither ReactComponent nor DOMNode. Keys: %s', Object.keys(componentOrElement));
    }
  },
  hydrate: function (element, container, callback) {
    // TODO: throw or warn if we couldn't hydrate?
    return renderSubtreeIntoContainer(null, element, container, true, callback);
  },
  render: function (element, container, callback) {
    return renderSubtreeIntoContainer(null, element, container, false, callback);
  },
  unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
    !(parentComponent != null && has(parentComponent)) ? invariant(false, 'parentComponent must be a valid React Component') : void 0;
    return renderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
  },
  unmountComponentAtNode: function (container) {
    !isValidContainer(container) ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : void 0;

    if (container._reactRootContainer) {
      {
        var rootEl = getReactRootElementInContainer(container);
        var renderedByDifferentReact = rootEl && !getInstanceFromNode$1(rootEl);
        warning(!renderedByDifferentReact, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by another copy of React.');
      }

      // Unmount should not be batched.
      DOMRenderer.unbatchedUpdates(function () {
        renderSubtreeIntoContainer(null, null, container, false, function () {
          container._reactRootContainer = null;
        });
      });
      // If you call unmountComponentAtNode twice in quick succession, you'll
      // get `true` twice. That's probably fine?
      return true;
    } else {
      {
        var _rootEl = getReactRootElementInContainer(container);
        var hasNonRootReactChild = !!(_rootEl && getInstanceFromNode$1(_rootEl));

        // Check if the container itself is a React root node.
        var isContainerReactRoot = container.nodeType === 1 && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;

        warning(!hasNonRootReactChild, "unmountComponentAtNode(): The node you're attempting to unmount " + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.');
      }

      return false;
    }
  },


  // Temporary alias since we already shipped React 16 RC with it.
  // TODO: remove in React 17.
  unstable_createPortal: createPortal,

  unstable_batchedUpdates: batchedUpdates,

  unstable_deferredUpdates: DOMRenderer.deferredUpdates,

  flushSync: DOMRenderer.flushSync,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    // For TapEventPlugin which is popular in open source
    EventPluginHub: EventPluginHub,
    // Used by test-utils
    EventPluginRegistry: EventPluginRegistry,
    EventPropagators: EventPropagators,
    ReactControlledComponent: ReactControlledComponent,
    ReactDOMComponentTree: ReactDOMComponentTree,
    ReactDOMEventListener: ReactDOMEventListener
  }
};

if (enableCreateRoot) {
  ReactDOM.createRoot = function createRoot(container, options) {
    var hydrate = options != null && options.hydrate === true;
    return new ReactRoot(container, hydrate);
  };
}

var foundDevTools = DOMRenderer.injectIntoDevTools({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 1,
  version: ReactVersion,
  rendererPackageName: 'react-dom'
});

{
  if (!foundDevTools && ExecutionEnvironment.canUseDOM && window.top === window.self) {
    // If we're in Chrome or Firefox, provide a download link if not installed.
    if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
      var protocol = window.location.protocol;
      // Don't warn in exotic cases like chrome-extension://.
      if (/^(https?|file):$/.test(protocol)) {
        console.info('%cDownload the React DevTools ' + 'for a better development experience: ' + 'https://fb.me/react-devtools' + (protocol === 'file:' ? '\nYou might need to use a local HTTP server (instead of file://): ' + 'https://fb.me/react-devtools-faq' : ''), 'font-weight:bold');
      }
    }
  }
}



var ReactDOM$2 = Object.freeze({
	default: ReactDOM
});

var ReactDOM$3 = ( ReactDOM$2 && ReactDOM ) || ReactDOM$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom = ReactDOM$3['default'] ? ReactDOM$3['default'] : ReactDOM$3;

module.exports = reactDom;
  })();
}


/***/ }),

/***/ "./node_modules/react-dom/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (true) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (false) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.min.js');
} else {
  module.exports = __webpack_require__("./node_modules/react-dom/cjs/react-dom.development.js");
}


/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ })

},["./lms/static/js/student_account/StudentAccountDeletionInitializer.js"])));
//# sourceMappingURL=StudentAccountDeletionInitializer.js.map