import './ConfigurationFile.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFile = (props) => {
  var dateArray = props.document.documentUploadDate.split(' ', 16);
  var formedDate = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  //   console.log(props);

  const selectDocument = (docId) => {
    const { documents } = props;
    documents.selectedDocuments.push(docId);
    props.dispatch(selectDocumentsConfiguration(documents));
    console.log(props.documents.selectedDocuments);
  };

  const unselectDocument = (docId) => {
    const { documents } = props;
    const filteredArray = documents.selectedDocuments.filter((id) => {
      return id !== docId;
    });
    documents.selectedDocuments = filteredArray;
    props.dispatch(unselectDocumentsConfiguration(documents));
    console.log(props.documents.selectedDocuments);
  };

  return (
    <div className="configurationFile">
      <div className="configFlLstTableRowDocId">
        {props.document.documentId}
      </div>
      <div className="configFlLstTableRowDocName">
        {props.document.ducumentName}
      </div>
      <div className="configFlLstTableRowDocType">
        {props.document.documentType === 'application/pdf' ? 'PDF' : 'Image'}
      </div>
      <div className="configFlLstTableRowUploadedOn">{formedDate}</div>
      <div className="configFlLstTableRowDocStats">
        {props.document.documentStatus}
      </div>
      {!props.documents.selectedDocuments.includes(
        props.document.documentId
      ) ? (
        <button
          className="configFlLstTableRowSelect"
          onClick={() => selectDocument(props.document.documentId)}
        >
          Select
        </button>
      ) : (
        <button
          className="configFlLstTableRowUnselect"
          onClick={() => unselectDocument(props.document.documentId)}
        >
          Selected
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(ConfigurationFile);

// export default ConfigurationFile;
