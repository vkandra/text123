import './Templates.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const Templates = (props) => {
  return (
    <div className="templates">
      <div className="templateTopSection">
        <div className="createDeleteTemplate">
          <div className="templateCreationDiv">
            <div className="templateLabel">Create a New Template</div>

            <div className="formActionTemplate">
              <input
                placeholder="New Template Name"
                name="newTemplate"
                className="newTempInput"
              ></input>

              <button
                type="button"
                className="btn btn-success createTemplateButton"
              >
                Create Template
              </button>
            </div>
          </div>
          <div className="templateDeletionDiv">
            <div className="templateLabel">Delete an Existing Template</div>
            <div className="formActionTemplate">
              <select className="selectOption">
                <option>Report</option>
                <option>Bills</option>
                <option>Others</option>
              </select>
              <button
                type="button"
                className="btn btn-danger deleteTemplateButton"
              >
                Delete Selected Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(Templates);

export default Templates;

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
