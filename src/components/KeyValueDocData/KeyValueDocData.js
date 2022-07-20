import './KeyValueDocData.css';
import React, { useEffect } from 'react';
// import { connect } from 'react-redux/es/exports';
import records from '../records.json'
import { GrCheckmark,GrEdit } from "react-icons/gr";
const KeyValueDocData = (props) => {

  // const apiUrl = 'https://4xjuok1l6c.execute-api.ap-south-1.amazonaws.com/output';

  // let displayData
  // function pullJson() {
  //   fetch(apiUrl)
  //   .then(response=>response.json())
  //   .then(responseData=>{
  //     displayData=responseData.map(todo=>{
  //       return(<p>{todo.Keys}</p>)
  //     })
  //     // console.log(responseData)
  //   })
  //   // return
  // }
  // useEffect(() => {
  //   pullJson()
  // }, [])


  // Object.keys(records.keys).map((key, i)=>{console.log(key)})
  
  return <div className="keyValueDocData">
    {<div className='icons-style'>
      <GrEdit />&emsp;
      <GrCheckmark />
    </div>}

    {Object.keys(records.keys).map((key, i) => (
      <p key={i}>
        {records.keys[key]}&ensp;
        {records.values[key]}
      </p>
    ))}

  </div>;
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(KeyValueDocData);

export default KeyValueDocData;
