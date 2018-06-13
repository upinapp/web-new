import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
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

const drawerWidth = 260;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.white
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: theme.palette.grey_50,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appLogo: {
    minHeight: 20
  },
  content: {
    marginTop: 63,
    flexGrow: 1,
    minWidth: '100%',
    backgroundColor: theme.palette.white,
    padding: theme.spacing.unit * 3,
    overflow: 'scroll'
  },
});

class DashboardPage extends React.PureComponent {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.props.dispatch({ type: DASHBOARD_MENU_TOGGLE, payload: true });
  };

  handleDrawerClose = () => {
    this.props.dispatch({ type: DASHBOARD_MENU_TOGGLE, payload: false });
  };

  render() {
    const { classes, dashboardMenu } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, dashboardMenu.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, dashboardMenu.open && classes.hide)}
              >
                <MenuIcon/>
              </IconButton>
              <IconButton
                onClick={this.handleDrawerClose}
                className={classNames(!dashboardMenu.open && classes.hide)}
              >
                <ArrowBackIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !dashboardMenu.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.appLogo}>

            </div>
            <DashboardMenu/>
          </Drawer>
          <main className={classes.content}>
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

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

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
  withStyles(styles, { withTheme: true })
)(DashboardPage);
