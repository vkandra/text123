import './Configuration.css';
import React, { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfigurationFileList from '../ConfigurationFileList/ConfigurationFileList';

const Configuration = (props) => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  var uploadInput;

  if (success === true) {
    document.getElementById('selectedFilesForUploading').value = '';
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }

  const handleChange = (ev) => {
    setError(false);
    setSuccess(false);
    setUrl('');
  };
  const handleUpload = (ev) => {
    setError(false);
    setSuccess(false);
    let file = uploadInput.files[0];
    // Split the filename to get the name and type

    let fileParts = uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log('Preparing the upload');
    axios
      .post('http://localhost:3001/sign_s3', {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var recUrl = returnData.url;
        setUrl(recUrl);
        console.log('Recieved a signed request ' + signedRequest);

        var options = {
          headers: {
            'Content-Type': fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log('Response from s3');
            setSuccess(true);
          })
          .catch((error) => {
            // alert('ERROR ' + JSON.stringify(error));
            setError(true);
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  return (
    <div className="configuration">
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="uploadFilesSection">
        <div className="uploadFileText">Upload File(s)</div>

        <div className="fileUploadSectionMain">
          <div>
            <input
              id="selectedFilesForUploading"
              multiple
              onChange={() => handleChange()}
              ref={(ref) => {
                uploadInput = ref;
              }}
              type="file"
            />
          </div>
          <div>
            <button onClick={() => handleUpload()}>UPLOAD</button>
          </div>
        </div>
        <div className="uploadStatusShow">
          {success ? (
            <span style={{ color: 'green' }}>Upload Successful</span>
          ) : (
            <span style={{ color: 'green' }}></span>
          )}
          {error ? (
            <span style={{ color: 'red' }}>Upload Failed</span>
          ) : (
            <span style={{ color: 'red' }}></span>
          )}
        </div>
      </div>
      <hr></hr>
      <ConfigurationFileList></ConfigurationFileList>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(Configuration);

// const notify = () =>
//   toast.success('Upload Successful!', {
//     position: 'top-right',
//     autoClose: 2000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   });
