import React from 'react';

function MyFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} MedHos.com &nbsp;&nbsp;&nbsp; All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default MyFooter;
