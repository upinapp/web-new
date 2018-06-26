import Visibility from '@material-ui/icons/es/Visibility';
import VisibilityOff from '@material-ui/icons/es/VisibilityOff';
import PropTypes from 'prop-types';
import React from 'react';
import './UiInput.css';

// TODO: сделать параметр errorFunction, который будет принимать регулярное выражение
// TODO: сделать опциональную кнопку copyValue для disabled полей, которая копирует текущее значение в буфер обмена
// TODO: сделать отдельную форму для search поля

/**
 * Вставляет input.
 *
 * Обаязательные
 * @name  {string} — имя поля, также и его id, string
 * @type {string} — тип поля, string
 *
 * @onChange {function} — обработчик значения, function (обязательно если поле незадисейблено)
 * @value {string} — значение поля, string
 * @label {string} — подпись вверху, string
 * @placeholder {string} — placeholder, string
 * @error {boolean} — помечает форму как невалидную, boolean
 * @errorMessage {string} — сообщение об ошибке в поле. Показывается слева под полем, string
 * @helperMessage {string} — информационное сообщение. Показывается справа под полем, string
 * @smartPassword  {boolean} — включает для type=«password» кнопку «показать/скрыть», boolean
 * @disabled {boolean} — отключает инпут, его состояния и сообщения, boolean
 **/
export class UiInput extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      showPassword: !!this.props.password
    };

  }

  handleBlur = () => {
    this.setState({touched: true});
  };

  toggleShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  render() {
    return (
      <div className={'__ui-input ' + this.props.className}>
        <input
          type={(this.props.type === 'password') && (this.state.showPassword) ? 'text' : this.props.type}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          onBlur={this.handleBlur}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          disabled={this.props.disabled}
        />

        {
          this.props.label &&
          <label htmlFor={this.props.name}>{this.props.label}</label>
        }

        {
          this.props.type === 'password' && this.props.smartPassword &&
          <div className="show-password" onClick={this.toggleShowPassword}>
            {
              this.state.showPassword ?
                <VisibilityOff/> :
                <Visibility/>
            }
          </div>
        }

        <div className={(this.props.error || this.props.errorMessage) && this.state.touched ?
          'bot-line error' :
          'bot-line'}>
        </div>

        {
          this.props.errorMessage && this.state.touched &&
          <div className="message error">
            { this.props.errorMessage }
          </div>
        }

        {
          this.props.helperMessage &&
          <div className="message helper">
            { this.props.helperMessage }
          </div>
        }
      </div>
    );
  }
}

UiInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'search']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperMessage: PropTypes.string,
  smartPassword: PropTypes.bool,
  disabled: PropTypes.bool,
};

