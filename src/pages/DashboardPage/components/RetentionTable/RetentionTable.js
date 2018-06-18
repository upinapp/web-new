import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';
import Icon from '@material-ui/core/es/Icon/Icon';
import Table from '@material-ui/core/es/Table/Table';
import TableCell from '@material-ui/core/es/TableCell/TableCell';
import TableHead from '@material-ui/core/es/TableHead/TableHead';
import TableRow from '@material-ui/core/es/TableRow/TableRow';
import React from 'react';
import './RetentionTable.css';
import Moment from 'react-moment';
import {RETENTION, MOCK_ALL} from './table-data.mock';
import TableBody from '@material-ui/core/es/TableBody/TableBody';

class RetentionTable extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state =  {
      days: RETENTION
    };
  }

  render() {
    return (
      <div>
        <div className="retention-table__title">
          Удержание после первого визита <Icon className="icon">info_outline</Icon>
        </div>

        <Table className="retention-table__table">
          <TableHead>
            <TableRow className="head">
              <TableCell className="date">
                <div className="container">
                  <div className="left">
                    <Icon className="icon-button">event</Icon>
                    Первый вход в приложение
                  </div>
                  <Icon className="icon-button">more_vert</Icon>
                </div>
              </TableCell>
              <TableCell numeric className="label-column">2</TableCell>
              <TableCell numeric className="label-column">3</TableCell>
              <TableCell numeric className="label-column">4</TableCell>
              <TableCell numeric className="label-column">5</TableCell>
              <TableCell numeric className="label-column">6</TableCell>
              <TableCell numeric className="label-column">7</TableCell>
              <TableCell numeric className="label-column">8</TableCell>
              <TableCell numeric className="label-column">9</TableCell>
              <TableCell numeric className="label-column">10</TableCell>
              <TableCell numeric className="label-column">11</TableCell>
              <TableCell numeric className="label-column">12</TableCell>
              <TableCell numeric className="label-column">13</TableCell>
              <TableCell numeric className="label-column">14</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow className="all">
              <TableCell>
                Всего за период
              </TableCell>
              {
                MOCK_ALL.map((item, index) => {
                  return (
                    <TableCell className="statistic-data" key={ 'all-' + index }>
                      <div className="percent">100%</div>
                      <div className="number">67</div>
                    </TableCell>
                  );
                })
              }
            </TableRow>

            {
              this.state.days.map((dateRetention, index)=> {
                return (
                  <TableRow className="statistic-data"
                    key={ 'start-day-' + index }>

                    <TableCell className="label">
                      <div className="space-beetwen-fix">
                        <Checkbox
                          className="checkbox"
                          // checked={this.state.checkedA}
                          // onChange={this.handleChange('checkedA')}
                          // value="checkedA"
                        />
                        <Moment format="DD MMMM - YYYY" locale="ru">{dateRetention.day}</Moment>
                      </div>
                      <div className="start-date">
                        <div className="percent">{dateRetention.retention[0].percent}%</div>
                        <div className="number">{dateRetention.retention[0].number}</div>
                      </div>
                    </TableCell>

                    {
                      dateRetention.retention.map((day, index)=> {
                        if (index > 0) {
                          return (
                            <TableCell key={ 'day-' + index }
                              style={{backgroundColor: `rgba(83, 109, 254, ${day.percent/100})`}}
                              className={day.holiday ? 'statistic-data holiday' : 'statistic-data'}>
                              <div className="percent">{day.percent}%</div>
                              <div className="number">{day.number}</div>
                            </TableCell>
                          );
                        }
                      })
                    }

                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>

      </div>
    );
  }
}

export default RetentionTable;
