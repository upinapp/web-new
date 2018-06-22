import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import './AudienceTable.style.css';

let id = null;
let allDataToPeriod = null;

function transformArray(element) {
  id += 1;
  allDataToPeriod.users += element.users;
  allDataToPeriod.newUsers += element.newUsers;
  allDataToPeriod.session += element.session;
  return Object.assign({ id: id }, element);
}

let data = null;

class AudienceTable extends React.PureComponent {

  constructor(props) {
    super(props);

    allDataToPeriod = {
      users: 0,
      newUsers: 0,
      session: 0,
    };
    data = this.props.data.map(user => transformArray(user));
  }

  render() {

    return (
      <div className="audience-table">
        <div className="audience-table__title">
          Аудитория по дням<Icon className="icon">info_outline</Icon>
        </div>

        <Table className="audience-table__table">

          <TableHead>
            <TableRow>
              <TableCell className="description-column header">
                <div className="container">
                  Дата
                </div>
              </TableCell>

              <TableCell className="simple-data users header">
                <div className="text">
                  <Icon className="icon">assessment</Icon>
                  Пользователи
                </div>
              </TableCell>

              <TableCell className="simple-data header">
                Новые
              </TableCell>

              <TableCell className="simple-data header">
                Сессии
              </TableCell>

              <TableCell className="actions header">
                <Icon className="icon">more_vert</Icon>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            <TableRow key="all" className="row-all">
              <TableCell className="description-column">
                Всего
              </TableCell>
              <TableCell className="simple-data">{allDataToPeriod.users}</TableCell>
              <TableCell className="simple-data">{allDataToPeriod.newUsers}</TableCell>
              <TableCell className="simple-data">{allDataToPeriod.session}</TableCell>
              <TableCell className="fix-actions-in-header"></TableCell>
            </TableRow>

            {
              data.map( (day, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="description-column">
                      <div className="container">
                        <div className="text">
                          { day.date }
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="simple-data">
                      { day.users }
                    </TableCell>

                    <TableCell className="simple-data">
                      { day.newUsers }
                    </TableCell>

                    <TableCell className="simple-data">
                      { day.session }
                    </TableCell>

                    <TableCell className="fix-actions-in-header"></TableCell>
                  </TableRow>
                );
              })
            }

          </TableBody>
        </Table>

        <div className="audience-table__show-more">
          Загрузить еще
          {/*<IconButton className="icon">*/}
          <Icon>refresh</Icon>
          {/*</IconButton>*/}
        </div>

      </div>
    );
  }
}

export default AudienceTable;
