import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles/index";
import {compose} from "redux";
import {Redirect, Route, Switch} from 'react-router-dom';

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import NewPassword from "./components/NewPassword/NewPassword";
import RestorePassword from "./components/RestorePassword/RestorePassword";


const styles = theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  functional: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
  },
  decorate: {
    width: '50%',
    backgroundColor: theme.palette.primary.light
  }
})

class LoginPage extends React.PureComponent {
  render() {
    const {classes} = this.props;

    /*
        Для страницы логина самым лучшим решением будет именно такое, чтобы в зависимости от
        регистрации/входа/восстановления у нас менялась только сама форма, а не общий дизайн страницы аутентификации.

        Тут правда есть проблема, которую я пока не знаю как решить. Дело в том, что редирект срабатывает,
        отображается страница LoginPage, идет редирект на компонет sign-in, но сам компонент не вставляется.
        В чем может быть причина?
     */

    return (
      <div className={classes.root}>
        <div className={classes.functional}>
          <Switch>
            <Route path="/auth/sign-in" component={SignIn}/>
	          <Route path="/auth/sign-up" component={SignUp}/>
	          <Route path="/auth/new-password" component={NewPassword}/>
	          <Route path="/auth/restore-password" component={RestorePassword}/>
	          {/*<Route exact path="/auth" component={SignIn}/>*/}
          </Switch>
        </div>
        <div className={classes.decorate}>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme: true})
)(LoginPage);
