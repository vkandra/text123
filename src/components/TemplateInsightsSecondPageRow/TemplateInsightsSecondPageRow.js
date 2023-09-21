import './TemplateInsightsSecondPageRow.css';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux/es/exports';
import editIcon from '../../Pictures/pencil-solid.svg';
import saveIcon from '../../Pictures/floppy-disk-regular.svg';
import axios from 'axios';

const TemplateInsightsSecondPageRow = (props) => {
  const [edited, setEdited] = useState(false);

  const textareaRef = useRef(null);

  const saveData = () => {
    const data = {
      uniq_id: props.rowData.uniq_id,
      userid: props.user.token,
    };
    console.log(data);
    setEdited(false);
    // axios
    //   .post(
    //     `https://functionstexextraction.azurewebsites.net/api/mappromptupdatecosmosdbitem`,
    //     data
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <tr className="templateInsightsSecondPageRow">
      <td className="secPgtdExcelField">{props.rowData.excel_field}</td>
      <td className="secPgtdOPValue">
        {edited ? (
          <textarea
            ref={textareaRef}
            class="secPgtextareaPrompt"
            rows="2"
            style={{ width: '100%', minHeight: 30 }}
            placeholder="Type here..."
            defaultValue={props.rowData.output_value}
          ></textarea>
        ) : (
          <div>{props.rowData.output_value}</div>
        )}
      </td>
      <td className="secPgtdConfScore">{props.rowData.conf_score}</td>
      <td className="secPgtdSource">{props.rowData.source}</td>
      <td className="secPgtdFlags">{props.rowData.flags}</td>
      <td>
        {edited ? (
          <div className="secPgRowEditIDiv" onClick={saveData}>
            <img src={saveIcon} alt="Save" />
          </div>
        ) : (
          <div className="secPgRowEditIDiv" onClick={() => setEdited(true)}>
            <img src={editIcon} alt="Edit" />
          </div>
        )}
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

export default connect(mapStateToProps)(TemplateInsightsSecondPageRow);

// export default TemplateInsightsSecondPageRow;
