import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

class AudiencePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>Audience page</div>
    );
  }
}

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    dispatch: state.dispatch
  };
}

export default compose(
  connect(mapStateToProps)
)(AudiencePage);
