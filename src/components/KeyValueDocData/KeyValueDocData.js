import './KeyValueDocData.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import KeysDocData from '../KeyValue/KeyValue';
import KeyValue from '../KeyValue/KeyValue';

const KeyValueDocData = (props) => {
  const fetchData = () => {
    // console.log(props.singleDocument.singleDocKeysValues);
  };
  return (
    <div className="keyValueDocData">
      {/* <button onClick={() => fetchData()}> Click</button> */}
      <div className="keysandvaluesText">
        <div className="keysOnlyText">KEYS</div>
        <div className="valuesOnlyText">VALUES</div>
      </div>
      <div className="keysAndValues">
        {props.singleDocument.singleDocKeysValues.map(
          (singleKeyValue, index) => (
            <KeyValue
              singleKeyValue={singleKeyValue}
              key={singleKeyValue.index}
            />
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(KeyValueDocData);

// export default KeyValueDocData;
