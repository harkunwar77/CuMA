import React, { useState, useEffect } from "react";
import productListStyle from "./courseList.module.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Pagination from "react-bootstrap/Pagination";
import { BaseURL } from "../../constants";
import axios from "axios";

const CourseList = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const url = `${BaseURL}getAllCourses`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    axios.get(url, config).then(
      (response) => {
        //console.log(response.data)
        setData(response.data);
        if (response.data.success === "false") {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleDelete = (id) => {
    axios
    .delete(`${BaseURL}deleteCourse/${id}`)
    .then((res) => {
      setData(data.filter((row) => row.id !== id));
    })
    .catch((error) => {
      console.log("Error deleting course", error)
    })
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

  console.log(data)
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
        <div className="row">
          <div className="col-8">
            <h3>List of Courses</h3>
          </div>
          <div className="col-4">
          
          </div>
        </div>
        <div className="table-responsive mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Course Code</th>
                <th>Description</th>
                <th>Date Revised</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <td className="align-middle">{row.id}</td>
                  <td className="align-middle">
                    <span>{row.name}</span>
                  </td>
                  <td className="align-middle">
                    <span>{row.course_code}</span>
                  </td>
                  <td className="align-middle">
                    <span></span>
                  </td>
                  <td className="align-middle">
                    <span>{row.revision_start_date}</span>
                  </td>
                  <td className="align-middle">
                    <Link to={"/course/" + row.id}>
                      <Button className={classes.warning}>Edit</Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Button className={classes.danger}>
                      <DeleteOutline
                        className={productListStyle.productListDelete}
                        onClick={() => handleDelete(row.id)}
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

export default CourseList;
