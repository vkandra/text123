import './App.css';
import React, { useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import InAppBody from './InAppBody/InAppBody';
import Homepage from './Homepage/Homepage';

import { PageLayout } from '../azureAuth/azureAuthComponents/PageLayout';
import { loginRequest } from '../azureAuth/authConfig';
import { callMsGraph } from '../azureAuth/graph';
import { ProfileData } from '../azureAuth/azureAuthComponents/ProfileData';

import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from '../azureAuth/azureAuthComponents/SignInButton';

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';

import Button from 'react-bootstrap/Button';

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      <br />
      {graphData ? (
        <ProfileData graphData={graphData} />
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile Information
        </Button>
      )}
    </>
  );
};

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5>
          <center>Please sign-in to see your profile information.</center>
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <InAppBody /> : <Homepage />}
        />
        <Route
          path="/text-extraction"
          element={isAuthenticated ? <InAppBody /> : <Homepage />}
        />
        <Route
          path="/configuration"
          element={isAuthenticated ? <InAppBody /> : <Homepage />}
        />
        <Route
          path="/templates"
          element={isAuthenticated ? <InAppBody /> : <Homepage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <InAppBody /> : <Homepage />}
        />
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    singleDocument: state.singleDocument,
  };
};

export default connect(mapStateToProps)(App);
