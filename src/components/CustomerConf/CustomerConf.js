import './CustomerConf.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

const CustomerConf = (props) => {
  return <div className="CustomerConf">This is CustomerConf</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CustomerConf);

// export default CustomerConf;
