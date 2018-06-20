import React from 'react';
import { connect } from 'react-redux';

import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import LineChart from '../../components/LineChart/LineChart';
import RetentionTable from './components/Table/RetentionTable';

import './RetentionPage.style.css';

const labels = ['День 1', 'День 2', 'День 3', 'День 4', 'День 5', 'День 6', 'День 7'];
const data = [
  {
    label: '24 марта 2018',
    data: [100, 75, 21, 12, 10, 0],
    backgroundColor: ['transparent'],
    borderColor: ['#2962ff'],
    borderWidth: 2
  },
  {
    label: '25 марта 2018',
    data: [100, 50, 25, 12, 20, 0],
    backgroundColor: ['transparent'],
    borderColor: ['#ef5350'],
    borderWidth: 2
  },
];

class RetentionPage extends React.PureComponent {

  render() {
    return (
      <div className="RetentionPage">
        <ChoiceDateRange />

        <div className="RetentionPage__chart">
          <div className="RetentionPage__chart-title">Retention отчет</div>
          <div className="RetentionPage__chart-subtitle">21% пользователей</div>
          <LineChart data={data} labels={labels}/>
        </div>

        <RetentionTable/>
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

export default connect(mapStateToProps)(RetentionPage);
