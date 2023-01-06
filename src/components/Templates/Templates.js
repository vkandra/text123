import './Templates.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import {
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

  return (
    <div className="templates">
      {props.user.token === props.user.templatesData.user_id ? (
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
        <div className="loadingTempData">Loading Data... Please Wait!</div>
      )}
      {/* <div className="loadingTempData">Loading Data... Please Wait!</div> */}
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
