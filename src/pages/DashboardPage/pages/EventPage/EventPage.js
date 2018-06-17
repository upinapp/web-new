import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';

class EventPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <ChoiceDateRange/>
        <div>Event page</div>
      </div>
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
