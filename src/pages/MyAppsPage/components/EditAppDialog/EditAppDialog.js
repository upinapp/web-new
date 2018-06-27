import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Icon, IconButton } from 'material-ui';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { APP_LOADING, UPDATE_APP, SHOW_GLOBAL_SUCCESS } from '../../../../redusers';
import { UserService } from '../../../../services';
import './EditAppDialog.style.css';
import {UiInput} from '../../../../common/UpInAppFramework';
import {UiButton} from '../../../../common/UpInAppFramework/Components/Button/UiButton';

const PLATFORMS = ['iOS', 'Android', 'Unity', 'Xamarin'];

class EditAppDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.app.name,
      timezone: this.props.app.timezone,
      id: this.props.app.id,
      secret: this.props.app.secret,
    };
  }

  onTimezoneChanged = (e) => {
    this.setState({ timezone: e.target.value });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateApp = async () => {
    if (this.state.name !== this.props.app.name ||
      this.state.timezone !== this.props.app.timezone
    ) {
      this.props.dispatch({ type: APP_LOADING, payload: true });

      const response = await UserService.updateApplication(this.props.app.id, this.state.name, this.state.timezone);
      const body = await response.json();

      this.props.dispatch({ type: UPDATE_APP, payload: body.application });
      this.props.dispatch({ type: APP_LOADING, payload: false });
      this.props.dispatch({ type: SHOW_GLOBAL_SUCCESS, payload: 'Приложение успешно изменено!' });
    }

    this.props.onClose();
  };

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        maxWidth={false}
        maxheight="false">
        <div className="edit-app__dialog settings-app">
          <div className="settings-panel">
            <DialogTitle>Настройки</DialogTitle>
            <DialogContent>
              <UiInput
                label="Название"
                name="name"
                value={this.state.name}
                type="text"
                className="edit-app__dialog-form-input"
                onChange={this.handleInputChange}
              />

              <label className="edit-app__dialog-label" htmlFor="email">Часовой пояс UTC</label>
              <FormControl className="edit-app__dialog-form-wrapper">
                <Select
                  className="create-app__dialog-form-input"
                  value={this.state.timezone}
                  onChange={this.onTimezoneChanged}
                  inputProps={{
                    name: 'timezone',
                    id: 'app-timezone'
                  }}
                >
                  {
                    this.props.timezones.map((timezone) => {
                      return (
                        <MenuItem
                          key={timezone.value}
                          value={timezone.value}>
                          {timezone.title}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
              </FormControl>

              <UiInput
                label="ID приложения"
                name="appId"
                value={this.state.id}
                type="text"
                className="edit-app__dialog-form-input"
                disabled
              />

              <UiInput
                label="API key"
                name="secret"
                value={this.state.secret}
                type="text"
                className="edit-app__dialog-form-input"
                disabled
              />

              <div className="edit-app__dialog-actions">
                <UiButton
                  type="submit"
                  loading={this.state.loading}
                  onClick={this.updateApp}>
                  сохранить изменения
                </UiButton>
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
                    <IconButton
                      className="check-platform-integration-status undefined"
                      aria-label={'Интеграция с ' + platformName }>
                      <Icon>refresh</Icon>
                    </IconButton>
                    <div className='about'>
                      {platformName}
                      <span className="status">
                      – SDK успешно интегрирован
                      </span>
                      <Link
                        to="#!"
                        className="show-last-events">
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
  }
}

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    timezones: stateObject.apps.timezones,
    dispatch: state.dispatch
  };
}

EditAppDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  app: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditAppDialog);
