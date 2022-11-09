import './Favourites.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import KeyValueTemplate from '../KeyValueTemplate/KeyValueTemplate';
import { singleFileTemplateUnusedKeys } from '../../actions/singleDocument';

const Favourites = (props) => {
  useEffect(() => {
    const { singleDocument } = props;
    for (let i = 0; i < singleDocument.templateUnusedKeys.length; i++) {
      for (
        let j = 0;
        j < singleDocument.templateSingleDocKeysValues.length;
        j++
      ) {
        if (
          String(
            singleDocument.templateSingleDocKeysValues[j].key
          ).valueOf() === String(singleDocument.templateUnusedKeys[i]).valueOf()
        ) {
          singleDocument.templateUnusedKeys =
            singleDocument.templateUnusedKeys.filter(
              (item) => item !== props.singleDocument.templateUnusedKeys[i]
            );
          props.dispatch(singleFileTemplateUnusedKeys(singleDocument));
        }
      }

      // let notfoundkeys =
      //   props.singleDocument.templateDetailsKVRTsingleFile.keys;
      // let keys = props.singleDocument.templateSingleDocKeysValues;
      // let favkeys = props.singleDocument.templateDetailsKVRTsingleFile.keys;

      // for (let i = 0; i < favkeys.length; i++) {
      //   for (let j = 0; j < keys.length; j++) {
      //     if (String(favkeys[i]).valueOf() === String(keys[j].key).valueOf()) {
      //       notfoundkeys = notfoundkeys.filter((item) => item !== keys[j].key);
      //     }
      //   }
      // }
      // props.dispatch(singleFileTemplateUnusedKeys(notfoundkeys));
    }
  }, [
    props.singleDocument.singleDocumentEditedContent,
    props.singleDocument.templateDetails,
  ]);

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
              <option value={'1'}>Key-Value</option>
              <option value={'2'}>Table</option>
              <option value={'3'}>Raw Data</option>
            </select>
          </div>
        </div>
      </div>
      <div className="templateContent">
        <div className="templateKeysandvaluesText">
          <div className="keysOnlyText">
            {props.themeLang.languageWords.Keys}
          </div>
          <div className="valuesOnlyText">
            {props.themeLang.languageWords.Values}
          </div>
        </div>
        <div className="templateKeysAndValues">
          {props.singleDocument.templateSingleDocKeysValues.map(
            (singleKeyValue, index) => (
              <KeyValueTemplate
                singleKeyValue={singleKeyValue}
                key={singleKeyValue.index}
              />
            )
          )}
          <div className="missingKeysText">Missing Keys -</div>
          {props.singleDocument.templateUnusedKeys.map((singleKey, index) => (
            <div className="missingKeys" key={singleKey.index}>
              {singleKey}
            </div>
          ))}
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
