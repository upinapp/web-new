import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import {compose} from 'redux';
import {connect} from 'react-redux';

import AudienceByDayTable from '../../components/AudienceByDayTable/AudienceByDayTable';
import LineChart from '../../components/LineChart/LineChart';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

class RetentionPage extends React.PureComponent {
  render() {
    const {classes, audienceByDate} = this.props;

    return (
      <div className={classes.root}>
        <LineChart />
        <br/><br/>
        <AudienceByDayTable dataAboutUsers={audienceByDate}/>
      </div>
    );
  }
}

RetentionPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const stateObject = state.toJS();
  return {
    audienceByDate: stateObject.audienceByDate,
    dispatch: state.dispatch
  };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles, {withTheme: true})
)(RetentionPage);
