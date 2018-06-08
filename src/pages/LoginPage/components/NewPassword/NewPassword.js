import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import React from 'react';

const MIN_PASSWORD_LENGTH = 6;

class NewPassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: ''
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
    this.setState({[e.target.name]: val});
  }

  render() {
    return (
      <div className="login-page__component">
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

        <div className="login-page__component__submit-field">
          <Button className="login-page__component__submit-button">
            Сменить пароль
          </Button>
        </div>
      </div>
    );
  }
}

export default NewPassword;