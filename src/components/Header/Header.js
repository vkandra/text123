import './Header.css';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { signInOperation } from '../../actions/user';
// import { signUpOperation } from '../../actions/user';
// import { useAuthenticator } from '@aws-amplify/ui-react';

import languages from '../../languages';
import { fetchUserLang } from '../../actions/themeLang';

import logoUrl from '../../Pictures/aLPHA.png';

// AZURE AUTH
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { PageLayout } from '../../azureAuth/azureAuthComponents/PageLayout';
import { loginRequest } from '../../azureAuth/authConfig';
import { callMsGraph } from '../../azureAuth/graph';
import { ProfileData } from '../../azureAuth/azureAuthComponents/ProfileData';
import { useIsAuthenticated } from '@azure/msal-react';

const Header = (props) => {
  // const { instance } = useMsal();
  // const { instance, accounts } = useMsal();
  // const [graphData, setGraphData] = useState(null);

  // const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    // if (props.userDet.username.includes('@')) {
    //   console.log('not Verified');
    //   document.getElementById('hiddenSignOutButton').click();
    //   alert(
    //     'You will receive a verification code in your E-mail id. \nPlease sign in with your credentials and enter the code you received in mail.'
    //   );
    //   window.location.reload();
    // } else {
    //   const { user } = props.userPr;
    //   console.log(props.userPr);
    //   // console.log(user);
    //   props.userPr.token = props.userDet.username;
    //   props.userPr.isLoggedIn = true;
    //   props.userPr.signUp = false;
    //   props.userPr.userFirstName = props.userDet.attributes.name;
    //   props.userPr.email = props.userDet.attributes.email;
    //   console.log(props.userPr);
    //   props.dispatch(signInOperation(props.userPr));
    // }
    // if (isAuthenticated) {
    //   RequestProfileData();
    // }
    changeLanguage();
  }, []);
  // const { signOut, user } = useAuthenticator();

  // const RequestProfileData = () => {
  //   // Silently acquires an access token which is then attached to a request for MS Graph data
  //   instance
  //     .acquireTokenSilent({
  //       ...loginRequest,
  //       account: accounts[0],
  //     })
  //     .then((response) => {
  //       callMsGraph(response.accessToken).then((response) => {
  //         setGraphData(response);
  //         console.log(response);
  //         const { user } = props.userPr;
  //         // console.log(props.userPr);
  //         props.userPr.isLoggedIn = true;
  //         props.userPr.signUp = false;
  //         props.userPr.userFirstName = response.givenName;
  //         props.userPr.userLastName = response.surname;
  //         props.userPr.fullName = response.displayName;
  //         props.userPr.token = response.id;
  //         props.userPr.email = response.mail;
  //         console.log(props.userPr);
  //         props.dispatch(signInOperation(props.userPr));
  //       });
  //     });
  // };

  const changeLanguage = () => {
    const langSelected = document.getElementById('languageSelect').value;

    const { themeLang } = props;
    themeLang.languageWords = languages[langSelected];
    props.dispatch(fetchUserLang(themeLang));
    // console.log(themeLang.languageWords);
    // console.log(languages[langSelected]);
  };

  const signUserOut = () => {
    console.log('signing out');
    // signOut();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  // const handleLogout = (logoutType) => {
  //   instance.logoutRedirect({
  //     postLogoutRedirectUri: '/',
  //   });
  // };

  return (
    <div className="header">
      <img className="logoImg" src={logoUrl} alt="text-extractor" width="13%" />

      <div className="dropiconbutton">
        <div>
          <span className="onlyHi">{props.themeLang.languageWords.Hi}</span>{' '}
          {props.userPr.userFirstName}
          <span className="onlyHi">!</span>
        </div>

        <div className="languageDiv">
          <i className="fi fi-ss-globe"></i>&nbsp;
          <select
            name="languageSelect"
            id="languageSelect"
            onChange={() => {
              changeLanguage();
            }}
          >
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
        </div>

        {/* <Link to="/"> */}
        <div
          className="inupoutButton"
          id="hiddenSignOutButton"
          // onClick={signOut}
          // onClick={() => handleLogout('redirect')}
        >
          {/* <div className="inupoutDiv" onClick={refreshPage}> */}
          <span
          // onClick={() => handleLogout('redirect')}
          >
            {/* {props.themeLang.languageWords.Sign_Out}&nbsp; */}
            <i className="fi fi-sr-exit"></i>
          </span>
          {/* </div> */}
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userPr: state.user,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(Header);
