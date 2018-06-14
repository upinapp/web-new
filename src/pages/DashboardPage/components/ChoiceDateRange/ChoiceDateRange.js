import React from 'react';
import CustomDateRange from './CustomDateRange/CustomDateRange';
import CertainDateRange from './СertainDateRange/СertainDateRange';
import './ChoiceDateRange.css';

class ChoiceDateRange extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="choice-date-range-container">
        <CertainDateRange/>
        <CustomDateRange/>
      </div>
    );
  }

}

export default ChoiceDateRange ;
