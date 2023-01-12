import './InAppBody.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { changeTabOperation } from '../../actions/extractor';
import Annotation from '../../components/Annotation/Annotation';
import TextExtraction from '../../components/TextExtraction/TextExtraction';
import ObjectDetection from '../../components/ObjectDetection/ObjectDetection';
import Dashboards from '../../components/Dashboards/Dashboards';
import Configuration from '../../components/Configuration/Configuration';
import Templates from '../../components/Templates/Templates';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const InAppBody = (props) => {
  const { signOut, user } = props;
  // console.log(signOut);
  console.log(props.userDet);

  const changeMainTabs = (tabNum) => {
    const { extractor } = props;
    extractor.page = tabNum;
    props.dispatch(changeTabOperation(extractor));
  };

  return (
    <div className="inAppBody">
      <Header />
      {/* {window.screen.width} */}
      <div className="appBody">
        <div className="bodyContainer">
          <div className="menuContainer">
            <div
              className={`singleMenus ${
                props.extractor.page === 1 ? 'selectedMenu' : ''
              }`}
              id="singleMenu1"
              onClick={() => changeMainTabs(1)}
            >
              <i className="fa-solid fa-list menuicon"></i> &nbsp;&nbsp;
              {props.themeLang.languageWords.Configuration}
            </div>
            <div
              className={`singleMenus ${
                props.extractor.page === 2 ? 'selectedMenu' : ''
              }`}
              id="singleMenu2"
              onClick={() => changeMainTabs(2)}
            >
              <i className="fa-solid fa-arrows-turn-to-dots  menuicon"></i>{' '}
              &nbsp;&nbsp;
              {props.themeLang.languageWords.Text_Extraction}
            </div>
            {/* <div
              className={`singleMenus ${
                props.extractor.page === 3 ? 'selectedMenu' : ''
              }`}
              id="singleMenu3"
              onClick={() => changeMainTabs(3)}
            >
              {props.themeLang.languageWords.Annotation}
            </div>
            <div
              className={`singleMenus ${
                props.extractor.page === 4 ? 'selectedMenu' : ''
              }`}
              id="singleMenu4"
              onClick={() => changeMainTabs(4)}
            >
              {props.themeLang.languageWords.Object_Detection}
            </div> */}
            <div
              className={`singleMenus ${
                props.extractor.page === 4 ? 'selectedMenu' : ''
              }`}
              id="singleMenu4"
              onClick={() => changeMainTabs(4)}
            >
              <i className="fa-solid fa-folder-tree menuicon"></i>
              &nbsp;&nbsp;Templates
            </div>
            <div
              className={`singleMenus ${
                props.extractor.page === 5 ? 'selectedMenu' : ''
              }`}
              id="singleMenu5"
              onClick={() => changeMainTabs(5)}
            >
              <i className="fa-solid fa-chart-line menuicon"></i> &nbsp;&nbsp;
              {props.themeLang.languageWords.Dashboard}
            </div>
          </div>
          <div className="visualBodyContainer">
            {props.extractor.page === 1 ? (
              <Configuration />
            ) : props.extractor.page === 2 ? (
              <TextExtraction />
            ) : /* ) : props.extractor.page === 3 ? (
              <Annotation />
            ) : props.extractor.page === 4 ? (
              <ObjectDetection />  */
            props.extractor.page === 4 ? (
              <Templates />
            ) : props.extractor.page === 5 ? (
              <Dashboards />
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    extractor: state.extractor,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(InAppBody);
