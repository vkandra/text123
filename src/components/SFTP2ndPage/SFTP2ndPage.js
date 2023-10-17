import './SFTP2ndPage.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  setAllFoldersAndMappings,
  setBulkUploadPage,
} from '../../actions/extractor';
import axios from 'axios';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import { MoonLoader } from 'react-spinners';

const SFTP2ndPage = (props) => {
  const [folderNtemplate, setFolderNtemplate] = useState({
    folderName: '',
    template: {},
  });
  const [currentSFTP, setCurrentSFTP] = useState('');
  useEffect(() => {
    getSingleSftpDetailsAPI();

    let reqBody = {
      user_id: props.user.token,
      main_template: 'Bills',
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(reqBody));
    setTimeout(() => {
      if (props.singleDocument.saveSubTempDetails.length > 0) {
        setFolderNtemplate({
          ...folderNtemplate,
          template: { ...props.singleDocument.saveSubTempDetails[0] },
        });
      }
    }, 5000);
  }, []);

  //   console.log(folderNtemplate);
  const getSingleSftpDetailsAPI = () => {
    let data = {
      user_id: props.user.token,
      ...props.extractor.bulkUploadPage.data,
    };
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/sftpconfigure`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        setFolderNtemplate({
          ...folderNtemplate,
          folderName: response.data.all_folders[0],
        });
        // props.dispatch(setAllFoldersAndMappings(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigateBackToFirstPage = () => {
    const param = {
      page: 1,
      data: {},
    };
    props.dispatch(setBulkUploadPage(param));
  };

  const addFolderToCopy = () => {
    let data = {
      user_id: props.user.token,
      ...props.extractor.bulkUploadPage.data,
      folder_path: folderNtemplate.folderName,
      ...folderNtemplate.template,
    };
    console.log(data);
    setCurrentSFTP('Copying... Please wait');
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/sftp_connection_check`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentSFTP(response.data.status);
        let obj1 = {
          user_id: props.user.token,
          ...props.extractor.bulkUploadPage.data,
        };
        getSingleSftpDetailsAPI();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentSFTP('Error!');
        let obj1 = {
          user_id: props.user.token,
          ...props.extractor.bulkUploadPage.data,
        };
        getSingleSftpDetailsAPI(obj1);
      });
  };

  return (
    <div className="sftp2ndPage">
      {/* SFTP Folder Modal Begins */}
      <div
        className="modal fade custom-modal-SFTP"
        id="AddNewSFTP2Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="AddNewSFTP2ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddNewSFTP2ModalLabel">
                Add New Folder
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="leftSectionModalAddNewSFTP">Select Folder</div>
              <select
                name="templates"
                id="singleInsTemplateSelect"
                // onChange={fetchTemplateFiles}
                onChange={(event) => {
                  // console.log(event.target.selectedIndex);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedFolder =
                    props.extractor.allFoldersAndMappings.all_folders[
                      selectedIndex
                    ];
                  //   fetchTemplateFiles(selectedTemplateDetail);
                  setFolderNtemplate({
                    ...folderNtemplate,
                    folderName: selectedFolder,
                  });
                }}
              >
                <optgroup label="Select Folder">
                  {props.extractor.allFoldersAndMappings.all_folders.map(
                    (singleFolder, index) => (
                      <option key={index} value={singleFolder}>
                        {singleFolder}
                      </option>
                    )
                  )}
                </optgroup>
              </select>
              <hr></hr>
              <div className="leftSectionModalAddNewSFTP">Select Template</div>
              <div>
                <select
                  name="templates"
                  id="singleInsTemplateSelect"
                  // onChange={fetchTemplateFiles}
                  onChange={(event) => {
                    // console.log(event.target.selectedIndex);
                    const selectedIndex = event.target.selectedIndex;
                    const selectedTemplateDetail =
                      props.singleDocument.saveSubTempDetails[selectedIndex];
                    //   fetchTemplateFiles(selectedTemplateDetail);
                    setFolderNtemplate({
                      ...folderNtemplate,
                      template: selectedTemplateDetail,
                    });
                  }}
                >
                  <optgroup label="Select Template">
                    {props.singleDocument.saveSubTempDetails.map(
                      (singletemplate, index) => (
                        <option
                          key={singletemplate.sub_template_id}
                          singletemplate={singletemplate}
                          value={singletemplate.sub_template_name}
                        >
                          {singletemplate.sub_template_name}
                        </option>
                      )
                    )}
                  </optgroup>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {currentSFTP !== '' ? (
                <div id="currentSFTP2status">&nbsp;{currentSFTP}&nbsp;</div>
              ) : null}
              {currentSFTP === '' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addFolderToCopy}
                >
                  Start Copy
                </button>
              )}

              {currentSFTP === 'Copying... Please wait' && (
                <div id="spinnerSFTP2addNew">
                  <MoonLoader color="#0D6EFD" size={15} />
                </div>
              )}

              {currentSFTP !== '' &&
                currentSFTP !== 'Copying... Please wait' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setCurrentSFTP('')}
                  >
                    Ok
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* SFTP Folder Modal Ends */}
      <div className="sftp2ndPageContainer">
        <div id="sftp2Container1">
          <div id="sftpSecondPageHeader">
            <div
              onClick={navigateBackToFirstPage}
              id="sftpSecondPageBackToTemplates1"
            >
              <i class="fa-solid fa-circle-left"></i>
            </div>
            <div className="sftpSecondPageLabel1">
              &nbsp;&nbsp;SFTP Name:&nbsp;
              <span className="sftpSecondPageLabelAns1">
                {props.extractor.bulkUploadPage.data.SftpName}
              </span>
              &nbsp;&nbsp;
            </div>

            <div
              onClick={navigateBackToFirstPage}
              id="sftpSecondPageBackToTemplates2"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div id="sftpSecPgContainer">
            <div id="addSFTP2TopSection">
              <div id="SFTP2MiddleSection">
                <div
                  className="addNewSFTP2Button"
                  data-toggle="modal"
                  data-target="#AddNewSFTP2Modal"
                >
                  <div className="addNewSFTP2icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  <div className="addNewSFTP2Label">Add New Folder</div>
                </div>
              </div>
              <div className="refreshIcDiv" onClick={getSingleSftpDetailsAPI}>
                <i className="fi fi-rr-refresh"></i>
              </div>
            </div>
          </div>
          <div id="addSFTP2MiddleSection">
            <table id="sftp2AllDetailsTable">
              <thead>
                <tr>
                  <th className="sftp2AllDetailsCellHead">Folder Name</th>
                  <th className="sftp2AllDetailsCellHead">Template Name</th>
                  <th className="sftp2AllDetailsCellHead">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allFoldersAndMappings.mapped_folders.map(
                  (rowData, index) => (
                    <tr key={index} className="sftp2AllDetailsRow">
                      <td className="sftp2AllDetailsCell">
                        {rowData.folder_name}
                      </td>
                      <td className="sftp2AllDetailsCell">
                        {rowData.template_name}
                      </td>
                      <td
                        className="sftp2AllDetailsCell sftp2AllDetailsCellStatus"
                        style={
                          rowData.status === 'Successful'
                            ? { color: 'green', fontWeight: '500' }
                            : rowData.status === 'Not Successful'
                            ? { color: 'red', fontWeight: '500' }
                            : null
                        }
                      >
                        {rowData.status}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    extractor: state.extractor,
    documents: state.documents,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(SFTP2ndPage);

// export default SFTP2ndPage;
