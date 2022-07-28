import './ConfigurationFile.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const ConfigurationFile = (props) => {
  var dateArray = props.document.documentUploadDate.split(' ', 16);
  var formedDate = dateArray[1] + ' ' + dateArray[2] + ' ' + dateArray[3];
  //   console.log(props);
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
      <button className="configFlLstTableRowSelect">Select</button>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(ConfigurationFile);

export default ConfigurationFile;
