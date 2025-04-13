import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../constants";
import { Link } from "react-router-dom";

import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";

const NewFaculty = () => {
  const [facultyName, setFacultyName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BaseURL}addFaculty`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    const body = {
      name: facultyName,
    };

    try {
      const response = await axios.post(url, body, config);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        // Assuming the server responds with the updated faculty list
        const updatedFacultyList = response.data.faculty_list;
        // Update the UI or perform any necessary actions with the updated faculty list
        window.location.href = "/home";
        setError("");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the faculty.");
    }
  };

  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
      <h3>New Faculty</h3>
      <div className="row mt-3 mb-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <form className="row newUserForm" onSubmit={handleSubmit}>
            <div className="col-12 mt-3">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter faculty name"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
              />
            </div>

            <div className="mt-3">
            
              <Button type="submit" className={classes.primary}>
                Add New Faculty
             </Button>

              {error && <div className="error text-danger">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFaculty;
