import './TemplateInsights.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import TableInsightsRow from '../TableInsightsRow/TableInsightsRow';
import {
  setInsightsSecondPage,
  setTemplateInsightsData,
} from '../../actions/documents';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import axios from 'axios';
import TemplateInsightsSecondPageRow from '../TemplateInsightsSecondPageRow/TemplateInsightsSecondPageRow';

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

  //create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  const fetchTemplateFiles = (selectedTemplate) => {
    const data = {
      user_id: props.user.token,
      sub_template_id: selectedTemplate.sub_template_id,
      sub_template_name: selectedTemplate.sub_template_name,
    };
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/template_documents_cosmoscontainers_metadataapi`,
        data
      )
      .then((res) => {
        console.log(1);
        console.log(res.data);
        props.dispatch(setTemplateInsightsData(res.data));
        // const data1 = {
        //   user_id: data.userid,
        //   template_id: data.templateid,
        // };
        // props.dispatch(singleTemplateMapRulesDataAPI(data1));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigateBackToFirstPage = () => {
    const param = {
      display: false,
      file_name: '',
      template_name: '',
      file_url: '',
    };
    props.dispatch(setInsightsSecondPage(param));
  };

  return (
    <div className="templateInsights">
      {!props.documents.insightsSecondPage.display && (
        <div id="tempInsFirstPage">
          <div id="topInsSection">
            <div id="selectInsTempSect">
              <div id="selectTempInsLabel">Select Template</div>
              <div>
                <select
                  name="templates"
                  id="singleInsTemplateSelect"
                  // onChange={fetchTemplateFiles}
                  onChange={(event) => {
                    // console.log(event.target.selectedIndex);
                    const selectedIndex = event.target.selectedIndex;
                    const selectedTemplateDetail =
                      props.singleDocument.saveSubTempDetails[selectedIndex];
                    fetchTemplateFiles(selectedTemplateDetail);
                  }}
                >
                  <optgroup label="Select Template">
                    {props.singleDocument.saveSubTempDetails.map(
                      (singletemplate, index) => (
                        <option
                          key={singletemplate.sub_template_id}
                          singletemplate={singletemplate}
                          value={singletemplate.sub_template_name}
                        >
                          {singletemplate.sub_template_name}
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
      )}
      {props.documents.insightsSecondPage.display && (
        <div className="templateInsights2">
          <div id="templateInsights2Container1">
            <div id="secondPageHeader">
              <div
                onClick={navigateBackToFirstPage}
                id="secondPageBackToTemplates1"
              >
                <i class="fa-solid fa-circle-left"></i>
              </div>
              <div id="secondPageLabel">
                {' '}
                &nbsp;&nbsp;Template -{' '}
                {props.documents.insightsSecondPage.template_name}
                &nbsp;&nbsp;
              </div>
              <div id="secondPageLabel">
                {' '}
                File - {props.documents.insightsSecondPage.file_name}
                &nbsp;&nbsp;
              </div>
              <div
                onClick={navigateBackToFirstPage}
                id="secondPageBackToTemplates2"
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div id="secPgContainer">
              <div id="secPgFileDetail">
                <div id="secPgTable">
                  <table id="secPgTableid">
                    <thead>
                      <tr id="secPgTableRow1" className="secPgTableRow1cl">
                        <th>Input</th>
                        <th>Output Value</th>
                        <th>Conf. Score</th>
                        <th>Source</th>
                        <th>Flags</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.documents.insight2ndPageFileDetail.file_data.map(
                        (rowData, index) => (
                          <TemplateInsightsSecondPageRow
                            rowData={rowData}
                            key={rowData.rule_id}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div id="secPgFileView">
                <div className="pdf-container">
                  <>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={props.documents.insightsSecondPage.file_url}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </Worker>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    documents: state.documents,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(TemplateInsights);

// export default TemplateInsights;
