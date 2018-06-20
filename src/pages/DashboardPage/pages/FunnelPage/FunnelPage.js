import React from 'react';
import { connect } from 'react-redux';

import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';

import './FunnelPage.style.css';
import FunnelTable from './components/Table/FunnelTable';

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
