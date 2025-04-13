import React, { useState, useEffect } from "react";
import userListStyle from "./programList.module.css";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Pagination from "react-bootstrap/Pagination";
import { BaseURL } from "../../constants";
import axios from "axios";

const ProgramList = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    const url = `${BaseURL}getAllPrograms`;
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
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${BaseURL}deleteprogram/${id}`)
      .then((res) => {
        console.log("Deleted program by ", res.data);
        setData(data.filter((row) => row.id !== id));
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
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
      <div className="row">
        <div className="col-8">
          <h3>List of Programs</h3>
        </div>
        <div className="col-4"></div>
      </div>
      <div className="table-responsive mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Date Revised</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td className="align-middle">
                  <span>{row.name}</span>
                </td>
                <td className="align-middle">
                  <span>{row.revision_start_date}</span>
                </td>
                <td className="align-middle">
                  <Link to={`/view-program/${row.id}`}>
                    <Button className={classes.warning}>View</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Button className={classes.danger}>
                    <DeleteOutline
                      className={userListStyle.userListDelete}
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
  );
};

export default ProgramList;
