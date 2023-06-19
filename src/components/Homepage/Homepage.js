import './Homepage.css';
import React, { useEffect } from 'react';
// import { connect } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
// import video from '../../Videos/Letters.mp4';

import logoImage from '../../Pictures/aLPHA.png';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../azureAuth/authConfig';

const Homepage = (props) => {
  const { instance } = useMsal();

  useEffect(() => {
    // document.getElementsByClassName('vidSet')[0].play();
  }, []);

  const handleLogin = (loginType) => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="homepage">
      <div className="head-sec">
        <img
          className="logoImg"
          src={logoImage}
          alt="text-extractor"
          width="13%"
        />
      </div>
      <div className="body-sec">
        {/* <video loop autoplay className="vidSet" muted playsinline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <div className="SinInSignUpBut">
          <img
            //   className="logoImg"
            src={logoImage}
            alt="text-extractor"
            width="90%"
          />
          <Link to="/app">
            <button
              className="signButton"
              onClick={() => handleLogin('redirect')}
            >
              Sign In / Sign Up
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     themeLang: state.themeLang,
//   };
// };

// export default connect(mapStateToProps)(Homepage);

export default Homepage;
