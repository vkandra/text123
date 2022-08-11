import './ExtractedDocumentDetails.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

const ExtractedDocumentDetails = (props) => {
  return (
    <div className="extractedDocumentDetails">
      <div className="documentDetailSections">
        <div className="documentSingleDetailSection">
          <div>
            Name :
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentName}
            </span>
          </div>
          <div>
            Id :
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentId}
            </span>
          </div>
        </div>
        <div className="documentSingleDetailSection">
          <div>
            Size :
            <span className="actualDocDataDetail">
              {Math.round(props.singleDocument.singleDocumentSize / 1024)}kb
            </span>
          </div>
          <div>
            Uploaded on :
            <span className="actualDocDataDetail">
              {props.singleDocument.singleDocumentUploadDate}
            </span>
          </div>
        </div>
      </div>
      <div className="documentDetailAction">
        <button className="downloadButton">Download</button>
        <button className="reextractButton">Re-Extract</button>
        <button className="deleteButton">Delete</button>
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

export default connect(mapStateToProps)(ExtractedDocumentDetails);
