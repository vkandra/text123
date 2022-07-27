import './KeyValueDocData.css';
import React, { useEffect } from 'react';
// import { connect } from 'react-redux/es/exports';
// import records from '../records.json'
import { tempSingleFileData } from '../../tempdata/tempSingleFileData';
import { GrCheckmark, GrEdit } from "react-icons/gr";


const KeyValueDocData = (props) => {

  const { Keys, Values } = (tempSingleFileData)['key-value']

  // Object.entries(Keys).map(each=>{console.log(each[1])})
  return <div className="keyValueDocData">
    {/* {<div className='icons-style'>
      <GrEdit />&emsp;&emsp;
      <GrCheckmark />
    </div>} */}

    <table>
      <tr>
        <th>Keys</th>
        <th>Values</th>
      </tr>
      <tr>
        <td>
          {Object.entries(Keys).map((each, i) => {
            return <p key={i}>
              {Keys[each[0]]}</p>
          })}
        </td>
        <td>
          {Object.entries(Values).map((each, i) => {
            return <p key={i}>
              {Values[each[0]]}</p>
          })}
        </td>
      </tr>
    </table>

    {/* {Object.entries(Keys).map((each, i) => {
      return <p key={i}>
        {Keys[each[0]]}&emsp;{Values[each[0]]}</p>
    })} */}


    {/* {Object.keys(records.keys).map((key, i) => (
      <p key={i}>
        {records.keys[key]}&ensp;
        {records.values[key]}
      </p>
    ))} */}

  </div>;
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(KeyValueDocData);

export default KeyValueDocData;
