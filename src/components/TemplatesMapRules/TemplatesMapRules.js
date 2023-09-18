import './TemplatesMapRules.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { setTemplatesMapRulesData } from '../../actions/documents';
import TemplateMapRulesRows from '../TemplateMapRulesRows/TemplateMapRulesRows';

const TemplatesMapRules = (props) => {
  const navigateBackToTemplatesPage = () => {
    const { templateMapRule } = props.documents;
    console.log(templateMapRule);
    templateMapRule.overlay = false;
    templateMapRule.templateName = '';
    templateMapRule.templateId = '';
    templateMapRule.totalFiles = 0;
    templateMapRule.referenceFile = 'Not Set';
    templateMapRule.excelUploaded = false;
    templateMapRule.totalFields = 0;
    templateMapRule.totalFieldsMapped = 0;
    templateMapRule.totalFieldsRules = 0;

    props.dispatch(setTemplatesMapRulesData(templateMapRule));
  };
  return (
    <div className="templatesMapRules">
      <div id="overlayHeader">
        <div onClick={navigateBackToTemplatesPage} id="overlayBackToTemplates1">
          <i class="fa-solid fa-circle-left"></i>
        </div>
        <div id="overlayLabel"> Template Mapping and Rules</div>
        <div onClick={navigateBackToTemplatesPage} id="overlayBackToTemplates2">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div id="midOverlay">
        <div id="midOverlayTempName">
          Template Name: {props.documents.templateMapRuleData.templatename}{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reference File:{' '}
          {props.documents.templateMapRuleData.filename}
        </div>
        <div id="midOverlayFileName"></div>
      </div>
      <div id="overlayTable">
        <table id="overlayTableid">
          <thead>
            <tr id="overlayTableRow1" className="overlayTableRow1cl">
              <th>Rule ID</th>
              <th>I/P Attr.</th>
              <th>Source</th>
              <th>O/P Field</th>
              <th>O/P Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.documents.templateMapRuleData.all_excel_keys.map(
              (rowData, index) => (
                <TemplateMapRulesRows rowData={rowData} key={rowData.id} />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    documents: state.documents,
  };
};

export default connect(mapStateToProps)(TemplatesMapRules);

// export default TemplatesMapRules;
