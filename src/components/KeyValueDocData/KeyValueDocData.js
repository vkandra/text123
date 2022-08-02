import './KeyValueDocData.css';
import React, { useEffect } from 'react';
// import { connect } from 'react-redux/es/exports';
// import records from '../records.json'
import { tempSingleFileData } from '../../tempdata/tempSingleFileData';
import { GrCheckmark, GrEdit } from "react-icons/gr";


const KeyValueDocData = (props) => {

  const { Keys, Values } = (tempSingleFileData)['key-value']

  const DisplayKeyData = Object.entries(Keys).map((each) => {
    return (
      <tr className='keyDocTabletr'>
        <p>{each[1]}</p>
        </tr>
    )
  })

  const DisplayValueData = Object.entries(Values).map((each) => {
    return (
      <tr className='keyDocTabletr'>
        <p>{each[1]}</p>
        </tr>
    )
  })

  // const displayingBoth = `${DisplayKeyData}:${DisplayValueData}`

  // Object.entries(Keys).map(each=>{console.log(each[1])})
  return <div className="keyValueDocData">
    {/* {<div className='icons-style'>
      <GrEdit />&emsp;&emsp;
      <GrCheckmark />
    </div>} */}

    <table >
      <thead>
        <tr className='keyDocTabletr' >
          <th className='keyDocTableth'>Keys</th>
          <th className='keyDocTableth'>Values</th>
          <th className='keyDocTableth'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td className='keyDocTabletd'>
            {Object.entries(Keys).map((each, i) => {
              return <p key={i}>
                {each[1]}</p>
            })}
          </td>
          <td className='keyDocTabletd'>
            {Object.entries(Values).map((each, i) => {
              return <p key={i}>
                {each[1]}</p>
            })}
          </td>
        </tr> */}

        <tr className='keyDocTabletr'>
          <td className='keyDocTabletd'>{DisplayKeyData}</td>
          <td className='keyDocTabletd'>{DisplayValueData}</td>
          <td><button><GrEdit/></button></td>
        </tr>



      </tbody>
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
