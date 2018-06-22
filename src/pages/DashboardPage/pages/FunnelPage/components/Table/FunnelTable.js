import React from 'react';
// импорты незаюзанные, потому что ломает левое меню
import { IconButton, Radio, Icon, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';

import './FunnelTable.style.css';
import { MOCKS_DATA } from './mock-data';

class FunnelTable extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      selectedFunnel: null,
    };
  }

  handleChangeCheckedFunnel = index => {
    this.setState({ selectedFunnel: index });
  };

  // TODO: расскоментить Radio после фикса JSS
  render() {
    return (
      <div className="funnel-table">
        <div className="funnel-table__title">
          Все воронки <Icon className="icon">info_outline</Icon>
        </div>

        <Table className="funnel-table__table">
          <TableHead>
            <TableRow>
              <TableCell className="description-column header">
                <div className="container">
                  <Icon className="icon">search</Icon>
                  Воронки
                </div>
              </TableCell>

              <TableCell className="conversion header">
                <div className="text">
                  <Icon className="icon">assessment</Icon>
                  Конверсия
                </div>
              </TableCell>

              <TableCell className="add-funnel header">
                <Icon>add</Icon>
              </TableCell>

              <TableCell className="actions header">
                <Icon>more_vert</Icon>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {
              MOCKS_DATA.map((funnel, index) => {
                return (
                  <TableRow key={index}
                    onClick={() => { this.handleChangeCheckedFunnel(index); }}
                    className={ this.state.selectedFunnel === index ? 'row checked' : 'row' }>

                    <TableCell className="description-column">
                      <div className="container">
                        {/*<Radio*/}
                        {/*checked={ this.state.selectedFunnel === index }*/}
                        {/*onChange={() => { this.handleChangeCheckedFunnel(index); }}*/}
                        {/*name="radio-funnel"*/}
                        {/*className="icon"*/}
                        {/*/>*/}
                        <div className="text">
                          <div className="name"> { funnel.name } </div>
                          <div className="description"> { funnel.description } </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="conversion">
                      {
                        funnel.negativeConversion ?
                          ( <div className="negative"> -{ funnel.negativeConversion }% </div> )
                          : null
                      }
                      { funnel.conversion }%
                    </TableCell>

                    <TableCell className="fix-plus-in-header"></TableCell>

                    <TableCell className="actions">
                      <Icon className="icon">more_vert</Icon>
                    </TableCell>
                  </TableRow>
                );
              })
            }

          </TableBody>
        </Table>

        <div className="funnel-table__show-more">
          Загрузить еще
          {/*<IconButton className="icon">*/}
          <Icon>refresh</Icon>
          {/*</IconButton>*/}
        </div>

      </div>
    );
  }
}

export default FunnelTable;
