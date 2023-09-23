import './TableInsightsRow.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import {
  setInsightsSecondPage,
  setInsightsSingleFileData,
} from '../../actions/documents';
import axios from 'axios';

const TableInsightsRow = (props) => {
  const viewSecondPage = () => {
    const param = {
      display: true,
      file_name: props.rowData.file_name,
      template_name: props.documents.templateInsights.template_name,
      file_url: props.rowData.file_url,
    };
    props.dispatch(setInsightsSecondPage(param));
    const data = {
      user_id: props.user.token,
      template_name: props.documents.templateInsights.template_name,
      template_id: props.documents.templateInsights.template_id,
      file_name: props.rowData.file_name,
      file_id: props.rowData.file_id,
    };
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/cytext_promptapi`,
        data
      )
      .then((res) => {
        console.log(res.data);
        props.dispatch(setInsightsSingleFileData(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function formatDate(inputDate) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      'en-US',
      options
    );
    const [day, month, year] = formattedDate.split(' ');
    return `${day} ${month} ${year}`;
  }

  return (
    <tr className={`tableInsightsRow`}>
      <td
        className="tableInsightsRowFName"
        id={`tableInsightsRowFName-${props.rowData.file_id}`}
      >
        {props.rowData.file_name}
      </td>
      <td className="tableInsightsRowDatePr">
        {formatDate(props.rowData.file_processed)}
      </td>
      <td className="tableInsightsRowSize">
        {(props.rowData.file_size / (1024 * 1024)).toFixed(2)} MB
      </td>
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
