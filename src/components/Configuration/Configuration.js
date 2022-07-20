import './Configuration.css';
import React from 'react';
// import { connect } from 'react-redux/es/exports';

const Configuration = (props) => {
  return (
    <div className="configuration">
      This is Configuration
      <br />
      <br />
      <form>
        <input type="file" name="name" multiple />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(Configuration);

export default Configuration;
