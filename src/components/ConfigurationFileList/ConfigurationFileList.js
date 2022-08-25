import './ConfigurationFileList.css';
import React from 'react';
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
  stopExtractionProcessAPI,
  deleteFilesDataAPI,
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
    var docIds = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }

    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          docDetails[i].documentStatus === 'Not Processed'
        ) {
          docNames.push(docDetails[i].ducumentName);
          docIds.push(docDetails[i].documentId);
        }
      }
    }
    // console.log(docNames);
    let data = [];
    if (docNames.length === 0) {
      return;
    } else {
      for (let i = 0; i < docIds.length; i++) {
        data.push({
          user_id: props.user.token,
          doc_id: docIds[i],
          doc_name: docNames[i],
        });
      }
      let dataStart = {
        input: JSON.stringify({ detail: { items: data } }),
        stateMachineArn:
          'arn:aws:states:ap-south-1:565442373753:stateMachine:Textract_State_Machine',
      };
      // console.log(props.documents.filteredFilelistNotProcessed);
      props.dispatch(startExtractionProcessAPI(dataStart));
      setTimeout(() => {
        props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
      }, 2000);
    }
  };

  const stopExtractionProcess = () => {
    var docArn = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }
    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          docDetails[i].documentStatus === 'Processing'
        ) {
          docArn.push(docDetails[i].step_fun_execution_id);
        }
      }
    }
    console.log(docDetails);
    let data = {};
    if (docArn.length === 0) {
      return;
    } else {
      data = {
        stop: 'Stop the pipeline',
        arn: docArn[0],
      };

      props.dispatch(stopExtractionProcessAPI(data));
      setTimeout(() => {
        props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
      }, 2000);
    }
  };

  const deleteFilesProcess = () => {
    var docNames = [];
    var docStatus = [];
    var docIds = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }

    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          (docDetails[i].documentStatus === 'Not Processed' ||
            docDetails[i].documentStatus === 'Processed')
        ) {
          docNames.push(docDetails[i].ducumentName);
          docStatus.push(docDetails[i].documentStatus);
          docIds.push(docDetails[i].documentId);
        }
      }
    }
    let data = {};
    // console.log(docNames);
    if (docNames.length === 0) {
      return;
    } else {
      data = {
        doc_status: docStatus[0],
        user_id: props.user.token,
        doc_id: docIds[0],
        doc_name: docNames[0],
      };
    }

    // console.log(props.documents.filteredFilelistNotProcessed);
    props.dispatch(deleteFilesDataAPI(data));
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

    props.dispatch(dropdownSelected(0));

    props.dispatch(changeTabOperation(extractor));
  };

  const handleProcessedFileTab = (num) => {
    const { extractor } = props;
    if (num === extractor.processedFileTab) {
      return;
    }
    extractor.processedFileTab = num;
    props.dispatch(handleProcessedFileTabChange(extractor));

    props.dispatch(clearSelectedFiles());
    console.log(props.documents.documentDetails);
  };

  return (
    <div className="configurationFileList">
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

      {props.documents.selectedDocuments.length !== 0 ? (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              className="startExtractionButton configurationFileListFourButtons"
              onClick={() => startExtractionProcess()}
            >
              <i class="fi fi-rr-play-alt"></i> &nbsp; Start
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          {/* <button
            className="startExtractionButton configurationFileListFourButtons"
            onClick={() => startExtractionProcess()}
          >
            Start
          </button> */}
          {props.extractor.processedFileTab === 1 ? (
            <button
              className="stopExtractionButton configurationFileListFourButtons"
              onClick={() => stopExtractionProcess()}
            >
              <i class="fi fi-rr-ban"></i> &nbsp; Stop
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button
            className="viewExtractedDataButton configurationFileListFourButtons"
            onClick={() => changeToTextExtractionTab()}
          >
            <i class="fi fi-rr-eye"></i> &nbsp; View
          </button>
          <button
            className="deleteExtractedFileButton configurationFileListFourButtons"
            onClick={() => deleteFilesProcess()}
          >
            <i class="fi fi-rr-trash"></i> &nbsp; Delete
          </button>
        </div>
      ) : (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i class="fi fi-rr-play-alt"></i> &nbsp; Start
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i class="fi fi-rr-ban"></i> &nbsp; Stop
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button disabled className="configurationFileListFourDisabledButtons">
            <i class="fi fi-rr-eye"></i> &nbsp; View
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            <i class="fi fi-rr-trash"></i> &nbsp; Delete
          </button>
        </div>
      )}
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
