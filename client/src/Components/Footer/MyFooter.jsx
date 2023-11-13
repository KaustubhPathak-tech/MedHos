import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import "./MyFooter.css";
function MyFooter() {
  return (
    <div className="footer">
      <div className="seperator"></div>
      <div id="container">
        <p>
          &copy; {new Date().getFullYear()} MedHos.com &nbsp;&nbsp;&nbsp; All
          Rights Reserved.
        </p>

        <p>
          <a href="https://medhos.vercel.app/sitemap.xml">
            SiteMap <FontAwesomeIcon icon={faSitemap} />{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default MyFooter;
