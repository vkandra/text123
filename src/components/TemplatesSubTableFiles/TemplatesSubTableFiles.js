import './TemplatesSubTableFiles.css';
import React, { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import {
  assignSelectedDocDetails,
  dropdownSelected,
} from '../../actions/singleDocument';
import { changeTabOperation } from '../../actions/extractor';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TemplatesSubTableFiles = (props) => {
  const [selectedFiles1, setSelectedFiles1] = useState([]);

  const documentName = (rowData) => {
    return (
      <div className="documentNameSubTempTable">{rowData.document_name}</div>
    );
  };

  const documentStatus = (rowData) => {
    return (
      <div
        className={`${
          rowData.doc_status === 'Processed'
            ? 'colorGreen'
            : rowData.doc_status === 'Not Processed'
            ? 'colorRed'
            : 'colorBlue'
        }`}
      >
        {rowData.doc_status}
        {rowData.doc_status === 'Processing' ? '...' : null}
      </div>
    );
  };

  const changeToTextExtractionTab = () => {
    console.log(selectedFiles1);
    const { extractor } = props;
    extractor.page = 2;
    // var selectedPageIds = props.documents.selectedDocuments;
    let selectedPageIds = selectedFiles1;
    let docDetails = props.documents.documentDetails;
    let selectedDocDetails = [];
    for (var i = 0; i < docDetails.length; i++) {
      for (var j = 0; j < selectedPageIds.length; j++) {
        if (docDetails[i].documentId === selectedPageIds[j].doc_id) {
          selectedDocDetails.push(docDetails[i]);
        }
      }
    }
    props.dispatch(assignSelectedDocDetails(selectedDocDetails));

    props.dispatch(dropdownSelected(0));

    props.dispatch(changeTabOperation(extractor));
  };

  return (
    <div className="templatesSubTableFiles">
      <DataTable
        value={props.user.subTempFileTable}
        responsiveLayout="scroll"
        paginator
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        size="small"
        selection={selectedFiles1}
        onSelectionChange={(e) => setSelectedFiles1(e.value)}
        emptyMessage="No Subtemplates found!"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        className="tableSubTemp3"
      >
        <Column
          selectionMode="multiple"
          className="checkboxCell"
          style={{
            maxWidth: '30px',
            // display: 'none',
          }}
        ></Column>
        <Column
          field="document_name"
          header="Doc. Name"
          sortable
          style={{
            maxWidth: '630px',
          }}
          body={documentName}
        ></Column>
        <Column
          field="doc_status"
          header="Status"
          sortable
          style={{ maxWidth: '110px' }}
          body={documentStatus}
          className="textPart"
        ></Column>
        {/* <Column field="key" header="Keys" sortable></Column> */}
      </DataTable>
      <div className="subActionBu">
        {selectedFiles1.length === 0 ? (
          <button
            disabled
            className="viewFileDatadisabledButton configurationFileListFourDisabledButtons"
          >
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
        ) : (
          <button
            className="viewFileDataButton configurationFileListFourButtons"
            onClick={() => changeToTextExtractionTab()}
            data-dismiss="modal"
            aria-label="Close"
          >
            <i className="fi fi-rr-eye"></i> &nbsp;{' '}
            {props.themeLang.languageWords.View}
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    themeLang: state.themeLang,
    extractor: state.extractor,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(TemplatesSubTableFiles);

// export default TemplatesSubTableFiles;
