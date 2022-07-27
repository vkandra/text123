import './ConfigurationFileList.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const ConfigurationFileList = (props) => {
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
        <button className="configFlLstTableHeaderSelectAll">Select All</button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(ConfigurationFileList);

export default ConfigurationFileList;
