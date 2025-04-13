// Topbar component

import React from "react";
import topbarStyle from "./topbar.module.css";
import { FaPowerOff } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { MdMenu } from "react-icons/md";
import SearchBar from "material-ui-search-bar";
import avatar from "../../images/avatar.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../constants";

const Topbar = ({ toggleSidebar }) => {
  function logout_session() {
    const url = `${BaseURL}logout`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    axios.get(url, config).then(
      (response) => {
        if (response.data.success === "true") {
          window.sessionStorage.removeItem("username");
          window.location.href = "/login";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <React.Fragment>
      <section className={topbarStyle.topbar}>
        <main className={topbarStyle.topbarWrapper}>
          <div className={topbarStyle.topLeft}>
           
            <span className={topbarStyle.logo}>CuMA</span>
          </div>
          <div className={topbarStyle.topRight}>
            <SearchBar
              className="me-2"
              style={{
                height: 40,
                fontSize: "1rem",
              }}
            />
            <Link to="/userProfile" className="me-2">
              <BiUser
                className={topbarStyle.profile}
                size={25}
                title="Profile"
              />
            </Link>
            <a onClick={logout_session}>
              <div className={topbarStyle.topbarIconContainer}>
                <FaPowerOff
                  className={topbarStyle.logOut}
                  size={24}
                  title="Sign Out"
                />
              </div>
            </a>
          </div>
        </main>
      </section>
    </React.Fragment>
  );
};

export default Topbar;
