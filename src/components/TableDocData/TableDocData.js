import './TableDocData.css';
import React from 'react';

import { connect } from 'react-redux/es/exports';
import TableDocDataNum from '../TableDocDataNum/TableDocDataNum';

const TableDocData = (props) => {
  return (
    <div className="tableDocData">
      <div className="allTables">
        {props.singleDocument.singleDocTablesAll.map(
          (singleDocTable, index) => (
            <TableDocDataNum
              singleDocTable={singleDocTable}
              key={singleDocTable.tableNum}
            />
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(TableDocData);

// export default TableDocData;
