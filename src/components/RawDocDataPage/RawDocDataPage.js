import './RawDocDataPage.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import RawDocDataSingle from '../RawDocDataSingle/RawDocDataSingle';

const RawDocDataPage = (props) => {
  return (
    <div className="RawDocDataPage">
      <div>
        Page {props.singleDocPage.page + 1}
        <div className="rawDocDataValues">
          {props.singleDocPage.pageData.map((singleRawData, index) => (
            <RawDocDataSingle
              singleRawData={singleRawData}
              key={singleRawData.index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(RawDocDataPage);

// export default RawDocDataPage;
