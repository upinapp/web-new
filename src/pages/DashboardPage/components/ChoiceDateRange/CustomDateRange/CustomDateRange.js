import classNames from 'classnames';
import { Button, Divider, Icon, IconButton } from 'material-ui';
import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import { DateRange } from 'react-date-range';
import Moment from 'react-moment';
import './CustomDateRange.style.css';

class CustomDateRange extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isDateRangeOpen: false,
      startDate: new Date().setDate(new Date().getDate() - 1),
      endDate: new Date(),
    };

  }

  handleSelect = (range) => {
    this.setState({
      startDate: range.startDate,
      endDate: range.endDate,
    });
  }

  handleClickToggleDateRange = () => {
    this.setState({ 'isDateRangeOpen': !this.state.isDateRangeOpen });
  };

  render() {
    return (
      <div className="custom-date-range container">

        <div className="current-date">
          <div className="date start">
            <Moment className="hidden-less-680" format="DD MMMM" locale="ru">
              {this.state.startDate}
            </Moment>
            <Moment className="hidden-more-680 hidden-less-400" format="DD.MM" locale="ru">
              {this.state.startDate}
            </Moment>
          </div>

          {
            this.state.startDate !== this.state.endDate &&
              <div className="date end hidden-less-400">
                &nbsp;-&nbsp;
                <Moment className="hidden-less-680" format="DD MMMM" locale="ru">{
                  this.state.endDate}
                </Moment>
                <Moment className="hidden-more-680" format="DD.MM" locale="ru">
                  {this.state.endDate}
                </Moment>
              </div>
          }

        </div>

        <div className="button-open-date-range">
          <IconButton aria-label="Выберите интервал" onClick={this.handleClickToggleDateRange}>
            <Icon>date_range</Icon>
          </IconButton>
        </div>

        <div className={classNames('wrapper-for-input-date-range', this.state.isDateRangeOpen ? 'active' : null)}>
          <form className="form-panel">
            <div className="top-elements space-between-fix">
              <div className="title">Период</div>
              <input
                className="date-input"
                value={'C ' + moment(this.state.startDate).format('DD MMM YYYY')}
                type="text"
                disabled/>
              <input
                className="date-input"
                value={'По ' + moment(this.state.endDate).format('DD MMM YYYY')}
                type="text"
                disabled/>
            </div>
            <Button className="save-date" variant="raised" onClick={this.handleClickToggleDateRange}>
              Показать
            </Button>
          </form>
          <div className="date-range-panel">
            <div className="change-year">
              <Icon className="previous-years">keyboard_arrow_left</Icon> 2017 2018
            </div>
            <Divider className="hidden-desktop"/>
            <div className="wrapper-for-date-range">
              <DateRange
                onChange={this.handleSelect}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default CustomDateRange;
