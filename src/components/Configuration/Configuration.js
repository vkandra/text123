import './Configuration.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { handleFileChange } from '../../actions/extractor';
import { uploadSelectedFiles } from '../../actions/extractor';

const Configuration = (props) => {
  const handleFile = (e) => {
    // setFile(e.target.files);
    // console.log(e.target.files);
    props.extractor.selectedFileForUpload = e.target.files;
    props.dispatch(handleFileChange());
    // console.log(props.extractor.selectedFileForUpload);
  };

  const handleUpload = (e) => {
    console.log(props.extractor.selectedFileForUpload.length);
    const file = props.extractor.selectedFileForUpload;
    const formData = new FormData();
    formData.append('file', file[0]);
    console.log(file[0]);
    // for (const value of formdata.values()) {
    //   console.log(value);
    // }
    props.dispatch(uploadSelectedFiles(formData));
  };

  return (
    <div className="configuration">
      This is Configuration
      <br />
      <br />
      <input type="file" name="file" multiple onChange={(e) => handleFile(e)} />
      <br />
      <button onClick={(e) => handleUpload(e)}>Upload</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(Configuration);

// export default Configuration;
