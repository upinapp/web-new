import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ADD_NEW_APP, APP_LOADING } from '../../../../redusers';
import { UserService } from '../../../../services';
import './CreateNewAppDialog.style.css';

class CreateNewAppDialog extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timezone: ''
    };

    this.onTimezoneChanged = this.onTimezoneChanged.bind(this);
    this.createNewApp = this.createNewApp.bind(this);
  }

  handleInputChange = (e) => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val });
  };

  onTimezoneChanged(e) {
    this.setState({ timezone: e.target.value });
  }

  async createNewApp() {
    this.props.dispatch({ type: APP_LOADING, payload: true });

    const response = await UserService.createNewApplication(this.state.name, this.state.timezone);
    const body = await response.json();

    this.props.dispatch({ type: ADD_NEW_APP, payload: body.application });
    this.props.onClose(true);
    this.props.dispatch({ type: APP_LOADING, payload: false });
  }

  render() {
    return (
      <Dialog onClose={this.props.onClose} open={this.props.open}>
        <div className="create-app__dialog">
          <DialogTitle>Новое приложение</DialogTitle>
          <DialogContent>

            <label className="create-app__dialog-label" htmlFor="email">Название</label>
            <FormControl className="create-app__dialog-form-wrapper">
              <Input
                id="name"
                name="name"
                type="text"
                className="create-app__dialog-form-input"
                onChange={this.handleInputChange}
              />
            </FormControl>

            <label className="create-app__dialog-label" htmlFor="email">Часовой пояс</label>
            <FormControl className="create-app__dialog-form-wrapper">
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
                      <MenuItem key={timezone.value} value={timezone.value}>{timezone.title}</MenuItem>
                    );
                  })
                }
              </Select>
            </FormControl>

            <div className="create-app__dialog-actions">
              <Button
                variant="raised"
                color="primary"
                className="create-app__dialog-actions-add"
                onClick={this.createNewApp}>
                Добавить
              </Button>
            </div>
          </DialogContent>
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

CreateNewAppDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(CreateNewAppDialog);
