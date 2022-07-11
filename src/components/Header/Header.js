import './Header.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { signOutOperation } from '../../actions/user';
import { signInOperation } from '../../actions/user';
import { signUpOperation } from '../../actions/user';

const Header = (props) => {
  console.log('USER', props.user);

  const signOutPerform = () => {
    const { user } = props;
    props.dispatch(signOutOperation(user));
  };

  const signInPerform = () => {
    const { user } = props;
    props.dispatch(signInOperation(user));
  };

  const signUpPerform = () => {
    const { user } = props;
    props.dispatch(signUpOperation(user));
  };

  return (
    <div className="header">
      <div>
        <img
          src="https://cdn-icons.flaticon.com/png/512/484/premium/484522.png?token=exp=1657523794~hmac=2edf9f53342b6c114db6d76ca32fd148"
          className="company-logo"
        ></img>
      </div>
      <div>TEXT-EXTRACTOR</div>

      <div className="dropiconbutton">
        <div>ICONS </div>
        {props.user.signUp === false && props.user.isLoggedIn === true ? (
          <button className="inupoutButton">
            <Link to="/signin" onClick={() => signOutPerform}>
              Sign Out
            </Link>
          </button>
        ) : props.user.signUp === false && props.user.isLoggedIn === false ? (
          <button className="inupoutButton">
            <Link to="/signup" onClick={() => signUpPerform}>
              Sign Up
            </Link>
          </button>
        ) : props.user.signUp === true && props.user.isLoggedIn === false ? (
          <button className="inupoutButton">
            <Link to="/signin" onClick={() => signInPerform}>
              Sign In
            </Link>
          </button>
        ) : null}
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
