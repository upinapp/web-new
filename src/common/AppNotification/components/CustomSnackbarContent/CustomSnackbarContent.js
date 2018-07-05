import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './CustomSnackbarContent.style.css';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function CustomSnackbarContent(props) {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(variant, className, 'CustomSnackbarContent')}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className="message">
          <Icon className="icon icon-variant"/>
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className="icon"/>
        </IconButton>,
      ]}
      {...other}
    />
  );
}

CustomSnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export const CustomSnackbarContentWrapper = (CustomSnackbarContent);
