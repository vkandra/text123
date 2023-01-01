import './TemplatesSubTable.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import axios from 'axios';
import { fetchTemplatesDataAPI, setSubtemplatesData } from '../../actions/user';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';

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

const TemplatesSubTable = (props) => {
  //   const [subdata, setSubdata] = useState([]);
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
    console.log(rowdata.name);
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
        `https://2wehobnzu6.execute-api.ap-south-1.amazonaws.com/add_delete`,
        data
      )
      .then((res) => {
        const filteredsubtemplatesData = props.user.subtemplatesData.filter(
          (item) => item.sub_template_id !== selectedSubTempId
        );
        props.dispatch(setSubtemplatesData(filteredsubtemplatesData));
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const selectedMainTemp = props.user.selectedMainTemplate;
    const subTempName = document.getElementById('subTempName').value;
    const subTempCust = document.getElementById('subTempCust').value;
    const subTempDept = document.getElementById('subTempDept').value;
    const subTempProj = document.getElementById('subTempProj').value;
    const subTempDet = document.getElementById('subTempDet').value;
    console.log(selectedMainTemp, subTempName);

    if (subTempName === 'Default' || subTempName === 'default') {
      alert('Subtemplate Name cannot be "Default".');
      document.getElementById('subTempName').value = '';
      return;
    }

    let allSubTempNames = [];
    for (let i in props.user.subtemplatesData) {
      if (subTempName === props.user.subtemplatesData[i].name) {
        alert(
          'Subtemplate Name cannot be same as already created Subtemplates.'
        );
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
    props.dispatch(addDeletefetchTemplateAPI(data));
    fetchData();
    document.getElementById('subTempName').value = '';
    document.getElementById('subTempCust').value = '';
    document.getElementById('subTempDept').value = '';
    document.getElementById('subTempProj').value = '';
    document.getElementById('subTempDet').value = '';
  };

  return (
    <div className="templatesSubTable">
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
                Add New Sub-Template
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
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Main Template :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  {props.user.selectedMainTemplate}
                </div>
              </div>
              <div className="modalContent">
                <div className="leftSectionModalAddNewSub">
                  Sub-Template Name :{' '}
                </div>
                <div className="rightSectionModalAddNewSub">
                  <input
                    placeholder="New Sub-Template Name"
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
                Add New Sub-Template
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add New Template Modal Ends */}

      <div className="headerComponent">
        <div className="subtempTabLabel">Subtemplates List - </div>
        <div className="addNewSubTempButton">
          <div className="addNewSubicon">
            <i className="fa-solid fa-circle-plus"></i>
          </div>
          <div
            className="addNewSubLabel"
            data-toggle="modal"
            data-target="#AddNewTemplateModal"
            onClick={addNewSubTemplate}
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
          <div className="refreshIcDiv" onClick={fetchData}>
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
          //   selection={selectedProduct1}
          //   onSelectionChange={(e) => setSelectedProduct1(e.value)}
          //   header={header}
          filters={filters}
          scrollable
          scrollHeight="62vh"
          emptyMessage="No Subtemplates found!"
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
            header="Subtemplate"
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
            header="Other Details"
            // sortable
            // filter
            // filterPlaceholder="Search by Name"
            // style={{ minWidth: '8rem' }}
          ></Column>

          <Column
            field="total_keys"
            header="Fav. Keys"
            sortable
            dataType="numeric"
            filterPlaceholder="Search by Qty."
            className="numPart"
            // style={{ minWidth: '8rem' }}
            filter
          ></Column>

          <Column
            field="total_files"
            header="Total Files"
            sortable
            dataType="numeric"
            filterPlaceholder="Search by Qty."
            className="numPart"
            // style={{ minWidth: '8rem' }}
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
            onClick={deleteSubTempCheck}
          />
        </DataTable>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    documents: state.documents,
    user: state.user,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(TemplatesSubTable);

// export default TemplatesSubTable;
