import './TableDocData.css';
import React, { useState, Fragment } from 'react';
import records from "../records.json"
import { GrEdit } from "react-icons/gr";
import EditableRow from './EditableRow';

// import { connect } from 'react-redux/es/exports';

const TableDocData = (props) => {

  // const [addFormData, setAddFormData] = useState({
  //   index: '',
  //   TIMES: '',
  //   IN: '',
  //   OUT: '',
  //   CYCLES: ''
  // })

  const [currentData, setCurrentData] = useState(records.data)

  const [editDataId, setEditDataId] = useState(null)

  const [editFormData, setEditFormData] = useState({
    index: '',
    TIMES: '',
    IN: '',
    OUT: '',
    CYCLES: ''
  }
  )

  // const onEditFormHandler = (event) => {
  //   event.preventDefault()
  //   const fieldName = event.target.getAttribute('name')
  //   const fieldValue = event.target.value

  //   const newData = { ...addFormData }
  //   newData[fieldName] = fieldValue

  //   setAddFormData(newData)
  //   // console.log(newData)
  // }

  // const onFormSubmitHandler = (event) => {
  //   event.preventDefault()
  //   const newlyAddedData = {
  //     index: addFormData.index,
  //     TIMES: addFormData.TIMES,
  //     IN: addFormData.IN,
  //     OUT: addFormData.OUT,
  //     CYCLES: addFormData.CYCLES
  //   }
  //   const newlyAddedDataArray = [...currentData, newlyAddedData]
  //   console.log(newlyAddedDataArray)
  //   setCurrentData(newlyAddedDataArray)
  //   setAddFormData({
  //     index: '',
  //     TIMES: '',
  //     IN: '',
  //     OUT: '',
  //     CYCLES: ''
  //   })
  // }

  const editFormChangeHandler = (event) => {
    event.preventDefault()

    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }


  const editHandler = (event, todo) => {
    event.preventDefault()
    setEditDataId(todo.index)
    const formValues = {
      index: todo.index,
      TIMES: todo.TIMES,
      IN: todo.IN,
      OUT: todo.OUT,
      CYCLES: todo.CYCLES
    }
    setEditFormData(formValues)
  }

  return <div className="tableDocData">
    <form>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Times</th>
            <th>IN</th>
            <th>OUT</th>
            <th>Cycles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((todo) => (
            <Fragment>
              {editDataId === todo.index ? <EditableRow editFormData={editFormData} editFormChangeHandler={editFormChangeHandler} /> :
                <tr>
                  <td>{todo.index}</td>
                  <td>{todo.TIMES}</td>
                  <td>{todo.IN}</td>
                  <td>{todo.OUT}</td>
                  <td>{todo.CYCLES}</td>
                  <td><button type='button' onClick={(event) => { editHandler(event, todo) }}><GrEdit/></button></td>
                </tr>
              }
            </Fragment>
          ))}
        </tbody>
      </table>
    </form>

    {/* <div>
      <h1 className='fs-4'>Add New</h1>
      <form onSubmit={onFormSubmitHandler}>
        <input width='0.5%' type='number' name='index' value={addFormData.index} placeholder='Index' onChange={onEditFormHandler} />
        <input type="text" name='TIMES' value={addFormData.TIMES} placeholder='TIMES' onChange={onEditFormHandler} />
        <input type="text" name='IN' value={addFormData.IN} placeholder='IN' onChange={onEditFormHandler} />
        <input type="text" name='OUT' value={addFormData.OUT} placeholder='OUT' onChange={onEditFormHandler} />
        <input type="text" name='CYCLES' value={addFormData.CYCLES} placeholder='CYCLES' onChange={onEditFormHandler} />
        <button type='submit'><GrCheckmark /></button>
      </form>
      {/* {<div className='icons-style' >
        <GrEdit />&emsp;&emsp;
        <button type='submit'><GrCheckmark /></button>
      </div>} */}
    {/* </div>  */}
  </div >;
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(TableDocData);

export default TableDocData;
