import './ConfRemoteStorage.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import SFTP from '../SFTP/SFTP';
import { setConfRemoteStorage } from '../../actions/extractor';

const ConfRemoteStorage = (props) => {
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
          'Azure'
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
