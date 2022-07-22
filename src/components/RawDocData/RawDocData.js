import './RawDocData.css';
import React from 'react';
import { tempSingleFileData } from '../../tempdata/tempSingleFileData';
import { GrCheckmark, GrEdit } from "react-icons/gr";

// import { connect } from 'react-redux/es/exports';

const RawDocData = (props) => {
  return <div className="rawDocData">
    {/* {(tempSingleFileData.text).map((each) => {
      for (let i = 0; i < 200; i++) {
        console.log(i)
        return <p>{each[1][i]}</p>
      }
    })
    } */}
    {(tempSingleFileData.text).map(each => {
      return each[1].map((item,i)=>{
        return <li key={i}>{item}</li>
      })
    })}
    {<div className='icons-style'>
      <GrEdit />&emsp;&emsp;
      <GrCheckmark />
    </div>}
  </div >;
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(RawDocData);

export default RawDocData;
