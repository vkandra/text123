import './Header.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux/es/exports';
// import { signInOperation } from '../../actions/user';
// import { signUpOperation } from '../../actions/user';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Header = (props) => {
  const { signOut, user } = useAuthenticator();

  return (
    <div className="header">
      <img
        className="logoImg"
        src="https://amazon-textract-s3bucket.s3.ap-south-1.amazonaws.com/input/Black___White_Minimalist_Business_Logo__3_-removebg-preview.png"
        alt="text-extractor"
        width="17%"
      />

      <div className="dropiconbutton">
        <div>ICONS </div>
        <div>Hi {user.attributes.name}</div>
        {/* {props.userDetails.attributes.name} */}
        {/* <Link to="/"> */}
        <button className="inupoutButton" onClick={signOut}>
          Sign Out
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
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
