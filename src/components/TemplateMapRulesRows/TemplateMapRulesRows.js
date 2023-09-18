import './TemplateMapRulesRows.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';

const TemplateMapRulesRows = (props) => {
  const [source, setSource] = useState('Map');

  useEffect(() => {
    if (props.rowData.selection !== 'map') {
      setSource('Prompt');
    }
  }, []);

  const toggleSource = (selection) => {
    if (source !== selection) {
      setSource(selection);
    }
  };

  return (
    <tr className="templateMapRulesRows">
      <td className="tempMapRulesRowRuleId">{props.rowData.id}</td>
      <td className="tempMapRulesRowExcelKey">{props.rowData.excel_key}</td>
      <td className="tempMapRulesRowMapNPrompttd">
        <div className="tempMapRulesRowMapNPrompt">
          <div
            id={`tempMapRulesRowMap-${props.rowData.id}`}
            className={`tempMapRulesRowMap ${
              source === 'Map' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('Map')}
          >
            Map
          </div>{' '}
          <div
            id={`tempMapRulesRowPrompt-${props.rowData.id}`}
            className={`tempMapRulesRowPrompt  ${
              source === 'Prompt' ? 'selectedSource' : null
            }`}
            onClick={() => toggleSource('Prompt')}
          >
            Prompt
          </div>
        </div>
      </td>
      <td>{props.rowData.id}</td>
      <td>{props.rowData.id}</td>
      <td className="tempMapRulesRowEdit">
        <i class="fa-solid fa-pencil"></i>
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
