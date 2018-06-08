import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import {compose} from 'redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import NewPassword from './components/NewPassword/NewPassword';
import RestorePassword from './components/RestorePassword/RestorePassword';
import './LoginPage.style.css';

class LoginPage extends React.PureComponent {
  render() {
    /*
        Для страницы логина самым лучшим решением будет именно такое, чтобы в зависимости от
        регистрации/входа/восстановления у нас менялась только сама форма, а не общий дизайн страницы аутентификации.

        Тут правда есть проблема, которую я пока не знаю как решить. Дело в том, что редирект срабатывает,
        отображается страница LoginPage, идет редирект на компонет sign-in, но сам компонент не вставляется.
        В чем может быть причина?
     */

    return (
      <div className="login-page">
        <div className="login-page__functional">
          <Router>
            <Switch>
              <Route exact path="/auth" component={SignIn}/>
              <Route exact path="/auth/sign-in" component={SignIn}/>
              <Route exact path="/auth/sign-up" component={SignUp}/>
              <Route exact path="/auth/new-password" component={NewPassword}/>
              <Route exact path="/auth/restore-password" component={RestorePassword}/>
            </Switch>
          </Router>
        </div>
        <div className="login-page__decorate">
        </div>
      </div>
    );
  }
}

export default LoginPage;