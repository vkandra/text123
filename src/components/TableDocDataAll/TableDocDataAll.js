import './TableDocDataAll.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import {
  editTableData,
  saveEditedTableData,
} from '../../actions/singleDocument';

const TableDocDataAll = (props) => {
  const handleEditing = () => {
    const { singleDocument } = props;
    singleDocument.editedTableData.type = props.tableDataSingle.type;
    singleDocument.editedTableData.tableNum = props.tableDataSingle.tableNum;
    singleDocument.editedTableData.rowNum = props.tableDataSingle.rowNum;
    singleDocument.editedTableData.index = props.tableDataSingle.index;
    props.dispatch(editTableData(singleDocument));
    // console.log(props.tableDataSingle);
    // console.log(singleDocument.editedTableData);
  };

  const captureEditedText = (e) => {
    const { singleDocument } = props;
    singleDocument.editedTableData.text = e.target.value;
    props.dispatch(editTableData(singleDocument));
    // console.log(singleDocument.editedTableData);
  };

  const saveEditedTableSingleData = () => {
    const { singleDocument } = props;

    if (singleDocument.editedTableData.type === 'header') {
      for (var i = 0; i < singleDocument.singleDocTablesAll.length; i++) {
        for (
          var j = 0;
          j < singleDocument.singleDocTablesAll[i].tableHeader.length;
          j++
        ) {
          if (
            props.tableDataSingle.tableNum ===
              singleDocument.singleDocTablesAll[i].tableHeader[j].tableNum &&
            props.tableDataSingle.rowNum ===
              singleDocument.singleDocTablesAll[i].tableHeader[j].rowNum &&
            props.tableDataSingle.index ===
              singleDocument.singleDocTablesAll[i].tableHeader[j].index
          ) {
            if (singleDocument.editedTableData.text === '') {
              break;
            } else {
              if (singleDocument.editedTableData.type === 'header') {
                singleDocument.singleDocTablesAll[i].tableHeader[j].editedData =
                  singleDocument.editedTableData.text;
                break;
              }
            }
          }
        }
      }
    }
    if (singleDocument.editedTableData.type === 'rowdata') {
      for (var i = 0; i < singleDocument.singleDocTablesAll.length; i++) {
        for (
          var j = 0;
          j < singleDocument.singleDocTablesAll[i].tableData.length;
          j++
        ) {
          for (
            var k = 0;
            k <
            singleDocument.singleDocTablesAll[i].tableData[j].rowData.length;
            k++
          ) {
            if (
              props.tableDataSingle.tableNum ===
                singleDocument.singleDocTablesAll[i].tableData[j].rowData[k]
                  .tableNum &&
              props.tableDataSingle.rowNum ===
                singleDocument.singleDocTablesAll[i].tableData[j].rowData[k]
                  .rowNum &&
              props.tableDataSingle.index ===
                singleDocument.singleDocTablesAll[i].tableData[j].rowData[k]
                  .index
            ) {
              if (singleDocument.editedTableData.text === '') {
                break;
              } else {
                if (singleDocument.editedTableData.type === 'rowdata') {
                  singleDocument.singleDocTablesAll[i].tableData[j].rowData[
                    k
                  ].editedData = singleDocument.editedTableData.text;
                  break;
                }
              }
            }
            // console.log(
            //   singleDocument.singleDocTablesAll[i].tableData[j].rowData[k]
            // );
          }
        }
      }
    }

    props.dispatch(saveEditedTableData(singleDocument));

    singleDocument.editedTableData.type = '';
    singleDocument.editedTableData.tableNum = 0;
    singleDocument.editedTableData.rowNum = -1;
    singleDocument.editedTableData.index = -1;
    singleDocument.editedTableData.text = '';
    props.dispatch(editTableData(singleDocument));
    // console.log(singleDocument.editedTableData);
  };

  return (
    <div className="tableDocDataAll">
      {/* {props.tableDataSingle.editedData} */}

      <div className="currentDataAndEdit">
        <div className="currentDataDisplay">
          {props.tableDataSingle.editedData}
        </div>
        <button className="editTextButtonTable" onClick={() => handleEditing()}>
          Edit
        </button>
      </div>
      {props.singleDocument.editedTableData.type ===
        props.tableDataSingle.type &&
      props.singleDocument.editedTableData.index ===
        props.tableDataSingle.index &&
      props.singleDocument.editedTableData.tableNum ===
        props.tableDataSingle.tableNum &&
      props.singleDocument.editedTableData.rowNum ===
        props.tableDataSingle.rowNum ? (
        <div className="textAreaDivButtons">
          <textarea
            className="textAreaSection"
            defaultValue={props.tableDataSingle.editedData}
            onChange={captureEditedText}
          ></textarea>
          <div className="textAreaButtonsDiv">
            <button
              className="editCompleteButton"
              onClick={() => saveEditedTableSingleData()}
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
      {props.tableDataSingle.data !== props.tableDataSingle.editedData ? (
        <div className="orgnlExtractedDataDisplayArea">
          <div className="orgnlExtDataTxt">Extracted Data: </div>
          <div className="orgnlExtData">{props.tableDataSingle.data}</div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(TableDocDataAll);

// export default TableDocDataAll;
