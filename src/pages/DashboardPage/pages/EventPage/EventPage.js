import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

class EventPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>Event page</div>
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
)(EventPage);
