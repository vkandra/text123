import './TemplatesSubTable.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import axios from 'axios';
import { fetchTemplatesDataAPI, setSubtemplatesData } from '../../actions/user';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import TemplatesSubTableFiles from '../TemplatesSubTableFiles/TemplatesSubTableFiles';
import { setSubtemplatesFileTableData } from '../../actions/user';
import { setTemplateData } from '../../actions/user';
import TemplatesMapRules from '../TemplatesMapRules/TemplatesMapRules';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { downloadZipOfExcelFilesAPI } from '../../actions/extractor';
import uploadFileToBlob from './azureBlob';
import { BounceLoader } from 'react-spinners';

import { setTemplatesMapRulesData } from '../../actions/documents';

const TemplatesSubTable = (props) => {
  const [favdata, setFavdata] = useState(<div></div>);
  const [otherDetails, setOtherDetails] = useState('');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [excelFile, setExcelFile] = useState([]);

  //   const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [searching, setSearching] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    customer_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    department_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    project_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    other_details: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    total_keys: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    total_files: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  useEffect(() => {
    console.log(1);
    props.assignSubTempDataToReducer();
  }, []);

  const fetchData = () => {
    let obj1 = { user_id: props.user.token };
    props.dispatch(fetchTemplatesDataAPI(obj1));
  };
  const fetchData2 = () => {
    let templatesData = {
      user_id: '',
      template_details: [],
    };
    props.dispatch(setTemplateData(templatesData));
    let obj1 = { user_id: props.user.token };
    props.dispatch(fetchTemplatesDataAPI(obj1));
  };

  // Button
  const deleteSubTemplateButton = (rowData) => {
    if (rowData.name !== 'Default') {
      return (
        <div
          className="deleteSubTemButton"
          onClick={() => deleteSubTempCheck(rowData)}
        >
          {/* <i className="pi pi-minus-circle"></i> */}
          <i className="fa-solid fa-circle-minus"></i>
        </div>
      );
    }
  };

  const deleteSubTempCheck = (rowdata) => {
    console.log(rowdata.total_files);
    if (rowdata.total_files > 0) {
      alert(
        'Please delete all the files associated with this template before deleting the template.\n\nWarning: Once you delete a file, all the data associated with the file will get deleted.'
      );
      return;
    } else {
      const selectedMainTemp = props.user.selectedMainTemplate;
      const selectedSubTemp = rowdata.name;
      const selectedSubTempId = rowdata.sub_template_id;
      console.log(selectedMainTemp, selectedSubTemp);
      let data = {
        user_id: props.user.token,
        main_template: selectedMainTemp,
        sub_template: selectedSubTemp,
        sub_template_id: selectedSubTempId,
        action: 'delete',
      };

      axios
        .post(
          // `https://2wehobnzu6.execute-api.ap-south-1.amazonaws.com/add_delete`,
          `https://functionstexextraction.azurewebsites.net/api/DeleteTemplate`,
          data
        )
        .then((res) => {
          const filteredsubtemplatesData = props.user.subtemplatesData.filter(
            (item) => item.sub_template_id !== selectedSubTempId
          );
          props.dispatch(setSubtemplatesData(filteredsubtemplatesData));
          fetchData();
          alert(`Template ${data.sub_template} deleted Successfully!`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const viewFavButton = (rowData) => {
    if (rowData.total_keys > 0) {
      return (
        <div>
          <div
            className="modal fade"
            id="ViewFavouritesModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ViewFavouritesModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ViewFavouritesModalLabel">
                    Favourite Keywords
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
                <div className="modal-body2">{favdata}</div>
              </div>
            </div>
          </div>
          <span
            data-toggle="modal"
            data-target="#ViewFavouritesModal"
            onClick={() => viewFavTable(rowData)}
            className="totalKeysNum"
          >
            {rowData.total_keys}
          </span>
        </div>
      );
    } else {
      return <span>{rowData.total_keys}</span>;
    }
  };

  const viewFavTable = (data) => {
    const favKeyword = (rawData) => {
      return <div className="FavKeywordSubTempTable">{rawData.key}</div>;
    };
    setFavdata(
      <DataTable
        value={data.key_details}
        responsiveLayout="scroll"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        size="small"
        emptyMessage="No Template found!"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        className="tableSubTemp2"
        // style={{ width: '100%' }}
      >
        <Column
          field="key"
          header="Keys"
          sortable
          style={{ maxWidth: '560px' }}
          body={favKeyword}
        ></Column>
        <Column
          field="page"
          header="Page No."
          sortable
          className="numPart"
          style={{ maxWidth: '110px' }}
        ></Column>
        <Column
          field="repeat"
          header="Repeat No."
          sortable
          className="numPart"
          style={{ maxWidth: '110px' }}
        ></Column>
      </DataTable>
    );
  };

  const viewFilesButton = (rowData) => {
    if (rowData.total_files > 0) {
      return (
        <div>
          <div
            className="modal fade"
            id="ViewFilesModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ViewFilesModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog  modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ViewFilesModalLabel">
                    Files
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
                <div className="modal-body2">
                  <TemplatesSubTableFiles />
                </div>
              </div>
            </div>
          </div>
          <span
            data-toggle="modal"
            data-target="#ViewFilesModal"
            onClick={() => viewFilesTable(rowData)}
            className="totalFilesNum"
          >
            {rowData.total_files}
          </span>
        </div>
      );
    } else {
      return <span>{rowData.total_files}</span>;
    }
  };

  const viewFilesTable = (data) => {
    props.dispatch(setSubtemplatesFileTableData(data.file_details));
  };

  const viewOtherDetailsButton = (rowData) => {
    return (
      <div className="otherDetailsdivMain">
        <div
          className="modal fade"
          id="ViewOtherDetailsModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="ViewOtherDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ViewOtherDetailsModalLabel">
                  Other Details
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
              <div className="modal-body">{otherDetails}</div>
            </div>
          </div>
        </div>
        <div
          data-toggle="modal"
          data-target="#ViewOtherDetailsModal"
          onClick={() => setDetails(rowData)}
          className="otherDetailsdiv"
        >
          {rowData.other_details}
        </div>
      </div>
    );
  };

  const setDetails = (Data) => {
    setOtherDetails(Data.other_details);
  };

  const viewMapRulesButton = (rowData) => {
    return (
      <div className="otherDetailsdivMain">
        <div
          className="mapRulesToPageButton"
          onClick={() => navigateToMapRulesPage(rowData)}
        >
          {/* <i className="pi pi-minus-circle"></i> */}
          <i class="fa-solid fa-square-up-right"></i>
        </div>
      </div>
    );
  };

  const navigateToMapRulesPage = (rowData) => {
    console.log(rowData);
    const { templateMapRule } = props.documents;
    console.log(templateMapRule);
    templateMapRule.overlay = true;
    templateMapRule.templateName = rowData.name;
    templateMapRule.templateId = rowData.sub_template_id;
    templateMapRule.totalFiles = rowData.total_files;
    templateMapRule.excelUploaded = true;
    props.dispatch(setTemplatesMapRulesData(templateMapRule));
  };

  // Global Search Input
  const clearSearchText = (e) => {
    document.getElementById('searchName').value = null;
    setSearching(false);

    const value = e.target.value;
    onGlobalFilterChange(value);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      setSearching(true);
    } else {
      setSearching(false);
    }

    const value = e.target.value;
    onGlobalFilterChange(value);
  };

  const onGlobalFilterChange = (value) => {
    let _filters = { ...filters };
    _filters['global'].value = value;
    console.log(_filters);
    setFilters(_filters);
    // setGlobalFilterValue(value);
  };

  const addNewSubTemplate = () => {
    if (document.getElementById('subTempName').value === '') {
      alert('Please Enter a Template Name!');
      return;
    }
    if (document.getElementById('uploadExcelInputBox').files.length < 1) {
      alert('Please Upload an Excel Template!');
      return;
    }
    const selectedMainTemp = props.user.selectedMainTemplate;
    const subTempName = document.getElementById('subTempName').value;
    const subTempCust = document.getElementById('subTempCust').value;
    const subTempDept = document.getElementById('subTempDept').value;
    const subTempProj = document.getElementById('subTempProj').value;
    const subTempDet = document.getElementById('subTempDet').value;
    const excelFileName = document.getElementById('uploadExcelInputBox').value;
    console.log(selectedMainTemp, subTempName);

    if (subTempName === 'Default' || subTempName === 'default') {
      alert('Template Name cannot be "Default".');
      document.getElementById('subTempName').value = '';
      return;
    }

    for (let i in props.user.subtemplatesData) {
      if (subTempName === props.user.subtemplatesData[i].name) {
        alert('Template Name cannot be same as already created Template.');
        document.getElementById('subTempName').value = '';
        return;
      }
    }
    console.log(props.user.subtemplatesData);

    let data = {
      user_id: props.user.token,
      main_template: selectedMainTemp,
      sub_template: subTempName,
      customer_name: subTempCust,
      department_name: subTempDept,
      project_name: subTempProj,
      other_details: subTempDet,
      action: 'add',
    };
    // props.dispatch(addDeletefetchTemplateAPI(data));
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/AddTemplateAPI`,
        data
      )
      .then((res) => {
        console.log('Response -> ', res.data);
        uploadFile(excelFile[0], res.data);
        // dispatch(saveBlobExcelDetails(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downloadExcelSample = () => {
    props.dispatch(
      downloadZipOfExcelFilesAPI(
        'https://texextraction.blob.core.windows.net/cychatsamplefiles/SampleFormat.xlsx'
      )
    );
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setExcelFile([file]);
      } else {
        alert('Please select a valid Excel file.');
      }
    }
  };

  const uploadFile = (file, blobdata) => {
    setError(false);
    setSuccess(false);

    console.log('Preparing the upload');
    console.log(file);
    let fileUploadStatus = uploadOnly(file, blobdata);
    if (fileUploadStatus) {
      console.log(file);
      setTimeout(() => {
        setSuccess(false);
        document.getElementById('uploadExcelInputBox').value = '';
        document.getElementById('subTempName').value = '';
        document.getElementById('subTempCust').value = '';
        document.getElementById('subTempDept').value = '';
        document.getElementById('subTempProj').value = '';
        document.getElementById('subTempDet').value = '';
        // fetchData2();
      }, 3000);
    }
  };

  const uploadOnly = async (file, blobdata) => {
    await uploadFileToBlob(file, blobdata)
      .then((data) => {
        setSuccess(true);
        console.log('Link from blob -> ', data);
        return true;
      })
      .catch((err) => {
        setError(true);
        console.log(JSON.stringify(error));
        return false;
      });
  };

  return (
    <div className="templatesSubTable">
      {props.documents.templateMapRule.overlay && <TemplatesMapRules />}
      {/* Add New Template Modal */}
      <div
        className="modal fade"
        id="AddNewTemplateModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="AddNewTemplateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddNewTemplateModalLabel">
                Add New Template
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
              {/* <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Main Template :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  {props.user.selectedMainTemplate}
                </div>
              </div> */}
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Template Name :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  <input
                    placeholder="New Template Name"
                    name="newTemplate"
                    className="newTempInput"
                    id="subTempName"
                  ></input>
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Customer Name :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  <input
                    placeholder="Customer Name"
                    name="Customer"
                    className="newTempInput"
                    id="subTempCust"
                  ></input>
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Department Name :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  <input
                    placeholder="Department Name"
                    name="Department"
                    className="newTempInput"
                    id="subTempDept"
                  ></input>
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">Project Name : </div>
                <div className="rightSectionModalAddNewSub">
                  <input
                    placeholder="Project Name"
                    name="Project"
                    className="newTempInput"
                    id="subTempProj"
                  ></input>
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Other Details :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  <textarea
                    placeholder="Other Details"
                    name="Others"
                    className="newTempTextarea"
                    id="subTempDet"
                  ></textarea>
                </div>
              </div>

              <hr></hr>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">Sample Excel :</div>
                <div className="rightSectionModalAddNewSub">
                  <div id="downloadExcelIcon" onClick={downloadExcelSample}>
                    <i class="fa-solid fa-cloud-arrow-down"></i> Download
                  </div>
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">Upload Excel :</div>
                <div className="rightSectionModalAddNewSub">
                  <div id="uploadExcelSection">
                    <input
                      type="file"
                      id="uploadExcelInputBox"
                      accept=".xlsx, .xls"
                      onChange={handleExcelFileChange}
                      // You can add more attributes and styles as needed
                    />{' '}
                    &nbsp;
                    {success ? (
                      <span id="doneUploadExcelIcon">
                        <i class="fa-solid fa-circle-check"></i>
                      </span>
                    ) : null}
                    {/* <BounceLoader color="#0b5ed7" size={15} /> */}
                  </div>
                </div>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNewSubTemplate}
              >
                Add New Template
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add New Template Modal Ends */}

      {!props.documents.templateMapRule.overlay && (
        <>
          <div className="headerComponent">
            <div className="subtempTabLabel">Templates List - </div>
            <div className="addNewSubTempButton">
              <div className="addNewSubicon">
                <i className="fa-solid fa-circle-plus"></i>
              </div>
              <div
                className="addNewSubLabel"
                data-toggle="modal"
                data-target="#AddNewTemplateModal"
                // onClick={addNewSubTemplate}
              >
                Add New&nbsp;
              </div>
            </div>
            <div className="searchGroup1">
              <input
                type="text"
                id="searchName"
                placeholder="Search Keyword"
                onChange={handleChange}
              ></input>
              <div id="clearSearchField" onClick={clearSearchText}>
                {searching ? (
                  <FontAwesomeIcon icon={faCircleXmark} id="searchIc" />
                ) : (
                  <FontAwesomeIcon icon={faMagnifyingGlass} id="searchIc" />
                )}
              </div>
              <div className="refreshIcDiv" onClick={fetchData2}>
                <i className="fi fi-rr-refresh"></i>
              </div>
            </div>
          </div>
          <div className="tableSubTemp">
            <DataTable
              value={props.user.subtemplatesData}
              responsiveLayout="scroll"
              paginator
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 20, 30]}
              size="small"
              // selection={selectedProduct1}
              // onSelectionChange={(e) => setSelectedProduct1(e.value)}
              //   header={header}
              filters={filters}
              scrollable
              scrollHeight="62vh"
              emptyMessage="No Templates found!"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              className="tableSubTemp1"
            >
              <Column
                selectionMode="multiple"
                className="checkboxCell"
                style={{
                  maxWidth: '3em',
                  display: 'none',
                }}
              ></Column>
              <Column
                field="name"
                header="Template"
                sortable
                filter
                filterPlaceholder="Search by Name"
                // style={{ minWidth: '8rem' }}
              ></Column>
              <Column
                field="customer_name"
                header="Cust. Name"
                sortable
                filter
                filterPlaceholder="Search by Name"
                // style={{ minWidth: '8rem' }}
              ></Column>
              <Column
                field="department_name"
                header="Dept. Name"
                sortable
                filter
                filterPlaceholder="Search by Name"
                // style={{ minWidth: '8rem' }}
              ></Column>
              <Column
                field="project_name"
                header="Project"
                sortable
                filter
                filterPlaceholder="Search by Name"
                // style={{ minWidth: '8rem' }}
              ></Column>
              <Column
                field="other_details"
                header="Details"
                body={viewOtherDetailsButton}
                // sortable
                // filter
                // filterPlaceholder="Search by Name"
                style={{ maxWidth: '100px' }}
              ></Column>

              <Column
                field="map_rules"
                header="Map/Rules"
                body={viewMapRulesButton}
                // sortable
                // filter
                // filterPlaceholder="Search by Name"
                style={{ maxWidth: '100px' }}
              ></Column>

              <Column
                field="total_keys"
                header="Fav. Keys"
                sortable
                dataType="numeric"
                filterPlaceholder="Search by Qty."
                className="numPart"
                body={viewFavButton}
                // onClick={viewFavTable}
                style={{ maxWidth: '130px' }}
                filter
              ></Column>

              <Column
                field="total_files"
                header="Files"
                sortable
                dataType="numeric"
                filterPlaceholder="Search by Qty."
                className="numPart"
                body={viewFilesButton}
                style={{ maxWidth: '130px' }}
                filter
              ></Column>

              <Column
                headerStyle={{
                  width: '4rem',
                  textAlign: 'center',
                  maxWidth: '4rem',
                }}
                bodyStyle={{
                  textAlign: 'center',
                  overflow: 'visible',
                  width: '4rem',
                  maxWidth: '4rem',
                }}
                body={deleteSubTemplateButton}
                // onClick={deleteSubTempCheck}
              />
            </DataTable>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    documents: state.documents,
    user: state.user,
    themeLang: state.themeLang,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(TemplatesSubTable);

// export default TemplatesSubTable;
