import React from 'react';
import {compose} from "redux";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';


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
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  textField: {
    borderRadius: 2,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
    padding: '0px 8px 3px',
  },
  label: {
    marginTop: 29,
    display: 'block',
    fontSize: 12,
    lineHeight: '1.33',
    color: 'rgba(0, 0, 0, 0.54)',
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
    color: 'rgba(0, 0, 0, 0.54)',
  },
  privacy: {
    marginTop: 16,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 12,
    lineHeight: '1.3',
  },
  inlineLink: {
    color: theme.palette.primary.light,
    textDecoration: 'none',
  }
});

class SignUp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      showPassword: false,
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
        <h2 className={classes.title}>Регистрация</h2>

        <label className={classes.label} htmlFor="email">Email</label>
        <FormControl className={classes.wrapperInput}>
          <Input
            id="email"
            name="email"
            className={classes.textField}
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormControl>

        <label className={classes.label} htmlFor="name">Имя</label>
        <FormControl className={classes.wrapperInput}>
          <Input
            id="name"
            name="name"
            className={classes.textField}
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormControl>

        <label className={classes.label} htmlFor="password">Пароль</label>
        <FormControl className={classNames(classes.margin, classes.wrapperInput)}>
          <Input
            id="password"
            name="password"
            type={this.state.showPassword ? 'text' : 'password'}
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {this.state.password.length < MIN_LENGTH_PASSWORD ?
          <div className={classes.minPassword}>Минимальное кол-во
            символов {this.state.password.length}/{MIN_LENGTH_PASSWORD}</div> : null}


        <div className={classes.submitField}>
          <Button variant="raised" color="primary" className={classNames(classes.button, classes.submitButton)}>
            Продолжить
          </Button>
        </div>

        <div className={classes.privacy}>
          Продолжив вы соглашаетесь с <Link to="#" className={classes.inlineLink}>политикой конфиденциальности и
          правилами использования</Link>
        </div>

        <Divider className={classes.divider}/>

        <Link to="/auth/sign-in" className={classes.link}>Вход</Link>

      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true})
)(SignUp);
