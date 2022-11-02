import './KeyValue.css';
import React, { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  editKeysValuesRawData,
  saveEditedKeysValuesRawData,
} from '../../actions/singleDocument';
import { userEditedKVRTList } from '../../actions/extractor';

const KeyValue = (props) => {
  const [isFav, setIsFav] = useState(false);

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
    let dataEditUser = JSON.parse(
      JSON.stringify(props.singleDocument.editedKeysValuesRawData)
    );

    props.dispatch(userEditedKVRTList(dataEditUser));
    console.log(props.extractor.userEditedKeyValueRawTable);
    const { singleDocument } = props;
    // console.log(singleDocument.singleDocKeysValues.length);
    for (var i = 0; i < singleDocument.singleDocKeysValues.length; i++) {
      // console.log(i);
      if (
        props.singleKeyValue.index ===
        singleDocument.singleDocKeysValues[i].index
      ) {
        console.log(singleDocument.editedKeysValuesRawData.text);
        if (singleDocument.editedKeysValuesRawData.text == '') {
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

    // console.log(singleDocument.editedKeysValuesRawData);

    props.dispatch(saveEditedKeysValuesRawData(singleDocument));

    singleDocument.editedKeysValuesRawData.type = '';
    singleDocument.editedKeysValuesRawData.pageNo = -1;
    singleDocument.editedKeysValuesRawData.index = -1;
    singleDocument.editedKeysValuesRawData.text = '';
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(singleDocument.editedKeysValuesRawData);
    // console.log(props.extractor.userEditedKeyValueRaw);
  };

  const cancelEditingKVRData = () => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.type = '';
    singleDocument.editedKeysValuesRawData.index = -1;
    props.dispatch(editKeysValuesRawData(singleDocument));
  };

  const handleFavourite = () => {
    if (isFav) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
  };

  return (
    <div className="keyValue">
      {/* ---------------------- KEYS ------------------------- */}
      <div className="keySectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplayKV">
            <div className="favouriteButton" onClick={() => handleFavourite()}>
              {isFav ? (
                <i className="fi fi-sr-bookmark"></i>
              ) : (
                <i className="fi fi-rr-bookmark"></i>
              )}
            </div>
            {props.singleKeyValue.editedKey}
          </div>

          <button
            className="editTextButton"
            onClick={() => handleEditing('key')}
          >
            {/* <i className="fi fi-rr-edit"></i> */}
            {props.themeLang.languageWords.Edit}
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
                onClick={() => cancelEditingKVRData()}
              >
                Cancel
              </button>
              <button
                className="editCompleteButton"
                onClick={() => saveEditedKVRData()}
              >
                {props.themeLang.languageWords.Done}
              </button>
            </div>
          </div>
        ) : null}
        {props.singleKeyValue.key !== props.singleKeyValue.editedKey ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">
              {props.themeLang.languageWords.Extracted_Data}:{' '}
            </div>
            <div className="orgnlExtData">{props.singleKeyValue.key}</div>
          </div>
        ) : null}
      </div>

      {/* -------------------- VALUES --------------------- */}
      <div className="valueSectionAll">
        <div className="currentDataAndEdit">
          <div className="currentDataDisplay">
            {props.singleKeyValue.editedValue}
          </div>
          <button
            className="editTextButton"
            onClick={() => handleEditing('value')}
          >
            {props.themeLang.languageWords.Edit}
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
                onClick={() => cancelEditingKVRData()}
              >
                Cancel
              </button>
              <button
                className="editCompleteButton"
                onClick={() => saveEditedKVRData()}
              >
                {props.themeLang.languageWords.Done}
              </button>
            </div>
          </div>
        ) : null}

        {props.singleKeyValue.value !== props.singleKeyValue.editedValue ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">
              {props.themeLang.languageWords.Extracted_Data}:{' '}
            </div>
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
    extractor: state.extractor,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(KeyValue);

// export default KeyValue;
