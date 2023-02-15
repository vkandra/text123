import './TextExtraction.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  changeTextDataTabOperation,
  // clearEditedKVRTList,
} from '../../actions/extractor';

import KeyValueDocData from '../KeyValueDocData/KeyValueDocData';
import RawDocData from '../RawDocData/RawDocData';
import TableDocData from '../TableDocData/TableDocData';
import ExtractedDocumentDetails from '../ExtractedDocumentDetails/ExtractedDocumentDetails';
import {
  fetchSingleFileDataAPI,
  singleDocDetail,
  dropdownSelected,
  // singleFileTemplateDetails,
} from '../../actions/singleDocument';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import viewPdf from './sample2.pdf';
import Favourites from '../Favourites/Favourites';

import { Image } from 'primereact/image';

const TextExtraction = (props) => {
  useEffect(() => {
    if (props.singleDocument.selectedDocumentsDetails.length !== 0) {
      checkForEdits();
    }
  }, []);

  const getSingleSelectedDocId = () => {
    const { singleDocument } = props;

    var id = document.getElementById('singleDocSelect').value;
    var fileDetail = {};

    for (var i = 0; i < singleDocument.selectedDocumentsDetails.length; i++) {
      if (singleDocument.selectedDocumentsDetails[i].documentId === id) {
        fileDetail = singleDocument.selectedDocumentsDetails[i];
        break;
      }
    }

    singleDocument.singleDocumentId = fileDetail.documentId;
    singleDocument.singleDocumentName = fileDetail.ducumentName;
    singleDocument.singleDocumentType = fileDetail.documentType;
    singleDocument.singleDocumentTotalPages = fileDetail.documentPages;
    singleDocument.singleDocumentSize = fileDetail.documentSize;
    singleDocument.singleDocumentUploadDate = fileDetail.documentUploadDate;
    singleDocument.singleDocumentStatus = fileDetail.documentStatus;
    singleDocument.singleDocumentDownloadLink = fileDetail.documentDownloadLink;
    singleDocument.singleDocumentTemplate = fileDetail.template_name;
    singleDocument.singleDocumentSubTemplate = fileDetail.sub_template_name;

    singleDocument.singleDocKeysValues = [];
    singleDocument.templateSingleDocKeysValues = [];
    singleDocument.singleDocTablesAll = [];
    singleDocument.singleDocRawAll = [];
    singleDocument.templateAllKeys = [];
    singleDocument.templateUnusedKeys = [];

    props.dispatch(singleDocDetail(singleDocument));
    // console.log(singleDocument.singleDocumentStatus);

    var userID = props.user.token;
    var documentId = props.singleDocument.singleDocumentId;
    let templateDetails = props.singleDocument.templateDetails;
    let templateName = props.singleDocument.singleDocumentTemplate;
    let subTemplateName = props.singleDocument.singleDocumentSubTemplate;
    var singleDocParams = [
      userID,
      documentId,
      templateDetails,
      templateName,
      subTemplateName,
    ];

    props.dispatch(fetchSingleFileDataAPI(singleDocParams));

    for (let file of props.singleDocument.selectedDocumentsDetails) {
      if (id === file.documentId) {
        props.dispatch(dropdownSelected(i));
        break;
      }
    }
  };

  //create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  const changeDataTabs = (tabNum) => {
    const { extractor } = props;
    extractor.textDataTab = tabNum;
    props.dispatch(changeTextDataTabOperation(extractor));
  };

  const gotoNextFile = () => {
    if (props.extractor.userEditedKeyValueRawTable.length > 0) {
      alert('WARNING!\n -> Data Not Saved! \n -> Please SAVE Edited Data ');
      return;
    }
    let id = document.getElementById('singleDocSelect').value;
    let count = 0;
    for (let file of props.singleDocument.selectedDocumentsDetails) {
      count++;
      if (id === file.documentId) {
        break;
      }
    }
    // console.log(props.singleDocument.selectedDocumentsDetails[count]);
    // console.log(count);
    if (props.singleDocument.selectedDocumentsDetails.length === count) {
      return;
    } else {
      document.getElementById('singleDocSelect').value =
        props.singleDocument.selectedDocumentsDetails[count].documentId;

      // props.dispatch(dropdownSelected(count));
      checkForEdits();
    }
  };

  const gotoPrevFile = () => {
    if (props.extractor.userEditedKeyValueRawTable.length > 0) {
      alert('WARNING!\n -> Data Not Saved! \n -> Please SAVE Edited Data ');
      return;
    }
    var id = document.getElementById('singleDocSelect').value;
    console.log(id);
    console.log(props.singleDocument.selectedDocumentsDetails);
    let count = 0;
    for (let file of props.singleDocument.selectedDocumentsDetails) {
      count++;
      if (id === file.documentId) {
        break;
      }
    }
    // console.log(props.singleDocument.selectedDocumentsDetails[count]);
    console.log(count);
    if (count - 2 < 0) {
      return;
    } else {
      document.getElementById('singleDocSelect').value =
        props.singleDocument.selectedDocumentsDetails[count - 2].documentId;

      // props.dispatch(dropdownSelected(count - 2));
      checkForEdits();
    }
  };

  const checkForEdits = () => {
    // console.log(props.extractor.userEditedKeyValueRawTable.length);
    if (props.extractor.userEditedKeyValueRawTable.length > 0) {
      alert('WARNING!\n -> Data Not Saved! \n -> Please SAVE Edited Data ');
      return;
    } else {
      // props.dispatch(clearEditedKVRTList([]));
      getSingleSelectedDocId();
    }
  };

  return (
    <div className="textExtraction">
      <div className="extractedData">
        <div className="exactDoc">
          <div className="dropdownsdocpage">
            <div className="docdropdown">
              <select
                name="documents"
                id="singleDocSelect"
                onChange={() => {
                  checkForEdits();
                }}
              >
                <optgroup label={props.themeLang.languageWords.Select_Document}>
                  {props.singleDocument.selectedDocumentsDetails.map(
                    (singlefile, index) => (
                      <option
                        key={singlefile.documentId}
                        singlefile={singlefile}
                        value={singlefile.documentId}
                      >
                        {singlefile.ducumentName}
                      </option>
                    )
                  )}
                </optgroup>
              </select>
            </div>
          </div>
          {props.singleDocument.singleDocumentDownloadLink === '' ? (
            <div className="displayArea"></div>
          ) : (
            <div className="displayArea">
              {/* props.singleDocument.ducumentName.split('.').pop() === 'pdf' */}
              {props.singleDocument.singleDocumentName.split('.').pop() ===
              'pdf' ? (
                <div className="pdf-container">
                  {/* show pdf conditionally (if we have one) */}
                  {viewPdf && (
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={
                            props.singleDocument.singleDocumentDownloadLink
                          }
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Worker>
                    </>
                  )}
                  {/* if we dont have pdf or viewpdf state is null */}
                  {!viewPdf && <>No pdf file selected</>}
                </div>
              ) : (
                <div className="imageDisplaydiv">
                  {/* <img
                    id="imageDisplay"
                    // src="https://images.freeimages.com/images/previews/d0f/nuclear-power-plant-1314782.jpg"
                    src={props.singleDocument.singleDocumentDownloadLink}
                    alt="Not Found"
                  /> */}
                  <Image
                    imageClassName="imageDisplay"
                    // downloadable
                    // src="https://images.freeimages.com/images/previews/d0f/nuclear-power-plant-1314782.jpg"
                    src={props.singleDocument.singleDocumentDownloadLink}
                    alt="Not Found"
                    preview
                  />
                </div>
              )}
            </div>
          )}
          <div className="nextPrevButtons">
            <div
              className={`${
                props.singleDocument.dropdownSelected === 0
                  ? 'disabled_button'
                  : 'prevButton'
              }`}
              onClick={() => gotoPrevFile()}
            >
              <i className="fi fi-ss-arrow-left"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Prev}
            </div>
            <div
              className={`${
                props.singleDocument.dropdownSelected ===
                props.singleDocument.selectedDocumentsDetails.length - 1
                  ? 'disabled_button'
                  : 'nextButton'
              }`}
              onClick={() => gotoNextFile()}
            >
              {props.themeLang.languageWords.Next} &nbsp;
              <i className="fi fi-ss-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="docData">
          <div className="docDataAllTabs">
            <div
              className={`${
                props.extractor.textDataTab === 1 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(1)}
            >
              {/* <i class="fa-solid fa-brackets-curly"></i> */}
              {/* <i class="fa-thin fa-brackets-curly"></i> */}
              &#xFF5B; &#xFF5D;
              {props.themeLang.languageWords.Key_Value}
            </div>
            <div
              className={`${
                props.extractor.textDataTab === 2 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(2)}
            >
              <i class="fa-solid fa-table"></i>&nbsp;&nbsp;
              {props.themeLang.languageWords.Table}
            </div>
            <div
              className={`${
                props.extractor.textDataTab === 3 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(3)}
            >
              <i class="fa-solid fa-list-ul"></i>&nbsp;&nbsp;
              {props.themeLang.languageWords.Raw_Data}
            </div>
            <div
              className={`${
                props.extractor.textDataTab === 4 ? 'selectedDataTab' : ''
              }`}
              onClick={() => changeDataTabs(4)}
            >
              <i class="fa-solid fa-bookmark"></i>&nbsp;&nbsp; Favorites
            </div>
          </div>
          <div className="docTabData">
            {props.extractor.textDataTab === 1 &&
            props.singleDocument.singleDocumentStatus === 'Processed' ? (
              <KeyValueDocData />
            ) : props.extractor.textDataTab === 2 &&
              props.singleDocument.singleDocumentStatus === 'Processed' ? (
              <TableDocData />
            ) : props.extractor.textDataTab === 3 &&
              props.singleDocument.singleDocumentStatus === 'Processed' ? (
              <RawDocData />
            ) : props.extractor.textDataTab === 4 &&
              props.singleDocument.singleDocumentStatus === 'Processed' ? (
              <Favourites />
            ) : (
              <div className="dataNotExt">
                {props.themeLang.languageWords.Data_Not_Extracted}
              </div>
            )}
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
    user: state.user,
    documents: state.documents,
    singleDocument: state.singleDocument,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(TextExtraction);

// export default TextExtraction;
