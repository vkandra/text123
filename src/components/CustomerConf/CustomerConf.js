import { data } from 'jquery';
import './CustomerConf.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  fetchSingleCustomerExcelListAPI,
  setAllCustomers,
} from '../../actions/documents';
import axios from 'axios';
import CustomerConfRow from '../CustomerConfRow/CustomerConfRow';
import uploadFileToBlob from './azureBlob';

const CustomerConf = (props) => {
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [excelFile, setExcelFile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const data = {
      user_id: props.user.token,
    };
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/customer_list_api_mastertable`,
        data
      )
      .then(function (response) {
        console.log(response.data);
        props.dispatch(setAllCustomers(response.data.customers));
        const data2 = {
          user_id: props.user.token,
          ...response.data.customers[0],
        };
        props.dispatch(fetchSingleCustomerExcelListAPI(data2));
        setSelectedCustomer({ ...response.data.customers[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // HANDLING FILES UPLOAD 2
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setExcelFile([file]);
      } else {
        alert('Please select a valid Excel file.');
        document.getElementById('selectedExcelFileForUploading').value = '';
      }
    }
  };

  const uploadFile = () => {
    if (
      document.getElementById('selectedExcelFileForUploading').files.length < 1
    ) {
      alert('Please Upload an Excel Template!');
      return;
    }
    setError(false);
    setSuccess(false);

    console.log('Preparing the upload');
    const blobdata = `${selectedCustomer.customer_name}_${selectedCustomer.customer_id}`;
    let fileUploadStatus = uploadOnly(excelFile[0], blobdata);
    if (fileUploadStatus) {
      setTimeout(() => {
        setSuccess(false);
        document.getElementById('selectedExcelFileForUploading').value = '';
      }, 3000);
    }
  };

  const uploadOnly = async (file, blobdata) => {
    await uploadFileToBlob(file, blobdata)
      .then((data) => {
        setSuccess(true);
        console.log('Link from blob -> ', data);
        props.dispatch(
          fetchSingleCustomerExcelListAPI({
            user_id: props.user.token,
            ...selectedCustomer,
          })
        );
        // console.log(data1);
        // axios
        //   .post(
        //     `https://functionstexextraction.azurewebsites.net/api/mappingprocess?code=R_R-4meQV6aMVF_8dDq7CeIXeD5ggq9zIFaFGFEJ2--qAzFuAEljYw==`,
        //     data1
        //   )
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        return true;
      })
      .catch((err) => {
        setError(true);
        console.log('Could Not Upload Excel -> ', JSON.stringify(error));
        return false;
      });
  };

  return (
    <div className="CustomerConf">
      <div id="custConfFirstPage">
        <div id="topCustConfSection">
          <div id="selectCustConfTempSect">
            <div id="selectCustConfLabel">Select Customer</div>
            <div>
              <select
                name="customers"
                id="singleCustConfSelect"
                // onChange={fetchTemplateFiles}
                onChange={(event) => {
                  console.log(event.target.selectedIndex);
                  const selectedIndex = event.target.selectedIndex;
                  const selectedCustomerDetail =
                    props.documents.allCustomers[selectedIndex];
                  props.dispatch(
                    fetchSingleCustomerExcelListAPI({
                      user_id: props.user.token,
                      ...selectedCustomerDetail,
                    })
                  );
                  setSelectedCustomer({ ...selectedCustomerDetail });
                }}
              >
                <optgroup label="Select Customer">
                  {props.documents.allCustomers.map((singleCustomer, index) => (
                    <option
                      key={index}
                      singleCustomer={singleCustomer}
                      value={singleCustomer.customer_id}
                    >
                      {singleCustomer.customer_name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
          <div className="detCustConfSect">
            <div>
              <input
                id="selectedExcelFileForUploading"
                // multiple
                onChange={handleFileInput}
                type="file"
              />
            </div>
            <div>
              <div
                className="uploadButtonExcelCustConf"
                onClick={() => uploadFile()}
              >
                <i className="fa-solid fa-upload"></i>
                Upload
                {/* {props.themeLang.languageWords.Upload} */}
              </div>
            </div>
          </div>
          <div className="detCustConfSect2">
            <div
              className="refreshIcDiv"
              onClick={() =>
                props.dispatch(
                  fetchSingleCustomerExcelListAPI({
                    user_id: props.user.token,
                    ...selectedCustomer,
                  })
                )
              }
            >
              <i className="fi fi-rr-refresh"></i>
            </div>
            <div className="custConfLabelsDiv">
              Count:{' '}
              <span className="custConfLabels">
                {props.documents.singleCustomerExcelFiles.length}
              </span>
            </div>
          </div>
        </div>
        <div id="midcustConfSection">
          <table id="custConfTableid">
            <thead>
              <tr id="custConfTableRow1" className="custConfTableRow1cl">
                <th>File Name</th>
                <th>Date</th>
                <th>Size</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {props.documents.singleCustomerExcelFiles.map(
                (rowData, index) => (
                  <CustomerConfRow rowData={rowData} key={index} />
                )
              )}
            </tbody>
          </table>
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

export default connect(mapStateToProps)(CustomerConf);

// export default CustomerConf;
