import './TableDocDataRow.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

import TableDocDataAll from '../TableDocDataAll/TableDocDataAll';

const TableDocDataRow = (props) => {
  //   console.log(props.tableData);
  return (
    <tr className="tableDocDataRow">
      {props.rowData.rowData.map((tableDataSingle, index) => (
        <td key={tableDataSingle.index} className="rowEachDataTable">
          <TableDocDataAll tableDataSingle={tableDataSingle} />
        </td>
      ))}
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(TableDocDataRow);

// export default TableDocDataRow;
