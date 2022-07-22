import './TableDocData.css';
import React from 'react';
import records from "../records.json"
import { GrCheckmark,GrEdit } from "react-icons/gr";

// import { connect } from 'react-redux/es/exports';

const TableDocData = (props) => {

  return <div className="tableDocData">
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Times</th>
          <th>IN</th>
          <th>OUT</th>
          <th>Cycles</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {records.data.map(todo => {
              return (
                <div>
                  <td>{todo.index}</td>
                </div>)
            })}
          </td>
          <td>{records.data.map(todo => {
            return (
              <div>
                <td>{todo.TIMES}</td>
              </div>)
          })}</td>
          <td>{records.data.map(todo => {
            return (
              <div>
                <td>{todo.IN}</td>
              </div>)
          })}</td>
          <td>{records.data.map(todo => {
            return (
              <div>
                <td>{todo.OUT}</td>
              </div>)
          })}</td>
          <td>{records.data.map(todo => {
            return (
              <div>
                <td>{todo.CYCLES}</td>
              </div>)
          })}</td>


        </tr>
      </tbody>
    </table>
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

//   export default connect(mapStateToProps)(TableDocData);

export default TableDocData;
