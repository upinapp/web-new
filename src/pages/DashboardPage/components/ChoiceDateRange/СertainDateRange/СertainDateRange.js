import {FormControl, InputLabel, MenuItem, Select} from 'material-ui';
import React from 'react';
import './СertainDateRange.css';
import classNames from 'classnames';

const currentDate = new Date;

// с неделей и месяцем тоже пока решил не заморачиваться, потому что еще не известно в
// каком формате это будет требовать сервер
const NAMES_TIME_PERIOD = [
  { name: 'Сегодня', date: currentDate },
  { name: 'Вчера', date: currentDate.setDate(currentDate.getDate() - 1) },
  { name: 'Неделя', date: { startDate: 1, endDate: 1, } },
  { name: 'Месяц', date: { startDate: 1, endDate: 1, } },
];

class CertainDateRange extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedPeriodName: '',
      checkedPeriodIndex: 0
    };
  }

  // сначала думал отправлять это в store и localStorage, но потом подумал, что у нас для каждого графика
  // и прочего будет свой фильтер и решил этого пока не делать
  changeCheckedPeriod = (name, index) => {
    this.setState({
      'checkedPeriodName': name,
      'checkedPeriodIndex': index
    });
  };

  handleChange = event => {
    let indexOfPeriod = NAMES_TIME_PERIOD.findIndex((period) => period.name === event.target.value);
    this.setState({
      'checkedPeriodName': event.target.value,
      'checkedPeriodIndex': indexOfPeriod
    });
  };

  render() {
    return (
      <div className="CertainDateRange">
        <div className="CertainDateRange__full hidden-less-500">
          {
            NAMES_TIME_PERIOD.map((period, index) => {return (
              <div
                onClick={() => {
                  this.changeCheckedPeriod(period.name, index);
                }}
                className={'item' + (index === this.state.checkedPeriodIndex ? ' active' : '')}
                key={index}>
                {period.name}
              </div>
            );})
          }
          <div className={classNames('background-for-active', 'checked' + this.state.checkedPeriodIndex)}></div>
        </div>

        <div className="CertainDateRange__mobile hidden-more-500">
          <FormControl>
            <Select
              value={this.state.checkedPeriodName}
              onChange={this.handleChange}
              name='period'
              id='period'>
              {
                NAMES_TIME_PERIOD.map((period, index) => { return (
                  <MenuItem key={index} value={period.name}>{period.name}</MenuItem>
                ); })
              }
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }

}

export default CertainDateRange;
