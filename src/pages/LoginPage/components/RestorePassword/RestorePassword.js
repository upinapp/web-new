import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './RestorePassword.style.css';
import {push} from 'react-router-redux';
import {APP_LOADING} from '../../../../redusers/index';
import {AuthService} from '../../../../services/index';

export class RestorePassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  }

  restorePassword = async (event) => {
    event.preventDefault();
    this.props.dispatch({ type: APP_LOADING, payload: true });
    const res = await AuthService.restorePasswordRequest(this.state.email);
    const errorCode = (await res.json()).code;

    switch (await errorCode) {
      case 2:
        this.setState({ 'errorMessage': 'Некорректный email', 'success': false });
        break;
      case 3:
        this.setState({ 'errorMessage': 'Пользователь не найден', 'success': false });
        break;
      default:
        this.setState({ 'errorMessage': null, 'success': true });
    }

    this.props.dispatch({ type: APP_LOADING, payload: false });
  };

  renderErrorMessage() {
    return <div className="login-page__component_error-message">
      {this.state.errorMessage}
    </div>;
  }

  renderSuccessMessage() {
    return <div className="login-page__component__restore-success-send">
      На ваш email отправленно сообщение.<br/>
      Для востановления пароля перейдите по ссылке из сообщения
    </div>;
  }

  render() {
    return (
      <form className="login-page__component" onSubmit={this.restorePassword}>
        <h2 className="login-page__component__title">Восстановление пароля</h2>

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

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        {
          this.state.success &&
          this.renderSuccessMessage()
        }

        <div className="login-page__component__submit-field">
          <Button type="submit" variant="raised" color="primary" className="login-page__component__submit-button">
            Восстановить
          </Button>
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/sign-in" className="login-page__component__link">Вход</Link>
      </form>
    );
  }
}

export default connect((state) => {
  return {
    dispatch: state.dispatch
  };
})(RestorePassword);
