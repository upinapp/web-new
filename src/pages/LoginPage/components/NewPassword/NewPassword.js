import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {APP_LOADING} from '../../../../redusers/index';
import {AuthService} from '../../../../services/index';

const MIN_PASSWORD_LENGTH = 6;

export class NewPassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: '',
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  handleChange(e) {
    let val = e.target.value;
    this.setState({
      [e.target.name]: val,
      'errorMessage': null
    });
  }

  restorePasswordConfirm = async (event) => {
    event.preventDefault();

    if (this.state.password === this.state.passwordConfirm ) {
      const code = new URLSearchParams(this.props.location.search).get('code');
      const email = new URLSearchParams(this.props.location.search).get('email');

      this.props.dispatch({ type: APP_LOADING, payload: true });
      const res = await AuthService.restorePasswordConfirm(email, code, this.state.password);
      const errorCode = (await res.json()).code;

      switch (await errorCode) {
        case 2:
          this.setState({ 'errorMessage': 'Некорректный email' });
          break;
        case 3:
          this.setState({ 'errorMessage': 'Пользователь не найден' });
          break;
        default:
          this.setState({ 'errorMessage': null });
          this.props.dispatch(push('/apps'));
      }

      this.props.dispatch({ type: APP_LOADING, payload: false });
    } else {
      this.setState({ 'errorMessage': 'Пароли не совпадают' });
    }
  };

  renderErrorMessage() {
    return <div className="login-page__component_error-message">
      {this.state.errorMessage}
    </div>;
  }

  render() {
    return (
      <form className="login-page__component" onSubmit={this.restorePasswordConfirm}>
        <h2 className="login-page__component__title">Новый пароль</h2>

        <label className="login-page__component__label" htmlFor="password">Пароль</label>
        <FormControl className="login-page__component__wrapper-input">
          <Input
            id="password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            className="login-page__component__text-field"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormControl>

        <label className="login-page__component__label" htmlFor="password">Подтверждение пароля</label>
        <FormControl className="login-page__component__wrapper-input">
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type={this.state.showPassword ? 'text' : 'password'}
            className="login-page__component__text-field"
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
          />
        </FormControl>
        {this.state.passwordConfirm.length < MIN_PASSWORD_LENGTH ?
          <div className="login-page__component__min-password">Минимальное кол-во
            символов {this.state.passwordConfirm.length}/{MIN_PASSWORD_LENGTH}</div> : null}

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        <div className="login-page__component__submit-field">
          <Button className="login-page__component__submit-button" type="submit">
            Сменить пароль
          </Button>
        </div>
      </form>
    );
  }
}

export default connect((state) => {
  return {
    dispatch: state.dispatch
  };
})(NewPassword);
