import React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

const widthRoot = 330;
const MIN_LENGTH_PASSWORD = 6;

const styles = theme => ({
  root: {
    width: widthRoot,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    paddingBottom: 4,
  },
  wrapperInput: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .04)',
  },
  textField: {
    borderRadius: 2,
    fontSize: 16,
    color: 'rgba(0, 0, 0, .87)',
    padding: '0px 8px 3px',
  },
  label: {
    marginTop: 29,
    display: 'block',
    fontSize: 12,
    lineHeight: '1.33',
    color: 'rgba(0, 0, 0, .54)',
    marginBottom: 4,
  },
  submitField: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
  },
  submitButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.light
  },
  divider: {
    marginTop: 16,
    marginBottom: 8
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: theme.palette.primary.light,
    marginBottom: 8,
  },
  error: {
    marginTop: 16,
    backgroundColor: theme.palette.error.light,
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    padding: '8px 0',
  },
  minPassword: {
    textAlign: 'right',
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: '1.3',
    color: 'rgba(0, 0, 0, .54)',
  },
});

class NewPassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      passwordConfirm: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  };

  handleChange(e) {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Новый пароль</h2>

        <label className={classes.label} htmlFor="password">Пароль</label>
        <FormControl className={classNames(classes.margin, classes.wrapperInput)}>
          <Input
            id="password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange}
          />
        </FormControl>

        <label className={classes.label} htmlFor="password">Подтверждение пароля</label>
        <FormControl className={classNames(classes.margin, classes.wrapperInput)}>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type={this.state.showPassword ? 'text' : 'password'}
            className={classes.textField}
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
          />
        </FormControl>
        {this.state.passwordConfirm.length < MIN_LENGTH_PASSWORD ?
          <div className={classes.minPassword}>Минимальное кол-во
            символов {this.state.passwordConfirm.length}/{MIN_LENGTH_PASSWORD}</div> : null}

        <div className={classes.submitField}>
          <Button variant="raised" color="primary" className={classNames(classes.button, classes.submitButton)}>
            Сменить пароль
          </Button>
        </div>
      </div>
    );
  }
}

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true})
)(NewPassword);
