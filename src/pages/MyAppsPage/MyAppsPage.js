import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Icon, IconButton } from 'material-ui';
import Button from 'material-ui/Button';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { UserService } from '../../services';
import AppHeader from '../../common/AppHeader/AppHeader';
import { SET_SELECTED_APP, APP_LOADING, SET_TIMEZONES } from '../../redusers';
import CreateNewAppDialog from './components/CreateNewAppDialog/CreateNewAppDialog';
import EditAppDialog from './components/EditAppDialog/EditAppDialog';

import './MyAppsPage.style.css';

class MyAppsPage extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      appList: [],
      isDialogOpen: false,
      isSettingsAppOpen: false,
      selectedApp: {}
    };
  }

  async componentDidMount() {
    if (this.props.apps.list.length === 0 || this.props.apps.timezones.length === 0) {
      this.props.dispatch({ type: APP_LOADING, payload: true });

      /* Getting list of user applications and saving it to store */
      await UserService.getUserApplications();

      /* Getting list of timezones and saving it to store */
      const timezoneResponse = await UserService.getTimezones();
      const timezoneBody = await timezoneResponse.json();
      this.props.dispatch({ type: SET_TIMEZONES, payload: timezoneBody.timeZones });

      this.props.dispatch({ type: APP_LOADING, payload: false });
    }

    /* Updating component state */
    this.setState({
      appList: this.props.apps.list
    });
  }

  handleClickOpen = () => {
    this.setState({
      isDialogOpen: true
    });
  };

  handleClickOpenSettingApps = (app) => {
    this.setState({
      isSettingsAppOpen: true,
      selectedApp: app
    });
  };

  handleClose = () => {
    this.setState({
      appList: this.props.apps.list,
      isDialogOpen: false,
      isSettingsAppOpen: false,
      selectedApp: {}
    });
  };

  openApp = (app) => {
    this.props.dispatch({
      type: SET_SELECTED_APP,
      payload: app
    });
    this.props.dispatch(push('/dashboard'));
  };

  handleAppSearchInput = (e) => {
    const searchValue = e.target.value;
    let appList = this.props.apps.list;

    if (searchValue.length > 0) {
      appList = this.props.apps.list.filter((app) => (new RegExp(searchValue, 'gi').test(app.name)));
    }

    this.setState({ appList });
  };

  render() {
    return (
      <div className="my-apps">
        <AppHeader title="Analytics"/>

        <div className="my-apps__menu">
          <div className="my-apps__menu-title">Мои приложения</div>

          <div className="space-between-fix">
            <FormControl className="my-apps__search-field">
              <Input
                id="searchApp"
                name="searchApp"
                type="text"
                placeholder="Поиск"
                className="my-apps__dialog-form-input"
                onChange={this.handleAppSearchInput}
              />
            </FormControl>

            <Button onClick={this.handleClickOpen}>
              <AddIcon/>
              Добавить
            </Button>
          </div>
        </div>

        {this.state.appList && this.state.appList.length > 0 ?
          <div className="my-apps__menu-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell numeric>Пользователи</TableCell>
                  <TableCell numeric>Новые</TableCell>
                  <TableCell numeric>Сессии</TableCell>
                  <TableCell numeric></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.appList.map((app) => {
                  return (
                    <TableRow key={app.id}>
                      <TableCell
                        className="my-apps__menu-table-name"
                        component="th"
                        scope="row"
                        onClick={() => this.openApp(app)}>
                        {app.name}
                      </TableCell>
                      <TableCell numeric>{app.statistics.totalUsers}</TableCell>
                      <TableCell numeric>{app.statistics.newUsers}</TableCell>
                      <TableCell numeric>{app.statistics.sessions}</TableCell>
                      <TableCell numeric>
                        <IconButton
                          aria-label="Настройки приложения"
                          onClick={ () => {
                            this.handleClickOpenSettingApps(app);
                          } }>
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          :
          <div className="my-apps__empty-list">
            У Вас нет еще ни одного приложения
          </div>
        }

        { this.state.isDialogOpen ?
          <CreateNewAppDialog
            onClose={this.handleClose}
            open={this.state.isDialogOpen}/>
          : ''
        }

        { this.state.isSettingsAppOpen ?
          <EditAppDialog
            onClose={this.handleClose}
            app={this.state.selectedApp}
            open={this.state.isSettingsAppOpen}/>
          : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    apps: stateObject.apps,
    dispatch: state.dispatch
  };
}

export default connect(mapStateToProps)(MyAppsPage);
