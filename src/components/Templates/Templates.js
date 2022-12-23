import './Templates.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { addDeletefetchTemplateAPI } from '../../actions/singleDocument';
import { updateSubTemplateNames } from '../../actions/documents';
import TestComponent from '../TestComponent/TestComponent';
import {
  setTemplateData,
  setSelectedMainTemplate,
  setSubtemplatesData,
  fetchTemplatesDataAPI,
} from '../../actions/user';
import TemplatesSubTable from '../TemplatesSubTable/TemplatesSubTable';

const Templates = (props) => {
  useEffect(() => {
    let obj1 = { user_id: props.user.token };
    props.dispatch(fetchTemplatesDataAPI(obj1));

    if (props.user.templatesData.user_id !== '') {
      if (props.user.selectedMainTemplate === '') {
        props.dispatch(
          setSelectedMainTemplate(
            props.user.templatesData.template_details[0].main_template_name
          )
        );
      }
    }

    // assignSubTempDataToReducer();
  }, []);

  useEffect(() => {
    console.log(3);
    assignSubTempDataToReducer();
  }, [props.user.selectedMainTemplate]);

  const assignSubTempDataToReducer = () => {
    for (let i = 0; i < props.user.templatesData.template_details.length; i++) {
      if (
        props.user.selectedMainTemplate ===
        props.user.templatesData.template_details[i].main_template_name
      ) {
        props.dispatch(
          setSubtemplatesData(
            props.user.templatesData.template_details[i].sub_template_details
          )
        );
        break;
      }
    }
  };

  const changeMainTabs = (mainTempName) => {
    props.dispatch(setSelectedMainTemplate(mainTempName));
  };

  const createSubTemp = () => {
    const selectedMainTemp = document.getElementById('mainTempSel1').value;
    const subTempName = document.getElementById('subTempName').value;
    console.log(selectedMainTemp, subTempName);
    let data = {
      user_id: props.user.token,
      main_template: selectedMainTemp,
      sub_template: subTempName,
      action: 'add',
    };
    props.dispatch(addDeletefetchTemplateAPI(data));
    fetchData();
    document.getElementById('subTempName').value = '';
  };

  const fetchData = () => {
    const selectedMainTemp = document.getElementById('mainTempSel2').value;
    let data = {
      user_id: props.user.token,
      main_template: selectedMainTemp,
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplateAPI(data));
  };

  return (
    <div className="templates">
      {props.user.token == props.user.templatesData.user_id ? (
        <div className="mainTemplates">
          {props.user.templatesData.template_details.map(
            (singletemplate, index) => (
              <div
                className={`mainTemplateTabs ${
                  props.user.selectedMainTemplate ===
                  singletemplate.main_template_name
                    ? 'selectedMain'
                    : null
                }`}
                key={index}
                singletemplate={singletemplate}
                onClick={() =>
                  changeMainTabs(singletemplate.main_template_name)
                }
              >
                {singletemplate.main_template_name}
              </div>
            )
          )}
        </div>
      ) : (
        <div>User Not Found!</div>
      )}
      {props.user.templatesData.template_details.length > 0 ? (
        <div className="subtemplatesSection">
          <TemplatesSubTable
            assignSubTempDataToReducer={assignSubTempDataToReducer}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    documents: state.documents,
    user: state.user,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(Templates);

// export default Templates;
{
  /* <div className="templateTopSection">
        <div className="createDeleteTemplate">
          <div className="templateCreationDiv">
            <div className="templateLabel">Create Sub-Template</div>

            <div className="formActionTemplate">
              <select
                id="mainTempSel1"
                className="selectOption"
                onChange={() => {
                  getSelectedSubTemplates();
                }}
              >
                <optgroup label="Select Main Template">
                  {props.documents.templateNames.map(
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

              <input
                placeholder="New Sub-Template Name"
                name="newTemplate"
                className="newTempInput"
                id="subTempName"
              ></input>

              <button
                type="button"
                className="btn btn-success createTemplateButton"
                onClick={() => createSubTemp()}
              >
                Create
              </button>
            </div>
          </div>
          <div className="templateDeletionDiv">
            <div className="templateLabel">Delete Sub-Template</div>
            <div className="formActionTemplate">
              <select
                id="mainTempSel2"
                className="selectOption"
                onChange={() => {
                  getSelectedSubTemplates();
                }}
              >
                <optgroup label="Select Main Template">
                  {props.documents.templateNames.map(
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

              <select className="selectOption" id="subTempSel1">
                <optgroup label="Select Sub-Template">
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

              <button
                type="button"
                className="btn btn-danger deleteTemplateButton"
                onClick={() => deleteSubTemp()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */
}
