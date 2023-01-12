import './Header.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from 'react-redux/es/exports';
// import { signInOperation } from '../../actions/user';
// import { signUpOperation } from '../../actions/user';
import { useAuthenticator } from '@aws-amplify/ui-react';

import languages from '../../languages';
import { fetchUserLang } from '../../actions/themeLang';

import logoUrl from '../../Pictures/aLPHA.png';

const Header = (props) => {
  useEffect(() => {
    if (props.userDet.username.includes('@')) {
      console.log('not Verified');
      document.getElementById('hiddenSignOutButton').click();
      alert(
        'You will receive a verification code in your E-mail id. \nPlease sign in with your credentials and enter the code you received in mail.'
      );
      window.location.reload();
    }
    changeLanguage();
  }, []);
  const { signOut, user } = useAuthenticator();

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
    signOut();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="header">
      <img className="logoImg" src={logoUrl} alt="text-extractor" width="13%" />

      <div className="dropiconbutton">
        <div>
          <span className="onlyHi">{props.themeLang.languageWords.Hi}</span>{' '}
          {/* {user.attributes.name} */}
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

        {/* {props.userDetails.attributes.name} */}
        {/* <Link to="/"> */}
        <div
          className="inupoutButton"
          id="hiddenSignOutButton"
          onClick={signOut}
        >
          {/* <div className="inupoutDiv" onClick={refreshPage}> */}
          <span onClick={signUserOut}>
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
    user: state.user,
    themeLang: state.themeLang,
  };
};

export default connect(mapStateToProps)(Header);

// const signInPerform = () => {
//   const { user } = props;
//   props.dispatch(signInOperation(user));
// };

// const signUpPerform = () => {
//   const { user } = props;
//   props.dispatch(signUpOperation(user));
// };

{
  /* {props.user.signUp === false && props.user.isLoggedIn === true ? (
          <Link to="/signin">
            <button className="inupoutButton" onClick={signInPerform}>
              Sign Out
            </button>
          </Link>
        ) : props.user.signUp === false && props.user.isLoggedIn === false ? (
          <Link to="/signup">
            <button className="inupoutButton" onClick={signUpPerform}>
              Sign Up
            </button>
          </Link>
        ) : props.user.signUp === true && props.user.isLoggedIn === false ? (
          <Link to="/signin">
            <button className="inupoutButton" onClick={signInPerform}>
              Sign In
            </button>
          </Link>
        ) : null} */
}
