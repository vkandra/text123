import './SFTP.css';
import React, { useState, useEffect } from 'react';
import { sftpAdddataAPI } from '../../actions/documents';
import { connect } from 'react-redux/es/exports';
import { MoonLoader } from 'react-spinners';

import {
  setSelectedMainTemplate,
  setSubtemplatesData,
  fetchTemplatesDataAPI,
} from '../../actions/user';
import axios from 'axios';
import {
  getAllSftpDetailsAPI,
  setBulkUploadPage,
} from '../../actions/extractor';
import SFTP2ndPage from '../SFTP2ndPage/SFTP2ndPage';

const SFTP = (props) => {
  const [newSftp, setNewSftp] = useState(false);
  const [currentSFTP, setCurrentSFTP] = useState('');

  useEffect(() => {
    let obj1 = { user_id: props.user.token };
    // fetchAllSftpDetails();
    // props.dispatch(fetchTemplatesDataAPI(obj1));

    // if (props.user.templatesData.user_id !== '') {
    //   if (props.user.selectedMainTemplate === '') {
    //     props.dispatch(
    //       setSelectedMainTemplate(
    //         props.user.templatesData.template_details[0].main_template_name
    //       )
    //     );
    //   }
    // }
  }, []);

  const addNewSFTP = () => {
    let SftpName = document.getElementById('sftpNameId').value;
    let SftpUrl = document.getElementById('sftpURLId').value;
    let hostname = document.getElementById('sftpHostnameId').value;
    let username = document.getElementById('sftpUsernameId').value;
    let password = document.getElementById('sftpPasswordId').value;
    // let user_id = document.getElementById('sftpUserIdId').value;

    let obj1 = {
      SftpName: SftpName,
      SftpUrl: SftpUrl,
      hostname: hostname,
      username: username,
      password: password,
      user_id: props.user.token,
    };

    // props.dispatch(sftpAdddataAPI(obj1));
    setCurrentSFTP('Checking... Please wait');
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/sftp_connection_check`,
        obj1
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentSFTP(response.data.status);
        fetchAllSftpDetails();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentSFTP('Error!');
        fetchAllSftpDetails();
      });
  };

  const clearAllSftpFormFields = () => {
    document.getElementById('sftpNameId').value = '';
    document.getElementById('sftpURLId').value = '';
    document.getElementById('sftpHostnameId').value = '';
    document.getElementById('sftpUsernameId').value = '';
    document.getElementById('sftpPasswordId').value = '';
    // document.getElementById('sftpUserIdId').value = '';

    setCurrentSFTP('');
  };

  const fetchAllSftpDetails = () => {
    let data = {};
    props.dispatch(getAllSftpDetailsAPI(data));
  };

  const viewSecondPage = (detail) => {
    const param = {
      page: 2,
      data: detail,
    };
    props.dispatch(setBulkUploadPage(param));
  };

  // console.log(currentSFTP);
  return (
    <>
      {props.extractor.bulkUploadPage.page === 1 ? (
        <div id="sftpPage">
          <div
            className="modal fade custom-modal-SFTP"
            id="AddNewSFTPModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="AddNewSFTPModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="AddNewSFTPModalLabel">
                    Add New SFTP
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
                  <div id="clearAllFieldsContainerModal">
                    <div></div>
                    <div
                      id="clearAllFieldsButton"
                      onClick={clearAllSftpFormFields}
                    >
                      Clear All Fields
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      SFTP Name :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Name"
                        name="SftpName"
                        className="sftpNameClass newTempInput2"
                        id="sftpNameId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">URL :</div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="SFTP URL"
                        name="SftpUrl"
                        className="sftpURLClass newTempInput2"
                        id="sftpURLId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      Host Name :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Host Name"
                        name="hostname"
                        className="sftpHostnameClass newTempInput2"
                        id="sftpHostnameId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">Username :</div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Username"
                        name="username"
                        className="sftpUsernameClass newTempInput2"
                        id="sftpUsernameId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">Password :</div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Password"
                        name="password"
                        className="sftpPasswordClass newTempInput2"
                        id="sftpPasswordId"
                        type="password"
                      ></input>
                    </div>
                  </div>
                  {/* <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">User Id :</div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="User Id"
                        name="user_id"
                        className="sftpUserIdClass newTempInput2"
                        id="sftpUserIdId"
                      ></input>
                    </div>
                  </div> */}
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
                    <div id="currentSFTPstatus">&nbsp;{currentSFTP}&nbsp;</div>
                  ) : null}
                  {currentSFTP === '' && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addNewSFTP}
                    >
                      Add New SFTP
                    </button>
                  )}

                  {currentSFTP === 'Checking... Please wait' && (
                    <div id="spinnerSFTPaddNew">
                      <MoonLoader color="#0D6EFD" size={15} />
                    </div>
                  )}

                  {currentSFTP !== '' &&
                    currentSFTP !== 'Checking... Please wait' && (
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
          {/* Add SFTP Modal Ends */}

          <div id="addSFTPTopSection">
            <div></div>
            <div id="SFTPMiddleSection">
              <div
                className="addNewSFTPButton"
                data-toggle="modal"
                data-target="#AddNewSFTPModal"
              >
                <div className="addNewSFTPicon">
                  <i className="fa-solid fa-circle-plus"></i>
                </div>
                <div className="addNewSFTPLabel">Add New SFTP</div>
              </div>
            </div>
            <div className="refreshIcDiv" onClick={fetchAllSftpDetails}>
              <i className="fi fi-rr-refresh"></i>
            </div>
          </div>
          <div id="addSFTPMiddleSection">
            <table id="sftpAllDetailsTable">
              <thead>
                <tr>
                  <th className="sftpAllDetailsCellHead">SFTP Name</th>
                  <th className="sftpAllDetailsCellHead">URL</th>
                  <th className="sftpAllDetailsCellHead">Host Name</th>
                  <th className="sftpAllDetailsCellHead">Username</th>
                  <th className="sftpAllDetailsCellHead">Status</th>
                  <th className="sftpAllDetailsCellHead"></th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allSftpDetails.map((rowData, index) => (
                  <tr key={index} className="sftpAllDetailsRow">
                    <td className="sftpAllDetailsCell">{rowData.SftpName}</td>
                    <td className="sftpAllDetailsCell">{rowData.SftpUrl}</td>
                    <td className="sftpAllDetailsCell">{rowData.hostname}</td>
                    <td className="sftpAllDetailsCell">{rowData.username}</td>
                    <td
                      className="sftpAllDetailsCell sftpAllDetailsCellStatus"
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
                    <td className="sftpAllDetailsCell sftpAllDetailsCellView">
                      {rowData.status === 'Successful' ? (
                        <div
                          className="viewSftpButton"
                          onClick={() => viewSecondPage(rowData)}
                        >
                          <i class="fa-solid fa-circle-right"></i>
                        </div>
                      ) : (
                        <div className="viewSftpButton"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <SFTP2ndPage />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    documents: state.documents,
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(SFTP);

// export default SFTP;

const API1Request = {
  SftpName: 'SftpName',
  SftpUrl: 'SftpUrl',
  hostname: 'hostname',
  username: 'username',
  password: 'password',
  user_id: 'user_id',
};

const API1Response = {
  status: 'Successful', // 'Not Successful', // 'In Progress'
};

const API2Request = {
  user_id: 'AV123',
};

const API2Response = {
  all_sftp: [
    {
      SftpName: 'SftpName',
      SftpUrl: 'SftpUrl',
      hostname: 'hostname',
      username: 'username',
      status: 'Successful', // 'Not Successful', // 'In Progress'
    },
    {
      SftpName: 'SftpName',
      SftpUrl: 'SftpUrl',
      hostname: 'hostname',
      username: 'username',
      status: 'Not Successful', // 'Not Successful', // 'In Progress'
    },
    {
      SftpName: 'SftpName',
      SftpUrl: 'SftpUrl',
      hostname: 'hostname',
      username: 'username',
      status: 'In Progress', // 'Not Successful', // 'In Progress'
    },
  ],
};
const API3Request = {
  user_id: 'AV123',
  SftpName: 'SftpName',
  SftpUrl: 'SftpUrl',
  hostname: 'hostname',
  username: 'username',
};

const API3Response = {
  all_folders: ['root', 'abc', 'def'],
  all_files: [],
  user_id: 'AV123',
  SftpName: 'SftpName',
  SftpUrl: 'SftpUrl',
  hostname: 'hostname',
  user_id: 'user_id',
  mapped_folders: [
    {
      folder_name: 'root',
      template_name: 'ABC',
      status: 'Successful', // 'Not Successful', // 'In Progress'
    },
    {
      folder_name: 'root',
      template_name: 'ABC',
      status: 'Successful', // 'Not Successful', // 'In Progress'
    },
  ],
};

const API4Request = {
  user_id: 'AV123',
  SftpName: 'SftpName',
  SftpUrl: 'SftpUrl',
  hostname: 'hostname',
  user_id: 'user_id',
  folder_path: 'root',
};
const API4Response = {
  status: 'Successful', // 'Not Successful', // 'In Progress'
};
