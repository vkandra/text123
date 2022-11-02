import './ExtractedDocumentDetails.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import {
  postEditedDataAPI,
  downloadEditedDataAPI,
} from '../../actions/extractor';

const ExtractedDocumentDetails = (props) => {
  const saveAndSendEditedData = () => {
    // console.log(props.extractor.userEditedKeyValueRawTable);
    let editedData = {
      user_id: props.user.token,
      doc_id: props.singleDocument.singleDocumentId,
      input: props.extractor.userEditedKeyValueRawTable,
    };
    // console.log(editedData);
    props.dispatch(postEditedDataAPI(editedData));
  };

  const downloadEditedData = () => {
    let userAndFileData = {
      user_id: props.user.token,
      doc_id: props.singleDocument.singleDocumentId,
    };
    // console.log(editedData);
    props.dispatch(downloadEditedDataAPI(userAndFileData));
  };

  return (
    <div className="extractedDocumentDetails">
      <div className="documentDetailSections">
        <div className="documentSingleDetailSection">
          <div>
            {props.themeLang.languageWords.Name} : &nbsp;
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentName}
            </span>
          </div>
          <div>
            {props.themeLang.languageWords.Template} : &nbsp;
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentTemplate}
            </span>
          </div>
        </div>
        <div className="documentSingleDetailSection">
          <div>
            {props.themeLang.languageWords.Size} : &nbsp;
            <span className="actualDocDataDetail">
              {Math.round(props.singleDocument.singleDocumentSize / 1024)}kb
            </span>
          </div>
          <div>
            {props.themeLang.languageWords.Uploaded_on} : &nbsp;
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentUploadDate}
            </span>
          </div>
        </div>
      </div>
      <div className="documentDetailAction">
        <button
          className="saveDataButton"
          onClick={() => saveAndSendEditedData()}
        >
          <i className="fi fi-rr-disk"></i>&nbsp;{' '}
          {props.themeLang.languageWords.Save}
        </button>
        <button className="downloadButton" onClick={() => downloadEditedData()}>
          <i className="fi fi-rr-download"></i> &nbsp;
          {props.themeLang.languageWords.Download}
        </button>
        {/* <button className="deleteButton">Delete</button> */}
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

export default connect(mapStateToProps)(ExtractedDocumentDetails);
