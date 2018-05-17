import React from 'react';
import {compose} from "redux";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';


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
  restoreSuccessSend: {
    marginTop: 16,
    color: 'rgba(0, 0, 0, .54)',
    fontSize: 12,
    lineHeight: '1.3',
  },
});

class RestorePassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    let val = e.target.value;
    this.setState({[e.target.name]: val});
  }

  render() {
    const {classes} = this.props;


    return (
      <div className={classes.root}>
        <h2 className={classes.title}>Восстановление пароля</h2>

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

        <div className={classes.restoreSuccessSend}>
          На ваш email отправленно сообщение.<br/>
          Для востановления пароля перейдите по ссылке из сообщения
        </div>

        <div className={classes.submitField}>
          <Button variant="raised" color="primary" className={classNames(classes.button, classes.submitButton)}>
            Восстановить
          </Button>
        </div>

        <Divider className={classes.divider}/>

        <Link to="/auth/sign-in" className={classes.link}>Вход</Link>
      </div>
    );
  }
}


RestorePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true})
)(RestorePassword);
