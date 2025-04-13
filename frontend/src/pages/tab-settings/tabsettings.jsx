// import newUserStyle from "./newProject.module.css";
import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";

const NewProject = () => {
  const [projName, setProjName] = useState("");
  const [owners, setOwners] = useState(
    window.sessionStorage.getItem("username") + "@uwindsor.ca"
  );
  const [members, setMembers] = useState("");
  const [guests, setGuests] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BaseURL}addproject`;
    const token = window.sessionStorage.getItem("authToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      withCredentials: true,
    };
    const body = {
      name: projName,
      owners: owners,
      members: members,
      guests: guests,
      default_read: false,
      default_read_write: false,
    };

    try {
      const response = await axios.post(url, body, config);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        // Assuming the server responds with the updated project list
        const updatedProjectList = response.data.project_list;
        // Update the UI or perform any necessary actions with the updated project list
        window.location.href = "/project_list";
        setError("");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setError(`An error occurred: ${error.response.status} - ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        setError("No response received from the server.");
      } else {
        // Something else happened in setting up the request
        setError(`Error: ${error.message}`);
      }
      console.log(error);
    }
  };

  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
      <h3>Settings</h3>
      <div className="row mt-3 mb-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <form className="row newUserForm" onSubmit={handleSubmit}>
            <div className="col-12 mt-3">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter project name"
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
              />
            </div>
            <div className="col-12 mt-3">
              <div className="alert alert-danger mt-3" role="alert">
                <h5>
                  Enter the UWin IDs of the people who should have access to
                  this project.
                </h5>
                <ul>
                  <li>
                    <b>Owners </b>can make changes to the project, including the
                    settings on this page.
                  </li>
                  <li>
                    <b>Members </b>can make changes to the project, except for
                    the settings on this page.
                  </li>
                  <li>
                    <b>Guests </b>can view information in the project, but
                    cannot make any changes.
                  </li>
                </ul>
                <b>Note: </b>The access control model is a work in progress. For
                now, assume that anyone can edit your project!
              </div>
            </div>
            <div className="col-4 mt-3">
              <label>Owners</label>
              <textarea
                className="form-control"
                id="owners"
                name="owners"
                rows="4"
                cols="50"
                value={owners}
                placeholder="Enter ID"
                onChange={(e) => setOwners(e.target.value)}
              ></textarea>
            </div>
            <div className="col-4 mt-3">
              <label>Members</label>
              <textarea
                className="form-control"
                id="members"
                name="members"
                rows="4"
                cols="50"
                value={members}
                placeholder="Enter ID"
                onChange={(e) => setMembers(e.target.value)}
              ></textarea>
            </div>
            <div className="col-4 mt-3">
              <label>Guests</label>
              <textarea
                className="form-control"
                id="guests"
                name="guests"
                rows="4"
                cols="50"
                placeholder="Enter ID"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3">
              <Button className={classes.primary}>Save Changes</Button>
              {error && <div className="error text-danger">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
