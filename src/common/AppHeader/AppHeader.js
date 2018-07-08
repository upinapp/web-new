import './AppHeader.style.css';
import PropTypes from 'prop-types';
import React from 'react';

import logo from '../../assets/images/logo.svg';
import InfoBar from './InfoBar/InfoBar';
import AppStatus from '../AppStatus/AppStatus';

class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header-root">
        <AppStatus />

        <div className="header-container">
          <div className="left">
            <img className="logo" src={logo} alt="logo"/>
            <div className="title">
              {this.props.title}
            </div>
          </div>

          <InfoBar/>
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
