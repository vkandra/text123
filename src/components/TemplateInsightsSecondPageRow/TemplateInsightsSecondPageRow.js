import './TemplateInsightsSecondPageRow.css';
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux/es/exports';
import editIcon from '../../Pictures/pencil-solid.svg';
import saveIcon from '../../Pictures/floppy-disk-regular.svg';
import axios from 'axios';
import { setInsightsSingleFileData } from '../../actions/documents';

const TemplateInsightsSecondPageRow = (props) => {
  const [edited, setEdited] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    // console.log(props.rowData);
  }, []);

  const saveData = () => {
    console.log(props.rowData);
    const data = {
      new_edited_value: textareaRef.current.value,
      file_name: props.documents.insightsSecondPage.file_name,
      file_id: props.documents.insight2ndPageFileDetail.file_id,
      template: props.documents.insightsSecondPage.template_name,
      template_id: props.documents.insight2ndPageFileDetail.template_id,
      rule_id: props.rowData.rule_id,
      field: props.rowData.excel_field,
      source: props.rowData.source,
      user_id: props.user.token,
    };
    console.log(data);
    setEdited(false);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/FilewiseEdit`,
        data
      )
      .then((res) => {
        console.log(res.data);
        const data2 = {
          user_id: props.user.token,
          template_name: props.documents.insight2ndPageFileDetail.template_name,
          template_id: props.documents.insight2ndPageFileDetail.template_id,
          file_name: props.documents.insight2ndPageFileDetail.file_name,
          file_id: props.documents.insight2ndPageFileDetail.file_id,
        };
        console.log(data2);
        axios
          .post(
            `https://functionstexextraction.azurewebsites.net/api/cytext_promptapi`,
            data2
          )
          .then((res) => {
            console.log(res.data);
            props.dispatch(setInsightsSingleFileData(res.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        alert('Error While Trying To Update Data!');
        console.log(error);
      });
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
