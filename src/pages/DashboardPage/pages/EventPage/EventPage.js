import React from 'react';
import { connect } from 'react-redux';

import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import LineChart from '../../components/LineChart/LineChart';

import './EventPage.style.css';
import EventTable from './components/Table/EventTable';

const labels = ['День 1', 'День 2', 'День 3', 'День 4', 'День 5', 'День 6', 'День 7'];
const data = [
  {
    label: 'show_place_list',
    data: [100, 75, 21, 12, 10, 0],
    backgroundColor: ['transparent'],
    borderColor: ['#2962ff'],
    borderWidth: 2
  },
  {
    label: 'show_place_list_map',
    data: [100, 50, 25, 12, 20, 0],
    backgroundColor: ['transparent'],
    borderColor: ['#ef5350'],
    borderWidth: 2
  },
];

class EventPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="EventPage">
        <ChoiceDateRange/>

        <div className="EventPage__chart">
          <div className="EventPage__chart-title">События</div>
          <div className="EventPage__chart-subtitle">52% пользователей</div>
          <LineChart data={data} labels={labels}/>
        </div>

        <EventTable/>
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

export default connect(mapStateToProps)(EventPage);
