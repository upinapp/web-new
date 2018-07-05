import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import './AppLoading.style.css';

class AppLoading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.loading ?
        <div className="AppLoading">
          <CircularProgress size={100}/>
        </div>
        : ''
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    dispatch: state.dispatch
  };
};

export default connect(
  mapStateToProps
)(AppLoading);
