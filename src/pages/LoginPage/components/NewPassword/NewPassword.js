import Button from '@material-ui/core/Button';
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {AuthService} from '../../../../services/index';
import {UiInput, UiButton} from '../../../../common/UpInAppFramework';

const MIN_PASSWORD_LENGTH = 6;

export class NewPassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: '',
      errorMessage: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
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

      this.setState({ loading: true });
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

      this.setState({ loading: false });
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
        <div className="login-page__component__title">Новый пароль</div>

        <UiInput
          label="Пароль"
          name="password"
          type="password"
          className="login-page__component__input"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <UiInput
          label="Подтверждение пароля"
          name="passwordConfirm"
          type="password"
          className="login-page__component__input"
          value={this.state.passwordConfirm}
          onChange={this.handleChange}
          helperMessage={
            this.state.passwordConfirm.length < MIN_PASSWORD_LENGTH ?
              `Минимальное кол-во символов ${this.state.passwordConfirm.length}/${MIN_PASSWORD_LENGTH}` :
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
            loading={this.state.loading}>
            Сменить пароль
          </UiButton>
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
