import React from 'react';
import PropTypes from 'prop-types';

export class UiDivider extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let color = 'rgba(0, 0, 0, 0.12)';
    let margin = this.props.full ? '0' : '24px';

    return (
      <div style={{ marginLeft: margin, backgroundColor: color, width: `calc(100% - ${margin})`, height: 1 }}></div>
    );
  }
}

UiDivider.propTypes = {
  full: PropTypes.bool
};

