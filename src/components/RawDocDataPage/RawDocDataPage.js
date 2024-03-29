import './RawDocDataPage.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import RawDocDataSingle from '../RawDocDataSingle/RawDocDataSingle';

const RawDocDataPage = (props) => {
  return (
    <div className="RawDocDataPage">
      <div className="rawDataPageText">
        {props.themeLang.languageWords.Page_No} {props.singleDocPage.page + 1}
      </div>

      {props.singleDocPage.pageData.map((singleRawData, index) => (
        <div className="rawDocDataValues" key={singleRawData.index}>
          <RawDocDataSingle singleRawData={singleRawData} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(RawDocDataPage);

// export default RawDocDataPage;
