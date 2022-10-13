import './Homepage.css';
import React, { useEffect } from 'react';
// import { connect } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import video from '../../Videos/Letters.mp4';

const Homepage = (props) => {
  useEffect(() => {
    document.getElementsByClassName('vidSet')[0].play();
  }, []);

  return (
    <div className="homepage">
      <div className="head-sec">
        <img
          className="logoImg"
          src="https://amazon-textract-s3bucket.s3.ap-south-1.amazonaws.com/input/Black___White_Minimalist_Business_Logo__3_-removebg-preview.png"
          alt="text-extractor"
          width="17%"
        />
      </div>
      <div className="body-sec">
        <video loop autoplay className="vidSet" muted playsinline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="SinInSignUpBut">
          <img
            //   className="logoImg"
            src="https://amazon-textract-s3bucket.s3.ap-south-1.amazonaws.com/input/Black___White_Minimalist_Business_Logo__3_-removebg-preview.png"
            alt="text-extractor"
            width="90%"
          />
          <Link to="/app">
            <button className="signButton">Sign In / Sign up</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       user: state.user,
//     };
//   };

//   export default connect(mapStateToProps)(Homepage);

export default Homepage;
