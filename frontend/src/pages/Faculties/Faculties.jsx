import programStyle from "./faculties.module.css";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Card from "../../components/card/card";
const Faculties = () => {
  const [data, setData] = useState({ name: "MAC" });
  const [programList, setProgramList] = useState([]);
  const [facultyCounts, setFacultyCounts] = useState({});
  const navigate = useNavigate ();

  const fetchFacultyCount = async () => {
    const url = `${BaseURL}getFacultyCount`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
  
    axios.get(url, config).then(
      (response) => {
        setFacultyCounts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  useEffect(() => {
    fetchFacultyCount();
    const url = `${BaseURL}faculty_list`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };

    axios.get(url, config).then(
      (response) => {
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleSeeAllPrograms = async (projectId) => {
    try {
      const url = `${BaseURL}getAllProgramsOfFaculty?faculty_id=${projectId}`;
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(url, config);
      setProgramList(response.data);
      navigate("/facultyList", { state: { programs: response.data } });
    } catch (error) {
      console.error("Error fetching program list:", error);
    }
  };

  let faculty_list = [];
  for (let value in data) {
    faculty_list.push(data[value]);
  }

  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
      <div className="row">
      {faculty_list.map((faculty, index) => (
  <div key={index} className="col-xs-12 col-sm-12 col-md-3 col-lg-3 mt-3">
    <Card className="h-100">
      <h3 className={programStyle.pfeaturedTitle}>{faculty.name}</h3>
      <h4 className={programStyle.pfeaturedMoney}>
        {facultyCounts[faculty.id] || 0} 
      </h4>
      <Button
        className={classes.primary}
        onClick={() => handleSeeAllPrograms(faculty.id)}
      >
        See all Programs
      </Button>
    </Card>
  </div>
))}

      </div>
    </div>
  );
};

export default Faculties;