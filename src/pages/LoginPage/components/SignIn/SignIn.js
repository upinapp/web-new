import React from 'react';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { UiInput } from '../../../../common/UpInAppFramework';
import { APP_LOADING } from '../../../../redusers';
import { AuthService } from '../../../../services';
import GoogleIcon from './google-icon.svg';
import './SignIn.style.css';
import {GoogleLogin} from 'react-google-login';
import {UiButton} from '../../../../common/UpInAppFramework/Components/Button/UiButton';

export class SignIn extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: null,
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
    this.setState({ [e.target.name]: val });
  }

  logIn = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const res = await AuthService.signInUser(this.state.email, this.state.password);
    const errorCode = res.code;

    switch (errorCode) {
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

    this.setState({ loading: false });
  };

  logInWithGoogle = async (response) => {
    this.props.dispatch({ type: APP_LOADING, payload: true });
    let res = await AuthService.signInWithGoogle(response.accessToken, response.tokenId);
    let errorCode = res.code;
    switch (errorCode) {
      case 2:
        this.setState({ 'errorMessage': 'Invalid clientID' });
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
    const { translate } = this.props;
    return (
      <form className="login-page__component" onSubmit={this.logIn}>
        <div className="login-page__component__title">
          { translate('auth.sign_in') }
        </div>

        <UiInput
          name="email"
          type="text"
          label={ translate('basic.email') }
          value={this.state.email}
          className="login-page__component__input"
          onChange={this.handleChange}
        />

        <UiInput
          name="password"
          type="password" smartPassword
          label={ translate('basic.password') }
          value={ this.state.password }
          className="login-page__component__input"
          onChange={this.handleChange}
        />

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        <div className="login-page__component__submit-field">
          <UiButton
            type="submit"
            loading={this.state.loading}>
            { translate('auth.sign_in') }
          </UiButton>
          <GoogleLogin
            className="login-page__component__sign-in-with-google"
            buttonText={ translate('auth.sign_in_via_google') }
            style={{backgroundImage: `url('${GoogleIcon}')`}}
            clientId="427062901685-1bc7s4f1un9skr1ljhv80rc2e0h2d8rm.apps.googleusercontent.com"
            scope='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
            fetchBasicProfile={false}
            onSuccess={this.logInWithGoogle}
          />
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/restore-password" className="login-page__component__link">
          { translate('auth.restore_password') }
        </Link>
        <Link to="/auth/sign-up" className="login-page__component__link">
          { translate('auth.sign_up') }
        </Link>

      </form>
    );
  }
}

export default connect((state) => {
  return {
    translate: getTranslate(state.localize),
    dispatch: state.dispatch
  };
})(SignIn);
