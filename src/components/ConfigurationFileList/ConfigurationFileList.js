import './ConfigurationFileList.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import squareCheck from '../../Pictures/square-check-solid.svg';
import squareBlank from '../../Pictures/square-regular.svg';
import squareMinus from '../../Pictures/square-minus-solid.svg';

import {
  changeTabOperation,
  handleProcessedFileTabChange,
} from '../../actions/extractor';
import {
  assignSelectedDocDetails,
  dropdownSelected,
} from '../../actions/singleDocument';
import ConfigurationFile from '../ConfigurationFile/ConfigurationFile';
import {
  fetchRawDocumentsDetailsAPI,
  clearSelectedFiles,
  startExtractionProcessAPI,
  stopExtractionProcessAPI,
  deleteFilesDataAPI,
  selectDocumentsConfiguration,
  unselectDocumentsConfiguration,
  sortByData,
} from '../../actions/documents';
import { setUserPreferences } from '../../actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const ConfigurationFileList = (props) => {
  const [searching, setSearching] = useState(false);
  const [searchProcessedArray, setSearchProcessedArray] = useState([]);
  const [searchNotProcessedArray, setSearchNotProcessedArray] = useState([]);
  // let searchProcessedArray = [];
  // let searchNotProcessedArray = [];
  useEffect(() => {
    if (
      props.documents.filteredFilelistProcessed.length > 1 ||
      props.documents.filteredFilelistNotProcessed.length > 1
    ) {
      const { user } = props;
      // console.log(
      //   user.preferences[2].sort[0].value,
      //   user.preferences[2].sort[1].asDs
      // );
      document.getElementById('sortValue').value =
        user.preferences[2].sort[0].value;
      document.getElementById('sortAsDs').value =
        user.preferences[2].sort[1].asDs;
      // performSorting();
    }
  }, [props.documents.totalDocuments]);

  // useEffect(() => {
  //   const { user } = props;
  //   console.log(
  //     user.preferences[2].sort[0].value,
  //     user.preferences[2].sort[1].asDs
  //   );
  //   document.getElementById('sortValue').value =
  //     user.preferences[2].sort[0].value;
  //   document.getElementById('sortAsDs').value =
  //     user.preferences[2].sort[1].asDs;

  //     performSorting();
  // }, []);

  // console.log(props.documents.filteredFilelistProcessed.length);

  const selectAllDocuments = (allDocs) => {
    var selectedDocs = [];
    for (var i = 0; i < allDocs.length; i++) {
      selectedDocs.push(allDocs[i].documentId);
      const { documents } = props;
      documents.selectedDocuments = selectedDocs;
      props.dispatch(selectDocumentsConfiguration(documents));
    }
  };

  const unselectAllDocuments = () => {
    const { documents } = props;
    documents.selectedDocuments = [];
    props.dispatch(unselectDocumentsConfiguration(documents));
  };

  const startExtractionProcess = () => {
    var docNames = [];
    var docIds = [];
    var docTemplate = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }

    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          docDetails[i].documentStatus === 'Not Processed'
        ) {
          docNames.push(docDetails[i].ducumentName);
          docIds.push(docDetails[i].documentId);
          docTemplate.push(docDetails[i].template_name);
        }
      }
    }
    // console.log(docNames);
    let data = [];
    if (docNames.length === 0) {
      return;
    } else {
      for (let i = 0; i < docIds.length; i++) {
        data.push({
          user_id: props.user.token,
          doc_id: docIds[i],
          doc_name: docNames[i],
          doc_template: docTemplate[i],
        });
      }
      let dataStart = {
        input: { detail: { items: data } },
        // stateMachineArn:
        // 'arn:aws:states:ap-south-1:565442373753:stateMachine:Textract_State_Machine',
      };
      // console.log(dataStart);
      // console.log(props.documents.filteredFilelistNotProcessed);
      props.dispatch(startExtractionProcessAPI(dataStart));
      setTimeout(() => {
        props.dispatch(
          fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
        );
      }, 2000);
    }
  };

  const stopExtractionProcess = () => {
    var docArn = [];
    let docIds = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }
    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          (docDetails[i].documentStatus === 'Queued' ||
            docDetails[i].documentStatus === 'Processing')
        ) {
          docArn.push(docDetails[i].step_fun_execution_id);
          docIds.push(docDetails[i].documentId);
        }
      }
    }
    console.log(docDetails);
    let data = {};
    if (docArn.length === 0) {
      return;
    } else {
      data = {
        stop: 'Stop the pipeline',
        arn: docArn[0],
        doc_id: docIds,
        user_id: props.user.token,
        user_preferences: props.user.preferences,
      };

      props.dispatch(stopExtractionProcessAPI(data));
      setTimeout(() => {
        props.dispatch(
          fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
        );
      }, 2000);
    }
  };

  const deleteFilesProcess = () => {
    var docNames = [];
    var docStatus = [];
    var docIds = [];
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails;
    if (props.extractor.processedFileTab === 1) {
      docDetails = props.documents.filteredFilelistNotProcessed;
    } else {
      docDetails = props.documents.filteredFilelistProcessed;
    }

    // console.log(props.documents.filteredFilelist);
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (
          docDetails[i].documentId === selectedPageIds[j] &&
          (docDetails[i].documentStatus === 'Not Processed' ||
            docDetails[i].documentStatus === 'Processed')
        ) {
          docNames.push(docDetails[i].ducumentName);
          docStatus.push(docDetails[i].documentStatus);
          docIds.push(docDetails[i].documentId);
        }
      }
    }
    let assembledData = {};
    let data = [];
    // console.log(docNames);
    if (docNames.length === 0) {
      return;
    } else {
      for (let i = 0; i < docStatus.length; i++) {
        data.push({
          doc_status: docStatus[i],

          user_id: props.user.token,

          doc_id: docIds[i],

          doc_name: docNames[i],
        });
      }
      assembledData = { delete_input: data };
    }
    // console.log(assembledData.user_id);
    // console.log(props.documents.filteredFilelistNotProcessed);
    props.dispatch(deleteFilesDataAPI(assembledData));
    setTimeout(() => {
      props.dispatch(
        fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
      );
    }, 4000);
  };

  const changeToTextExtractionTab = () => {
    const { extractor } = props;
    extractor.page = 2;
    var selectedPageIds = props.documents.selectedDocuments;
    var docDetails = props.documents.documentDetails;
    var selectedDocDetails = [];
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (docDetails[i].documentId === selectedPageIds[j]) {
          selectedDocDetails.push(docDetails[i]);
        }
      }
    }
    props.dispatch(assignSelectedDocDetails(selectedDocDetails));

    props.dispatch(dropdownSelected(0));

    props.dispatch(changeTabOperation(extractor));
  };

  const handleProcessedFileTab = (num) => {
    const { extractor } = props;
    if (num === extractor.processedFileTab) {
      return;
    }
    extractor.processedFileTab = num;
    props.dispatch(handleProcessedFileTabChange(extractor));

    props.dispatch(clearSelectedFiles());
    // console.log(props.documents.documentDetails);
  };

  const refreshComp = () => {
    props.dispatch(
      fetchRawDocumentsDetailsAPI(props.user.token, props.user.preferences)
    );
  };

  const performSorting = () => {
    const sortByValue = parseInt(document.getElementById('sortValue').value);
    const sortByAsDs = document.getElementById('sortAsDs').value;
    // console.log(sortByValue);
    // console.log(sortByAsDs);

    const { documents } = props;
    const { user } = props;

    user.preferences[2].sort[0].value = sortByValue;
    user.preferences[2].sort[1].asDs = sortByAsDs;

    props.dispatch(setUserPreferences(user));

    // let docDetails1 = documents.filteredFilelistNotProcessed;
    // let docDetails2 = documents.filteredFilelistProcessed;

    // console.log(
    //   documents.filteredFilelistNotProcessed.length,
    //   documents.filteredFilelistProcessed.length
    // );

    const valueArray = props.user.preferences[3];
    // console.log(docDetails);
    // console.log(documents.filteredFilelistNotProcessed);
    // console.log(documents.filteredFilelistNotProcessed);

    if (documents.filteredFilelistNotProcessed.length > 1) {
      if (sortByValue === 3) {
        if (sortByAsDs === 'Asc.') {
          documents.filteredFilelistNotProcessed.sort(function (a, b) {
            return (
              Date.parse(a[valueArray[sortByValue]]) -
              Date.parse(b[valueArray[sortByValue]])
            );
          });
        } else {
          documents.filteredFilelistNotProcessed.sort(function (a, b) {
            return (
              Date.parse(b[valueArray[sortByValue]]) -
              Date.parse(a[valueArray[sortByValue]])
            );
          });
        }
      } else {
        if (sortByAsDs === 'Asc.') {
          documents.filteredFilelistNotProcessed.sort((a, b) =>
            a[valueArray[sortByValue]].localeCompare(b[valueArray[sortByValue]])
          );
        } else {
          documents.filteredFilelistNotProcessed.sort((a, b) =>
            b[valueArray[sortByValue]].localeCompare(a[valueArray[sortByValue]])
          );
        }
      }
    }

    if (documents.filteredFilelistProcessed.length > 1) {
      if (sortByValue === 3) {
        if (sortByAsDs === 'Asc.') {
          documents.filteredFilelistProcessed.sort(function (a, b) {
            return (
              Date.parse(a[valueArray[sortByValue]]) -
              Date.parse(b[valueArray[sortByValue]])
            );
          });
        } else {
          documents.filteredFilelistProcessed.sort(function (a, b) {
            return (
              Date.parse(b[valueArray[sortByValue]]) -
              Date.parse(a[valueArray[sortByValue]])
            );
          });
        }
      } else {
        if (sortByAsDs === 'Asc.') {
          documents.filteredFilelistProcessed.sort((a, b) =>
            a[valueArray[sortByValue]].localeCompare(b[valueArray[sortByValue]])
          );
        } else {
          documents.filteredFilelistProcessed.sort((a, b) =>
            b[valueArray[sortByValue]].localeCompare(a[valueArray[sortByValue]])
          );
        }
      }
    }

    // console.log(
    //   props.documents.filteredFilelistNotProcessed,
    //   props.documents.filteredFilelistProcessed
    // );
    // console.log(docDetails);
    props.dispatch(sortByData(documents));
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      setSearching(true);
    } else {
      setSearching(false);
    }
    const textToSearch = e.target.value;
    const { documents } = props;
    let searchNtPrArray = [];
    let searchPrArray = [];
    for (let i in documents.filteredFilelistNotProcessed) {
      if (
        documents.filteredFilelistNotProcessed[i].ducumentName
          .toLowerCase()
          .includes(textToSearch.toLowerCase())
      ) {
        searchNtPrArray.push(documents.filteredFilelistNotProcessed[i]);
      }
    }
    for (let i in documents.filteredFilelistProcessed) {
      if (
        documents.filteredFilelistProcessed[i].ducumentName
          .toLowerCase()
          .includes(textToSearch.toLowerCase())
      ) {
        searchPrArray.push(documents.filteredFilelistProcessed[i]);
      }
    }
    setSearchNotProcessedArray(searchNtPrArray);
    setSearchProcessedArray(searchPrArray);
    console.log(searchProcessedArray);
    // console.log(props.extractor.processedFileTab);
  };
  const clearSearchText = (e) => {
    document.getElementById('searchName').value = null;
    setSearching(false);
    setSearchProcessedArray([]);
    setSearchNotProcessedArray([]);
  };

  return (
    <div className="configurationFileList">
      <div className="refreshIc">
        <div className="searchGroup">
          <input
            type="text"
            id="searchName"
            placeholder="Search Document Name"
            onChange={handleChange}
          ></input>
          <div id="clearSearchField" onClick={clearSearchText}>
            {searching ? (
              <FontAwesomeIcon icon={faCircleXmark} id="searchIc" />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} id="searchIc" />
            )}
          </div>
        </div>
        <div className="sortGroup">
          <div className="sortDiv">
            <span>Sort By : </span>
            <select
              id="sortValue"
              className="sortSelect"
              onChange={performSorting}
            >
              <option value={'0'}>Doc. Name</option>
              <option value={'1'}>Template</option>
              <option value={'2'}>Sub-Template</option>
              <option value={'3'}>Up. Date</option>
            </select>
            <select
              id="sortAsDs"
              className="sortSelectAdDs"
              onChange={performSorting}
            >
              <option>Asc.</option>
              <option>Desc.</option>
            </select>
          </div>
        </div>

        <div className="refreshIcDiv" onClick={refreshComp}>
          <i className="fi fi-rr-refresh"></i>
        </div>
      </div>
      <div className="proNotProButtons">
        <div
          className={`${
            props.extractor.processedFileTab === 1
              ? 'selectedSpecificButton'
              : ''
          }`}
          onClick={() => handleProcessedFileTab(1)}
        >
          <i className="fa-solid fa-hourglass notProcIc"></i>&nbsp;&nbsp;
          {props.themeLang.languageWords.Not_Processed}
        </div>
        <div
          className={`${
            props.extractor.processedFileTab === 2
              ? 'selectedSpecificButton'
              : ''
          }`}
          onClick={() => handleProcessedFileTab(2)}
        >
          <i className="fa-solid fa-check-double"></i>&nbsp;&nbsp;
          {props.themeLang.languageWords.Processed}
        </div>
      </div>

      <div className="configFlLstTableHeader">
        {props.extractor.processedFileTab === 1 &&
        props.documents.filteredFilelistNotProcessed.length ===
          props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            {/* {props.themeLang.languageWords.All_Selected} */}
            <img src={squareCheck} alt="ch" />
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.filteredFilelistProcessed.length ===
            props.documents.selectedDocuments.length ? (
          <button
            className="configFlLstTableHeaderUnSelectAll"
            onClick={() => unselectAllDocuments()}
          >
            {/* {props.themeLang.languageWords.All_Selected} */}
            <img src={squareCheck} alt="ch" />
          </button>
        ) : props.extractor.processedFileTab === 1 &&
          props.documents.selectedDocuments.length === 0 ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistNotProcessed)
            }
          >
            {/* {props.themeLang.languageWords.Select_All} */}
            <img src={squareBlank} alt="bl" />
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.selectedDocuments.length === 0 ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistProcessed)
            }
          >
            {/* {props.themeLang.languageWords.Select_All} */}
            <img src={squareBlank} alt="bl" />
          </button>
        ) : props.extractor.processedFileTab === 1 &&
          props.documents.filteredFilelistNotProcessed.length !==
            props.documents.selectedDocuments.length &&
          props.documents.selectedDocuments.length > 0 ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistNotProcessed)
            }
          >
            {/* {props.themeLang.languageWords.Select_All} */}
            <img src={squareMinus} alt="min" />
          </button>
        ) : props.extractor.processedFileTab === 2 &&
          props.documents.filteredFilelistProcessed.length !==
            props.documents.selectedDocuments.length &&
          props.documents.selectedDocuments.length > 0 ? (
          <button
            className="configFlLstTableHeaderSelectAll"
            onClick={() =>
              selectAllDocuments(props.documents.filteredFilelistProcessed)
            }
          >
            {/* {props.themeLang.languageWords.Select_All} */}
            <img src={squareMinus} alt="min" />
          </button>
        ) : null}
        <div className="configFlLstTableHeaderDocName">
          {/* {props.themeLang.languageWords.Doc_Name} */}
          Document Name
        </div>
        <div className="configFlLstTableHeaderDocId">
          {props.themeLang.languageWords.Template}
        </div>
        <div className="configFlLstTableHeaderSubtemplate">Sub-Template</div>
        <div className="configFlLstTableHeaderDocType">
          {/* {props.themeLang.languageWords.Doc_Type} */}
          Type
        </div>
        <div className="configFlLstTableHeaderUploadedOn">
          {props.themeLang.languageWords.Uploaded_On}
        </div>
        <div className="configFlLstTableHeaderDocStats">
          {props.themeLang.languageWords.Status}
        </div>
      </div>
      <hr className="tableHeadBodyLine"></hr>
      {props.extractor.processedFileTab === 1 &&
      props.documents.filteredFilelistNotProcessed.length === 0 ? (
        <div className="no-documents">
          {props.themeLang.languageWords.No_Documents_to_display}
        </div>
      ) : props.extractor.processedFileTab === 1 &&
        props.documents.filteredFilelistNotProcessed.length !== 0 ? (
        <div className="configFlLstTableBody">
          {!searching
            ? props.documents.filteredFilelistNotProcessed.map(
                (document, index) =>
                  index % 2 === 0 ? (
                    <ConfigurationFile
                      document={document}
                      key={document.documentId}
                      background={true}
                      index={index}
                    />
                  ) : (
                    <ConfigurationFile
                      document={document}
                      key={document.documentId}
                      background={false}
                      index={index}
                    />
                  )
                // <ConfigurationFile
                //   document={document}
                //   key={document.documentId}
                //   index={index}
                // />
              )
            : searchNotProcessedArray.map((document, index) => (
                <ConfigurationFile
                  document={document}
                  key={document.documentId}
                  index={index}
                />
              ))}
          {/* {} */}
        </div>
      ) : props.extractor.processedFileTab === 2 &&
        props.documents.filteredFilelistProcessed.length === 0 ? (
        <div className="no-documents">
          {props.themeLang.languageWords.No_Documents_to_display}
        </div>
      ) : props.extractor.processedFileTab === 2 &&
        props.documents.filteredFilelistProcessed.length !== 0 ? (
        <div className="configFlLstTableBody">
          {!searching
            ? props.documents.filteredFilelistProcessed.map((document, index) =>
                index % 2 === 0 ? (
                  <ConfigurationFile
                    document={document}
                    key={document.documentId}
                    background={true}
                    index={index}
                  />
                ) : (
                  <ConfigurationFile
                    document={document}
                    key={document.documentId}
                    background={false}
                    index={index}
                  />
                )
              )
            : searchProcessedArray.map((document, index) => (
                <ConfigurationFile
                  document={document}
                  key={document.documentId}
                  index={index}
                />
              ))}
        </div>
      ) : null}

      {props.documents.selectedDocuments.length !== 0 ? (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              className="startExtractionButton configurationFileListFourButtons"
              onClick={() => startExtractionProcess()}
            >
              <i className="fi fi-rr-play-alt"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Start}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          {/* <button
            className="startExtractionButton configurationFileListFourButtons"
            onClick={() => startExtractionProcess()}
          >
            Start
          </button> */}
          {props.extractor.processedFileTab === 1 ? (
            <button
              className="stopExtractionButton configurationFileListFourButtons"
              onClick={() => stopExtractionProcess()}
            >
              <i className="fi fi-rr-ban"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Stop}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button
            className="viewExtractedDataButton configurationFileListFourButtons"
            onClick={() => changeToTextExtractionTab()}
          >
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
          <button
            className="deleteExtractedFileButton configurationFileListFourButtons"
            onClick={() => deleteFilesProcess()}
          >
            <i className="fi fi-rr-trash"></i> &nbsp;{' '}
            {props.themeLang.languageWords.Delete}
          </button>
        </div>
      ) : (
        <div className="actionButtonsConfigure">
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i className="fi fi-rr-play-alt"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Start}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          {props.extractor.processedFileTab === 1 ? (
            <button
              disabled
              className="configurationFileListFourDisabledButtons"
            >
              <i className="fi fi-rr-ban"></i> &nbsp;{' '}
              {props.themeLang.languageWords.Stop}
            </button>
          ) : (
            <div className="emptyButtonDiv"></div>
          )}
          <button disabled className="configurationFileListFourDisabledButtons">
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
          <button disabled className="configurationFileListFourDisabledButtons">
            <i className="fi fi-rr-trash"></i> &nbsp;{' '}
            {props.themeLang.languageWords.Delete}
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    extractor: state.extractor,
    singleDocument: state.singleDocument,
    themeLang: state.themeLang,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ConfigurationFileList);

// export default ConfigurationFileList;
