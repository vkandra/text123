import './TemplateInsights.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import TableInsightsRow from '../TableInsightsRow/TableInsightsRow';
import {
  setInsightsSecondPage,
  setInsightsSingleFileData,
  setTemplateInsightsData,
} from '../../actions/documents';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { Image } from 'primereact/image';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import TemplateInsightsSecondPageRow from '../TemplateInsightsSecondPageRow/TemplateInsightsSecondPageRow';

const TemplateInsights = (props) => {
  const [templateNameSelected, setTemplateNameSelected] = useState('');
  const [templateSelectedDetails, setTemplateSelectedDetails] = useState({
    sub_template_id: -1,
    sub_template_name: '',
  });
  const [statusReviewedLoader, setStatusReviewedLoader] = useState(false);

  useEffect(() => {
    let reqBody = {
      user_id: props.user.token,
      main_template: 'Bills',
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(reqBody));
  }, []);

  useEffect(() => {
    if (props.singleDocument.saveSubTempDetails.length !== 0) {
      fetchTemplateFiles(props.singleDocument.saveSubTempDetails[0]);
      if (!props.documents.insightsSecondPage.display) {
        document.getElementById('singleInsTemplateSelect').value =
          props.singleDocument.saveSubTempDetails[0].sub_template_name;
        setTemplateNameSelected(
          props.singleDocument.saveSubTempDetails[0].sub_template_name
        );
      }
    }
  }, [props.singleDocument.saveSubTempDetails]);

  useEffect(() => {
    if (props.documents.insightsSecondPage.display === false) {
      document.getElementById('singleInsTemplateSelect').value =
        templateNameSelected;
      // fetchTemplateFiles(templateSelectedDetails);
    }
  }, [props.documents.insightsSecondPage.display]);

  //create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  const fetchTemplateFiles = (selectedTemplate) => {
    setTemplateNameSelected(selectedTemplate.sub_template_name);
    setTemplateSelectedDetails(selectedTemplate);
    // console.log(selectedTemplate);
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
    const data = {
      template_name: '',
      template_id: -1,
      file_name: '',
      file_id: '',
      file_url: '',
      file_data: [],
    };
    props.dispatch(setInsightsSingleFileData(data));
  };

  const markDocReviewed = () => {
    const data = {
      user_id: props.user.token,
      sub_template_id: props.documents.insight2ndPageFileDetail.template_id,
      document_id: props.documents.insight2ndPageFileDetail.file_id,
    };
    setStatusReviewedLoader(true);
    console.log(data);
    axios
      .post(
        `https://functionstexextraction.azurewebsites.net/api/template_documents_cosmoscontainers_metadataapi`,
        data
      )
      .then((res) => {
        console.log(res.data);
        setStatusReviewedLoader(false);
      })
      .catch(function (error) {
        alert(`Error while Updating status: ${error}`);
        setStatusReviewedLoader(false);
      });
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
              <div id="downloadAndRefresh">
                <div id="insTempDownload">
                  <i class="fa-regular fa-circle-down"></i>&nbsp;Download
                </div>
                <div
                  className="refreshIcDiv"
                  onClick={() => fetchTemplateFiles(templateSelectedDetails)}
                >
                  <i className="fi fi-rr-refresh"></i>
                </div>
              </div>
            </div>
            <div className="detInsTempSect2">
              <div className="tempInsLabelsDiv">
                Count:{' '}
                <span className="tempInsLabels">
                  {props.documents.templateInsights.excel_key_count}
                </span>
              </div>
            </div>
          </div>
          <div id="midInsSection">
            <table id="insTempTableid">
              <thead>
                <tr id="insTempTableRow1" className="insTempTableRow1cl">
                  <th>File Name</th>
                  <th>Date Processed</th>
                  <th>Confidence</th>
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

      {/* SECOND PAGE */}
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
              <div className="secondPageLabel1">
                {' '}
                &nbsp;&nbsp;Template:&nbsp;
                <span className="secondPageLabelAns1">
                  {props.documents.insightsSecondPage.template_name}
                </span>
                &nbsp;&nbsp;
              </div>
              <div className="secondPageLabel2">
                {' '}
                File:&nbsp;
                <span className="secondPageLabelAns2">
                  {props.documents.insightsSecondPage.file_name}
                </span>
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
                            key={index}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div id="submitAndCancelInsightsSingFile">
                  <div
                    id="cancelButtonToInsightPage"
                    onClick={navigateBackToFirstPage}
                  >
                    Cancel
                  </div>{' '}
                  <div id="submitButtonReviewed" onClick={markDocReviewed}>
                    {statusReviewedLoader && (
                      <ClipLoader color="#384988" size={10} />
                    )}
                    &nbsp; Submit &nbsp;
                  </div>
                </div>
              </div>
              <div id="secPgFileView">
                {props.documents.insightsSecondPage.file_url
                  .split('.')
                  .pop() === 'pdf' ? (
                  <div className="pdf-container">
                    <>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={props.documents.insightsSecondPage.file_url}
                          plugins={[defaultLayoutPluginInstance]}
                          defaultScale={1.5}
                        />
                      </Worker>
                    </>
                  </div>
                ) : (
                  <div className="imageDisplaydivIns2nd">
                    {/* <img
                      id="imageDisplay"
                      // src="https://images.freeimages.com/images/previews/d0f/nuclear-power-plant-1314782.jpg"
                      src={props.singleDocument.singleDocumentDownloadLink}
                      alt="Not Found"
                    /> */}
                    <Image
                      imageClassName="imageDisplayIns2nd"
                      // downloadable
                      // src="https://images.freeimages.com/images/previews/d0f/nuclear-power-plant-1314782.jpg"
                      src={props.documents.insightsSecondPage.file_url}
                      alt="Not Found"
                      preview
                    />
                  </div>
                )}
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
