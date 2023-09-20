import './TableInsightsRow.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

const TableInsightsRow = (props) => {
  return (
    <tr className={`tableInsightsRow`}>
      <td
        className="tableInsightsRowFName"
        id={`tableInsightsRowFName-${props.rowData.file_id}`}
      >
        {props.rowData.file_name}
      </td>
      <td className="tableInsightsRowDatePr">{props.rowData.file_processed}</td>
      <td className="tableInsightsRowSize">{props.rowData.file_size}</td>
      <td className="tableInsightsRowStatus">
        {props.rowData.file_review_status}
      </td>
      <td className="tableInsightsRowView">
        <i class="fa-solid fa-eye"></i>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TableInsightsRow);

// export default TableInsightsRow;
