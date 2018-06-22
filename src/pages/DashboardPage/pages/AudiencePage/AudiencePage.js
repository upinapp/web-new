import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AudienceByDayTable from './components/Table/AudienceTable';
import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import LineChart from '../../components/LineChart/LineChart';

import './AudiencePage.style.css';

const labels = ['24 марта', '25 марта', '26 марта', '27 марта', '28 марта', '29 марта'];
const data = [{
  label: 'Пользователи',
  data: [1000, 800, 380, 100, 100, 0],
  backgroundColor: ['transparent'],
  borderColor: ['#2962ff'],
  borderWidth: 2
}];

class AudiencePage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { audienceByDate } = this.props;

    return (
      <div className="AudiencePage">
        <ChoiceDateRange/>

        <div className="AudiencePage__chart">
          <div className="AudiencePage__chart-title">Аудитория</div>
          <div className="AudiencePage__chart-subtitle">52% пользователей</div>
          <LineChart data={data} labels={labels}/>
        </div>

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
