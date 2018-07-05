import './App.style.css';
import { createGenerateClassName } from '@material-ui/core/styles';
import { MuiThemeProvider } from 'material-ui/styles';
import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, Switch, withRouter } from 'react-router-dom';
import { withLocalize } from 'react-localize-redux';

import { compose } from 'redux';

import AppLoading from './common/AppLoading/AppLoading';
import AppNotification from './common/AppNotification/AppNotification';

import { PrivateRoute } from './common/PrivateRoute';

import { CustomTheme } from './configs';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import IndexPage from './pages/IndexPage/IndexPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAppsPage from './pages/MyAppsPage/MyAppsPage';
import { UserService } from './services';

import RuTranslation from './translations/ru.translation.json';
import EnTranslation from './translations/en.translation.json';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'a',
});

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    if (localStorage.getItem('accessToken')) {
      UserService.getUser();
    }

    this.props.initialize({
      languages: [
        { name: 'Russian', code: 'ru' },
        { name: 'English', code: 'en' },
        { name: 'English (United Kingdom)', code: 'en-GB' },
        { name: 'English (United States)', code: 'en-US' },
      ],
      options: { renderToStaticMarkup }
    });

    this.props.addTranslationForLanguage(RuTranslation, 'ru');
    this.props.addTranslationForLanguage(EnTranslation, 'en');
    this.props.addTranslationForLanguage(EnTranslation, 'en-GB');
    this.props.addTranslationForLanguage(EnTranslation, 'en-US');

    this.props.setActiveLanguage(window.navigator.language);
  }

  render() {
    return (
      <div className='App'>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={CustomTheme}>
            <Switch>
              <Route exact path='/' component={IndexPage}/>
              <Route path='/auth/' component={LoginPage}/>
              <PrivateRoute path='/dashboard' component={DashboardPage}/>
              <PrivateRoute path='/apps' component={MyAppsPage}/>
            </Switch>
          </MuiThemeProvider>
        </JssProvider>
        <AppLoading />
        <AppNotification />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withLocalize,
)(App);
