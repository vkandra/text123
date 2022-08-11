import './ConfigurationFileList.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import { changeTabOperation } from '../../actions/extractor';
import {
  assignSelectedDocDetails,
  singleDocDetail,
} from '../../actions/singleDocument';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';
import { startExtractionProcessAPI } from '../../actions/documents';
import { fetchRawDocumentsDetailsAPI } from '../../actions/documents';
import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFileList = (props) => {
  // useEffect(() => {
  //   props.dispatch(
  //     assignAllReceivedDocumentsData(props.documents.rawDocumentsDataFromAPI)
  //   );
  // }, []);

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

  const startExtractionProcess = () => {
    var docNames = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails = props.documents.documentDetails;
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

    console.log(props.singleDocument.selectedDocumentsDetails);

    // const { singleDocument } = props;

    // var fileDetail = selectedDocDetails[0];

    // singleDocument.singleDocumentId = fileDetail.documentId;
    // singleDocument.singleDocumentName = fileDetail.ducumentName;
    // singleDocument.singleDocumentType = fileDetail.documentType;
    // singleDocument.singleDocumentTotalPages = fileDetail.documentPages;
    // singleDocument.singleDocumentSize = fileDetail.documentSize;
    // singleDocument.singleDocumentUploadDate = fileDetail.documentUploadDate;
    // singleDocument.singleDocumentStatus = fileDetail.documentStatus;
    // singleDocument.singleDocumentDownloadLink = fileDetail.documentDownloadLink;

    // props.dispatch(singleDocDetail(singleDocument));
    // console.log(singleDocument.singleDocumentUploadDate);
    props.dispatch(changeTabOperation(extractor));
  };

  return (
    <div className="configurationFileList">
      {props.documents.selectedDocuments.length !== 0 ? (
        <div className="actionButtonsConfigure">
          <button
            className="startExtractionButton configurationFileListFourButtons"
            onClick={() => startExtractionProcess()}
          >
            Start
          </button>
          <button className="stopExtractionButton configurationFileListFourButtons">
            Stop
          </button>
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
          <button disabled className="configurationFileListFourDisabledButtons">
            Start
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            Stop
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            View
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            Delete
          </button>
        </div>
      )}

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
      {props.documents.totalDocuments === 0 ? (
        <div className="no-documents">No Documents to display</div>
      ) : (
        <div className="configFlLstTableBody">
          {props.documents.documentDetails.map((document, index) => (
            <ConfigurationFile document={document} key={document.documentId} />
          ))}
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
