import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import { createGenerateClassName } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import AppLoading from './common/AppLoading/AppLoading';

import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAppsPage from './pages/MyAppsPage/MyAppsPage';
import IndexPage from './pages/IndexPage/IndexPage';
import { Switch, Route } from 'react-router-dom';

import { CustomTheme } from './configs';
import './App.style.css';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'a',
});

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={CustomTheme}>
            <Switch>
              <Route exact path="/" component={IndexPage}/>
              <Route path="/auth/" component={LoginPage}/>
              <Route path="/dashboard" component={DashboardPage}/>
              <Route path="/apps" component={MyAppsPage}/>
            </Switch>
          </MuiThemeProvider>
        </JssProvider>
        <AppLoading />
      </div>
    );
  }
}

export default withRouter(App);
