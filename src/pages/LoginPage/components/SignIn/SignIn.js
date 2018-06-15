import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { APP_LOADING } from '../../../../redusers';
import { AuthService } from '../../../../services';
import GoogleIcon from './google-icon.svg';
import './SignIn.style.css';

class SignIn extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange(e) {
    let val = e.target.value;
    this.setState({ [e.target.name]: val });
  }

  logIn = async (event) => {
    event.preventDefault();
    this.props.dispatch({ type: APP_LOADING, payload: true });
    const res = await AuthService.signInUser(this.state.email, this.state.password);
    const errorCode = 0;

    switch (await errorCode) {
      case 2:
        this.setState({ 'errorMessage': 'Некорректный email' });
        break;
      case 3:
        this.setState({ 'errorMessage': 'Пользователь не найден' });
        break;
      case 4:
        this.setState({ 'errorMessage': 'Неверный пароль' });
        break;
      default:
        this.setState({ 'errorMessage': null });
        this.props.dispatch(push('/apps'));
    }

    this.props.dispatch({ type: APP_LOADING, payload: false });
  };

  renderErrorMessage() {
    return <div className="login-page__component_error-message">
      {this.state.errorMessage}
    </div>;
  }

  render() {
    return (
      <form className="login-page__component" onSubmit={this.logIn}>
        <h2 className="login-page__component__title">Вход</h2>

        <label className="login-page__component__label" htmlFor="email">Email</label>
        <FormControl className="login-page__component__wrapper-input">
          <Input
            id="email"
            name="email"
            className="login-page__component__text-field"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormControl>

        <label className="login-page__component__label" htmlFor="password">Пароль</label>
        <FormControl className="login-page__component__wrapper-input">
          <Input
            id="password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            className="login-page__component__text-field"
            value={this.state.password}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        <div className="login-page__component__submit-field">
          <Button
            type="submit"
            variant="raised"
            color="primary"
            className="login-page__component__submit-button">
            Вход
            {/*TODO вставить анимацию получения данных*/}
          </Button>
          <a href="#!" className="login-page__component__sign-in-with-google">
            <img src={GoogleIcon} className="login-page__component__sign-in-with-google-icon" alt="GoogleIcon"/>
            Войти с Google
          </a>
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/restore-password" className="login-page__component__link">Восстановить пароль</Link>
        <Link to="/auth/sign-up" className="login-page__component__link">Регистрация</Link>

      </form>
    );
  }
}

export default connect((state) => {
  return {
    dispatch: state.dispatch
  };
})(SignIn);
