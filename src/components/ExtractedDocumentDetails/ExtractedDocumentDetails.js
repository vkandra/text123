import './ExtractedDocumentDetails.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import { postEditedDataAPI } from '../../actions/extractor';

const ExtractedDocumentDetails = (props) => {
  const saveAndSendEditedData = () => {
    let editedData = {
      user_id: props.user.token,
      doc_id: props.singleDocument.singleDocumentId,
      input: props.extractor.userEditedKeyValueRawTable,
    };
    // console.log(editedData);
    props.dispatch(postEditedDataAPI(editedData));
  };

  return (
    <div className="extractedDocumentDetails">
      <div className="documentDetailSections">
        <div className="documentSingleDetailSection">
          <div>
            Name : &nbsp;
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentName}
            </span>
          </div>
          <div>
            Template : &nbsp;
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentTemplate}
            </span>
          </div>
        </div>
        <div className="documentSingleDetailSection">
          <div>
            Size : &nbsp;
            <span className="actualDocDataDetail">
              {Math.round(props.singleDocument.singleDocumentSize / 1024)}kb
            </span>
          </div>
          <div>
            Uploaded on : &nbsp;
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
          <i className="fi fi-rr-disk"></i>&nbsp; Save
        </button>
        <button className="downloadButton">
          <i className="fi fi-rr-download"></i> &nbsp;Download
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
  };
};

export default connect(mapStateToProps)(ExtractedDocumentDetails);
