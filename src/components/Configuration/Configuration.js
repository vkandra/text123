import './Configuration.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfigurationFileList from '../ConfigurationFileList/ConfigurationFileList';
import {
  fetchRawDocumentsDetailsAPI,
  fetchTemplateNamesAPI,
} from '../../actions/documents';

const Configuration = (props) => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  var uploadInput;

  if (success === true) {
    props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
    document.getElementById('selectedFilesForUploading').value = '';
    setTimeout(() => {
      setSuccess(false);
      props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
    }, 5000);
  }

  useEffect(() => {
    for (var i = 0; i < props.documents.totalDocuments; i++) {
      // console.log(i);
      if (props.documents.documentDetails[i].documentStatus === 'Processing') {
        setTimeout(() => {
          props.dispatch(fetchRawDocumentsDetailsAPI(props.user.token));
        }, 5000);
        break;
      }
    }
  });

  useEffect(() => {
    var userID = props.user.token;

    props.dispatch(fetchRawDocumentsDetailsAPI(userID));

    let data = { user_id: userID };
    props.dispatch(fetchTemplateNamesAPI(data));
  }, []);

  // HANDLING FILES UPLOAD
  const handleChange = (ev) => {
    setError(false);
    setSuccess(false);
    setUrl('');
  };
  const handleUpload = (ev) => {
    setError(false);
    setSuccess(false);
    var userID = props.user.token;
    let fileNameArray = [];
    let fileSizeArray = [];
    // console.log(document.getElementById('singleTemplateSelect').value);
    for (let i = 0; i < uploadInput.files.length; i++) {
      fileNameArray.push(uploadInput.files[i].name);
      fileSizeArray.push(uploadInput.files[i].size);

      let file = uploadInput.files[i];
      // Split the filename to get the name and type

      let fileParts = uploadInput.files[i].name.split('.');
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
              let dataOfTemplate = {
                user_id: userID,
                doc_name: fileNameArray,
                size: fileSizeArray,
                category: document.getElementById('singleTemplateSelect').value,
              };
              props.dispatch(fetchTemplateNamesAPI(dataOfTemplate));
            })
            .catch((error) => {
              // alert('ERROR ' + JSON.stringify(error));
              setError(true);
            });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    }
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
        <div className="fileUploadSectionMain">
          <div className="uploadFileText">
            {props.themeLang.languageWords.Upload_Files} :
          </div>
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

          <div className="templateDropdown">
            <div className="templateLabel">
              {props.themeLang.languageWords.Select_a_Template} : &nbsp;
            </div>
            <select
              name="templates"
              id="singleTemplateSelect"
              // onChange={() => {
              //   getSelectedTemplate();
              // }}
            >
              <optgroup label={props.themeLang.languageWords.Select_a_Template}>
                {props.documents.templateNames.map((singletemplate, index) => (
                  <option
                    key={singletemplate.id}
                    singletemplate={singletemplate}
                    value={singletemplate.name}
                  >
                    {singletemplate.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <button className="uploadButton" onClick={() => handleUpload()}>
              {props.themeLang.languageWords.Upload}
            </button>
          </div>
        </div>
        <div className="uploadStatusShow">
          {success ? (
            <span style={{ color: 'green' }}>
              {props.themeLang.languageWords.Upload_Successful}
            </span>
          ) : (
            <span style={{ color: 'green' }}></span>
          )}
          {error ? (
            <span style={{ color: 'red' }}>
              {props.themeLang.languageWords.Upload_Failed}
            </span>
          ) : (
            <span style={{ color: 'red' }}></span>
          )}
        </div>
      </div>
      <hr className="horizontal-line-1"></hr>
      <ConfigurationFileList></ConfigurationFileList>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    documents: state.documents,
    user: state.user,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(Configuration);
