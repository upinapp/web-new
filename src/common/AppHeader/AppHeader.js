import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';

const styles = theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '0 20px',
    flexGrow: 1,
    borderBottom: '1px solid #d1d1d1',
    backgroundColor: theme.palette.white,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1000,
    ...theme.mixins.toolbar
  },
  logo: {
    width: 50
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.71
  }
});

class AppHeader extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <img className={classes.logo} src={logo} alt="logo"/>
        <div className={classes.title}>
          {this.props.title}
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(AppHeader);
