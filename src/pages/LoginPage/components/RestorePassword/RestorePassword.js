import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import React from 'react';
import {Link} from 'react-router-dom';
import './RestorePassword.style.css';

class RestorePassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  }

  render() {
    return (
      <div className="login-page__component">
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

        <div className="login-page__component__restore-success-send">
          На ваш email отправленно сообщение.<br/>
          Для востановления пароля перейдите по ссылке из сообщения
        </div>

        <div className="login-page__component__submit-field">
          <Button variant="raised" color="primary" className="login-page__component__submit-button">
            Восстановить
          </Button>
        </div>

        <Divider className="login-page__component__divider"/>

        <Link to="/auth/sign-in" className="login-page__component__link">Вход</Link>
      </div>
    );
  }
}

export default RestorePassword;
