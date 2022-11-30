import './Configuration.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import S3 from 'react-aws-s3';

import ConfigurationFileList from '../ConfigurationFileList/ConfigurationFileList';
import {
  fetchRawDocumentsDetailsAPI,
  fetchTemplateNamesAPI,
  clearSelectedFiles,
} from '../../actions/documents';
import {
  fetchTemplateDataAPI,
  addDeletefetchTemplateAPI,
} from '../../actions/singleDocument';

// installed using npm install buffer --save
window.Buffer = window.Buffer || require('buffer').Buffer;

const Configuration = (props) => {
  const [success, setSuccess] = useState(false);
  // const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  const [selectedFile, setSelectedFile] = useState([]);

  // var uploadInput;

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: `input_/${props.user.token}`,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
  };

  if (success === true) {
    props.dispatch(
      fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
    );
    document.getElementById('selectedFilesForUploading').value = '';
    setTimeout(() => {
      setSuccess(false);
      props.dispatch(
        fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
      );
    }, 5000);
  }

  useEffect(() => {
    for (var i = 0; i < props.documents.totalDocuments; i++) {
      // console.log(i);
      if (
        props.documents.documentDetails[i].documentStatus === 'Processing' ||
        props.documents.documentDetails[i].documentStatus === 'Queued'
      ) {
        setTimeout(() => {
          props.dispatch(
            fetchRawDocumentsDetailsAPI(
              props.user.token,
              props.user.preferences
            )
          );
        }, 5000);
        break;
      }
    }
  });

  useEffect(() => {
    var userID = props.user.token;

    props.dispatch(fetchRawDocumentsDetailsAPI(userID, props.user.preferences));

    // Fetching Template Data
    let fetchReqData = {
      key: '',
      table: '',
      text: '',
      user_id: props.user.token,
      template_name: '',
      sub_template: 'Default',
      status: 'fetch_template_details',
    };
    props.dispatch(fetchTemplateDataAPI(fetchReqData));

    let data = { user_id: userID, sub_template: 'Default' };
    props.dispatch(fetchTemplateNamesAPI(data));
  }, []);

  useEffect(() => {
    let category = document.getElementById('singleTemplateSelect').value;
    let reqBody = {
      user_id: props.user.token,
      main_template: category,
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(reqBody));
    // console.log(props.documents.subTemplateNames);
  }, [props.documents.templateNames]);

  // HANDLING FILES UPLOAD 2
  const handleFileInput = (e) => {
    setError(false);
    setSuccess(false);
    setSelectedFile(e.target.files);
    console.log(e.target.files);
  };

  const uploadFile = async (file) => {
    const ReactS3Client = new S3(config);
    setError(false);
    setSuccess(false);

    let fileNameArray = [];
    let fileSizeArray = [];

    console.log('Preparing the upload');
    // console.log(ReactS3Client);
    for (let i = 0; i < selectedFile.length; i++) {
      // the name of the file uploaded is used to upload it to S3
      // console.log(selectedFile[i]);

      fileNameArray.push(selectedFile[i].name);
      fileSizeArray.push(selectedFile[i].size);

      ReactS3Client.uploadFile(selectedFile[i], selectedFile[i].name)
        .then((data) => {
          setSuccess(true);
          console.log('Link from s3 -> ', data.location);
          let dataOfTemplate = {
            user_id: props.user.token,
            doc_name: fileNameArray,
            size: fileSizeArray,
            category: document.getElementById('singleTemplateSelect').value,
            sub_template: document.getElementById('singleSubTemplateSelect')
              .value,
          };
          props.dispatch(fetchTemplateNamesAPI(dataOfTemplate));
          setTimeout(() => {
            props.dispatch(
              fetchRawDocumentsDetailsAPI(
                props.user.token,
                props.user.preferences
              )
            );
          }, 1000);

          props.dispatch(clearSelectedFiles());
        })
        .catch((err) => {
          setError(true);
          console.log(JSON.stringify(error));
        });
    }
  };

  const getSelectedSubTemplates = () => {
    let category = document.getElementById('singleTemplateSelect').value;
    let reqBody = {
      user_id: props.user.token,
      main_template: category,
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(reqBody));
  };

  return (
    <div className="configuration">
      <div className="uploadFilesSection">
        <div className="fileUploadSectionMain">
          <div className="uploadFileText">
            {/* {props.themeLang.languageWords.Upload_Files}  */}
            UPLOAD FILE(s) :
          </div>
          <div>
            <input
              id="selectedFilesForUploading"
              multiple
              // onChange={() => handleChange()}
              onChange={handleFileInput}
              // ref={(ref) => {
              //   uploadInput = ref;
              // }}
              type="file"
            />
          </div>

          <div className="templateDropdown">
            <div className="templateLabel">
              {/* {props.themeLang.languageWords.Select_a_Template} */}
              &nbsp;Select Main Template :
            </div>
            <select
              name="templates"
              id="singleTemplateSelect"
              onChange={() => {
                getSelectedSubTemplates();
              }}
            >
              <optgroup label="Select Main Template">
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
          <div className="templateDropdown">
            <div className="templateLabel">
              {/* {props.themeLang.languageWords.Select_a_Template} */}
              &nbsp;Select Sub-Template :
            </div>
            <select name="templates" id="singleSubTemplateSelect">
              <optgroup label="Select Sub-Template">
                {props.documents.subTemplateNames.map(
                  (singletemplate, index) => (
                    <option
                      key={singletemplate.id}
                      singletemplate={singletemplate}
                      value={singletemplate.name}
                    >
                      {singletemplate.name}
                    </option>
                  )
                )}
              </optgroup>
            </select>
          </div>

          <div>
            {/* <div className="uploadButton" onClick={() => handleUpload()}> */}
            <div
              className="uploadButton"
              onClick={() => uploadFile(selectedFile)}
            >
              <i class="fa-solid fa-upload"></i>
              {/* <i className="fi fi-ss-upload"></i>&nbsp; */}
              {props.themeLang.languageWords.Upload}
            </div>
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
      <ConfigurationFileList />
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
