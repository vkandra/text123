import './TableInsightsRow.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { setInsightsSecondPage } from '../../actions/documents';

const TableInsightsRow = (props) => {
  const viewSecondPage = () => {
    const param = {
      display: true,
      file_name: props.rowData.file_name,
      template_name: props.documents.templateInsights.template_name,
      file_url: props.rowData.file_url,
    };
    props.dispatch(setInsightsSecondPage(param));
  };
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
      <td className="tableInsightsRowView" onClick={viewSecondPage}>
        <i class="fa-solid fa-eye"></i>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(TableInsightsRow);

// export default TableInsightsRow;
