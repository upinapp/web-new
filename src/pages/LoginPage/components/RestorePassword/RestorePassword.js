import './RestorePassword.style.css';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';

import {AuthService} from '../../../../services/index';
import {UiInput, UiButton} from '../../../../common/UpInAppFramework';

export class RestorePassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  }

  restorePassword = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
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

    this.setState({ loading: false });
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
    const { translate } = this.props;
    return (
      <form className="login-page__component" onSubmit={this.restorePassword}>
        <div className="login-page__component__title">{ translate('auth.restore_password') }</div>

        <UiInput
          label={ translate('basic.email') }
          name="email"
          className="login-page__component__input"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />

        {
          this.state.errorMessage &&
          this.renderErrorMessage()
        }

        {
          this.state.success &&
          this.renderSuccessMessage()
        }

        <div className="login-page__component__submit-field">
          <UiButton
            type="submit"
            loading={this.state.loading}>
            { translate('auth.restore') }
          </UiButton>
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/sign-in" className="login-page__component__link">
          { translate('auth.sign_in') }
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
})(RestorePassword);
