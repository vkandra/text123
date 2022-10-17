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
    var docTemplate = [];
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
          docTemplate.push(docDetails[i].template_name);
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
          doc_template: docTemplate[i],
        });
      }
      let dataStart = {
        input: JSON.stringify({ detail: { items: data } }),
        stateMachineArn:
          'arn:aws:states:ap-south-1:565442373753:stateMachine:Textract_State_Machine',
      };
      // console.log(dataStart);
      // console.log(props.documents.filteredFilelistNotProcessed);
      props.dispatch(startExtractionProcessAPI(dataStart));
      setTimeout(() => {
        props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
      }, 2000);
    }
  };

  const stopExtractionProcess = () => {
    var docArn = [];
    let docIds = [];
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
          (docDetails[i].documentStatus === 'Queued' ||
            docDetails[i].documentStatus === 'Processing')
        ) {
          docArn.push(docDetails[i].step_fun_execution_id);
          docIds.push(docDetails[i].documentId);
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
        doc_id: docIds,
        user_id: props.user.token,
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
    let assembledData = {};
    let data = [];
    // console.log(docNames);
    if (docNames.length === 0) {
      return;
    } else {
      for (let i = 0; i < docStatus.length; i++) {
        data.push({
          doc_status: docStatus[i],

          user_id: props.user.token,

          doc_id: docIds[i],

          doc_name: docNames[i],
        });
      }
      assembledData = { delete_input: data };
    }

    // console.log(props.documents.filteredFilelistNotProcessed);
    props.dispatch(deleteFilesDataAPI(assembledData));
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
          {props.themeLang.languageWords.Not_Processed}
        </div>
        <div
          className={`${
            props.extractor.processedFileTab === 2
              ? 'selectedSpecificButton'
              : ''
          }`}
          onClick={() => handleProcessedFileTab(2)}
        >
          {props.themeLang.languageWords.Processed}
        </div>
      </div>

      <div className="configFlLstTableHeader">
        <div className="configFlLstTableHeaderDocName">
          {props.themeLang.languageWords.Doc_Name}
        </div>
        <div className="configFlLstTableHeaderDocId">
          {props.themeLang.languageWords.Template}
        </div>
        <div className="configFlLstTableHeaderDocType">
          {props.themeLang.languageWords.Doc_Type}
        </div>
        <div className="configFlLstTableHeaderUploadedOn">
          {props.themeLang.languageWords.Uploaded_On}
        </div>
        <div className="configFlLstTableHeaderDocStats">
          {props.themeLang.languageWords.Status}
        </div>
        {props.extractor.processedFileTab === 1 &&
        props.documents.filteredFilelistNotProcessed.length ===
          props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            {props.themeLang.languageWords.All_Selected}
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.filteredFilelistProcessed.length ===
            props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            {props.themeLang.languageWords.All_Selected}
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
            {props.themeLang.languageWords.Select_All}
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
            {props.themeLang.languageWords.Select_All}
          </button>
        ) : null}
      </div>
      <hr className="tableHeadBodyLine"></hr>
      {props.extractor.processedFileTab === 1 &&
      props.documents.filteredFilelistNotProcessed.length === 0 ? (
        <div className="no-documents">
          {props.themeLang.languageWords.No_Documents_to_display}
        </div>
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
        <div className="no-documents">
          {props.themeLang.languageWords.No_Documents_to_display}
        </div>
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
              <i className="fi fi-rr-play-alt"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Start}
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
              <i className="fi fi-rr-ban"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Stop}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button
            className="viewExtractedDataButton configurationFileListFourButtons"
            onClick={() => changeToTextExtractionTab()}
          >
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
          <button
            className="deleteExtractedFileButton configurationFileListFourButtons"
            onClick={() => deleteFilesProcess()}
          >
            <i className="fi fi-rr-trash"></i> &nbsp;{' '}
            {props.themeLang.languageWords.Delete}
          </button>
        </div>
      ) : (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i className="fi fi-rr-play-alt"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Start}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i className="fi fi-rr-ban"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Stop}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button disabled className="configurationFileListFourDisabledButtons">
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            <i className="fi fi-rr-trash"></i> &nbsp;{' '}
            {props.themeLang.languageWords.Delete}
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
    themeLang: state.themeLang,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
