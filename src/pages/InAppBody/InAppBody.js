import './InAppBody.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { changeTabOperation } from '../../actions/extractor';
import Annotation from '../../components/Annotation/Annotation';
import TextExtraction from '../../components/TextExtraction/TextExtraction';
import ObjectDetection from '../../components/ObjectDetection/ObjectDetection';
import Dashboards from '../../components/Dashboards/Dashboards';
import Configuration from '../../components/Configuration/Configuration';

const InAppBody = (props) => {
  const changeMainTabs = (tabNum) => {
    const { extractor } = props;
    extractor.page = tabNum;
    props.dispatch(changeTabOperation(extractor));
  };

  return (
    <div className="inAppBody">
      <div className="bodyContainer">
        <div className="menuContainer">
          <div
            className={`singleMenus ${
              props.extractor.page === 1 ? 'selectedMenu' : ''
            }`}
            id="singleMenu1"
            onClick={() => changeMainTabs(1)}
          >
            Configuration
          </div>
          <div
            className={`singleMenus ${
              props.extractor.page === 2 ? 'selectedMenu' : ''
            }`}
            id="singleMenu2"
            onClick={() => changeMainTabs(2)}
          >
            Text Extraction
          </div>
          <div
            className={`singleMenus ${
              props.extractor.page === 3 ? 'selectedMenu' : ''
            }`}
            id="singleMenu3"
            onClick={() => changeMainTabs(3)}
          >
            Annotation
          </div>
          <div
            className={`singleMenus ${
              props.extractor.page === 4 ? 'selectedMenu' : ''
            }`}
            id="singleMenu4"
            onClick={() => changeMainTabs(4)}
          >
            Object Detection
          </div>
          <div
            className={`singleMenus ${
              props.extractor.page === 5 ? 'selectedMenu' : ''
            }`}
            id="singleMenu5"
            onClick={() => changeMainTabs(5)}
          >
            Dashboards
          </div>
        </div>
        <div className="visualBodyContainer">
          {props.extractor.page === 1 ? (
            <Configuration />
          ) : props.extractor.page === 2 ? (
            <TextExtraction />
          ) : props.extractor.page === 3 ? (
            <Annotation />
          ) : props.extractor.page === 4 ? (
            <ObjectDetection />
          ) : props.extractor.page === 5 ? (
            <Dashboards />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
  };
};

export default connect(mapStateToProps)(InAppBody);
