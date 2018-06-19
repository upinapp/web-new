import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { connect } from 'react-redux';
import { HIDE_GLOBAL_NOTIFICATION } from '../../redusers';

import { CustomSnackbarContentWrapper } from './components/CustomSnackbarContent/CustomSnackbarContent';
import './AppNotification.style.css';

class AppNotification extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dispatch({ type: HIDE_GLOBAL_NOTIFICATION, payload: '' });
  };

  render() {
    const { notification } = this.props;

    return (
      (notification.type.length && notification.text.length) ?
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!(notification.type.length && notification.text.length)}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <CustomSnackbarContentWrapper
            onClose={this.handleClose}
            variant={notification.type}
            message={notification.text}
          />
        </Snackbar>
        : ''
    );
  }
}

const mapStateToProps = (state) => {
  const stateObject = state.toJS();
  return {
    notification: stateObject.notification,
    dispatch: state.dispatch
  };
};

export default connect(
  mapStateToProps
)(AppNotification);
