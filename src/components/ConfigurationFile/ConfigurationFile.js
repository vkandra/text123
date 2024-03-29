import './ConfigurationFile.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import squareCheck from '../../Pictures/square-check-solid.svg';
import squareBlank from '../../Pictures/square-regular.svg';

import {
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
} from '../../actions/documents';

const ConfigurationFile = (props) => {
  var dateArray = new Date(Date.parse(props.document.documentUploadDate))
    .toUTCString()
    .split(' ', 16);
  // var dateArray = dateArray1[0].split('-', 16);
  var formedDate = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  // console.log(dateArray);

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
    <div
      className={`configurationFile ${
        !props.documents.selectedDocuments.includes(props.document.documentId)
          ? null
          : 'selectedDocumentStyle'
      }`}
      id="configFileSingle"
    >
      {!props.documents.selectedDocuments.includes(
        props.document.documentId
      ) ? (
        <button
          className="configFlLstTableRowSelect"
          onClick={() => selectDocument(props.document.documentId)}
        >
          {/* {props.themeLang.languageWords.Select} */}
          <img src={squareBlank} alt="ns" />
        </button>
      ) : (
        <button
          className="configFlLstTableRowUnselect"
          onClick={() => unselectDocument(props.document.documentId)}
        >
          {/* {props.themeLang.languageWords.Selected} */}
          <img src={squareCheck} alt="s" />
        </button>
      )}
      <div className="configFlLstTableRowDocName">
        {props.document.ducumentName}
      </div>
      <div className="configFlLstTableRowDocId">
        {props.document.template_name}
      </div>
      <div className="configFlLstTableRowSubtemplate">
        {props.document.sub_template_name}
      </div>
      <div className="configFlLstTableRowDocType">
        {props.document.ducumentName.split('.').pop() === 'pdf'
          ? 'PDF'
          : props.document.ducumentName.split('.').pop() ===
            ('jpg' || 'png' || 'bmp' || 'jpeg')
          ? 'Image'
          : 'Other'}
        {/* {props.document.documentType === 'application/pdf' ||
        props.document.documentType === 'PDF'
          ? 'PDF'
          : 'Image'} */}
      </div>
      <div className="configFlLstTableRowUploadedOn">{formedDate}</div>
      <div className="configFlLstTableRowDocStats">
        {props.document.documentStatus}
      </div>
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
