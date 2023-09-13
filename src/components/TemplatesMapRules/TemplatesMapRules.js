import './TemplatesMapRules.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { setTemplatesMapRulesData } from '../../actions/documents';

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
      <div className="overlay">
        <div className="overlay-content">
          <h2>Overlay Content</h2>
          <p>This is the overlay content that appears over the main page.</p>
          <button onClick={navigateBackToTemplatesPage}>Close Overlay</button>
        </div>
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
