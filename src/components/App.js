import './App.css';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import axios from 'axios';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import InAppBody from '../pages/InAppBody/InAppBody';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp.js/SignUp';

import 'bootstrap/dist/css/bootstrap.min.css';

import { withAuthenticator } from '@aws-amplify/ui-react';

// import { Amplify } from 'aws-amplify';

// import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// import awsExports from './UserConfig';
// Amplify.configure(awsExports);

const App = (props) => {
  const { signOut, user } = props;
  console.log(user);
  return (
    // <Authenticator>
    //   <Header />
    //   {({ signOut, user }) => (
    //     <main>
    //       <h1>Hello {user.username}</h1>
    //       <button onClick={signOut}>Sign out</button>
    //     </main>
    //   )}
    // </Authenticator>

    <Router>
      {/* <div>Hello {user.attributes.email}</div> */}
      {/* <button onClick={signOut}>Sign out</button> */}

      <Header userDetails={user} signOut={signOut} />

      <Routes>
        <Route path="/" element={<InAppBody />} />
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>

      <Footer />
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

export default withAuthenticator(connect(mapStateToProps)(App));
