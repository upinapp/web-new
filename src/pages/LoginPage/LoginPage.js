import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewPassword from './components/NewPassword/NewPassword';
import RestorePassword from './components/RestorePassword/RestorePassword';
import './LoginPage.style.css';

class LoginPage extends React.PureComponent {
  render() {
    return (
      <div className="login-page">
        <div className="login-page__functional">
          <Route exact path="/auth" component={SignIn}/>
          <Route exact path="/auth/sign-in" component={SignIn}/>
          <Route exact path="/auth/sign-up" component={SignUp}/>
          <Route exact path="/auth/new-password" component={NewPassword}/>
          <Route exact path="/auth/restore-password" component={RestorePassword}/>
        </div>
        <div className="login-page__decorate">
        </div>
      </div>
    );
  }
}

export default LoginPage;
