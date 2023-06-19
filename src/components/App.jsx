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

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';

import Button from 'react-bootstrap/Button';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
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

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
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
  // const { user } = useAuthenticator();
  // const { signOut, user } = props;
  // console.log(user);
  const isAuthenticated = useIsAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/app"
          // element={user ? <InAppBody userDet={user} /> : <AmpLogin />}
          element={
            isAuthenticated ? <InAppBody /> : <div></div>
            // (
            //   <PageLayout>
            //     <center>
            //       <MainContent />
            //     </center>
            //   </PageLayout>
            // )
          }
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
