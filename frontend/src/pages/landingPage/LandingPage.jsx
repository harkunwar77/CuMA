import React from "react";
import { Link } from "react-router-dom";
import landingPageStyle from "./landingpage.module.css";
import uniLogo from "../../images/uwindsorLogo.png";

export default function Landingpage() {
  return (
    <React.Fragment>
      <div className={landingPageStyle["login-page"]}>
        <nav className={landingPageStyle.nav}>
          <div className={landingPageStyle.uwindsorLogo}>
            <img src={uniLogo} alt="logo" />
          </div>
          <ul className={landingPageStyle["contact-about-container"]}>
            <li>
              <Link to="#" className={landingPageStyle["about-us"]}>
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className={landingPageStyle["contact-us"]}>
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="https://ask.uwindsor.ca/"
                className={landingPageStyle["ask-link"]}
              >
                <span className={landingPageStyle["ask-text"]}>ask</span>
                .Uwindsor
              </Link>
            </li>
          </ul>
        </nav>

        <div className={landingPageStyle["content-area"]}>
          <div className="col-md-6">
            <div className={landingPageStyle["left-section"]}>
              <h1>Welcome to CuMA</h1>
              <p>
                Curriculum mapping is a process of documenting and analyzing the
                structure of the program, and how individual courses work
                together to support student success through each year of study.
                It involves collecting, recording, and analyzing data about
                curriculum structure, including course and program learning
                outcomes, teaching methods and assessments, and levels of
                expectation.
              </p>
              <Link to="/login">
                <button className={landingPageStyle["login-button"]}>
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-5">
            <div className={landingPageStyle["right-section"]}>
              <img
                src="https://cms.education.macleans.ca/wp-content/uploads/2022/10/windsoruni.jpeg"
                alt="App logo"
                className={landingPageStyle["app-logo"]}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
