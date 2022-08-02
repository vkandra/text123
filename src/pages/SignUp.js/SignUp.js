import './SignUp.css';
import { connect } from 'react-redux/es/exports';
import React from 'react';

import { checkRepPass } from '../../actions/user';

const SignUp = (props) => {
  const handlePassChange = (e) => {
    const { user } = props;
    user.signUpPass = e.target.value;
    if ((user.repeatPassVisible = true)) {
      if (
        user.signUpPass.normalize() ===
        document.getElementById('signUpRepeatPassField').value
      ) {
        if (user.signUpPass.normalize() !== '') {
          user.repeatPass = true;
        } else {
          user.repeatPass = false;
          user.repeatPassVisible = false;
        }
      } else {
        user.repeatPass = false;
      }
    }
    props.dispatch(checkRepPass(user));
  };
  const handleRepPassChange = (e) => {
    const { user } = props;

    if (user.signUpPass !== '') {
      user.repeatPassVisible = true;
    } else {
      user.repeatPassVisible = false;
    }

    const signUpRepPass = e.target.value;
    if (user.signUpPass.normalize() === signUpRepPass.normalize()) {
      user.repeatPass = true;
    } else {
      user.repeatPass = false;
    }
    props.dispatch(checkRepPass(user));

    console.log(user.signUpPass);
    console.log(signUpRepPass);
  };

  const signUpUser = () => {
    //After data has been sent to API
    document.getElementById('signUpPassField').value = '';
    document.getElementById('signUpRepeatPassField').value = '';
    document.getElementById('signUpFirstNameField').value = '';
    document.getElementById('signUpEmailField').value = '';
    document.getElementById('signUpLastNameField').value = '';

    const { user } = props;
    user.repeatPassVisible = false;
    user.signUpPass = '';
    user.signUpRepPass = '';
    user.repeatPass = false;
    props.dispatch(checkRepPass(user));
  };

  return (
    <div className="signUp">
      <div className="signUpTopDiv">
        {props.user.repeatPassVisible ? (
          props.user.repeatPass ? (
            <div>Passwords Match</div>
          ) : (
            <div>Passwords do not match</div>
          )
        ) : null}
      </div>
      <div className="signUpForm">
        <div className="signUpText">SIGN UP</div>
        <div className="signUpFormData">
          <div>
            <div className="justTextsignUp">
              <sup className="reqField">*</sup>First name:
            </div>
            <input type="text" id="signUpFirstNameField" required></input>
          </div>
          <div>
            <div className="justTextsignUp">Last name: </div>
            <input type="text" id="signUpLastNameField"></input>
          </div>
          <div>
            <div className="justTextsignUp">
              <sup className="reqField">*</sup>Email:
            </div>
            <input type="email" id="signUpEmailField" required></input>
          </div>
          <div>
            <div className="justTextsignUp">
              <sup className="reqField">*</sup>Password:
            </div>
            <input
              type="password"
              id="signUpPassField"
              required
              onChange={handlePassChange}
            ></input>
          </div>
          <div>
            <div className="justTextsignUp">
              <sup className="reqField">*</sup>Confirm Password:
            </div>
            <input
              type="password"
              id="signUpRepeatPassField"
              required
              onChange={handleRepPassChange}
            ></input>
          </div>
        </div>
        {props.user.repeatPass ? (
          <button className="signUpSubmitBut" onClick={() => signUpUser()}>
            Sign Up
          </button>
        ) : (
          <button disabled className="signUpSubmitButDisabled">
            Sign Up
          </button>
        )}
      </div>

      <div className="signUpBottomDiv"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SignUp);

// export default SignUp;
