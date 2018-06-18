import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import {compose} from 'redux';
import {connect} from 'react-redux';

import AudienceByDayTable from '../../components/AudienceByDayTable/AudienceByDayTable';
import ChoiceDateRange from '../../components/ChoiceDateRange/ChoiceDateRange';
import LineChart from '../../components/LineChart/LineChart';
import RetentionTable
  from '../../components/RetentionTable/RetentionTable';

const styles = theme => ({
  root: {
    width: '100%',
  }
});

class RetentionPage extends React.PureComponent {

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <RetentionTable/>
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
