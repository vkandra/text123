import './KeyValuePage.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import KeyValue from '../KeyValue/KeyValue';

const KeyValuePage = (props) => {
  return (
    <div className="keyValuePage">
      {props.singleKeyValuePage.length > 0 ? (
        <div className="keyValuePageText">
          {props.themeLang.languageWords.Page_No}{' '}
          {props.singleKeyValuePage[0].page}
        </div>
      ) : null}

      {props.singleKeyValuePage.length > 0 ? (
        <div className="keysAndValues">
          {props.singleKeyValuePage.map((singleKeyValue, index) => (
            // <div>{singleKeyValue.index}</div>
            <KeyValue
              singleKeyValue={singleKeyValue}
              key={singleKeyValue.index}
            />
          ))}
        </div>
      ) : null}
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
