import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class IndexPage extends React.PureComponent {

  componentDidMount() {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      this.props.dispatch(push('/apps'));
    } else {
      this.props.dispatch(push('/auth'));
    }
  }

  render() {
    return (
      <br/>
    );
  }
}

export default connect((state) => {
  return {
    dispatch: state.dispatch
  };
})(IndexPage);
