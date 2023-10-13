import React from 'react';
import "./MyFooter.css"
function MyFooter() {
  return (
    <div className="footer">
      <div className='seperator'></div>
      <div id="container">
        <p>&copy; {new Date().getFullYear()} MedHos.com &nbsp;&nbsp;&nbsp; All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default MyFooter;
