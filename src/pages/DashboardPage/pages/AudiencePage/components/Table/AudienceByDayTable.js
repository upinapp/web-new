import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableTitle: {
    marginLeft: 24,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.5,
    marginBottom: 17,
  },
  table: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    minWidth: 700,
  },
  allDataToPeriod: {
    backgroundColor: theme.palette.grey_100
  },
  labelOfColumn: {
    backgroundColor: theme.palette.grey_50
  },
  disabledBorder: {
    borderBottom: 'none',
    width: 100,
  }
});

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

class AudienceByDayTable extends React.PureComponent {

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
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.tableTitle}>Аудитория по дням</div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.disabledBorder}>Дата</TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell
                numeric
                className={classNames(classes.disabledBorder, classes.labelOfColumn)}>
                Пользователи
              </TableCell>
              <TableCell numeric className={classNames(classes.disabledBorder, classes.labelOfColumn)}>Новые</TableCell>
              <TableCell
                numeric
                className={classNames(classes.disabledBorder, classes.labelOfColumn)}>
                Сессии
              </TableCell>
              <TableCell
                className={classNames(classes.disabledBorder, classes.labelOfColumn)}><Icon>more_vert</Icon></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="all" className={classes.allDataToPeriod}>
              <TableCell component="th" scope="row" className={classes.disabledBorder}>
                Всего
              </TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
              <TableCell numeric className={classes.disabledBorder}>{allDataToPeriod.users}</TableCell>
              <TableCell numeric className={classes.disabledBorder}>{allDataToPeriod.newUsers}</TableCell>
              <TableCell numeric className={classes.disabledBorder}>{allDataToPeriod.session}</TableCell>
              <TableCell className={classes.disabledBorder}></TableCell>
            </TableRow>
            {data.map(day => {
              return (
                <TableRow key={day.id}>
                  <TableCell component="th" scope="row">
                    {day.date}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell numeric>{day.users}</TableCell>
                  <TableCell numeric>{day.newUsers}</TableCell>
                  <TableCell numeric>{day.session}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

AudienceByDayTable.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true })
)(AudienceByDayTable);
