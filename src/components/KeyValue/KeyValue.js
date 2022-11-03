import './KeyValue.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  editKeysValuesRawData,
  saveEditedKeysValuesRawData,
  fetchTemplateData,
} from '../../actions/singleDocument';
import { userEditedKVRTList } from '../../actions/extractor';
import axios from 'axios';

const KeyValue = (props) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let currentTemplate = String(
      props.singleDocument.singleDocumentTemplate
    ).valueOf();
    let templateNamesKeys = Object.keys(props.singleDocument.templateDetails);
    let templateNamesValues = Object.values(
      props.singleDocument.templateDetails
    );

    let allTemplateDetails = props.singleDocument.templateDetails;

    // console.log(allTemplateDetails);
    for (let i in templateNamesKeys) {
      if (currentTemplate === String(templateNamesKeys[i]).valueOf()) {
        console.log(templateNamesValues[i]);
      }
    }
    // console.log(templateNamesKeys);
  }, []);

  const handleEditing = (type) => {
    const { singleDocument } = props;
    singleDocument.editedKeysValuesRawData.type = type;
    singleDocument.editedKeysValuesRawData.index = props.singleKeyValue.index;
    props.dispatch(editKeysValuesRawData(singleDocument));
    // console.log(props.singleKeyValue);
  };

  const captureEditedText = (e) => {
    const { singleDocument } = props;
    console.log(e.target.value);
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
    // console.log(props.extractor.userEditedKeyValueRawTable);
    // const { singleDocument } = props;
    // console.log(singleDocument.singleDocKeysValues.length);
    for (var i = 0; i < singleDocument.singleDocKeysValues.length; i++) {
      // console.log(i);
      if (
        props.singleKeyValue.index ===
        singleDocument.singleDocKeysValues[i].index
      ) {
        // console.log(singleDocument.editedKeysValuesRawData.text);
        if (singleDocument.editedKeysValuesRawData.text === '') {
          cancelEditingKVRData();
          return;
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
    let fetchReqData = {
      key: '',
      table: '',
      text: '',
      user_id: props.user.token,
      template_name: '',
      status: 'fetch_template_details',
    };

    if (isFav) {
      let data = {
        key: props.singleKeyValue.editedKey,
        table: '',
        text: '',
        user_id: props.user.token,
        template_name: props.singleDocument.singleDocumentTemplate,
        status: 'remove_fvrt',
      };
      console.log(data);
      // props.dispatch(favUnfavTemplateData(data));
      axios
        .post(
          `https://lkv9swpfm7.execute-api.ap-south-1.amazonaws.com/fvrt`,
          data
        )
        .then((res) => {
          // console.log('Message Fav/UnFav -> ', res.data);
          setIsFav(false);
          props.dispatch(fetchTemplateData(fetchReqData));
        })
        .catch(function (error) {
          console.log(error);
        });
      // setIsFav(false);
    } else {
      let data = {
        key: props.singleKeyValue.editedKey,
        table: '',
        text: '',
        user_id: props.user.token,
        template_name: props.singleDocument.singleDocumentTemplate,
        status: 'add_fvrt',
      };

      console.log(data);
      // props.dispatch(favUnfavTemplateData(data));
      axios
        .post(
          `https://lkv9swpfm7.execute-api.ap-south-1.amazonaws.com/fvrt`,
          data
        )
        .then((res) => {
          // console.log('Message Fav/UnFav -> ', res.data);
          setIsFav(true);
          props.dispatch(fetchTemplateData(fetchReqData));
        })
        .catch(function (error) {
          console.log(error);
        });
      // setIsFav(true);
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
        {String(props.singleKeyValue.key).valueOf() !==
        String(props.singleKeyValue.editedKey).valueOf() ? (
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

        {String(props.singleKeyValue.value).valueOf() !==
        String(props.singleKeyValue.editedValue).valueOf() ? (
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
