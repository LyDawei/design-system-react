define(['module', 'react', 'react-dom', 'lodash.isfunction', '../../button', './index', '../../../utilities', '../../../utilities/constants'], function (module, _react, _reactDom, _lodash, _button, _index, _utilities, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _button2 = _interopRequireDefault(_button);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	var PropTypes = _react2.default.PropTypes;


	/**
  * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
  */
	var InlineEdit = _react2.default.createClass({
		// ### Display Name
		// Always use the canonical component name as the React display name.
		displayName: _constants.FORMS_INLINE_EDIT,

		// ### Prop Types
		propTypes: {
			/**
    * Class names to be added to the outer container of the input.
    */
			className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
			/**
    * Name of the submitted form parameter.
    */
			name: PropTypes.string,
			/**
    * Disables the Inline Edit component and prevents editing the contents.
    */
			disabled: PropTypes.bool,
			/**
    * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
    */
			id: PropTypes.string.isRequired,
			/**
    * This event fires when the input changes.
    */
			onChange: PropTypes.func,
			/**
    * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
    */
			type: PropTypes.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
			/**
    * Inline Edit is a controlled component, and will always display this value.
    */
			value: PropTypes.string.isRequired
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'text'
			};
		},
		getInitialState: function getInitialState() {
			return {
				isEditing: false,
				value: null
			};
		},
		render: function render() {
			var _props = this.props;
			var disabled = _props.disabled;
			var value = _props.value;
			var name = _props.name;

			var props = _objectWithoutProperties(_props, ['disabled', 'value', 'name']);

			var inlineEditTrigger = _react2.default.createElement(_button2.default, {
				assistiveText: 'Edit',
				disabled: disabled,
				iconName: 'edit',
				iconPosition: 'right',
				iconSize: 'small',
				variant: 'icon'
			});

			if (this.state.isEditing) {
				props.iconCategory = 'utility';
				props.iconName = 'close';
				props.iconPosition = 'right';
				props.onIconClick = this.endEditMode;
			} else {
				props.onClick = this.triggerEditMode;
			}

			return _react2.default.createElement(_index2.default, _extends({}, props, {
				disabled: disabled,
				inlineEditTrigger: inlineEditTrigger,
				onBlur: this.handleBlur,
				onChange: this.handleChange,
				onKeyDown: this.handleKeyDown,
				readOnly: !this.state.isEditing,
				name: name,
				value: this.state.isEditing ? this.state.value : value
			}));
		},
		componentDidUpdate: function componentDidUpdate() {
			if (this.autoFocus) {
				var input = _reactDom2.default.findDOMNode(this).getElementsByTagName('input')[0];

				if (input) {
					input.focus();
					input.select();
				}

				this.autoFocus = false;
			}
		},
		triggerEditMode: function triggerEditMode() {
			if (!this.props.disabled) {
				this.autoFocus = true;
				this.setState({
					isEditing: true,
					value: this.props.value
				});
			}
		},
		saveEdits: function saveEdits() {
			if ((0, _lodash2.default)(this.props.onChange)) {
				this.props.onChange({
					value: this.state.value
				});
			}

			this.endEditMode();
		},
		endEditMode: function endEditMode() {
			if (this.willSave) {
				clearTimeout(this.willSave);
				delete this.willSave;
			}

			this.setState({
				isEditing: false,
				value: null
			});
		},
		handleBlur: function handleBlur() {
			if (!this.willSave) {
				this.willSave = setTimeout(this.saveEdits, 200);
			}
		},
		handleChange: function handleChange(event) {
			this.setState({
				value: event.target.value
			});
		},
		handleKeyDown: function handleKeyDown(event) {
			if (event.keyCode) {
				if (event.keyCode === _utilities.KEYS.ESCAPE) {
					this.endEditMode();
				} else if (event.keyCode === _utilities.KEYS.ENTER) {
					this.saveEdits();
				}
			}
		}
	});

	module.exports = InlineEdit;
});