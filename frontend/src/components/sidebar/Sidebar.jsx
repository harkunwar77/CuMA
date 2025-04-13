import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Folder,
  Subject,
  Bookmark,
  Bookmarks,
  Assessment,
  Review,
  Book,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  Assignment,
  Report,
} from "@material-ui/icons";

const sidebarItems = [
  {
    title: "Dashboard",
    icons: [<Home />, <Folder />, <Subject />, <Book />],
    links: ["/home", "/project_list", "/faculties", "/curiMaps"],
  },
];

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();

  let username = window.sessionStorage.getItem("username");

  return (
    <div
      className={`col-sm-12 col-xs-12 col-md-2 col-lg-2 ${
        sidebarOpen ? "sidenav" : "sidenavClosed"
      }`}
    >
      <div className="sidebarWrapper">
        {sidebarItems.map((section, index) => (
          <div key={index} className="sidebarMenu mt-4">
            <h3 className="widgetSm_widgetSmTitle__1DLAD">{section.title}</h3>
            <ul className="sidebarList">
              {section.icons.map((icon, i) => (
                <Link to={section.links[i]} className="link" key={i}>
                  <li
                    className={`sidebarListItem mt-2 ${
                      location.pathname === section.links[i] ? "active" : ""
                    }`}
                  >
                    {React.cloneElement(icon, { className: "sidebarIcon" })}
                    {section.title === "Dashboard" &&
                    section.links[i] === "/home"
                      ? "Home"
                      : section.title === "Dashboard" &&
                        section.links[i] === "/project_list"
                      ? "Projects"
                      : section.title === "Dashboard" &&
                        section.links[i] === "/faculties"
                      ? "Faculties"
                      : section.title === "Quick Menu" &&
                        section.links[i] === "/program-list"
                      ? username === "admin"
                        ? "Users"
                        : "Your Programs"
                      : section.title === "Quick Menu" &&
                        section.links[i] === "/course-list"
                      ? username === "admin"
                        ? "Courses"
                        : "Your Courses"
                      : section.title === "Dashboard" &&
                        section.links[i] === "/curiMaps"
                      ? username === "admin"
                        ? "Maps"
                        : "Curriculum Maps"
                      : null}
                  </li>
                </Link>
              ))}
              <div className="sidebarMenu mt-4">
                <h3 className="widgetSm_widgetSmTitle__1DLAD">Quick Menu</h3>
                <ul className="sidebarList">
                  <Link to="/program-list" className="link">
                    <li className="sidebarListItem mt-2">
                      <Bookmark className="sidebarIcon" />
                      {username === "admin" ? "Programs" : "Programs"}
                    </li>
                  </Link>
                  <Link to="/course-list" className="link">
                    <li className="sidebarListItem mt-2">
                      <Bookmarks className="sidebarIcon" />
                      {username === "admin" ? "Courses" : "Courses"}
                    </li>
                  </Link>
                  <Link to="/curiMaps" className="link">
                    <li className="sidebarListItem mt-2">
                      <Book className="sidebarIcon" />
                      {username === "admin" ? "Maps" : "Curriculum Maps"}
                    </li>
                  </Link>
                </ul>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
