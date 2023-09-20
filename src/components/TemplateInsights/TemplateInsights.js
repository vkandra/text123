import './TemplateInsights.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import TableInsightsRow from '../TableInsightsRow/TableInsightsRow';

const TemplateInsights = (props) => {
  useEffect(() => {
    let reqBody = {
      user_id: props.user.token,
      main_template: 'Bills',
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(reqBody));
  }, []);
  return (
    <div className="templateInsights">
      <div id="topInsSection">
        <div id="selectInsTempSect">
          <div id="selectTempInsLabel">Select Template</div>
          <div>
            <select name="templates" id="singleInsTemplateSelect">
              <optgroup label="Select Template">
                {props.documents.subTemplateNames.map(
                  (singletemplate, index) => (
                    <option
                      key={singletemplate.id}
                      singletemplate={singletemplate}
                      value={singletemplate.name}
                    >
                      {singletemplate.name}
                    </option>
                  )
                )}
              </optgroup>
            </select>
          </div>
        </div>
        <div className="detInsTempSect">
          <div className="tempInsLabelsDiv">
            Cust. Name:{' '}
            <span className="tempInsLabels">
              {props.documents.templateInsights.cust_name}
            </span>
          </div>
          <div className="tempInsLabelsDiv">
            Dept. Name:{' '}
            <span className="tempInsLabels">
              {props.documents.templateInsights.dept_name}
            </span>
          </div>
        </div>
        <div className="detInsTempSect">
          <div className="tempInsLabelsDiv">
            Project:{' '}
            <span className="tempInsLabels">
              {props.documents.templateInsights.proj_name}
            </span>
          </div>
          <div id="insTempDownload">
            <i class="fa-regular fa-circle-down"></i>&nbsp;Download
          </div>
        </div>
        {/* <div className="detInsTempSect"></div> */}
      </div>
      <div id="midInsSection">
        <table id="insTempTableid">
          <thead>
            <tr id="insTempTableRow1" className="insTempTableRow1cl">
              <th>File Name</th>
              <th>Date Processed</th>
              <th>Size</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {props.documents.templateInsights.file_details.map(
              (rowData, index) => (
                <TableInsightsRow rowData={rowData} key={rowData.file_id} />
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

export default connect(mapStateToProps)(TemplateInsights);

// export default TemplateInsights;
