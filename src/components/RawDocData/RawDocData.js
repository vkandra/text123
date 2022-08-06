import './RawDocData.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import RawDocDataPage from '../RawDocDataPage/RawDocDataPage';

const RawDocData = (props) => {
  return (
    <div className="rawDocData">
      <div className="rawDocDataPages">
        {props.singleDocument.singleDocRawAll.map((singleDocPage, index) => (
          <RawDocDataPage
            singleDocPage={singleDocPage}
            key={singleDocPage.page}
          />
        ))}
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

export default connect(mapStateToProps)(RawDocData);

// export default RawDocData;
