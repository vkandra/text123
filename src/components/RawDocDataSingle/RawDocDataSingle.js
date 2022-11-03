import './RawDocDataSingle.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import {
  editKeysValuesRawData,
  saveEditedKeysValuesRawData,
} from '../../actions/singleDocument';
import { userEditedKVRTList } from '../../actions/extractor';

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
    if (singleDocument.editedKeysValuesRawData.text === '') {
      cancelEditingKVRData();
      return;
    }
    let dataEditUser = JSON.parse(
      JSON.stringify(props.singleDocument.editedKeysValuesRawData)
    );
    props.dispatch(userEditedKVRTList(dataEditUser));

    // const { singleDocument } = props;
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
            cancelEditingKVRData();
            return;
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
    console.log('cancel');
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.type = '';
    singleDocument.editedKeysValuesRawData.index = -1;
    props.dispatch(editKeysValuesRawData(singleDocument));
    console.log(props.extractor.userEditedKeyValueRawTable);
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
            {props.themeLang.languageWords.Edit}
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
        {String(props.singleRawData.text).valueOf() !==
        String(props.singleRawData.editedText).valueOf() ? (
          <div className="orgnlExtractedDataDisplayArea">
            <div className="orgnlExtDataTxt">
              {props.themeLang.languageWords.Extracted_Data}:{' '}
            </div>
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
    extractor: state.extractor,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(RawDocDataSingle);
