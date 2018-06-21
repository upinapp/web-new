import React from 'react';
import avatar from './avatar-example.svg';
import { Icon, IconButton } from 'material-ui';
import './InfoBar.style.css';

class InfoBar extends React.PureComponent {
  render() {

    return (
      <div className="header-info-bar">
        <IconButton className="icon">
          <Icon>apps</Icon>
        </IconButton>
        <IconButton className="icon">
          <Icon>notifications</Icon>
        </IconButton>
        <IconButton>
          <img src={avatar} alt="avatar"/>
        </IconButton>
      </div>
    );
  }
}

export default InfoBar;
