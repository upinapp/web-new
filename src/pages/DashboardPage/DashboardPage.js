import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { DASHBOARD_MENU_TOGGLE } from '../../redusers';
import DashboardMenu from './components/DashboardMenu/DashboardMenu';
import RetentionPage from './pages/RetentionPage/RetentionPage';
import AudiencePage from './pages/AudiencePage/AudiencePage';
import EventPage from './pages/EventPage/EventPage';
import FunnelPage from './pages/FunnelPage/FunnelPage';

import appLogo from '../../assets/images/logo.svg';
import './DashboardPage.style.css';

class DashboardPage extends React.PureComponent {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
    this.props.dispatch({ type: DASHBOARD_MENU_TOGGLE, payload: true });
  };

  handleDrawerClose = () => {
    this.setState({open: false});
    this.props.dispatch({ type: DASHBOARD_MENU_TOGGLE, payload: false });
  };

  render() {
    const { dashboardMenu } = this.props;

    return (
      <Router>
        <div className="DashboardPage">
          <AppBar
            position="absolute"
            className={classNames('app-bar', dashboardMenu.open && 'app-bar-shift')}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames('menu-button', dashboardMenu.open && 'hide')}
              >
                <MenuIcon/>
              </IconButton>
              <IconButton
                onClick={this.handleDrawerClose}
                className={classNames(!dashboardMenu.open && 'hide')}
              >
                <ArrowBackIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames('drawer-paper', !dashboardMenu.open && 'drawer-paper-close'),
            }}
            open={this.state.open}
          >

            <img className="app-logo" src={appLogo} alt="logo"/>
            <DashboardMenu/>
          </Drawer>
          <main className="content">
            <Switch>
              <Route exact path="/dashboard" component={RetentionPage}/>
              <Route exact path="/dashboard/retention" component={RetentionPage}/>
              <Route exact path="/dashboard/funnel" component={FunnelPage}/>
              <Route exact path="/dashboard/event" component={EventPage}/>
              <Route exact path="/dashboard/audience" component={AudiencePage}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    dashboardMenu: stateObject.dashboardMenu,
    route: stateObject.route,
    dispatch: state.dispatch
  };
}

export default compose(
  connect(mapStateToProps),
)(DashboardPage);
