import './App.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import InAppBody from '../pages/InAppBody/InAppBody';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp.js/SignUp';
import { fetchSingleFileData } from '../actions/singleDocument';

const App = (props) => {
  useEffect(() => {
    props.dispatch(fetchSingleFileData());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<InAppBody />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(App);
