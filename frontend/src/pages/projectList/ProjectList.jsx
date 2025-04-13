import React, { useState, useEffect } from "react";
import projectListStyle from "./projectList.module.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Pagination from "react-bootstrap/Pagination";
import { BaseURL } from "../../constants";
import axios from "axios";

const ProjectList = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const url = `${BaseURL}project_list`; // Adjust API endpoint
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    axios.get(url, config).then(
      (response) => {
        console.log("problem", response.data);
        setData(response.data);
        if (response.data.success === "false") {
          // Handle error if needed
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  // Pagination
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
          <div className="col-8">
            <h3>List of Projects</h3>
          </div>
          <div className="col-4">
            <Link to={"/new-project"}>
              <Button className={`${classes.primary} float-end`}>
                Create Project
              </Button>
            </Link>
          </div>
        </div>
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>My Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <td className="align-middle">
                    <span><b>{row.name}</b></span>
                  </td>
                  <td className="align-middle">
                    <span>Owner</span>
                  </td>
                  <td className="align-middle">
                    <span>Active</span>
                  </td>
                  <td className="align-middle">
                    <Link to={`/edit-project/${row.id}`}>
                      <Button className={classes.warning}>Edit</Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ProjectList;
