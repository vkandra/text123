import './AzureRemoteSt2ndPage.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  setAllAzureFoldersAndMappings,
  setBulkUploadPage,
} from '../../actions/extractor';
import axios from 'axios';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import { MoonLoader } from 'react-spinners';

const AzureRemoteSt2ndPage = (props) => {
  const [folderNtemplate, setFolderNtemplate] = useState({
    folderName: '',
    subFolderName: '',
    template: {},
  });
  const [allSubFolders, setAllSubFolders] = useState([]);
  const [currentAzure, setCurrentAzure] = useState('');

  useEffect(() => {
    getSingleAzureDetailsAPI();

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

  const getSingleAzureDetailsAPI = () => {
    let data = {
      user_id: props.user.token,
      ...props.extractor.bulkUploadPage.data,
    };
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/source_azure_list_containers_metadata`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        // setFolderNtemplate({
        //   ...folderNtemplate,
        //   folderName: response.data.container_list[0],
        // });
        props.dispatch(setAllAzureFoldersAndMappings(response.data));
        if (allSubFolders.length === 0) {
          getAzureAllSubFoldersAPI(response.data.container_list[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAzureAllSubFoldersAPI = (folderName) => {
    const data = {
      user_id: props.user.token,
      container_name: folderName,
      ...props.extractor.bulkUploadPage.data,
    };
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/source_azure_container_hierarchy`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        setFolderNtemplate({
          ...folderNtemplate,
          subFolderName: response.data.folders_list[0],
        });
        setAllSubFolders(response.data.folders_list);
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
    props.dispatch(
      setAllAzureFoldersAndMappings({
        connection_name: '',
        connection_type: '',
        mapped_folders: [],
        container_list: [],
      })
    );
  };

  const addFolderToCopy = () => {
    let folder_name_selected = folderNtemplate.folderName;
    let sub_folder_name_selected = folderNtemplate.subFolderName;
    let template_details_selected = { ...folderNtemplate.template };
    if (folderNtemplate.folderName === '') {
      folder_name_selected =
        props.extractor.allAzureFoldersAndMappings.container_list[0];
      setFolderNtemplate({
        ...folderNtemplate,
        folderName:
          props.extractor.allAzureFoldersAndMappings.container_list[0],
      });
    }
    if (folderNtemplate.subFolderName === '') {
      if (allSubFolders.length !== 0) {
        sub_folder_name_selected = allSubFolders[0];
        setFolderNtemplate({
          ...folderNtemplate,
          subfolderName: allSubFolders[0],
        });
      }
    }
    if (Object.keys(template_details_selected).length === 0) {
      template_details_selected = {
        ...props.singleDocument.saveSubTempDetails[0],
      };
      setFolderNtemplate({
        ...folderNtemplate,
        template: { ...props.singleDocument.saveSubTempDetails[0] },
      });
    }
    folder_name_selected = document.getElementById(
      'singleInsAzureFolderSelect'
    ).value;
    sub_folder_name_selected = document.getElementById(
      'singleInsAzureSubFolderSelect'
    ).value;
    let template_num = document.getElementById(
      'singleInsAzureTemplateSelect'
    ).value;
    for (let i = 0; i < props.singleDocument.saveSubTempDetails.length; i++) {
      if (
        props.singleDocument.saveSubTempDetails[i].sub_template_id ===
        template_num
      ) {
        template_details_selected = {
          ...props.singleDocument.saveSubTempDetails[i],
        };
        break;
      }
    }
    console.log(template_num);
    let data = {
      user_id: props.user.token,
      ...props.extractor.bulkUploadPage.data,
      container_name: folder_name_selected,
      selected_items: sub_folder_name_selected,
      ...template_details_selected,
    };
    console.log(data);

    setCurrentAzure('Copying... Please wait');
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/source_azure_copy_notprocessed`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentAzure(response.data.status);
        getSingleAzureDetailsAPI();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentAzure('Error!');
        getSingleAzureDetailsAPI();
      });
  };

  const resetDropDowns = () => {
    setCurrentAzure('');
    // document.getElementById('singleInsAzureFolderSelect').value =
    //   props.extractor.allAzureFoldersAndMappings.container_list[0];
    // document.getElementById('singleInsAzureSubFolderSelect').value =
    //   allSubFolders[0];
  };

  console.log(folderNtemplate);

  return (
    <div className="azureRemoteSt2ndPage">
      {/* Azure Folder Modal Begins */}
      <div
        className="modal fade custom-modal-Azure"
        id="AddNewAzure2Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="AddNewAzure2ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddNewAzure2ModalLabel">
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
              <div className="leftSectionModalAddNewAzure">
                Select Container
              </div>
              <select
                name="folders"
                id="singleInsAzureFolderSelect"
                // onChange={fetchTemplateFiles}
                onChange={(event) => {
                  // console.log(event.target.selectedIndex);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedFolder =
                    props.extractor.allAzureFoldersAndMappings.container_list[
                      selectedIndex
                    ];
                  //   fetchTemplateFiles(selectedTemplateDetail);
                  setFolderNtemplate({
                    ...folderNtemplate,
                    folderName: selectedFolder,
                  });
                  getAzureAllSubFoldersAPI(selectedFolder);
                }}
              >
                <optgroup label="Select Folder">
                  {props.extractor.allAzureFoldersAndMappings.container_list.map(
                    (singleFolder, index) => (
                      <option key={index} value={singleFolder}>
                        {singleFolder}
                      </option>
                    )
                  )}
                </optgroup>
              </select>
              <hr></hr>

              <div className="leftSectionModalAddNewAzure">Select Folder</div>
              <select
                name="folders"
                id="singleInsAzureSubFolderSelect"
                // onChange={fetchTemplateFiles}
                onChange={(event) => {
                  // console.log(event.target.selectedIndex);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedFolder = allSubFolders[selectedIndex];
                  //   fetchTemplateFiles(selectedTemplateDetail);
                  setFolderNtemplate({
                    ...folderNtemplate,
                    subFolderName: selectedFolder,
                  });
                }}
              >
                <optgroup label="Select Folder">
                  {allSubFolders.map((singleFolder, index) => (
                    <option key={index} value={singleFolder}>
                      {singleFolder}
                    </option>
                  ))}
                </optgroup>
              </select>
              <hr></hr>

              <div className="leftSectionModalAddNewAzure">Select Template</div>
              <div>
                <select
                  name="templates"
                  id="singleInsAzureTemplateSelect"
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
                          value={singletemplate.sub_template_id}
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
              {currentAzure !== '' ? (
                <div id="currentAzure2status">&nbsp;{currentAzure}&nbsp;</div>
              ) : null}
              {currentAzure === '' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addFolderToCopy}
                >
                  Start Copy
                </button>
              )}

              {currentAzure === 'Copying... Please wait' && (
                <div id="spinnerAzure2addNew">
                  <MoonLoader color="#0D6EFD" size={15} />
                </div>
              )}

              {currentAzure !== '' &&
                currentAzure !== 'Copying... Please wait' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetDropDowns}
                  >
                    Ok
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* Azure Folder Modal Ends */}
      <div className="azure2ndPageContainer">
        <div id="azure2Container1">
          <div id="azureSecondPageHeader">
            <div
              onClick={navigateBackToFirstPage}
              id="azureSecondPageBackToTemplates1"
            >
              <i class="fa-solid fa-circle-left"></i>
            </div>
            <div className="azureSecondPageLabel1">
              &nbsp;&nbsp;Azure Name:&nbsp;
              <span className="azureSecondPageLabelAns1">
                {props.extractor.bulkUploadPage.data.connection_name}
              </span>
              &nbsp;&nbsp;
            </div>

            <div
              onClick={navigateBackToFirstPage}
              id="azureSecondPageBackToTemplates2"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div id="azureSecPgContainer">
            <div id="addAzure2TopSection">
              <div id="Azure2MiddleSection">
                <div
                  className="addNewAzure2Button"
                  data-toggle="modal"
                  data-target="#AddNewAzure2Modal"
                >
                  <div className="addNewAzure2icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  <div className="addNewAzure2Label">Add New Folder</div>
                </div>
              </div>
              <div className="refreshIcDiv" onClick={getSingleAzureDetailsAPI}>
                <i className="fi fi-rr-refresh"></i>
              </div>
            </div>
          </div>
          <div id="addAzure2MiddleSection">
            <table id="azure2AllDetailsTable">
              <thead>
                <tr>
                  <th className="azure2AllDetailsCellHead">Folder Name</th>
                  <th className="azure2AllDetailsCellHead">Template Name</th>
                  <th className="azure2AllDetailsCellHead">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allAzureFoldersAndMappings.mapped_folders.map(
                  (rowData, index) => (
                    <tr key={index} className="azure2AllDetailsRow">
                      <td className="azure2AllDetailsCell">
                        {rowData.folder_name}
                      </td>
                      <td className="azure2AllDetailsCell">
                        {rowData.template_name}
                      </td>
                      <td
                        className="azure2AllDetailsCell azure2AllDetailsCellStatus"
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

export default connect(mapStateToProps)(AzureRemoteSt2ndPage);

// export default AzureRemoteSt2ndPage;
