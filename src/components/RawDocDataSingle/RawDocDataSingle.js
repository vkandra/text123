import './RawDocDataSingle.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';

const RawDocDataSingle = (props) => {
  return (
    <div className="RawDocDataSingle">
      <div>{props.singleRawData.text}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(RawDocDataSingle);

// export default RawDocDataSingle;
