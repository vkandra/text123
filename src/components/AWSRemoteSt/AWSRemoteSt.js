import './AWSRemoteSt.css';
import React, { useState, useEffect } from 'react';
import { awsAdddataAPI } from '../../actions/documents';
import { connect } from 'react-redux/es/exports';
import { MoonLoader } from 'react-spinners';

import {
  setSelectedMainTemplate,
  setSubtemplatesData,
  fetchTemplatesDataAPI,
} from '../../actions/user';
import axios from 'axios';
import {
  getAllAWSDetailsAPI,
  setBulkUploadPage,
} from '../../actions/extractor';
import AWSRemoteSt2ndPage from '../AWSRemoteSt2ndPage/AWSRemoteSt2ndPage';

const AWSRemoteSt = (props) => {
  const [newAWS, setNewAWS] = useState(false);
  const [currentAWS, setCurrentAWS] = useState('');

  useEffect(() => {
    let obj1 = { user_id: props.user.token };
    fetchAllAWSDetails();
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

  const addNewAWS = () => {
    let awsConnectionName = document.getElementById('awsConnectionName').value;
    let awsConnectionString = document.getElementById(
      'awsConnectionString'
    ).value;
    // let hostname = document.getElementById('awsHostnameId').value;
    // let username = document.getElementById('awsUsernameId').value;
    // let password = document.getElementById('awsPasswordId').value;
    // let user_id = document.getElementById('awsUserIdId').value;

    let obj1 = {
      connection_name: awsConnectionName,
      connection_string: awsConnectionString,
      //   hostname: hostname,
      //   username: username,
      //   password: password,
      user_id: props.user.token,
    };
    console.log(obj1);
    // props.dispatch(awsAdddataAPI(obj1));
    setCurrentAWS('Checking... Please wait');
    axios
      .post(
        `https://functionstexextraction.awswebsites.net/api/source_aws_conn_check`,
        obj1
      )
      .then(function (response) {
        console.log(response.data);
        setCurrentAWS(response.data.status);
        fetchAllAWSDetails();
      })
      .catch(function (error) {
        console.log(error);
        setCurrentAWS('Error!');
        fetchAllAWSDetails();
      });
  };

  const clearAllAWSFormFields = () => {
    document.getElementById('awsConnectionName').value = '';
    document.getElementById('awsConnectionString').value = '';
    // document.getElementById('awsHostnameId').value = '';
    // document.getElementById('awsUsernameId').value = '';
    // document.getElementById('awsPasswordId').value = '';
    // document.getElementById('awsUserIdId').value = '';

    setCurrentAWS('');
  };

  const fetchAllAWSDetails = () => {
    let data = { user_id: props.user.token };
    props.dispatch(getAllAWSDetailsAPI(data));
  };

  const viewSecondPage = (detail) => {
    const param = {
      page: 2,
      data: detail,
    };
    props.dispatch(setBulkUploadPage(param));
  };

  // console.log(currentAWS);
  return (
    <>
      {props.extractor.bulkUploadPage.page === 1 ? (
        <div id="awsRemoteSt">
          <div
            className="modal fade custom-modal-AWS"
            id="AddNewAWSModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="AddNewAWSModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="AddNewAWSModalLabel">
                    Add New AWS
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
                      onClick={clearAllAWSFormFields}
                    >
                      Clear All Fields
                    </div>
                  </div>
                  <div className="modalAWSContent">
                    <div className="leftSectionModalAddNewAWS">
                      Connection Name :
                    </div>
                    <div className="rightSectionModalAddNewAWS">
                      <input
                        placeholder="Connection Name"
                        name="AWSConnName"
                        className="awsNameClass newTempInput2"
                        id="awsConnectionName"
                      ></input>
                    </div>
                  </div>
                  <div className="modalAWSContent">
                    <div className="leftSectionModalAddNewAWS">
                      Connection String :
                    </div>
                    <div className="rightSectionModalAddNewAWS">
                      <input
                        placeholder="Connection String"
                        name="AWSConnString"
                        className="awsURLClass newTempInput2"
                        id="awsConnectionString"
                      ></input>
                    </div>
                  </div>
                  {/* <div className="modalAWSContent">
                      <div className="leftSectionModalAddNewAWS">
                        Host Name :
                      </div>
                      <div className="rightSectionModalAddNewAWS">
                        <input
                          placeholder="Host Name"
                          name="hostname"
                          className="awsHostnameClass newTempInput2"
                          id="awsHostnameId"
                        ></input>
                      </div>
                    </div>
                    <div className="modalAWSContent">
                      <div className="leftSectionModalAddNewAWS">
                        Username :
                      </div>
                      <div className="rightSectionModalAddNewAWS">
                        <input
                          placeholder="Username"
                          name="username"
                          className="awsUsernameClass newTempInput2"
                          id="awsUsernameId"
                        ></input>
                      </div>
                    </div>
                    <div className="modalAWSContent">
                      <div className="leftSectionModalAddNewAWS">
                        Password :
                      </div>
                      <div className="rightSectionModalAddNewAWS">
                        <input
                          placeholder="Password"
                          name="password"
                          className="awsPasswordClass newTempInput2"
                          id="awsPasswordId"
                          type="password"
                        ></input>
                      </div>
                    </div> */}
                  {/* <div className="modalAWSContent">
                        <div className="leftSectionModalAddNewAWS">User Id :</div>
                        <div className="rightSectionModalAddNewAWS">
                          <input
                            placeholder="User Id"
                            name="user_id"
                            className="awsUserIdClass newTempInput2"
                            id="awsUserIdId"
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
                  {currentAWS !== '' ? (
                    <div id="currentAWSstatus">&nbsp;{currentAWS}&nbsp;</div>
                  ) : null}
                  {currentAWS === '' && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addNewAWS}
                    >
                      Add New AWS
                    </button>
                  )}

                  {currentAWS === 'Checking... Please wait' && (
                    <div id="spinnerAWSaddNew">
                      <MoonLoader color="#0D6EFD" size={15} />
                    </div>
                  )}

                  {currentAWS !== '' &&
                    currentAWS !== 'Checking... Please wait' && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setCurrentAWS('')}
                      >
                        Ok
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* Add AWS Modal Ends */}

          <div id="addAWSTopSection">
            <div></div>
            <div id="AWSMiddleSection">
              <div
                className="addNewAWSButton"
                data-toggle="modal"
                data-target="#AddNewAWSModal"
              >
                <div className="addNewAWSicon">
                  <i className="fa-solid fa-circle-plus"></i>
                </div>
                <div className="addNewAWSLabel">Add New AWS</div>
              </div>
            </div>
            <div className="refreshIcDiv" onClick={fetchAllAWSDetails}>
              <i className="fi fi-rr-refresh"></i>
            </div>
          </div>
          <div id="addAWSMiddleSection">
            <table id="awsAllDetailsTable">
              <thead>
                <tr>
                  <th className="awsAllDetailsCellHead">Connection Name</th>
                  <th className="awsAllDetailsCellHead">Connection Type</th>
                  {/* <th className="awsAllDetailsCellHead">Host Name</th> */}
                  {/* <th className="awsAllDetailsCellHead">Username</th> */}
                  <th className="awsAllDetailsCellHead">Status</th>
                  <th className="awsAllDetailsCellHead"></th>
                </tr>
              </thead>
              <tbody>
                {props.extractor.allAWSDetails.map((rowData, index) => (
                  <tr key={index} className="awsAllDetailsRow">
                    <td className="awsAllDetailsCell">
                      {rowData.connection_name}
                    </td>
                    <td className="awsAllDetailsCell">
                      {rowData.connection_type}
                    </td>
                    {/* <td className="awsAllDetailsCell">{rowData.hostname}</td> */}
                    {/* <td className="awsAllDetailsCell">{rowData.username}</td> */}
                    <td
                      className="awsAllDetailsCell awsAllDetailsCellStatus"
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
                    <td className="awsAllDetailsCell awsAllDetailsCellView">
                      {rowData.status === 'Successful' ? (
                        <div
                          className="viewAWSButton"
                          onClick={() => viewSecondPage(rowData)}
                        >
                          <i class="fa-solid fa-circle-right"></i>
                        </div>
                      ) : (
                        <div className="viewAWSButton"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <AWSRemoteSt2ndPage />
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

export default connect(mapStateToProps)(AWSRemoteSt);

// export default AWSRemoteSt;
