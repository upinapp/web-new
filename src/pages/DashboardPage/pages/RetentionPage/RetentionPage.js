import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import {compose} from 'redux';
import AudienceByDayTable from '../../components/AudienceByDayTable/AudienceByDayTable';
import {mapToObject} from '../../../../utils';
import {connect} from 'react-redux';

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
        <AudienceByDayTable dataAboutUsers={audienceByDate}/>
      </div>
    );
  }
}

RetentionPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  connect((state) => {
    return {
      audienceByDate: mapToObject(state.get('audienceByDate')),
      dispatch: state.dispatch
    };
  }),
  withStyles(styles, {withTheme: true})
)(RetentionPage);
