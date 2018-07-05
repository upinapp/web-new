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
import {push} from 'react-router-redux';
import InfoBar from '../../common/AppHeader/InfoBar/InfoBar';

class DashboardPage extends React.PureComponent {
  state = {
    open: false
  };

  handleDrawerToggle = () => {
    this.props.dispatch({ type: DASHBOARD_MENU_TOGGLE, payload: !this.state.open });
    this.setState({open: !this.state.open});
  };

  handleClickButtonBack = () => {
    this.props.dispatch(push('/apps'));
  }

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
                onClick={this.handleClickButtonBack}
              >
                <ArrowBackIcon/>
              </IconButton>

              <InfoBar/>
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
            <div className="close-drawer-wrapper" onClick={this.handleDrawerToggle}>
              <div className="icon"></div>
            </div>
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
  return {
    dashboardMenu: state.dashboardMenu,
    route: state.route,
    dispatch: state.dispatch
  };
}

export default compose(
  connect(mapStateToProps),
)(DashboardPage);
