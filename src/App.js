import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';
import { createGenerateClassName } from '@material-ui/core/styles';

import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAppsPage from './pages/MyAppsPage/MyAppsPage';
import { Switch, Route } from 'react-router-dom';
import { CustomTheme } from './configs';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: 'a',
});

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={CustomTheme}>
            <Switch>
              <Route path="/auth/" component={LoginPage}/>
              <Route path="/dashboard" component={DashboardPage}/>
              <Route path="/apps" component={MyAppsPage}/>
            </Switch>
          </MuiThemeProvider>
        </JssProvider>
      </div>
    );
  }
}

export default App;
