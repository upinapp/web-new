import React from 'react';
// импорты незаюзанные, потому что ломает левое меню
import { Checkbox, Icon, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';

import './EventTable.style.css';
import { MOCKS_DATA } from './mock-data';

class EventTable extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  // TODO: расскоментить CheckBox'ы после фикса JSS
  render() {
    return (
      <div className="event-table">
        <div className="event-table__title">
          Все события <Icon className="icon">info_outline</Icon>
        </div>

        <Table className="event-table__table">

          <TableHead>
            <TableRow>
              <TableCell className="description-column header">
                <div className="container">
                  <Icon className="icon">search</Icon>
                  Событие
                </div>
              </TableCell>

              <TableCell className="simple-data header">
                Пользователи
              </TableCell>

              <TableCell className="simple-data header">
                События
              </TableCell>

              <TableCell className="simple-data header">
                Событий на<br /> пользователя
              </TableCell>

              <TableCell className="simple-data conversion header">
                <div className="text">
                  <Icon className="icon">assessment</Icon>
                  Конверсия
                </div>
              </TableCell>

              <TableCell className="actions header">
                <Icon className="icon">more_vert</Icon>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {
              MOCKS_DATA.map( (event, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="description-column">
                      <div className="container">
                        {/*<Checkbox*/}
                        {/*className="icon"*/}
                        {/*/>*/}
                        <div className="text">
                          <div className="name"> { event.name } </div>
                          <div className="description"> { event.description } </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="simple-data">
                      { event.users }
                    </TableCell>

                    <TableCell className="simple-data">
                      { event.events }
                    </TableCell>

                    <TableCell className="simple-data">
                      { event.eventsPerUser }
                    </TableCell>

                    <TableCell className="simple-data">
                      { event.conversion }
                    </TableCell>

                    <TableCell className="fix-actions-in-header"></TableCell>
                  </TableRow>
                );
              })
            }

          </TableBody>
        </Table>

        <div className="event-table__show-more">
          Загрузить еще
          {/*<IconButton className="icon">*/}
          <Icon>refresh</Icon>
          {/*</IconButton>*/}
        </div>

      </div>
    );
  }
}

export default EventTable;
