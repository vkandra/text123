import './AWSRemoteSt2ndPage.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  setAllAWSFoldersAndMappings,
  setBulkUploadPage,
} from '../../actions/extractor';
import axios from 'axios';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import { MoonLoader } from 'react-spinners';

const AWSRemoteSt2ndPage = (props) => {
  const [folderNtemplate, setFolderNtemplate] = useState({
    folderName: '',
    subFolderName: '',
    template: {},
  });
  const [allSubFolders, setAllSubFolders] = useState([]);
  const [currentAWS, setCurrentAWS] = useState('');

  useEffect(() => {
    getSingleAWSDetailsAPI();

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

  const getSingleAWSDetailsAPI = () => {
    let data = {
      user_id: props.user.token,
      ...props.extractor.bulkUploadPage.data,
    };
    console.log(data);
    axios
      .post(`https://cytext.azure-api.net/aws/list_s3_folders`, data)
      .then(function (response) {
        console.log(response.data);
        // setFolderNtemplate({
        //   ...folderNtemplate,
        //   folderName: response.data.aws_s3_folders[0],
        // });
        props.dispatch(setAllAWSFoldersAndMappings(response.data));
        // if (allSubFolders.length === 0) {
        //   getAWSAllSubFoldersAPI(response.data.aws_s3_folders[0]);
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAWSAllSubFoldersAPI = (folderName) => {
    const data = {
      user_id: props.user.token,
      container_name: folderName,
      ...props.extractor.bulkUploadPage.data,
    };
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.awswebsites.net/api/source_aws_container_hierarchy`,
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
      setAllAWSFoldersAndMappings({
        connection_name: '',
        connection_type: '',
        mapped_folders: [],
        aws_s3_folders: [],
      })
    );
  };

  const addFolderToCopy = () => {
    let folder_name_selected = folderNtemplate.folderName;
    // let sub_folder_name_selected = folderNtemplate.subFolderName;
    let template_details_selected = { ...folderNtemplate.template };
    if (folderNtemplate.folderName === '') {
      folder_name_selected =
        props.extractor.allAWSFoldersAndMappings.aws_s3_folders[0];
      setFolderNtemplate({
        ...folderNtemplate,
        folderName: props.extractor.allAWSFoldersAndMappings.aws_s3_folders[0],
      });
    }
    // if (folderNtemplate.subFolderName === '') {
    //   if (allSubFolders.length !== 0) {
    //     sub_folder_name_selected = allSubFolders[0];
    //     setFolderNtemplate({
    //       ...folderNtemplate,
    //       subfolderName: allSubFolders[0],
    //     });
    //   }
    // }
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
      'singleInsAWSFolderSelect'
    ).value;
    // sub_folder_name_selected = document.getElementById(
    //   'singleInsAWSSubFolderSelect'
    // ).value;
    let template_num = document.getElementById(
      'singleInsAWSTemplateSelect'
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
      selected_items: folder_name_selected,
      //   selected_items: sub_folder_name_selected,
      ...template_details_selected,
    };
    console.log(data);

    setCurrentAWS('Copying... Please wait');
    axios
      .post(`https://cytext.azure-api.net/aws/copy_s3_folder`, data)
      .then(function (response) {
        console.log(response.data);
        setCurrentAWS(response.data.status);
        getSingleAWSDetailsAPI();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentAWS('Error!');
        getSingleAWSDetailsAPI();
      });
  };

  const resetDropDowns = () => {
    setCurrentAWS('');
    // document.getElementById('singleInsAWSFolderSelect').value =
    //   props.extractor.allAWSFoldersAndMappings.aws_s3_folders[0];
    // document.getElementById('singleInsAWSSubFolderSelect').value =
    //   allSubFolders[0];
  };

  console.log(folderNtemplate);

  return (
    <div className="awsRemoteSt2ndPage">
      {/* AWS Folder Modal Begins */}
      <div
        className="modal fade custom-modal-AWS"
        id="AddNewAWS2Modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="AddNewAWS2ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddNewAWS2ModalLabel">
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
              <div className="leftSectionModalAddNewAWS">Select Folder</div>
              <select
                name="folders"
                id="singleInsAWSFolderSelect"
                // onChange={fetchTemplateFiles}
                onChange={(event) => {
                  // console.log(event.target.selectedIndex);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedFolder =
                    props.extractor.allAWSFoldersAndMappings.aws_s3_folders[
                      selectedIndex
                    ];
                  //   fetchTemplateFiles(selectedTemplateDetail);
                  setFolderNtemplate({
                    ...folderNtemplate,
                    folderName: selectedFolder,
                  });
                  //   getAWSAllSubFoldersAPI(selectedFolder);
                }}
              >
                <optgroup label="Select Folder">
                  {props.extractor.allAWSFoldersAndMappings.aws_s3_folders.map(
                    (singleFolder, index) => (
                      <option key={index} value={singleFolder}>
                        {singleFolder}
                      </option>
                    )
                  )}
                </optgroup>
              </select>
              <hr></hr>

              {/* <div className="leftSectionModalAddNewAWS">Select Folder</div>
              <select
                name="folders"
                id="singleInsAWSSubFolderSelect"
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
              <hr></hr> */}

              <div className="leftSectionModalAddNewAWS">Select Template</div>
              <div>
                <select
                  name="templates"
                  id="singleInsAWSTemplateSelect"
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
              {currentAWS !== '' ? (
                <div id="currentAWS2status">&nbsp;{currentAWS}&nbsp;</div>
              ) : null}
              {currentAWS === '' && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addFolderToCopy}
                >
                  Start Copy
                </button>
              )}

              {currentAWS === 'Copying... Please wait' && (
                <div id="spinnerAWS2addNew">
                  <MoonLoader color="#0D6EFD" size={15} />
                </div>
              )}

              {currentAWS !== '' && currentAWS !== 'Copying... Please wait' && (
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
      {/* AWS Folder Modal Ends */}
      <div className="aws2ndPageContainer">
        <div id="aws2Container1">
          <div id="awsSecondPageHeader">
            <div
              onClick={navigateBackToFirstPage}
              id="awsSecondPageBackToTemplates1"
            >
              <i class="fa-solid fa-circle-left"></i>
            </div>
            <div className="awsSecondPageLabel1">
              &nbsp;&nbsp;AWS Name:&nbsp;
              <span className="awsSecondPageLabelAns1">
                {props.extractor.bulkUploadPage.data.connection_name}
              </span>
              &nbsp;&nbsp;
            </div>

            <div
              onClick={navigateBackToFirstPage}
              id="awsSecondPageBackToTemplates2"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div id="awsSecPgContainer">
            <div id="addAWS2TopSection">
              <div id="AWS2MiddleSection">
                <div
                  className="addNewAWS2Button"
                  data-toggle="modal"
                  data-target="#AddNewAWS2Modal"
                >
                  <div className="addNewAWS2icon">
                    <i className="fa-solid fa-circle-plus"></i>
                  </div>
                  <div className="addNewAWS2Label">Add New Folder</div>
                </div>
              </div>
              <div className="refreshIcDiv" onClick={getSingleAWSDetailsAPI}>
                <i className="fi fi-rr-refresh"></i>
              </div>
            </div>
          </div>
          <div id="addAWS2MiddleSection">
            <table id="aws2AllDetailsTable">
              <thead>
                <tr>
                  <th className="aws2AllDetailsCellHead">Folder Name</th>
                  <th className="aws2AllDetailsCellHead">Template Name</th>
                  <th className="aws2AllDetailsCellHead">Status</th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allAWSFoldersAndMappings.mapped_folders.map(
                  (rowData, index) => (
                    <tr key={index} className="aws2AllDetailsRow">
                      <td className="aws2AllDetailsCell">
                        {rowData.folder_name}
                      </td>
                      <td className="aws2AllDetailsCell">
                        {rowData.template_name}
                      </td>
                      <td
                        className="aws2AllDetailsCell aws2AllDetailsCellStatus"
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

export default connect(mapStateToProps)(AWSRemoteSt2ndPage);

// export default AWSRemoteSt2ndPage;
