import './Templates.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { addDeletefetchTemplate } from '../../actions/singleDocument';

const Templates = (props) => {
  const createSubTemp = () => {
    const selectedMainTemp = document.getElementById('mainTempSel1').value;
    const subTempName = document.getElementById('subTempName').value;
    console.log(selectedMainTemp, subTempName);
    let data = {
      user_id: props.user.token,
      main_template: selectedMainTemp,
      sub_template: subTempName,
      action: 'add',
    };
    props.dispatch(addDeletefetchTemplate(data));
  };

  const deleteSubTemp = () => {
    const selectedMainTemp = document.getElementById('mainTempSel2').value;
    const selectedSubTemp = document.getElementById('subTempSel1').value;
    console.log(selectedMainTemp, selectedSubTemp);
    let data = {
      user_id: props.user.token,
      main_template: selectedMainTemp,
      sub_template: selectedSubTemp,
      action: 'delete',
    };
    props.dispatch(addDeletefetchTemplate(data));
  };

  const fetchData = () => {
    let data = {
      user_id: props.user.token,
      main_template: '',
      sub_template: '',
      action: 'fetch',
    };
    props.dispatch(addDeletefetchTemplate(data));
  };

  return (
    <div className="templates">
      <div className="templateTopSection">
        <div className="createDeleteTemplate">
          <div className="templateCreationDiv">
            <div className="templateLabel">Create Sub-Template</div>

            <div className="formActionTemplate">
              <select className="selectOption" id="mainTempSel1">
                <option>Report</option>
                <option>Bills</option>
                <option>Others</option>
              </select>
              <input
                placeholder="New Sub-Template Name"
                name="newTemplate"
                className="newTempInput"
                id="subTempName"
              ></input>

              <button
                type="button"
                className="btn btn-success createTemplateButton"
                onClick={() => createSubTemp()}
              >
                Create
              </button>
            </div>
          </div>
          <div className="templateDeletionDiv">
            <div className="templateLabel">Delete Sub-Template</div>
            <div className="formActionTemplate">
              <select className="selectOption" id="mainTempSel2">
                <option>Report</option>
                <option>Bills</option>
                <option>Others</option>
              </select>
              <select className="selectOption" id="subTempSel1">
                <option>Hello</option>
                <option>World</option>
                <option>Cosmos</option>
              </select>
              <button
                type="button"
                className="btn btn-danger deleteTemplateButton"
                onClick={() => deleteSubTemp()}
              >
                Delete
              </button>
              <button onClick={() => fetchData()}>fetch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Templates);

// export default Templates;

{
  /* <div>
        Button trigger modal
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Launch demo modal
        </button>
        Modal
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
