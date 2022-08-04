import './KeyValue.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

const KeyValue = (props) => {
  return (
    <div className="keyValue">
      <div className="keySectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplay">
            {props.singleKeyValue.editedKey}
          </div>
          <button className="editTextButton">Edit</button>
        </div>
        <div className="textAreaDivButtons">
          <textarea className="textAreaSection">
            {props.singleKeyValue.editedKey}
          </textarea>
          <div className="textAreaButtonsDiv">
            {/* <button>Extr.</button> */}
            <button className="editCompleteButton">Done</button>
          </div>
        </div>
        <div className="orgnlExtractedDataDisplayArea">
          <div className="orgnlExtDataTxt">Extracted Data: </div>
          <div className="orgnlExtData">{props.singleKeyValue.key}</div>
        </div>
      </div>
      <div className="valueSectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplay">
            {props.singleKeyValue.editedValue}
          </div>
          <button className="editTextButton">Edit</button>
        </div>
        <div className="textAreaDivButtons">
          <textarea className="textAreaSection">
            {props.singleKeyValue.editedValue}
          </textarea>
          <div className="textAreaButtonsDiv">
            {/* <button>Extr.</button> */}
            <button className="editCompleteButton">Done</button>
          </div>
        </div>
        <div className="orgnlExtractedDataDisplayArea">
          <div className="orgnlExtDataTxt">Extracted Data: </div>
          <div className="orgnlExtData">{props.singleKeyValue.value}</div>
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

export default connect(mapStateToProps)(KeyValue);

// export default KeyValue;
