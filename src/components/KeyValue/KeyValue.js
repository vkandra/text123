import './KeyValue.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import {
  editKeysValuesRawData,
  saveEditedKeysValuesRawData,
} from '../../actions/singleDocument';

const KeyValue = (props) => {
  const handleEditing = (type) => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.type = type;
    singleDocument.editedKeysValuesRawData.index = props.singleKeyValue.index;
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(props.singleKeyValue);
  };

  const captureEditedText = (e) => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.text = e.target.value;
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(singleDocument.editedKeysValuesRawData);
  };

  const saveEditedKVRData = () => {
    const { singleDocument } = props;
    // console.log(singleDocument.singleDocKeysValues.length);
    for (var i = 0; i < singleDocument.singleDocKeysValues.length; i++) {
      // console.log(i);
      if (
        props.singleKeyValue.index ===
        singleDocument.singleDocKeysValues[i].index
      ) {
        if (singleDocument.editedKeysValuesRawData.text === '') {
          break;
        } else {
          if (singleDocument.editedKeysValuesRawData.type === 'key') {
            singleDocument.singleDocKeysValues[i].editedKey =
              singleDocument.editedKeysValuesRawData.text;
            break;
          }
          if (singleDocument.editedKeysValuesRawData.type === 'value') {
            singleDocument.singleDocKeysValues[i].editedValue =
              singleDocument.editedKeysValuesRawData.text;
            break;
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
    <div className="keyValue">
      {/* ---------------------- KEYS ------------------------- */}
      <div className="keySectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplayKV">
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
        {props.singleKeyValue.key !== props.singleKeyValue.editedKey ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">Extracted Data: </div>
            <div className="orgnlExtData">{props.singleKeyValue.key}</div>
          </div>
        ) : null}
      </div>

      {/* -------------------- VALUES --------------------- */}
      <div className="valueSectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplayKV">
            {props.singleKeyValue.editedValue}
          </div>
          <button
            className="editTextButton"
            onClick={() => handleEditing('value')}
          >
            Edit
          </button>
        </div>
        {props.singleDocument.editedKeysValuesRawData.type === 'value' &&
        props.singleDocument.editedKeysValuesRawData.index ===
          props.singleKeyValue.index ? (
          <div className="textAreaDivButtons">
            <textarea
              className="textAreaSection"
              defaultValue={props.singleKeyValue.editedValue}
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

        {props.singleKeyValue.value !== props.singleKeyValue.editedValue ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">Extracted Data: </div>
            <div className="orgnlExtData">{props.singleKeyValue.value}</div>
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

export default connect(mapStateToProps)(KeyValue);

// export default KeyValue;
