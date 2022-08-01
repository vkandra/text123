import './SignIn.css';
import { connect } from 'react-redux/es/exports';
import React from 'react';

import { forgotPasswordClicked, passSentToEmail } from '../../actions/user';
import user from '../../reducers/user';

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
    if (
      document.getElementById('inputEmailIdForgotPasswordField').value === ''
    ) {
      alert('Enter your e-mail');
    } else {
      const { user } = props;

      // API to check the e-mail id,
      // if e-mail is found in database, then -
      user.forgotPasswordClick = false;
      user.passSentToEmail = true;
      props.dispatch(forgotPasswordClicked(user));

      // if e-mail is not found in database, then -
      // user.forgotPasswordClick = false;
      /*
      user.sentEmailNotFound = true;
      props.dispatch(forgotPasswordClicked(user));
      */
    }
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
              <div className="justTextSignIn">Username: </div>
              <input type="text" id="inputUsernameField"></input>
            </div>
            <div>
              <div className="justTextSignIn">Password: </div>
              <input type="password" id="inputPassField"></input>
            </div>
          </div>
          <button className="signInSubmitBut">Submit</button>
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
            <input type="email" id="inputEmailIdForgotPasswordField"></input>
          </div>

          <button
            className="forgotPasswordSubmitBut"
            onClick={() => sendEmailForgotPassword()}
          >
            Submit
          </button>
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
