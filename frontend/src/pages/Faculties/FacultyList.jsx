import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import userListStyle from "./faculties.module.css";
import { DeleteOutline } from "@material-ui/icons";
import Pagination from "react-bootstrap/Pagination";
import { BaseURL } from "../../constants";
import axios from "axios";

const FacultyList = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    // Check if location or location.state is undefined
    if (!location || !location.state || !location.state.programs) {
      console.log("No programs available.");
      console.log(location.state);
    } else {
      const { programs } = location.state;
      setData(programs);
    }
  }, [location]);

  const handleDelete = (id) => {
    axios
      .delete(`${BaseURL}deleteprogram`, { data: { id } })
      .then((res) => {
        if (res.status === 200) {
          setData((data) => data.filter((row) => row.id !== id));
          console.log("Program deleted successfully");
        } else {
          console.log("Unexpected response status:", res.status);
        }
      })
      .catch((error) => {
        console.log("Error deleting program", error);
      });
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
            <h3>All Programs</h3>
          </div>
          <div className="col-4">

          </div>
        </div>
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Program Name</th>
                <th>Academic Level</th>
                <th>Date Revised</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((program) => (
                <tr key={program.id}>
                  <td className="align-middle">
                    <span>{program.name}</span>
                  </td>

                  <td className="align-middle">
                    <span>{program.academic_level}</span>
                  </td>

                  <td className="align-middle">
                    <span>{program.latest_modified}</span>
                  </td>

                  <td className="align-middle">
                    <span>{program.state}</span>
                  </td>
                  <td className="align-middle">
                    {/*
                    <Link to={"/edit-program/" + program.id}>
                      <Button className={classes.warning}>Edit</Button>
                    </Link>
                    */}
                    &nbsp;&nbsp;&nbsp;
                    <Button className={classes.danger}>
                      <DeleteOutline
                        className={userListStyle.userListDelete}
                        onClick={() => handleDelete(program.id)}
                      />
                    </Button>
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

export default FacultyList;