import './RawDocDataSingle.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import {
  editKeysValuesRawData,
  saveEditedKeysValuesRawData,
} from '../../actions/singleDocument';

const RawDocDataSingle = (props) => {
  const handleEditing = (type) => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.type = type;
    singleDocument.editedKeysValuesRawData.pageNo = props.singleRawData.page;
    singleDocument.editedKeysValuesRawData.index = props.singleRawData.index;
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(props.singleRawData);
    // console.log(singleDocument.singleDocRawAll);
  };

  const captureEditedText = (e) => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.text = e.target.value;
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(singleDocument.editedKeysValuesRawData);
  };

  const saveEditedKVRData = () => {
    const { singleDocument } = props;
    // console.log(singleDocument.singleDocRawAll.length);
    for (var i = 0; i < singleDocument.singleDocRawAll.length; i++) {
      // console.log(i);
      for (
        var j = 0;
        j < singleDocument.singleDocRawAll[i].pageData.length;
        j++
      ) {
        if (
          props.singleRawData.index ===
            singleDocument.singleDocRawAll[i].pageData[j].index &&
          props.singleRawData.page ===
            singleDocument.singleDocRawAll[i].pageData[j].page
        ) {
          if (singleDocument.editedKeysValuesRawData.text === '') {
            break;
          } else {
            if (singleDocument.editedKeysValuesRawData.type === 'text') {
              singleDocument.singleDocRawAll[i].pageData[j].editedText =
                singleDocument.editedKeysValuesRawData.text;
              break;
            }
          }
        }
      }
    }

    props.dispatch(saveEditedKeysValuesRawData(singleDocument));

    singleDocument.editedKeysValuesRawData.type = '';
    singleDocument.editedKeysValuesRawData.pageNo = -1;
    singleDocument.editedKeysValuesRawData.index = -1;
    singleDocument.editedKeysValuesRawData.text = '';
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(singleDocument.editedKeysValuesRawData);
  };

  return (
    <div className="RawDocDataSingle">
      {/* <div>{props.singleRawData.text}</div> */}

      <div className="RawDataSectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplay">
            {props.singleRawData.editedText}
          </div>
          <button
            className="editTextButton"
            onClick={() => handleEditing('text')}
          >
            Edit
          </button>
        </div>
        {props.singleDocument.editedKeysValuesRawData.type === 'text' &&
        props.singleDocument.editedKeysValuesRawData.index ===
          props.singleRawData.index &&
        props.singleDocument.editedKeysValuesRawData.pageNo ===
          props.singleRawData.page ? (
          <div className="textAreaDivButtons">
            <textarea
              className="textAreaSection"
              defaultValue={props.singleRawData.editedText}
              onChange={captureEditedText}
            ></textarea>
            <div className="textAreaButtonsDiv">
              {/* <button>Extr.</button> */}
              <button
                className="editCompleteButton"
                onClick={() => saveEditedKVRData()}
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
        {props.singleRawData.text !== props.singleRawData.editedText ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">Extracted Data: </div>
            <div className="orgnlExtData">{props.singleRawData.text}</div>
          </div>
        ) : null}
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

export default connect(mapStateToProps)(RawDocDataSingle);

// export default RawDocDataSingle;

/*
<div className="keySectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplay">
            {props.singleKeyValue.editedKey}
          </div>
          <button
            className="editTextButton"
            onClick={() => handleEditing('key')}
          >
            Edit
          </button>
        </div>
        {props.singleDocument.editedKeysValuesRawData.type === 'key' &&
        props.singleDocument.editedKeysValuesRawData.index ===
          props.singleKeyValue.index ? (
          <div className="textAreaDivButtons">
            <textarea
              className="textAreaSection"
              defaultValue={props.singleKeyValue.editedKey}
              onChange={captureEditedText}
            ></textarea>
            <div className="textAreaButtonsDiv">
              <button
                className="editCompleteButton"
                onClick={() => saveEditedKVRData()}
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
        {props.singleKeyValue.key !== props.singleKeyValue.editedKey ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">Extracted Data: </div>
            <div className="orgnlExtData">{props.singleKeyValue.key}</div>
          </div>
        ) : null}
      </div>
      */
