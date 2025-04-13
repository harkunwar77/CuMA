import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Pagination from "react-bootstrap/Pagination";

const Projects = (props) => {
  const { programId } = useParams(); // Get the programId from the route parameters

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const url = programId
      ? `${BaseURL}courses/${programId}` // Fetch courses for the selected program
      : `${BaseURL}project_list`; // Fetch all projects if programId is not present
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };

    axios.get(url, config).then(
      (response) => {
        setData(response.data);
        if (response.data.success === "false") {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [programId]);

  const calculateIndex = () => {
    const indexOfLastRow =
      currentPage === 1 ? rowsPerPage : currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return [indexOfFirstRow, indexOfLastRow];
  };

  const [indexOfFirstRow, indexOfLastRow] = calculateIndex();
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <h3>{programId ? `List of Courses in Program ${programId}` : "List of Projects"}</h3>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            {!programId && (
              <Link to={"/new-project"}>
                <Button className={`${classes.primary} float-end`}>
                  Create New Project
                </Button>
              </Link>
            )}
          </div>
        </div>
        {programId && (
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Link to={`/programs/${programId}/courses`}>
                <Button className={`${classes.primary} float-end`}>
                  See All Courses
                </Button>
              </Link>
            </div>
          </div>
        )}
        <div className="table-responsive mt-4">
          {/* Rest of your code for rendering the table */}
        </div>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handleClick(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </React.Fragment>
  );
};

export default Projects;
