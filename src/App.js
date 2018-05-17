import React from 'react';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyAppsPage from './pages/MyAppsPage';
import { MuiThemeProvider } from 'material-ui/styles';
import { Switch, Route } from 'react-router-dom';
import { CustomTheme } from './configs';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={CustomTheme}>
          <Switch>
            <Route path="/auth/" component={LoginPage}/>
            <Route path="/dashboard" component={DashboardPage}/>
            <Route path="/apps" component={MyAppsPage}/>
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
