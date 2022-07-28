import './ConfigurationFileList.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import { assignAllReceivedDocumentsData } from '../../actions/documents';
import { allDocuments } from '../../tempdata/allDocuments';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';

const ConfigurationFileList = (props) => {
  useEffect(() => {
    props.dispatch(assignAllReceivedDocumentsData(allDocuments));
  }, []);

  const isDocumentSelected = (document) => {};

  return (
    <div className="configurationFileList">
      <div className="actionButtonsConfigure">
        <button className="startExtractionButton configurationFileListFourButtons">
          Start
        </button>
        <button className="stopExtractionButton configurationFileListFourButtons">
          Stop
        </button>
        <button className="viewExtractedDataButton configurationFileListFourButtons">
          View
        </button>
        <button className="deleteExtractedFileButton configurationFileListFourButtons">
          Delete
        </button>
      </div>
      <div className="configFlLstTableHeader">
        <div className="configFlLstTableHeaderDocId">Doc. Id</div>
        <div className="configFlLstTableHeaderDocName">Doc. Name</div>
        <div className="configFlLstTableHeaderDocType">Doc. Type</div>
        <div className="configFlLstTableHeaderUploadedOn">Uploaded On</div>
        <div className="configFlLstTableHeaderDocStats">Status</div>
        <button className="configFlLstTableHeaderSelectAll">Select All</button>
      </div>
      <hr className="tableHeadBodyLine"></hr>
      <div className="configFlLstTableBody">
        {props.documents.documentDetails.map((document, index) => (
          <ConfigurationFile
            document={document}
            key={document.documentId}
            isSelected={isDocumentSelected(document)}
          />
        ))}
        {props.documents.totalDocuments === 0 ? (
          <div className="no-documents">No Documents to display</div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
