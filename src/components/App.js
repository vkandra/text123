import './App.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import InAppBody from './InAppBody/InAppBody';
import Homepage from './Homepage/Homepage';

const App = (props) => {
  // const { user } = useAuthenticator();
  // const { signOut, user } = props;
  // console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/app"
          // element={user ? <InAppBody userDet={user} /> : <AmpLogin />}
          element={<InAppBody />}
        />
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    // user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(App);
