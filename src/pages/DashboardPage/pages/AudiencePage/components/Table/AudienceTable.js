import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import './AudienceTable.style.css';

class AudienceTable extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      allUsers: 0,
      allNewUsers: 0,
      allSession: 0
    };

    this.props.data.map( date => {
      this.state = {
        'allUsers' : this.state.allUsers += date.users,
        'allNewUsers' : this.state.allNewUsers += date.newUsers,
        'allSession' : this.state.allSession += date.session,
      };
    });
  }

  render() {
    return (
      <div className="AudienceTable">
        <div className="AudienceTable__title">
          Аудитория по дням<Icon className="icon">info_outline</Icon>
        </div>

        <Table className="AudienceTable__table">
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
              <TableCell className="simple-data"> { this.state.allUsers } </TableCell>
              <TableCell className="simple-data"> { this.state.allNewUsers } </TableCell>
              <TableCell className="simple-data"> { this.state.allSession } </TableCell>
              <TableCell className="fix-actions-in-header"></TableCell>
            </TableRow>

            {
              this.props.data.map( (day, index) => {
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

        <div className="AudienceTable__show-more">
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
