import './TableDocDataNum.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import TableDocDataAll from '../TableDocDataAll/TableDocDataAll';
import TableDocDataRow from '../TableDocDataRow/TableDocDataRow';

const TableDocDataNum = (props) => {
  return (
    <div className="tableDocDataNum">
      <div className="tableNumText">
        Table No. {props.singleDocTable.tableNum + 1}
      </div>
      <div className="tableNumDataEach">
        <table>
          <thead>
            <tr>
              {props.singleDocTable.tableHeader.map(
                (tableDataSingle, index) => (
                  <th key={tableDataSingle.index} className="headersTable">
                    <TableDocDataAll tableDataSingle={tableDataSingle} />
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {props.singleDocTable.tableData.map((rowData, index) => (
              <TableDocDataRow rowData={rowData} key={rowData.index} />
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singlDocument: state.singlDocument,
  };
};

export default connect(mapStateToProps)(TableDocDataNum);

// export default TableDocDataNum;
