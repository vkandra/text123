import './KeyValuePageTemplate.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import KeyValue from '../KeyValue/KeyValue';
import KeyValueTemplate from '../KeyValueTemplate/KeyValueTemplate';

const KeyValuePageTemplate = (props) => {
  return (
    <div className="keyValuePageTemplate">
      {props.singleKeyValuePage.length > 0 ? (
        <div className="keyValuePageText">
          {props.themeLang.languageWords.Page_No}{' '}
          {props.singleKeyValuePage[0].page}
        </div>
      ) : null}

      <div className="keysAndValues">
        {props.singleKeyValuePage.length > 0
          ? props.singleKeyValuePage.map((singleKeyValue, index) => (
              <KeyValueTemplate
                singleKeyValue={singleKeyValue}
                key={singleKeyValue.index}
              />
            ))
          : null}
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

export default connect(mapStateToProps)(KeyValuePageTemplate);

// export default KeyValuePageTemplate;
