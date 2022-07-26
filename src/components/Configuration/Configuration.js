import './Configuration.css';
import React, { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import axios from 'axios';
import { handleFileChange } from '../../actions/extractor';
import { uploadSelectedFiles } from '../../actions/extractor';
import { tempSingleFileData } from '../../tempdata/tempSingleFileData';

const Configuration = (props) => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState('');
  // const [error, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  var uploadInput;

  const handleChange = (ev) => {
    setSuccess(false);
    setUrl('');
  };
  const handleUpload = (ev) => {
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
            alert('ERROR ' + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  const SuccessMessage = () => (
    <div style={{ padding: 50 }}>
      <h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
      <br />
    </div>
  );

  return (
    <div className="App">
      <center>
        <h1>UPLOAD A FILE</h1>
        {success ? <SuccessMessage /> : null}
        <input
          multiple
          onChange={() => handleChange()}
          ref={(ref) => {
            uploadInput = ref;
          }}
          type="file"
        />
        <br />
        <button onClick={() => handleUpload()}>UPLOAD</button>
      </center>
    </div>
  );

  // const handleFile = (e) => {
  //   // console.log(e.target.files);
  //   props.extractor.selectedFileForUpload = e.target.files;
  //   props.dispatch(handleFileChange());

  //   const formData = new FormData();
  //   formData.append('file', e.target.files);
  //   // console.log(file[0]);
  //   props.dispatch(uploadSelectedFiles(formData));
  // };

  // const handleUpload = (e) => {
  //   console.log(props.extractor.selectedFileForUpload.length);
  //   const file = props.extractor.selectedFileForUpload;
  //   const formData = new FormData();
  //   formData.append('file', file[0]);
  //   console.log(file[0]);
  //   // props.dispatch(uploadSelectedFiles(file[0]));
  // };

  // return (
  //   <div className="configuration">
  //     This is Configuration
  //     <br />
  //     <br />
  //     <input type="file" multiple onChange={(e) => handleFile(e)} />
  //     <br />
  //     <button onClick={(e) => handleUpload(e)}>Upload</button>
  //   </div>
  // );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(Configuration);

// export default Configuration;

// Code for Back End File Transfer

/*
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      error: false,
      errorMessage : ""
    }
  }

  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:3001/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);

      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }


  render() {
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    const ErrorMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
        <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <input multiple onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}

export default App;

*/
