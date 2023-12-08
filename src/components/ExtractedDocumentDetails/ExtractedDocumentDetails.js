import './ExtractedDocumentDetails.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import {
  postEditedDataAPI,
  downloadEditedDataAPI,
} from '../../actions/extractor';

const ExtractedDocumentDetails = (props) => {
  // console.log(props.singleDocument.singleDocumentId);
  const saveAndSendEditedData = () => {
    // console.log(props.extractor.userEditedKeyValueRawTable);
    let editedData = {
      user_id: props.user.token,
      doc_id: props.singleDocument.singleDocumentId,
      input: props.extractor.userEditedKeyValueRawTable,
      templateDetails: props.singleDocument.templateDetails,
      templateName: props.singleDocument.singleDocumentTemplate,
      subTemplateName: props.singleDocument.singleDocumentSubTemplate,
    };
    // console.log(editedData);
    props.dispatch(postEditedDataAPI(editedData));
  };

  //for download button
  const downloadEditedData = () => {
    let userAndFileData = {
      user_id: props.user.token,
      DocumentID: props.singleDocument.singleDocumentId,
      SubTemplate:props.singleDocument.singleDocumentSubTemplate,
      DocumentName:props.singleDocument.singleDocumentName
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
            {props.singleDocument.singleDocumentSubTemplate !== '' ? (
              <span className="actualDocDataDetail">
                {' '}
                {props.singleDocument.singleDocumentSubTemplate} (
                {props.singleDocument.singleDocumentTemplate})
              </span>
            ) : (
              <span className="actualDocDataDetail"></span>
            )}
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
        {props.extractor.userEditedKeyValueRawTable.length > 0 ? (
          <button
            className="saveDataButton"
            onClick={() => saveAndSendEditedData()}
          >
            <i className="fi fi-rr-disk"></i>&nbsp;{' '}
            {props.themeLang.languageWords.Save}
          </button>
        ) : (
          <button className="disDataButton">
            {/* <i className="fi fi-rr-disk"></i> */}
            <i class="fa-solid fa-floppy-disk"></i>&nbsp;{' '}
            {props.themeLang.languageWords.Save}
          </button>
        )}

        <button className="downloadButton" onClick={() => downloadEditedData()}>
          {/* <i className="fi fi-rr-download"></i> */}
          <i class="fa-solid fa-download"></i>&nbsp;
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
