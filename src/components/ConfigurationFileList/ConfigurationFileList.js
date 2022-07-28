import './ConfigurationFileList.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

import { assignAllReceivedDocumentsData } from '../../actions/documents';
import { allDocuments } from '../../tempdata/allDocuments';

const ConfigurationFileList = (props) => {
  //   console.log(props.documents);

  useEffect(() => {
    props.dispatch(assignAllReceivedDocumentsData(allDocuments));
  }, []);

  //   console.log(props.documents);

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

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
