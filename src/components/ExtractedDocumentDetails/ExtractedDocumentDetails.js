import './ExtractedDocumentDetails.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const ExtractedDocumentDetails = (props) => {
  return (
    <div className="extractedDocumentDetails">
      <div className="documentDetailSections">
        <div className="documentSingleDetailSection">
          <div>
            Name : <span className="actualDocDataDetail">abc</span>
          </div>
          <div>Id : </div>
        </div>
        <div className="documentSingleDetailSection">
          <div>Size : </div>
          <div>Uploaded on : </div>
        </div>
      </div>
      <div className="documentDetailAction">
        <button className="downloadButton">Download</button>
        <button className="reextractButton">Re-Extract</button>
        <button className="deleteButton">Delete</button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(ExtractedDocumentDetails);

export default ExtractedDocumentDetails;
