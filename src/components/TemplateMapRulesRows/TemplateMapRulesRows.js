import './TemplateMapRulesRows.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import editIcon from '../../Pictures/pencil-solid.svg';
import saveIcon from '../../Pictures/floppy-disk-regular.svg';
import axios from 'axios';
import { singleTemplateMapRulesDataAPI } from '../../actions/documents';

const TemplateMapRulesRows = (props) => {
  const [source, setSource] = useState('map');
  const [edited, setEdited] = useState(false);
  const [unusedKeys, setUnusedKeys] = useState([]);
  const [outputValue, setOutputValue] = useState('');

  const [selectedKeyDet, setSelectedKeyDet] = useState({
    cytext_key: '',
    cytext_value: '',
    page_no: -1,
    repeat_no: -1,
    map_status: '',
  });

  useEffect(() => {
    if (props.rowData.selection !== 'map') {
      setSource('prompt');
    }
    let all_cytext_keys = [
      ...props.documents.templateMapRuleData.all_cytext_keys,
    ];
    let unusedKeys_temp = [];
    for (let i = 0; i < all_cytext_keys.length; i++) {
      if (all_cytext_keys[i].map_status === 'unused') {
        unusedKeys_temp.push(all_cytext_keys[i]);
      }
    }
    setUnusedKeys(unusedKeys_temp);
    if (props.rowData.selection === 'map') {
      setOutputValue(props.rowData.map_cytext_value);
    }
    if (props.rowData.selection === 'prompt') {
      setOutputValue(props.rowData.prompt_output);
    }
  }, []);

  // useEffect(() => {
  //   if (edited) {
  //     document
  //       .getElementById(`tempMapRulesRowRuleId-${props.rowData.id}`)
  //       .classList.add('bg-edited');
  //   } else {
  //     document
  //       .getElementById(`tempMapRulesRowRuleId-${props.rowData.id}`)
  //       .classList.remove('bg-edited');
  //   }
  // }, [edited]);

  const toggleSource = (selection) => {
    if (source !== selection) {
      setSource(selection);
    }
    checkIfEditsMade(selection);
  };

  const checkIfEditsMade = (selection) => {
    if (selection !== props.rowData.selection) {
      setEdited(true);
    } else {
      setEdited(false);
    }
  };

  const setSelectedOutputBasedOnKey = (selectedKeyDetail) => {
    console.log(selectedKeyDetail);
    setOutputValue(selectedKeyDetail.cytext_value);
    setSelectedKeyDet(selectedKeyDetail);
  };

  const saveData = () => {
    const data = {
      uniq_id: props.rowData.uniq_id,
      userid: props.user.token,
      templatename: props.documents.templateMapRuleData.templatename,
      templateid: props.documents.templateMapRuleData.template_id,
      rule_id: props.rowData.rule_id,
      excel_key: props.rowData.excel_key,
      map_cytext_key: selectedKeyDet.cytext_key,
      map_cytext_value: selectedKeyDet.cytext_value,
      map_cytext_key_page: selectedKeyDet.page_no,
      map_cytext_key_repeat: selectedKeyDet.repeat_no,
      prompt: 'New prompt',
      selection: source,
      prompt_output: 'New prompt_output',
    };
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/mappromptupdatecosmosdbitem`,
        data
      )
      .then((res) => {
        console.log(res.data);
        const data1 = {
          user_id: data.userid,
          template_id: data.templateid,
        };
        props.dispatch(singleTemplateMapRulesDataAPI(data1));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <tr className={`templateMapRulesRows ${edited ? 'bg-edited' : null}`}>
      <td
        className="tempMapRulesRowRuleId"
        id={`tempMapRulesRowRuleId-${props.rowData.rule_id}`}
      >
        {props.rowData.rule_id}
      </td>
      <td className="tempMapRulesRowExcelKey">{props.rowData.excel_key}</td>
      <td className="tempMapRulesRowMapNPrompttd">
        <div className="tempMapRulesRowMapNPrompt">
          <div
            id={`tempMapRulesRowMap-${props.rowData.rule_id}`}
            className={`tempMapRulesRowMap ${
              source === 'map' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('map')}
          >
            Map
          </div>{' '}
          <div
            id={`tempMapRulesRowPrompt-${props.rowData.rule_id}`}
            className={`tempMapRulesRowPrompt  ${
              source === 'prompt' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('prompt')}
          >
            Prompt
          </div>
        </div>
      </td>
      <td className="tempMapRulesRowIOPField">
        {edited ? (
          <div className="tempMapRulesRowIOPFieldOdiv">
            {source === 'map' ? (
              <div className="tempMapRulesRowIOPFieldSelectKeysOdiv">
                <select
                  name="map_cytext_keys"
                  id={`map_cytext_keys_select-${props.rowData.rule_id}`}
                  className="tempMapRulesRowIOPFieldSelectKeys"
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedKeyDetail = unusedKeys[selectedIndex];
                    setSelectedOutputBasedOnKey(selectedKeyDetail);
                  }}
                >
                  {unusedKeys.map((singleKeyDetail, index) => (
                    <option value={`${singleKeyDetail.cytext_key}`} key={index}>
                      {singleKeyDetail.cytext_key}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>Input Field</div>
            )}
          </div>
        ) : (
          <div className="tempMapRulesRowIOPFieldOdiv">
            {source === 'map'
              ? props.rowData.map_cytext_key
              : props.rowData.prompt}
          </div>
        )}
      </td>
      <td className="tempMapRulesRowIOPValue">{outputValue}</td>
      <td className="tempMapRulesRowEdit">
        {/* <div className="tempMapRulesRowEditODiv"> */}
        {edited ? (
          <div className="tempMapRulesRowEditIDiv" onClick={saveData}>
            <img src={saveIcon} alt="Save" />
          </div>
        ) : (
          <div
            className="tempMapRulesRowEditIDiv"
            onClick={() => setEdited(true)}
          >
            <img src={editIcon} alt="Edit" />
          </div>
        )}
        {/* </div> */}
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

export default connect(mapStateToProps)(TemplateMapRulesRows);

// export default TemplateMapRulesRows;
