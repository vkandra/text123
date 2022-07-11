import './InAppBody.css';

import React from 'react';

const InAppBody = (props) => {
  return (
    <div className="inAppBody">
      <div className="bodyContainer">
        <div className="menuContainer"></div>
        <div className="visualBodyContainer">This is the body</div>
      </div>
    </div>
  );
};

export default InAppBody;
