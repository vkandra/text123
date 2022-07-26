import './TextExtraction.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { changeTextDataTabOperation } from '../../actions/extractor';

import KeyValueDocData from '../KeyValueDocData/KeyValueDocData';
import RawDocData from '../RawDocData/RawDocData';
import TableDocData from '../TableDocData/TableDocData';
import ExtractedDocumentDetails from '../ExtractedDocumentDetails/ExtractedDocumentDetails';

const TextExtraction = (props) => {
  const changeDataTabs = (tabNum) => {
    const { extractor } = props;
    extractor.textDataTab = tabNum;
    props.dispatch(changeTextDataTabOperation(extractor));
  };
  return (
    <div className="textExtraction">
      <div className="extractedData">
        <div className="exactDoc">
          <div className="dropdownsdocpage">
            <div className="docdropdown">
              <select name="documents">
                <optgroup label="Select Document">
                  {/* label="Start the selection" */}
                  <option value="1">Document #1</option>
                  <option value="2">Document #2</option>
                  <option value="3">Document #3</option>
                </optgroup>
              </select>
            </div>
            <div className="pagedropdown">
              <select name="pages">
                <optgroup label="Select Page">
                  {/* label="Start the selection" */}
                  <option value="1">Page #1</option>
                  <option value="2">Page #2</option>
                  <option value="3">Page #3</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div className="displayArea"></div>
          <div className="nextPrevButtons">
            <div className="prevButton">
              <i className="fi fi-ss-arrow-left"></i> &nbsp; Prev
            </div>
            <div className="nextButton">
              Next &nbsp;<i className="fi fi-ss-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="docData">
          <div className="docDataAllTabs">
            <button
              className={`${
                props.extractor.textDataTab === 1 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(1)}
            >
              Key-Value
            </button>
            <button
              className={`${
                props.extractor.textDataTab === 2 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(2)}
            >
              Table
            </button>
            <button
              className={`${
                props.extractor.textDataTab === 3 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(3)}
            >
              Raw Data
            </button>
          </div>
          <div className="docTabData">
            {props.extractor.textDataTab === 1 ? (
              <KeyValueDocData />
            ) : props.extractor.textDataTab === 2 ? (
              <TableDocData />
            ) : props.extractor.textDataTab === 3 ? (
              <RawDocData />
            ) : null}
          </div>
        </div>
      </div>
      <div className="extractedDocumentDetailsSection">
        <ExtractedDocumentDetails />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(TextExtraction);

// export default TextExtraction;
