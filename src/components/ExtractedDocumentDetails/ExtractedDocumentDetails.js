import './ExtractedDocumentDetails.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const ExtractedDocumentDetails = (props) => {
  return (
    <div className="extractedDocumentDetails">
      <div className="documentDetailSections">
        <div className="documentSingleDetailSection">
          <div>
            Name : <span className="actualDocDataDetail">Document #1</span>
          </div>
          <div>
            Id : <span className="actualDocDataDetail">11</span>
          </div>
        </div>
        <div className="documentSingleDetailSection">
          <div>
            Size : <span className="actualDocDataDetail">145kb</span>
          </div>
          <div>
            Uploaded on :{' '}
            <span className="actualDocDataDetail">2022-04-01</span>
          </div>
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
