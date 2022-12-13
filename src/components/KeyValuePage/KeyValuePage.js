import './KeyValuePage.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import KeyValue from '../KeyValue/KeyValue';

const KeyValuePage = (props) => {
  return (
    <div className="keyValuePage">
      <div className="keyValuePageText">
        {props.themeLang.languageWords.Page_No}{' '}
        {props.singleKeyValuePage[0].page}
      </div>

      {/* {props.singleDocPage.pageData.map((singleRawData, index) => (
        <div className="rawDocDataValues" key={singleRawData.index}>
          <RawDocDataSingle singleRawData={singleRawData} />
        </div>
      ))} */}
      <div className="keysAndValues">
        {props.singleKeyValuePage.map((singleKeyValue, index) => (
          // <div>{singleKeyValue.index}</div>
          <KeyValue
            singleKeyValue={singleKeyValue}
            key={singleKeyValue.index}
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
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(KeyValuePage);

// export default KeyValuePage;
