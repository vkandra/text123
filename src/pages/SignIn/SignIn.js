import './SignIn.css';

import React from 'react';

const SignIn = (props) => {
  return (
    <div className="signIn">
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
        <span className="forgotPasswordSignIn" style={{ fontSize: 10 }}>
          Forgot Password?
        </span>
      </div>
    </div>
  );
};

export default SignIn;
