import React from 'react';
import { connect } from 'react-redux';

import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import BarChart from '../../components/BarChart/BarChart';
import FunnelTable from './components/Table/FunnelTable';

import './FunnelPage.style.css';

const labels = ['to_cart', 'order_step1_address', 'order_is_processed'];
const data = [
  {
    data: [25, 18, 8, 12, 10, 0],
    backgroundColor: ['#2962ff'],
  },
];

class FunnelPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FunnelPage">
        <ChoiceDateRange/>

        <div className="FunnelPage__chart">
          <div className="FunnelPage__chart-title">Воронки</div>
          <div className="FunnelPage__chart-subtitle">Все пользователи</div>
          <BarChart data={data} labels={labels}/>
        </div>

        <FunnelTable/>
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

export default connect(mapStateToProps)(FunnelPage);
