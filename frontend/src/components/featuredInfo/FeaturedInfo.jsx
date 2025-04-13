import React, { useState, useEffect, Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import featureInfoStyle from "./featuredInfo.module.css";
import { ImArrowUp } from "react-icons/im";
import experience from "../../images/experience.png";
import experience1 from "../../images/experience1.png";
import experience2 from "../../images/experience2.png";
import programIcon from "../../images/program.png";
import mapping from "../../images/mapping.png";
import { Link } from "react-router-dom";
import Button from "../button/button";
import classes from "../button/button.module.css";
import Card from "../card/card";
import { FaBook, FaUser, FaGraduationCap } from 'react-icons/fa';
import { BaseURL } from "../../constants";
import axios from "axios";

export class PauseOnHover extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows: false,
    };
    return (
      <div className={featureInfoStyle.slide}>
        <main className="featuredItem">
          <Slider {...settings}>
            <div>
              <img src={experience} alt="slider" />
            </div>
            <div>
              <img src={experience1} alt="slider" />
            </div>
            <div>
              <img src={experience2} alt="slider" />
            </div>
          </Slider>
        </main>
      </div>
    );
  }
}

const FeaturedInfo = () => {
  const [programCount, setProgramCount] = useState({ programs: '' });
  const [facultyCount, setFacultyCount] = useState({ faculties: '' });
  const [courseCount, setCourseCount] = useState({ courses: '' });

  const fetchProgramCount = async () => {
    try {
      const url = `${BaseURL}getCount`;
      const config = {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(url, config);
      console.log("Program List:", response.data);

      setFacultyCount({ faculties: response.data.faculties });
      setProgramCount({ programs: response.data.programs });
      setCourseCount({ courses: response.data.courses });

    } catch (error) {
      console.error("Error fetching program list:", error);
    }
  };

  useEffect(() => {
    fetchProgramCount();
  }, []);

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
        <Card>
          <div className="row">
            <div className="col-9">
              <h3 className={featureInfoStyle.featuredTitle}>Faculty</h3>
              <h4 className={featureInfoStyle.successDigit}>{facultyCount.faculties}</h4>
              <Link to={"/faculties"}>
                <Button className={classes.primary}>All Faculty</Button>
              </Link>
            </div>
            <div className="col-3">
              <FaUser size={40} color="#007bff" />
            </div>
          </div>
        </Card>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
        <Card>
          <div className="row">
            <div className="col-9">
              <h3 className={featureInfoStyle.featuredTitle}>Programs</h3>
              <h4 className={featureInfoStyle.successDigit}>{programCount.programs}</h4>
              <Link to={"/program-list"}>
                <Button className={classes.primary}>All Programs</Button>
              </Link>
            </div>
            <div className="col-3">
              <FaGraduationCap size={40} color="#007bff" />
            </div>
          </div>
        </Card>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
        <Card>
          <div className="row">
            <div className="col-9">
              <h3 className={featureInfoStyle.featuredTitle}>Courses</h3>
              <h4 className={featureInfoStyle.successDigit}>{courseCount.courses}</h4>
              <Link to={"/course-list"}>
                <Button className={classes.primary}>All Courses</Button>
              </Link>
            </div>
            <div className="col-3">
              <FaBook size={40} color="#007bff" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeaturedInfo;
