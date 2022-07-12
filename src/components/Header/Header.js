import './Header.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux/es/exports';
import { signInOperation } from '../../actions/user';
import { signUpOperation } from '../../actions/user';

const Header = (props) => {
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
          alt="Company"
          src="https://cdn-icons.flaticon.com/png/512/484/premium/484522.png?token=exp=1657523794~hmac=2edf9f53342b6c114db6d76ca32fd148"
          className="company-logo"
        ></img>
      </div>
      <div>TEXT-EXTRACTOR</div>

      <div className="dropiconbutton">
        {/* <div>ICONS </div>
        {props.user.signUp === false && props.user.isLoggedIn === true ? (
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
        ) : null} */}
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
