import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';
import React from 'react';
import { connect } from 'react-redux';

import AppHeader from '../../common/AppHeader/AppHeader';
import { ADD_NEW_APP } from '../../redusers';
import { mapToObject } from '../../utils';
import './MyAppsPage.style.css';

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
    this.setState({ [e.target.name]: val });
  };

  render() {
    return (
      <div className="my-apps">
        <AppHeader title="Analytics"/>

        <div className="my-apps__menu">
          <div className="my-apps__menu-title">Мои приложения</div>
          <Button onClick={this.handleClickOpen}>
            <AddIcon />
            Добавить
          </Button>
        </div>

        {this.props.apps.list && this.props.apps.list.length > 0 ?
          <Table>
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
          <div className="my-apps__empty-list">
            У Вас нет еще ни одного приложения
          </div>
        }

        <Dialog onClose={this.handleClose} open={this.state.isDialogOpen}>
          <div className="my-apps__dialog">
            <DialogTitle>Новое приложение</DialogTitle>
            <DialogContent>

              <label className="my-apps__dialog-label" htmlFor="email">Название</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="appName"
                  name="appName"
                  type="text"
                  className="my-apps__dialog-form-input"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <label className="my-apps__dialog-label" htmlFor="email">Часовой пояс</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="region"
                  name="region"
                  type="text"
                  className="my-apps__dialog-form-input"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <div className="my-apps__dialog-actions">
                <Button
                  variant="raised"
                  color="primary"
                  className="my-apps__dialog-actions-add"
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

export default connect((state) => {
  return {
    apps: mapToObject(state.get('apps')),
    dispatch: state.dispatch
  };
})(MyAppsPage);
