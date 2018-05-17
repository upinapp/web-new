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
import Paper from '@material-ui/core/Paper';
import GoogleIcon from'./google-icon.svg';

const widthRoot = 330;

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
  signInWithGoogle: {
    marginLeft: 24,
    color: theme.palette.primary.light,
    textDecoration: 'none',
	  display: 'flex',
    alignItems: 'center',
  },
	signInWithGoogleImg: {
    marginRight: 10,
  },
  divider: {
    marginTop: 32,
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
  }
});

class SignIn extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
        <h2 className={classes.title}>Вход</h2>

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

        <Paper className={classes.error}>
          Не верный email или пароль
        </Paper>

        <div className={classes.submitField}>
          <Button variant="raised" color="primary" className={classNames(classes.button, classes.submitButton)}>
            Вход
          </Button>
          <a href="#!" className={classes.signInWithGoogle}>
            <img src={GoogleIcon} className={classes.signInWithGoogleImg}/>
            Войти с Google
          </a>
        </div>

        <Divider className={classes.divider}/>

        <Link to="/auth/restore-password" className={classes.link}>Восстановить пароль</Link>
        <Link to="/auth/sign-up" className={classes.link}>Регистрация</Link>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true})
)(SignIn);
