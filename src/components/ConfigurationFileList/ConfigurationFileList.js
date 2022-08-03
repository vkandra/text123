import './ConfigurationFileList.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import { changeTabOperation } from '../../actions/extractor';
import { assignSelectedDocDetails } from '../../actions/singleDocument';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';
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

    props.dispatch(changeTabOperation(extractor));

    console.log(props.singleDocument.selectedDocumentsDetails);
  };

  return (
    <div className="configurationFileList">
      {props.documents.selectedDocuments.length !== 0 ? (
        <div className="actionButtonsConfigure">
          <button className="startExtractionButton configurationFileListFourButtons">
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
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
