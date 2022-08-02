import './TextExtraction.css';
import React from 'react'
import { connect } from 'react-redux/es/exports';
import { changeTextDataTabOperation } from '../../actions/extractor';

import KeyValueDocData from '../KeyValueDocData/KeyValueDocData';
import RawDocData from '../RawDocData/RawDocData';
import TableDocData from '../TableDocData/TableDocData';
import ExtractedDocumentDetails from '../ExtractedDocumentDetails/ExtractedDocumentDetails';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {Worker} from '@react-pdf-viewer/core'
import viewPdf from './sample2.pdf';

const TextExtraction = (props) => {

   //create new plugin instance
   const defaultLayoutPluginInstance=defaultLayoutPlugin();

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
                  <option value="1">Document 1</option>
                  <option value="2">Document 2</option>
                  <option value="3">Document 3</option>
                </optgroup>
              </select>
            </div>
            <div className="pagedropdown">
              <select name="pages">
                <optgroup label="Select Page">
                  {/* label="Start the selection" */}
                  <option value="1">Page 1</option>
                  <option value="2">page 2</option>
                  <option value="3">page 3</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div className="displayArea">
     <div className='pdf-container'>
       {/* show pdf conditionally (if we have one) */}
     {viewPdf&&<><Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js'>
           <Viewer fileUrl={`https://amazon-textract-s3bucket.s3.amazonaws.com/input_/f6d86aa8-57d4-442a-b159-ee46e97df492/AmazonWorkspacesSupplierSet.pdf`}
           plugins={[defaultLayoutPluginInstance]} />
      </Worker></> }
      {/* if we dont have pdf or viewpdf state is null */}
           {!viewPdf&&<>No pdf file selected</>}
     </div>
          </div>
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
