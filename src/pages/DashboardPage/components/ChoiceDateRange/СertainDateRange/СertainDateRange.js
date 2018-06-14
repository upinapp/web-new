import React from 'react';
import './СertainDateRange.css';
import classNames from 'classnames';

const currentDate = new Date;

// с неделей и месяцем тоже пока решил не заморачиваться, потому что еще не известно в
// каком формате это будет требовать сервер
const NAMES_TIME_PERIOD = [
  {name: 'Сегодня', date: currentDate},
  {name: 'Вчера', date: currentDate.setDate(currentDate.getDate() - 1) },
  {name: 'Неделя', date: {startDate: 1, endDate: 1,}},
  {name: 'Месяц', date: {startDate: 1, endDate: 1,}},
];

class CertainDateRange extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checkedPeriod: 0
    };
  }

  // сначала думал отправлять это в store и localStorage, но потом подумал, что у нас для каждого графика
  // и прочего будет свой фильтер и решил этого пока не делать
  changeCheckedPeriod = (index) => {
    this.setState({'checkedPeriod': index});
  }

  renderNamePeriod(name, key) {
    return <div onClick={() => {this.changeCheckedPeriod(key);}} className={classNames('static-date-range__item', key === this.state.checkedPeriod ? 'active' : null)} key={key} >
      {name}
    </div>;
  }

  renderBackgroundForActivePeriod(index) {
    return <div className={classNames('background-for-active', 'checked' + index)}>
    </div>;
  }

  render() {
    return (
      <div className="static-date-range__container">
        {
          NAMES_TIME_PERIOD.map((period, index) => this.renderNamePeriod(period.name, index))
        }
        {
          this.renderBackgroundForActivePeriod(this.state.checkedPeriod)
        }
      </div>
    );
  }

}

export default CertainDateRange;
