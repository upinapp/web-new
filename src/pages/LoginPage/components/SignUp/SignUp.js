import Divider from '@material-ui/core/Divider';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { AuthService } from '../../../../services';
import './SignUp.style.css';
import {UiInput} from '../../../../common/UpInAppFramework';
import {UiButton} from '../../../../common/UpInAppFramework/Components/Button/UiButton';

const MIN_PASSWORD_LENGTH = 6;

export class SignUp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  signUp = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const res = await AuthService.signUpUser(this.state.email, this.state.password, this.state.name);
    const errorCode = (await res.json()).code;

    switch (await errorCode) {
      case 2:
        this.setState({ 'errorMessage': 'Некорректный email' });
        break;
      case 4:
        this.setState({ 'errorMessage': 'Пользователь уже существует' });
        break;
      default:
        this.setState({ 'errorMessage': null });
        this.props.dispatch(push('/apps'));
    }

    this.setState({ loading: false });
  };

  renderErrorMessage() {
    return <div className="login-page__component_error-message">
      {this.state.errorMessage}
    </div>;
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleChange(e) {
    let val = e.target.value;
    this.setState({ [e.target.name]: val });
  }

  render() {
    return (
      <div className="login-page__component">
        <div className="login-page__component__title">Регистрация</div>

        <UiInput
          label="Email"
          name="email"
          className="login-page__component__input"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />

        <UiInput
          label="Имя"
          name="name"
          className="login-page__component__input"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />

        <UiInput
          label="Пароль"
          name="password" smartPassword
          type="password"
          className="login-page__component__input"
          value={this.state.password}
          onChange={this.handleChange}
          helperMessage={
            this.state.password.length < MIN_PASSWORD_LENGTH ?
              `Минимальное кол-во символов ${this.state.password.length}/${MIN_PASSWORD_LENGTH}` :
              null
          }
        />

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        <div className="login-page__component__submit-field">
          <UiButton
            type="submit"
            loading={this.state.loading}
            onClick={this.signUp}>
            Восстановить
          </UiButton>
        </div>

        <div className="login-page__component__privacy">
          Продолжив вы соглашаетесь с <Link to="#" className="login-page__component__inline-link">политикой
          конфиденциальности и
          правилами использования</Link>
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/sign-in" className="login-page__component__link">Вход</Link>

      </div>
    );
  }
}

export default connect((state) => {
  return {
    dispatch: state.dispatch
  };
})(SignUp);
