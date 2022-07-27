import React from "react";
import './EditableRow.css'
import { GrCheckmark, GrEdit } from "react-icons/gr";

const EditableRow=(props)=>{
    return <tr>
        <td>
        <input type='number' name='index' value={props.editFormData.index} placeholder='Index'onChange={props.editFormChangeHandler}/>
        </td>
        <td>
        <input type="text" name='TIMES' value={props.editFormData.TIMES} placeholder='TIMES' onChange={props.editFormChangeHandler}/>
        </td>
        <td>
        <input type="text" name='IN' value={props.editFormData.IN} placeholder='IN' onChange={props.editFormChangeHandler}/>
        </td>
        <td>
        <input type="text" name='OUT' value={props.editFormData.OUT} placeholder='OUT' onChange={props.editFormChangeHandler}/>
        </td>
        <td>
        <input type="text" name='CYCLES' value={props.editFormData.CYCLES} placeholder='CYCLES' onChange={props.editFormChangeHandler}/>
        </td>
        <td>
            <button type="submit"><GrCheckmark/></button>
        </td>
    </tr>
}

export default EditableRow