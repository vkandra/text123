import './CustomerConfRow.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { downloadZipOfExcelFilesAPI } from '../../actions/extractor';

const CustomerConfRow = (props) => {
  const downloadExcel = () => {
    props.dispatch(downloadZipOfExcelFilesAPI(props.rowData.url));
  };
  const formatDate = (inputDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      'en-US',
      options
    );
    const [day, month, year] = formattedDate.split(' ');
    return `${day} ${month} ${year}`;
  };
  return (
    <tr className={`customerConfRow`}>
      <td
        className="customerConfFName"
        // id={`customerConfFName-${props.rowData.index}`}
      >
        {props.rowData.filename}
      </td>
      <td className="customerConfDate">
        {formatDate(props.rowData.last_modified)}
      </td>
      <td className="customerConfSize">
        {(props.rowData.size / (1024 * 1024)).toFixed(2)} MB
      </td>
      <td className="customerConfDwnld" onClick={downloadExcel}>
        <i class="fa-regular fa-circle-down"></i>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CustomerConfRow);

// export default CustomerConfRow;
