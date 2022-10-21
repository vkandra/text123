import './ConfigurationFile.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFile = (props) => {
  var dateArray = props.document.documentUploadDate.split(' ', 16);
  var formedDate = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  //   console.log(props);

  useEffect(() => {
    // console.log(props.background);
    // console.log(props.index);
    // console.log(props.background);
    if (props.background) {
      const element = document.getElementsByClassName('configurationFile');
      element[props.index].classList.add('optionalBackground');
    }
  }, []);

  const selectDocument = (docId) => {
    const { documents } = props;
    documents.selectedDocuments.push(docId);
    props.dispatch(selectDocumentsConfiguration(documents));
    // console.log(props.documents.selectedDocuments);
  };

  const unselectDocument = (docId) => {
    const { documents } = props;
    const filteredArray = documents.selectedDocuments.filter((id) => {
      return id !== docId;
    });
    documents.selectedDocuments = filteredArray;
    props.dispatch(unselectDocumentsConfiguration(documents));
    // console.log(props.documents.selectedDocuments);
  };

  return (
    <div className="configurationFile" id="configFileSingle">
      <div className="configFlLstTableRowDocName">
        {props.document.ducumentName}
      </div>
      <div className="configFlLstTableRowDocId">
        {props.document.template_name}
      </div>
      <div className="configFlLstTableRowDocType">
        {props.document.documentType === 'application/pdf' ||
        props.document.documentType === 'pdf'
          ? 'PDF'
          : 'Image'}
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
          {props.themeLang.languageWords.Select}
        </button>
      ) : (
        <button
          className="configFlLstTableRowUnselect"
          onClick={() => unselectDocument(props.document.documentId)}
        >
          {props.themeLang.languageWords.Selected}
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(ConfigurationFile);

// export default ConfigurationFile;
