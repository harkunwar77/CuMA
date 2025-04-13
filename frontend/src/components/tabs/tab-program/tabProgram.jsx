import programTabStyle from "./tab-program.module.css";
import React, { useState, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "../../button/button";
import { Link } from "react-router-dom";
import classes from "../../button/button.module.css";
import userListStyle from "../../../pages/programList/programList.module.css";
import Pagination from "react-bootstrap/Pagination";
import { BaseURL } from "../../../constants";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

const TabProgram = ({ projectId }) => {
  const [data, setData] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [selectedOfficialProgram, setSelectedOfficialProgram] = useState([
    { value: "", label: "Select Program" },
  ]);
  const [showSelectProgramTab, setShowSelectProgramTab] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [error, setError] = useState("");
  const [importedPrograms, setImportedPrograms] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);

  const fetchData = async () => {
    try {
      const allProgramsOfProject = `${BaseURL}getAllProgramsOfProject?id=${projectId}`;
      const searchProjectProgram = `${BaseURL}searchProjectProgram?search_query=${searchQuery}`;

      const getAllPrograms = axios.get(allProgramsOfProject);
      const getSearchedProgram = axios.get(searchProjectProgram);

      const [allProgramsResponse, searchedProgramResponse] = await axios.all([
        getAllPrograms,
        getSearchedProgram,
      ]);

      const allProgramsData = allProgramsResponse.data;
      const searchedProgramData = searchedProgramResponse.data;

      setData(allProgramsData);
      setSelectedOfficialProgram(searchedProgramData);
      console.log(searchedProgramData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Toggle Select field on click of button
  const showOfficialProgramList = (e) => {
    setShowSelect(true);
  };

  const handleImport = async () => {
    const url = `${BaseURL}copyProgramsToProject`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };

    // const programIds = selectedOfficialProgram.map((program) => program.id);

    const body = {
      project_id: projectId,
      program_ids: selectedProgramIds,
    };

    try {
      const response = await axios.post(url, body, config);
      if (response.data.status == false) {
        setError(response.error.message);
      } else {
        const importedProgramsData = response.data;
        setImportedPrograms(importedProgramsData);
        setShowSelectProgramTab(true);
        setSearchQuery("");
        window.location.href = `/edit-project/${projectId}`;
      }
      console(response.data);
    } catch (error) {
      console.log(error);
      setError("An error occurred while importing programs.");
    }
  };

  //Handles select menu
  const handleOfficialProgram = (selectedOptions) => {
    const ids = selectedOptions
      .filter((item) => item !== null && item.value !== undefined)
      .map((option) => option.value);
    setSelectedProgramIds(ids);
    console.log(selectedProgramIds);
  };

  const handleDelete = (projectId, id) => {
    const url = `${BaseURL}deleteProjectProgram`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const body = {
      project_id: projectId,
      project_program_id: id,
    };

    axios
      .post(url, body, config)
      .then((res) => {
        console.log("Deleted program:", res.data);
        // Update the data array by filtering out the deleted row
        setData(data.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting program:", error);
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
      <div className="mt-4 mb-4">
        <h3>Programs</h3>
        <div className="row">
          <div className="col-12">
            <ButtonGroup>
              <Button onClick={showOfficialProgramList}>
                Import official programs
              </Button>
               <Link to= {`/addProjectProgram/${projectId}`}>
            <Button className={`${classes.primary} float-end`}>
              Create Program
            </Button>
          </Link>
            </ButtonGroup>
          </div>
          {showSelect && (
            <div className="row mt-3">
              <div className="col-6 mt-2">
                <MultiSelect
                  options={selectedOfficialProgram.map((item, index) => ({
                    value: item.id,
                    label: item.name,
                    index: index,
                  }))}
                  value={selectedProgramIds.map((program) => ({
                    value: program,
                    label: program,
                  }))}
                  onChange={handleOfficialProgram}
                  labelledBy={"Select Official Program"}
                  selectAllLabel={"Select All"}
                  disableSearch={false}
                  overrideStrings={{
                    selectSomeItems: "Select Programs",
                    allItemsAreSelected: "All Programs are selected",
                    searchPlaceholder: "Search Programs",
                    noOptions: "No Programs found",
                  }}
                />
              </div>
              <div className="col-6">
                <Button className={classes.primary} onClick={handleImport}>
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="table-responsive mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Program</th>
                  <th>Date Revised</th>
                  <th>Status & Action</th>
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
                      <span>{row.revision_start_date}</span>
                    </td>
                    <td className="align-middle">
                      <span className={programTabStyle.status}>
                        {row.state}
                      </span>
                      {row.state === "draft" ? (
                        <Link to={`/edit-program/${projectId}/` + row.id}>
                          <Button className={classes.warning}>Edit</Button>
                        </Link>
                      ) : (
                        <Link to={`/edit-program/${projectId}/` + row.id}>
                          <Button className={classes.warning}>
                            Begin a new revision
                          </Button>
                        </Link>
                      )}

                      <Button className={classes.danger}>
                        <DeleteOutline
                          className={userListStyle.userListDelete}
                          onClick={() => handleDelete(projectId, row.id)}
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
      </div>
    </React.Fragment>
  );
};

export default TabProgram;
