import './SFTP.css';
import React, { useState, useEffect } from 'react';

import { sftpAdddataAPI } from '../../actions/documents';
import { connect } from 'react-redux/es/exports';

import {
  setSelectedMainTemplate,
  setSubtemplatesData,
  fetchTemplatesDataAPI,
} from '../../actions/user';

const SFTP = (props) => {
  const [newSub, setNewSub] = useState(false);

  useEffect(() => {
    let obj1 = { user_id: props.user.token };
    props.dispatch(fetchTemplatesDataAPI(obj1));

    if (props.user.templatesData.user_id !== '') {
      if (props.user.selectedMainTemplate === '') {
        props.dispatch(
          setSelectedMainTemplate(
            props.user.templatesData.template_details[0].main_template_name
          )
        );
      }
    }
  }, []);

  const addNewSFTP = () => {
    let SftpName = document.getElementById('sftpNameId').value;
    let SftpUrl = document.getElementById('sftpURLId').value;
    let hostname = document.getElementById('sftpHostnameId').value;
    let username = document.getElementById('sftpUsernameId').value;
    let password = document.getElementById('sftpPasswordId').value;
    let FolderName = document.getElementById('sftpFolderNameId').value;
    let user_id = document.getElementById('sftpUserIdId').value;
    let key = 'abc';
    // let newSubTemp = newSub;

    let subTempName = '';
    if (!newSub) {
      subTempName = document.getElementById('sftpSelectedSubId').value;
    }

    let obj1 = {
      SftpName: SftpName,
      SftpUrl: SftpUrl,
      hostname: hostname,
      username: username,
      password: password,
      // FolderName: FolderName,
      user_id: user_id,
      key: key,
      subTempName: subTempName,
    };

    props.dispatch(sftpAdddataAPI(obj1));
  };

  return (
    <div>
      {/* Add SFTP Modal */}
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
              <div className="modalSFTPContent">
                <div className="leftSectionModalAddNewSFTP">SFTP Name :</div>
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
                <div className="leftSectionModalAddNewSFTP">Host Name :</div>
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
                <div className="leftSectionModalAddNewSFTP">Folder Name : </div>
                <div className="rightSectionModalAddNewSFTP">
                  <input
                    placeholder="Folder Name"
                    name="FolderName"
                    className="sftpFolderNameClass newTempInput2"
                    id="sftpFolderNameId"
                  ></input>
                </div>
              </div> */}
              <div className="modalSFTPContent">
                <div className="leftSectionModalAddNewSFTP">User Id :</div>
                <div className="rightSectionModalAddNewSFTP">
                  <input
                    placeholder="User Id"
                    name="user_id"
                    className="sftpUserIdClass newTempInput2"
                    id="sftpUserIdId"
                  ></input>
                </div>
              </div>

              {/* <div className="modalSFTPContent" id="sftpMainTemplateForm">
                <div className="leftSectionModalAddNewSFTP">
                  Main Template :
                </div>
                <div className="rightSectionModalAddNewSFTP">Default</div>
              </div> */}
              <div className="modalSFTPContent">
                <div className="leftSectionModalAddNewSFTP">Template :</div>
                <div className="subTemplateSelectionSFTP">
                  {/* <div
                    className={`buttonSubSFTP ${
                      newSub ? 'subSelectSFTP' : null
                    }`}
                    onClick={() => setNewSub(true)}
                  >
                    New
                  </div>
                  <div
                    className={`buttonSubSFTP ${
                      !newSub ? 'subSelectSFTP' : null
                    }`}
                    onClick={() => setNewSub(false)}
                  >
                    Existing
                  </div> */}
                  {/* {newSub ? null : ( */}

                  <select
                    id="sftpSelectedSubId"
                    className="sftpSelectedSubClass"
                  >
                    {console.log(
                      props.user.templatesData.template_details[0]
                        .sub_template_details
                    )}
                    {props.user.templatesData.template_details[0].sub_template_details.map(
                      (singletemplate, index) => (
                        // <option>ABC</option>
                        <option>{singletemplate.name}</option>
                      )
                    )}
                  </select>

                  {/* )} */}
                </div>
              </div>
              {/* {!newSub ? null : (
                <div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      New Sub-Template :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="New sub-Template Name"
                        name="newTemplate"
                        className="newTempInput2"
                        id="SFTPTempName"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      Customer Name :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Customer Name"
                        name="Customer"
                        className="newTempInput2"
                        id="SFTPTempCust"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      Department Name :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Department Name"
                        name="Department"
                        className="newTempInput2"
                        id="SFTPTempDept"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      Project Name :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <input
                        placeholder="Project Name"
                        name="Project"
                        className="newTempInput2"
                        id="SFTPTempProj"
                      ></input>
                    </div>
                  </div>
                  <div className="modalSFTPContent">
                    <div className="leftSectionModalAddNewSFTP">
                      Other Details :
                    </div>
                    <div className="rightSectionModalAddNewSFTP">
                      <textarea
                        placeholder="Other Details"
                        name="Others"
                        className="newTempTextarea2"
                        id="SFTPTempDet"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )} */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNewSFTP}
              >
                Add New SFTP
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add SFTP Modal Ends */}

      <div id="addSFTPSection">
        <div className="addNewSFTPButton">
          <div className="addNewSFTPicon">
            <i className="fa-solid fa-circle-plus"></i>
          </div>
          <div
            className="addNewSFTPLabel"
            data-toggle="modal"
            data-target="#AddNewSFTPModal"
          >
            Add New&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(SFTP);

// export default SFTP;
