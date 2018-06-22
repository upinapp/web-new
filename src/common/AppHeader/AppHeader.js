import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';
import InfoBar from './InfoBar/InfoBar';
import './AppHeader.style.css';

class AppHeader extends React.PureComponent {
  render() {
    return (
      <div className="Header-root">
        <div className="space-between-fix">
          <img className="logo" src={logo} alt="logo"/>
          <div className="title">
            {this.props.title}
          </div>
        </div>

        <InfoBar/>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
