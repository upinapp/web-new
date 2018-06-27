import React from 'react';
import PropTypes from 'prop-types';
import './UiButton.style.css';
import {CircularProgress} from 'material-ui';

/**
 * Вставляет button.
 * Внутри тэга указывается текст на кнопке
 *
 * @type {string} - тип кнопки ('submit', 'button')
 * @loading {boolean} - заменяет тект на кнопке анимацией
 * @disabled {boolean} - отключает кнопку
 * @onClick {function} - фнукция для обраотки клика
 **/
export class UiButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type={this.props.type}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        className={this.props.loading ? '__UiButton loading ': '__UiButton ' + this.props.className}>

        { this.props.children }
        {
          this.props.loading &&
          <CircularProgress
            className="loading"
            size={20}
          />
        }
      </button>
    );
  }
}

UiButton.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

