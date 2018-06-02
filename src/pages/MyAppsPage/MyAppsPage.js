import { withStyles } from 'material-ui/styles';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import AppHeader from '../../common/AppHeader/AppHeader';
import { mapToObject } from '../../utils';
import { ADD_NEW_APP } from '../../redusers';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    padding: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 24,
  },
  addAppButton: {},
  dialog: {
    width: 385,
    height: 382
  },
  label: {
    marginTop: 29,
    display: 'block',
    fontSize: 12,
    lineHeight: '1.33',
    color: 'rgba(0, 0, 0, .54)',
    marginBottom: 4,
  },
  wrapperInput: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 100
  },
  dialogAddButton: {
    color: theme.palette.white
  },
  emptyList: {
    marginTop: 25,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 18
  }
});

class MyAppsPage extends React.PureComponent {
  state = {
    isDialogOpen: false,
    selectedValue: null,
    appName: '',
    region: ''
  };

  handleClickOpen = () => {
    this.setState({
      isDialogOpen: true
    });
    this.resetForm();
  };

  handleClose = value => {
    this.setState({
      isDialogOpen: false,
      selectedValue: value
    });
  };

  resetForm = () => {
    this.setState({
      appName: '',
      region: ''
    });
  };

  addNewApp = () => {
    if (this.state.appName.length > 0 && this.state.region.length > 0) {
      this.props.dispatch({
        type: ADD_NEW_APP,
        payload: {
          name: this.state.appName,
          region: this.state.region,
          totalUsers: 0,
          newUsers: 0,
          sessions: 0
        }
      });
      this.handleClose();
    }
  };

  handleInputChange = (e) => {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppHeader title="Analytics"/>

        <div className={classes.menu}>
          <div className={classes.menuTitle}>Мои приложения</div>
          <Button onClick={this.handleClickOpen} className={classes.addAppButton}>
            <AddIcon />
            Добавить
          </Button>
        </div>

        {this.props.apps.list && this.props.apps.list.length > 0 ?
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell numeric>Пользователи</TableCell>
                <TableCell numeric>Новые</TableCell>
                <TableCell numeric>Сессии</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.apps.list.map(app => {
                return (
                  <TableRow key={app.name}>
                    <TableCell component="th" scope="row">
                      {app.name}
                    </TableCell>
                    <TableCell numeric>{app.totalUsers}</TableCell>
                    <TableCell numeric>{app.newUsers}</TableCell>
                    <TableCell numeric>{app.sessions}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          :
          <div className={classes.emptyList}>
            У Вас нет еще ни одного приложения
          </div>
        }

        <Dialog onClose={this.handleClose} open={this.state.isDialogOpen}>
          <div className={classes.dialog}>
            <DialogTitle id="simple-dialog-title">Новое приложение</DialogTitle>
            <DialogContent>

              <label className={classes.label} htmlFor="email">Название</label>
              <FormControl className={classes.wrapperInput}>
                <Input
                  id="appName"
                  name="appName"
                  type="text"
                  className={classes.textField}
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <label className={classes.label} htmlFor="email">Часовой пояс</label>
              <FormControl className={classes.wrapperInput}>
                <Input
                  id="region"
                  name="region"
                  type="text"
                  className={classes.textField}
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <div className={classes.dialogActions}>
                <Button
                  variant="raised"
                  color="primary"
                  className={classes.dialogAddButton}
                  onClick={this.addNewApp}>
                  Добавить
                </Button>
              </div>

            </DialogContent>
          </div>
        </Dialog>

      </div>
    );
  }
}

export default compose(
  connect((state) => {
    return {
      apps: mapToObject(state.get('apps')),
      dispatch: state.dispatch
    };
  }),
  withStyles(styles, { withTheme: true })
)(MyAppsPage);
