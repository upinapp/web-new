import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AudienceByDayTable from '../../components/AudienceByDayTable/AudienceByDayTable';
import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import LineChart from '../../components/LineChart/LineChart';

class AudiencePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {audienceByDate} = this.props;

    return(
      <div>
        <ChoiceDateRange/>
        <LineChart />
        <AudienceByDayTable data={audienceByDate}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    audienceByDate: stateObject.audienceByDate,
    dispatch: state.dispatch
  };
}
export default compose(
  connect(mapStateToProps)
)(AudiencePage);
