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
import { Icon, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { UserService } from '../../services';
import AppHeader from '../../common/AppHeader/AppHeader';
import { ADD_NEW_APP, SET_SELECTED_APP, APP_LOADING, SET_TIMEZONES } from '../../redusers';
import CreateNewAppDialog from './components/CreateNewAppDialog/CreateNewAppDialog';
import './MyAppsPage.style.css';

const PLATFORMS = ['iOS', 'Android', 'Unity', 'Xamarin'];

class MyAppsPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      appList: [],
      isDialogOpen: false,
      isSettingsAppOpen: false,
      selectedValue: null,
      appName: '',
      region: '',
      idApp: '',
      statusIntegration: {
        [PLATFORMS[0]]: 'undefined',
        [PLATFORMS[1]]: 'undefined',
        [PLATFORMS[2]]: 'undefined',
        [PLATFORMS[3]]: 'undefined',
      }
    };
  }

  async componentDidMount() {
    this.props.dispatch({ type: APP_LOADING, payload: true });

    /* Getting list of user applications and saving it to store */
    await UserService.getUserApplications();

    /* Getting list of timezones and saving it to store */
    const timezoneResponse = await UserService.getTimezones();
    const timezoneBody = await timezoneResponse.json();
    this.props.dispatch({ type: SET_TIMEZONES, payload: timezoneBody.timeZones });

    /* Updating component state */
    this.setState({
      appList: this.props.apps.list
    });

    this.props.dispatch({ type: APP_LOADING, payload: false });
  }

  handleClickOpen = () => {
    this.setState({
      isDialogOpen: true
    });
    this.resetForm();
  };

  handleClose = value => {
    this.setState({
      appList: this.props.apps.list,
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
          appId: this.state.appId,
          statistics: {
            totalUsers: 0,
            newUsers: 0,
            sessions: 0
          },
          statusIntegration: {
            [PLATFORMS[0]]: 'undefined',
            [PLATFORMS[1]]: 'pending',
            [PLATFORMS[2]]: 'success',
            [PLATFORMS[3]]: 'error',
          }
        }
      });
      this.handleClose();
    }
  };

  handleInputChange = (e) => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val });
  };

  openApp = (app) => {
    this.props.dispatch({
      type: SET_SELECTED_APP,
      payload: app
    });
    this.props.dispatch(push('/dashboard'));
  };

  handleClickOpenSettingApps = (app) => {
    this.setState({
      isSettingsAppOpen: true,
      appName: app.name,
      region: app.region,
      idApp: app.idApp,
      statusIntegration: app.statusIntegration,
    });
  };

  handleClickCloseSettingApps = () => {
    this.setState({
      isSettingsAppOpen: false,
      appName: '',
      region: '',
      idApp: '',
      statusIntegration: {
        [PLATFORMS[0]]: 'undefined',
        [PLATFORMS[1]]: 'undefined',
        [PLATFORMS[2]]: 'undefined',
        [PLATFORMS[3]]: 'undefined',
      },
    });
  };

  handleAppSearchInput = (e) => {
    const searchValue = e.target.value;
    let appList = this.props.apps.list;

    if (searchValue.length > 0) {
      appList = this.props.apps.list.filter((app) => (new RegExp(searchValue, 'gi').test(app.name)));
    }

    this.setState({ appList });
  };

  renderModalSettingsApps = () => {
    return (
      <Dialog
        onClose={this.handleClickCloseSettingApps}
        open={this.state.isSettingsAppOpen}
        maxWidth={false}
        maxheight="false">
        <div className="my-apps__dialog settings-app">
          <div className="settings-panel">
            <DialogTitle>Настройки</DialogTitle>
            <DialogContent>

              <label className="my-apps__dialog-label" htmlFor="email">Название</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="appName"
                  name="appName"
                  value={this.state.appName}
                  type="text"
                  className="my-apps__dialog-form-input"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <label className="my-apps__dialog-label" htmlFor="email">Часовой пояс UTC</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="region"
                  name="region"
                  value={this.state.region}
                  type="text"
                  className="my-apps__dialog-form-input"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <label className="my-apps__dialog-label" htmlFor="email">ID приложения</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="idApp"
                  name="idApp"
                  value={this.state.idApp}
                  type="text"
                  className="my-apps__dialog-form-input"
                  onChange={this.handleInputChange}
                />
              </FormControl>

              <label className="my-apps__dialog-label" htmlFor="email">API key</label>
              <FormControl className="my-apps__dialog-form-wrapper">
                <Input
                  id="apiKey"
                  name="apiKey"
                  value="*Должен приходить с сервера*"
                  type="text"
                  className="my-apps__dialog-form-input"
                  disabled
                />
              </FormControl>

              <div className="my-apps__dialog-actions">
                <Button
                  variant="raised"
                  color="primary"
                  className="my-apps__dialog-actions-add"
                  onClick={this.addNewApp}>
                  сохранить изменения
                </Button>
              </div>

            </DialogContent>
          </div>
          <div className="integration-panel">
            <div className="title">
              Интеграция SDK
            </div>
            <p className="info">
              Для сбора статистики интегрируйте Upinapp SDK в приложение.
              Чтобы получить общие отчеты по приложению, используйте один API key для всех платформ.
              <br /><br />
              Описание для платформ:
              <Link to="#!">iOS</Link>,
              <Link to="#!">Android</Link>,
              <Link to="#!">Unity</Link> и <Link to="#!">Xamarin</Link>.
            </p>
            <div className="subtitle">Проверить интеграцию с SDK</div>
            <ul className="integration-status-list">
              {
                PLATFORMS.map((platformName, index) => {
                  return <li className="platform" key={index}>
                    {this.renderButtonStatusIntegration(platformName)}
                    <div className='about'>
                      {platformName}
                      <span className="status" hidden={this.state.statusIntegration[platformName] !== 'success'}>
                      – SDK успешно интегрирован
                      </span>
                      <Link
                        to="#!"
                        className="show-last-events"
                        hidden={this.state.statusIntegration[platformName] !== 'success'}>
                        Показать последнее полученное событие
                      </Link>
                    </div>
                  </li>;
                })
              }
            </ul>
          </div>
        </div>
      </Dialog>
    );
  };

  renderButtonStatusIntegration = (platformName) => {
    switch (this.state.statusIntegration[platformName]) {
      case 'undefined' :
        return <IconButton
          className="check-platform-integration-status undefined"
          aria-label={'Интеграция с ' + platformName }
          onClick={ () => {
            this.checkIntegrationPlatform(platformName);
          } }>
          <Icon>refresh</Icon>
        </IconButton>;
      case 'pending' :
        return <Icon className="check-platform-integration-status pending">accessible</Icon>;
      case 'success' :
        return <Icon className="check-platform-integration-status success">check</Icon>;
      case 'error' :
        return <IconButton
          className="check-platform-integration-status error"
          aria-label={'Интеграция с ' + platformName }
          onClick={ () => {
            this.checkIntegrationPlatform(platformName);
          } }>
          <Icon>refresh</Icon>
        </IconButton>;
      default:
        return null;
    }
  };

  checkIntegrationPlatform = async (platformName) => {
    // TODO: сделать из имитации запроса к серверу собтвенно сам запрос к серверу
    this.setState({ statusIntegration: { ...this.state.statusIntegration, [platformName]: 'pending' } });
    setTimeout(() => {
      this.setState({ statusIntegration: { ...this.state.statusIntegration, [platformName]: 'error' } });
    }, 1000);
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
          :
          <div className="my-apps__empty-list">
            У Вас нет еще ни одного приложения
          </div>
        }

        <CreateNewAppDialog
          onClose={this.handleClose}
          open={this.state.isDialogOpen} />

        {
          this.renderModalSettingsApps()
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
