import './SignIn.css';
import { connect } from 'react-redux/es/exports';
import React from 'react';

import { forgotPasswordClicked, passSentToEmail } from '../../actions/user';

const SignIn = (props) => {
  if (
    props.user.passSentToEmail === true ||
    props.user.sentEmailNotFound === true
  ) {
    setTimeout(() => {
      const { user } = props;
      user.passSentToEmail = false;
      user.sentEmailNotFound = false;
      props.dispatch(passSentToEmail(user));
    }, 5000);
  }

  const forgotPasswordCl = () => {
    const { user } = props;
    user.forgotPasswordClick = true;
    props.dispatch(forgotPasswordClicked(user));
  };

  const forgotPasswordUnclick = () => {
    const { user } = props;
    user.forgotPasswordClick = false;
    props.dispatch(forgotPasswordClicked(user));
  };

  const sendEmailForgotPassword = () => {
    const { user } = props;
    // Email Id entered by the user is present in user.forgotPassEmail
    // API to check the e-mail id,
    // if e-mail is found in database, then -
    document.getElementById('inputEmailIdForgotEmailField').value = '';
    user.forgotPassEmail = '';
    user.forgotPasswordClick = false;
    user.passSentToEmail = true;
    props.dispatch(forgotPasswordClicked(user));

    // if e-mail is not found in database, then -
    // user.forgotPasswordClick = false;
    /*
      user.sentEmailNotFound = true;
      props.dispatch(forgotPasswordClicked(user));
      */
  };

  const forgotPassEmailEnter = (e) => {
    const { user } = props;
    user.forgotPassEmail = e.target.value;
    props.dispatch(forgotPasswordClicked(user));
  };

  const captureEmailSignIn = (e) => {
    const { user } = props;
    user.signInEmail = e.target.value;
    props.dispatch(forgotPasswordClicked(user));
    console.log(user.signInEmail);
  };

  const capturePassSignIn = (e) => {
    const { user } = props;
    user.signInPass = e.target.value;
    props.dispatch(forgotPasswordClicked(user));
    console.log(user.signInPass);
  };

  const signInPerform = () => {
    //Make API Call, If successful, clear all fields
    const { user } = props;
    user.signInPass = '';
    user.signInPass = '';
    document.getElementById('inputUsernameField').value = '';
    document.getElementById('inputPassField').value = '';
  };

  return (
    <div className="signIn">
      <div className="signInTopDiv">
        {props.user.passSentToEmail ? (
          <span className="spanMessageText">
            Please Check your e-mail. Temporary Password has been sent to your
            E-mail.
          </span>
        ) : null}
        {props.user.sentEmailNotFound ? (
          <span className="spanMessageText">
            E-mail not found in our Database.
          </span>
        ) : null}
      </div>
      {!props.user.forgotPasswordClick ? (
        <div className="signInForm">
          <div className="signInText">SIGN IN</div>
          <div className="signInFormData">
            <div>
              <div className="justTextSignIn">Email: </div>
              <input
                type="email"
                id="inputUsernameField"
                onChange={captureEmailSignIn}
              ></input>
            </div>
            <div>
              <div className="justTextSignIn">Password:</div>
              <input
                type="password"
                id="inputPassField"
                onChange={capturePassSignIn}
              ></input>
            </div>
          </div>
          {props.user.signInEmail !== '' && props.user.signInPass !== '' ? (
            <button className="signInSubmitBut" onClick={() => signInPerform()}>
              Sign in
            </button>
          ) : (
            <button className="signInSubmitDisabledBut" disabled>
              Sign in
            </button>
          )}

          <span
            className="forgotPasswordSignIn"
            onClick={() => forgotPasswordCl()}
          >
            Forgot Password?
          </span>
        </div>
      ) : (
        <div className="forgotPasswordForm">
          <div className="forgotPasswordText">Forgot Password</div>
          <div className="forgotPasswordFormData">
            <div className="justTextForgotPassword">Enter your E-mail: </div>
            <input
              type="email"
              id="inputEmailIdForgotEmailField"
              onChange={forgotPassEmailEnter}
            ></input>
          </div>
          {props.user.forgotPassEmail !== '' ? (
            <button
              className="forgotPasswordSubmitBut"
              onClick={() => sendEmailForgotPassword()}
            >
              Submit
            </button>
          ) : (
            <button className="forgotPasswordDisabledSubmitBut" disabled>
              Submit
            </button>
          )}

          <span
            className="forgotPasswordSignIn"
            onClick={() => forgotPasswordUnclick()}
          >
            Sign in
          </span>
        </div>
      )}
      <div className="signInBottomDiv"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SignIn);

// export default SignIn;
