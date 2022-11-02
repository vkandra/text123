import './Favourites.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';

const Favourites = (props) => {
  return (
    <div className="favourites">
      <div className="favouritesText">
        <div className="favouritesHeader">
          <div>
            {props.themeLang.languageWords.Template} : &nbsp;
            <b>{props.singleDocument.singleDocumentTemplate}</b>
          </div>
          <div>
            <select id="selectDataType">
              <option>Key-Value</option>
              <option>Table</option>
              <option>Raw Data</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    extractor: state.extractor,
    singleDocument: state.singleDocument,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(Favourites);

// export default Favourites;
