import './ConfigurationFileList.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import { assignAllReceivedDocumentsData } from '../../actions/documents';
import { allDocuments } from '../../tempdata/allDocuments';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';
import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFileList = (props) => {
  useEffect(() => {
    props.dispatch(assignAllReceivedDocumentsData(allDocuments));
  }, []);

  const selectAllDocuments = (allDocs) => {
    // console.log(allDocs);
    var selectedDocs = [];
    for (var i = 0; i < allDocs.length; i++) {
      selectedDocs.push(allDocs[i].documentId);
      const { documents } = props;
      documents.selectedDocuments = selectedDocs;
      props.dispatch(selectDocumentsConfiguration(documents));
      //   console.log(props.documents.selectedDocuments);
    }
  };

  const unselectAllDocuments = () => {
    const { documents } = props;
    documents.selectedDocuments = [];
    props.dispatch(unselectDocumentsConfiguration(documents));
    // console.log(props.documents.selectedDocuments);
  };

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
        {props.documents.totalDocuments ===
        props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            All Selected
          </button>
        ) : (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() => selectAllDocuments(props.documents.documentDetails)}
          >
            Select All
          </button>
        )}
      </div>
      <hr className="tableHeadBodyLine"></hr>
      <div className="configFlLstTableBody">
        {props.documents.documentDetails.map((document, index) => (
          <ConfigurationFile document={document} key={document.documentId} />
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
