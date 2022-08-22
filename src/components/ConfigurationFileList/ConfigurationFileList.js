import './ConfigurationFileList.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import {
  changeTabOperation,
  handleProcessedFileTabChange,
} from '../../actions/extractor';
import {
  assignSelectedDocDetails,
  dropdownSelected,
} from '../../actions/singleDocument';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';
import {
  clearSelectedFiles,
  startExtractionProcessAPI,
} from '../../actions/documents';
import { fetchRawDocumentsDetailsAPI } from '../../actions/documents';
import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFileList = (props) => {
  // useEffect(() => {

  // }, []);

  const selectAllDocuments = (allDocs) => {
    var selectedDocs = [];
    for (var i = 0; i < allDocs.length; i++) {
      selectedDocs.push(allDocs[i].documentId);
      const { documents } = props;
      documents.selectedDocuments = selectedDocs;
      props.dispatch(selectDocumentsConfiguration(documents));
    }
  };

  const unselectAllDocuments = () => {
    const { documents } = props;
    documents.selectedDocuments = [];
    props.dispatch(unselectDocumentsConfiguration(documents));
  };

  const startExtractionProcess = () => {
    var docNames = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }

    console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (docDetails[i].documentId === selectedPageIds[j]) {
          docNames.push(docDetails[i].ducumentName);
        }
      }
    }
    var data = {
      user_id: props.user.token,
      doc_id: selectedPageIds,
      doc_name: docNames,
    };

    props.dispatch(startExtractionProcessAPI(data));
    setTimeout(() => {
      props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
    }, 2000);
  };

  const changeToTextExtractionTab = () => {
    const { extractor } = props;
    extractor.page = 2;
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails = props.documents.documentDetails;
    var selectedDocDetails = [];
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (docDetails[i].documentId === selectedPageIds[j]) {
          selectedDocDetails.push(docDetails[i]);
        }
      }
    }
    props.dispatch(assignSelectedDocDetails(selectedDocDetails));

    // console.log(props.singleDocument.selectedDocumentsDetails);
    props.dispatch(dropdownSelected(0));

    props.dispatch(changeTabOperation(extractor));
  };

  const handleProcessedFileTab = (num) => {
    const { extractor } = props;
    const { documents } = props;
    if (num === extractor.processedFileTab) {
      return;
    }
    extractor.processedFileTab = num;
    props.dispatch(handleProcessedFileTabChange(extractor));

    documents.selectedDocuments = [];
    props.dispatch(clearSelectedFiles(documents));
  };

  return (
    <div className="configurationFileList">
      {props.documents.selectedDocuments.length !== 0 ? (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              className="startExtractionButton configurationFileListFourButtons"
              onClick={() => startExtractionProcess()}
            >
              Start
            </button>
          ) : null}
          {props.extractor.processedFileTab === 1 ? (
            <button className="stopExtractionButton configurationFileListFourButtons">
              Stop
            </button>
          ) : null}
          <button
            className="viewExtractedDataButton configurationFileListFourButtons"
            onClick={() => changeToTextExtractionTab()}
          >
            View
          </button>
          <button className="deleteExtractedFileButton configurationFileListFourButtons">
            Delete
          </button>
        </div>
      ) : (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              Start
            </button>
          ) : null}
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              Stop
            </button>
          ) : null}
          <button disabled className="configurationFileListFourDisabledButtons">
            View
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            Delete
          </button>
        </div>
      )}

      <div className="proNotProButtons">
        <div
          className={`${
            props.extractor.processedFileTab === 1
              ? 'selectedSpecificButton'
              : ''
          }`}
          onClick={() => handleProcessedFileTab(1)}
        >
          Not Processed
        </div>
        <div
          className={`${
            props.extractor.processedFileTab === 2
              ? 'selectedSpecificButton'
              : ''
          }`}
          onClick={() => handleProcessedFileTab(2)}
        >
          Processed
        </div>
      </div>

      <div className="configFlLstTableHeader">
        <div className="configFlLstTableHeaderDocId">Doc. Id</div>
        <div className="configFlLstTableHeaderDocName">Doc. Name</div>
        <div className="configFlLstTableHeaderDocType">Doc. Type</div>
        <div className="configFlLstTableHeaderUploadedOn">Uploaded On</div>
        <div className="configFlLstTableHeaderDocStats">Status</div>
        {props.extractor.processedFileTab === 1 &&
        props.documents.filteredFilelistNotProcessed.length ===
          props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            All Selected
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.filteredFilelistProcessed.length ===
            props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            All Selected
          </button>
        ) : props.extractor.processedFileTab === 1 &&
          props.documents.filteredFilelistNotProcessed.length !==
            props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistNotProcessed)
            }
          >
            Select All
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.filteredFilelistProcessed.length !==
            props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistProcessed)
            }
          >
            Select All
          </button>
        ) : null}
      </div>
      <hr className="tableHeadBodyLine"></hr>
      {props.extractor.processedFileTab === 1 &&
      props.documents.filteredFilelistNotProcessed.length === 0 ? (
        <div className="no-documents">No Documents to display</div>
      ) : props.extractor.processedFileTab === 1 &&
        props.documents.filteredFilelistNotProcessed.length !== 0 ? (
        <div className="configFlLstTableBody">
          {props.documents.filteredFilelistNotProcessed.map(
            (document, index) => (
              <ConfigurationFile
                document={document}
                key={document.documentId}
              />
            )
          )}
        </div>
      ) : props.extractor.processedFileTab === 2 &&
        props.documents.filteredFilelistProcessed.length === 0 ? (
        <div className="no-documents">No Documents to display</div>
      ) : props.extractor.processedFileTab === 2 &&
        props.documents.filteredFilelistProcessed.length !== 0 ? (
        <div className="configFlLstTableBody">
          {props.documents.filteredFilelistProcessed.map((document, index) => (
            <ConfigurationFile document={document} key={document.documentId} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    extractor: state.extractor,
    singleDocument: state.singleDocument,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
