import './AzureRemoteSt.css';
import React, { useState, useEffect } from 'react';
import { azureAdddataAPI } from '../../actions/documents';
import { connect } from 'react-redux/es/exports';
import { MoonLoader } from 'react-spinners';

import {
  setSelectedMainTemplate,
  setSubtemplatesData,
  fetchTemplatesDataAPI,
} from '../../actions/user';
import axios from 'axios';
import {
  getAllAzureDetailsAPI,
  setBulkUploadPage,
} from '../../actions/extractor';
import AzureRemoteSt2ndPage from '../AzureRemoteSt2ndPage/AzureRemoteSt2ndPage';

const AzureRemoteSt = (props) => {
  const [newAzure, setNewAzure] = useState(false);
  const [currentAzure, setCurrentAzure] = useState('');

  useEffect(() => {
    let obj1 = { user_id: props.user.token };
    fetchAllAzureDetails();
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

  const addNewAzure = () => {
    let azureConnectionName = document.getElementById(
      'azureConnectionName'
    ).value;
    let azureConnectionString = document.getElementById(
      'azureConnectionString'
    ).value;
    // let hostname = document.getElementById('azureHostnameId').value;
    // let username = document.getElementById('azureUsernameId').value;
    // let password = document.getElementById('azurePasswordId').value;
    // let user_id = document.getElementById('azureUserIdId').value;

    let obj1 = {
      connection_name: azureConnectionName,
      connection_string: azureConnectionString,
      //   hostname: hostname,
      //   username: username,
      //   password: password,
      user_id: props.user.token,
    };
    console.log(obj1);
    // props.dispatch(azureAdddataAPI(obj1));
    setCurrentAzure('Checking... Please wait');
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/source_azure_conn_check`,
        obj1
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentAzure(response.data.status);
        fetchAllAzureDetails();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentAzure('Error!');
        fetchAllAzureDetails();
      });
  };

  const clearAllAzureFormFields = () => {
    document.getElementById('azureConnectionName').value = '';
    document.getElementById('azureConnectionString').value = '';
    // document.getElementById('azureHostnameId').value = '';
    // document.getElementById('azureUsernameId').value = '';
    // document.getElementById('azurePasswordId').value = '';
    // document.getElementById('azureUserIdId').value = '';

    setCurrentAzure('');
  };

  const fetchAllAzureDetails = () => {
    let data = { user_id: props.user.token };
    props.dispatch(getAllAzureDetailsAPI(data));
  };

  const viewSecondPage = (detail) => {
    const param = {
      page: 2,
      data: detail,
    };
    props.dispatch(setBulkUploadPage(param));
  };

  // console.log(currentAzure);
  return (
    <>
      {props.extractor.bulkUploadPage.page === 1 ? (
        <div id="azureRemoteSt">
          <div
            className="modal fade custom-modal-Azure"
            id="AddNewAzureModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="AddNewAzureModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="AddNewAzureModalLabel">
                    Add New Azure
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
                      onClick={clearAllAzureFormFields}
                    >
                      Clear All Fields
                    </div>
                  </div>
                  <div className="modalAzureContent">
                    <div className="leftSectionModalAddNewAzure">
                      Connection Name :
                    </div>
                    <div className="rightSectionModalAddNewAzure">
                      <input
                        placeholder="Connection Name"
                        name="AzureConnName"
                        className="azureNameClass newTempInput2"
                        id="azureConnectionName"
                      ></input>
                    </div>
                  </div>
                  <div className="modalAzureContent">
                    <div className="leftSectionModalAddNewAzure">
                      Connection String :
                    </div>
                    <div className="rightSectionModalAddNewAzure">
                      <input
                        placeholder="Connection String"
                        name="AzureConnString"
                        className="azureURLClass newTempInput2"
                        id="azureConnectionString"
                      ></input>
                    </div>
                  </div>
                  {/* <div className="modalAzureContent">
                    <div className="leftSectionModalAddNewAzure">
                      Host Name :
                    </div>
                    <div className="rightSectionModalAddNewAzure">
                      <input
                        placeholder="Host Name"
                        name="hostname"
                        className="azureHostnameClass newTempInput2"
                        id="azureHostnameId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalAzureContent">
                    <div className="leftSectionModalAddNewAzure">
                      Username :
                    </div>
                    <div className="rightSectionModalAddNewAzure">
                      <input
                        placeholder="Username"
                        name="username"
                        className="azureUsernameClass newTempInput2"
                        id="azureUsernameId"
                      ></input>
                    </div>
                  </div>
                  <div className="modalAzureContent">
                    <div className="leftSectionModalAddNewAzure">
                      Password :
                    </div>
                    <div className="rightSectionModalAddNewAzure">
                      <input
                        placeholder="Password"
                        name="password"
                        className="azurePasswordClass newTempInput2"
                        id="azurePasswordId"
                        type="password"
                      ></input>
                    </div>
                  </div> */}
                  {/* <div className="modalAzureContent">
                      <div className="leftSectionModalAddNewAzure">User Id :</div>
                      <div className="rightSectionModalAddNewAzure">
                        <input
                          placeholder="User Id"
                          name="user_id"
                          className="azureUserIdClass newTempInput2"
                          id="azureUserIdId"
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
                  {currentAzure !== '' ? (
                    <div id="currentAzurestatus">
                      &nbsp;{currentAzure}&nbsp;
                    </div>
                  ) : null}
                  {currentAzure === '' && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addNewAzure}
                    >
                      Add New Azure
                    </button>
                  )}

                  {currentAzure === 'Checking... Please wait' && (
                    <div id="spinnerAzureaddNew">
                      <MoonLoader color="#0D6EFD" size={15} />
                    </div>
                  )}

                  {currentAzure !== '' &&
                    currentAzure !== 'Checking... Please wait' && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setCurrentAzure('')}
                      >
                        Ok
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* Add Azure Modal Ends */}

          <div id="addAzureTopSection">
            <div></div>
            <div id="AzureMiddleSection">
              <div
                className="addNewAzureButton"
                data-toggle="modal"
                data-target="#AddNewAzureModal"
              >
                <div className="addNewAzureicon">
                  <i className="fa-solid fa-circle-plus"></i>
                </div>
                <div className="addNewAzureLabel">Add New Azure</div>
              </div>
            </div>
            <div className="refreshIcDiv" onClick={fetchAllAzureDetails}>
              <i className="fi fi-rr-refresh"></i>
            </div>
          </div>
          <div id="addAzureMiddleSection">
            <table id="azureAllDetailsTable">
              <thead>
                <tr>
                  <th className="azureAllDetailsCellHead">Connection Name</th>
                  <th className="azureAllDetailsCellHead">Connection Type</th>
                  {/* <th className="azureAllDetailsCellHead">Host Name</th> */}
                  {/* <th className="azureAllDetailsCellHead">Username</th> */}
                  <th className="azureAllDetailsCellHead">Status</th>
                  <th className="azureAllDetailsCellHead"></th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allAzureDetails.map((rowData, index) => (
                  <tr key={index} className="azureAllDetailsRow">
                    <td className="azureAllDetailsCell">
                      {rowData.connection_name}
                    </td>
                    <td className="azureAllDetailsCell">
                      {rowData.connection_type}
                    </td>
                    {/* <td className="azureAllDetailsCell">{rowData.hostname}</td> */}
                    {/* <td className="azureAllDetailsCell">{rowData.username}</td> */}
                    <td
                      className="azureAllDetailsCell azureAllDetailsCellStatus"
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
                    <td className="azureAllDetailsCell azureAllDetailsCellView">
                      {rowData.status === 'Successful' ? (
                        <div
                          className="viewAzureButton"
                          onClick={() => viewSecondPage(rowData)}
                        >
                          <i class="fa-solid fa-circle-right"></i>
                        </div>
                      ) : (
                        <div className="viewAzureButton"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <AzureRemoteSt2ndPage />
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

export default connect(mapStateToProps)(AzureRemoteSt);

// export default AzureRemoteSt;
