import './TextExtraction.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const TextExtraction = (props) => {
  return (
    <div className="textExtraction">
      <div className="exactDoc">
        <div className="dropdownsdocpage">
          <div className="docdropdown"></div>
          <div className="pagedropdown"></div>
        </div>
        <div className="displayArea"></div>
        <div className="nextPrevButtons">
          <div className="prevButton"></div>
          <div className="nextButton"></div>
        </div>
      </div>

      <div className="docData">
        <div className="docDataAllTabs">
          <button className="docTab1">Key-Value</button>
          <button className="docTab1">Table</button>
          <button className="docTab1">Raw Data</button>
        </div>
        <div className="docTabData"></div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(TextExtraction);

export default TextExtraction;
