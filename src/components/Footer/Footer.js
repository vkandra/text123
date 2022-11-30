import './Footer.css';
import React from 'react';

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="emptyDivFooter"></div>
      <div className="copyrightDiv">
        <i className="fi fi-rr-copyright"></i>

        <div className="text-foot">Copyright Statement</div>
      </div>
      <div className="cyientDiv">
        <div className="text-foot">Powered By </div>
        <img
          alt="cyient"
          src="https://cdn2.hubspot.net/hubfs/5724847/FY_19_Revamp_Assets_Website/Home/Cust_logo/Cyient-logo.png"
          className="cyient-logo"
        ></img>
      </div>
    </div>
  );
};

export default Footer;
