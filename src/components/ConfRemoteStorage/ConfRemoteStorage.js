import './ConfRemoteStorage.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import SFTP from '../SFTP/SFTP';
import { setConfRemoteStorage } from '../../actions/extractor';
import AzureRemoteSt from '../AzureRemoteSt/AzureRemoteSt';

const ConfRemoteStorage = (props) => {
  useEffect(() => {
    if (props.extractor.bulkUploadPage.page === 1) {
      document.getElementById('confRemStButtonSection').style.display = 'flex';
      document.getElementById('confRemStVisualSection').style.height = '90.5%';
    } else {
      document.getElementById('confRemStButtonSection').style.display = 'none';
      document.getElementById('confRemStVisualSection').style.height = '98%';
    }
  }, [props.extractor.bulkUploadPage.page]);

  return (
    <div className="confRemoteStorage">
      <div id="confRemStButtonSection">
        <div
          id="confRemStSFTPButton"
          className={`confRemStButton ${
            props.extractor.confRemoteStorage === 1
              ? 'confRemStButtonSelected'
              : null
          }`}
          onClick={() => props.dispatch(setConfRemoteStorage(1))}
        >
          SFTP
        </div>
        <div
          id="confRemStAzureButton"
          className={`confRemStButton ${
            props.extractor.confRemoteStorage === 2
              ? 'confRemStButtonSelected'
              : null
          }`}
          onClick={() => props.dispatch(setConfRemoteStorage(2))}
        >
          Azure
        </div>
        <div
          id="confRemStAWSButton"
          className={`confRemStButton ${
            props.extractor.confRemoteStorage === 3
              ? 'confRemStButtonSelected'
              : null
          }`}
          onClick={() => props.dispatch(setConfRemoteStorage(3))}
        >
          AWS
        </div>
      </div>
      <div id="confRemStVisualSection">
        {props.extractor.confRemoteStorage === 1 ? (
          <SFTP />
        ) : props.extractor.confRemoteStorage === 2 ? (
          <AzureRemoteSt />
        ) : (
          'AWS'
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(ConfRemoteStorage);

// export default ConfRemoteStorage;
