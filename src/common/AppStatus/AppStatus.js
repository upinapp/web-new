import './AppStatus.style.css';
import React from 'react';
import classNames from 'classnames';

class AppStatus extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onlineStatusShow: false,
      offlineStatusShow: !this.isOnline()
    };
  }

  isOnline() {
    return window.navigator.onLine;
  }

  updateOnlineStatus = () => {
    if (this.isOnline()) {
      this.setState({
        onlineStatusShow: true,
        offlineStatusShow: false
      });
      setTimeout(() => {
        this.setState({ onlineStatusShow: false });
      }, 3000);
    } else {
      this.setState({
        onlineStatusShow: false, offlineStatusShow: true
      });
    }
  };

  componentWillMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  render() {
    const { onlineStatusShow, offlineStatusShow } = this.state;
    return (
      <div className="AppStatus-root">
        <div className={classNames('status online', onlineStatusShow && 'shown')}>
          You're online
        </div>
        <div className={classNames('status offline', offlineStatusShow && 'shown')}>
          You're offline. Last updated on the 07 July at 9:08 pm
        </div>
      </div>
    );
  }
}

export default AppStatus;
