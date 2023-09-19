import './TemplateMapRulesRows.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

const TemplateMapRulesRows = (props) => {
  const [source, setSource] = useState('map');
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (props.rowData.selection !== 'map') {
      setSource('prompt');
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

  return (
    <tr className="templateMapRulesRows">
      <td
        className={`tempMapRulesRowRuleId ${edited ? 'bg-edited' : null}`}
        id={`tempMapRulesRowRuleId-${props.rowData.id}`}
      >
        {props.rowData.id}
      </td>
      <td className="tempMapRulesRowExcelKey">{props.rowData.excel_key}</td>
      <td className="tempMapRulesRowMapNPrompttd">
        <div className="tempMapRulesRowMapNPrompt">
          <div
            id={`tempMapRulesRowMap-${props.rowData.id}`}
            className={`tempMapRulesRowMap ${
              source === 'map' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('map')}
          >
            Map
          </div>{' '}
          <div
            id={`tempMapRulesRowPrompt-${props.rowData.id}`}
            className={`tempMapRulesRowPrompt  ${
              source === 'prompt' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('prompt')}
          >
            Prompt
          </div>
        </div>
      </td>
      <td>{props.rowData.id}</td>
      <td>{props.rowData.id}</td>
      <td className="tempMapRulesRowEdit">
        <div className="tempMapRulesRowEditODiv">
          {edited ? (
            <div className="tempMapRulesRowEditIDiv">
              <i class="fa-regular fa-floppy-disk"></i>
            </div>
          ) : (
            <div className="tempMapRulesRowEditIDiv">
              <i class="fa-solid fa-pencil"></i>
            </div>
          )}
        </div>
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
