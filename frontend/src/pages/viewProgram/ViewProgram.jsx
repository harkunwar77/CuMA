import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import { useParams } from "react-router-dom";
import { KeyboardArrowLeftOutlined } from "@material-ui/icons";
import "./ViewProgram.css"

const ViewProgram = () => {
  const { programId } = useParams();
  const [data, setData] = useState([]);
  const [ugaAlignments, setUgaAlignments] = useState([]);
  const [programName, setProgramName] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [docID, setDocID] = useState("");
  const [error, setError] = useState("");
  const [outcomes, setOutcomes] = useState([]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const fetchData = async () => {
    try {
      // Fetch data from the API and set the state
      const url = `${BaseURL}getOfficialProgramByID?program_id=${programId}`;
      const programData = await axios.get(url); 
      setProgramName(programData.data.name);
      setAcademicLevel(programData.data.academic_level);
      setSelectedFaculty(programData.data.faculty_id);
      setRevisionDate(programData.data.latest_modified);
      setDocID(programData.data.document_id);

      // Update the outcomes state with proper conditional check
      const fetchedOutcomes =
        programData.data.outcomes?.map((outcome) => ({
          description: outcome.description,
          alignments: outcome.uga_alignment ? outcome.uga_alignment.split("") : [],
        })) || [];
      setOutcomes(fetchedOutcomes);

      // Fetch additional data like faculty and UGA alignments
      const allFaculty = `${BaseURL}faculty_list`;
      const UGAAlignmentList = `${BaseURL}uga_alignments_list`;
      const getFacultyList = axios.get(allFaculty);
      const getUGAAlignment = axios.get(UGAAlignmentList);
      const [facultyList, UGAAlignment] = await axios.all([
        getFacultyList,
        getUGAAlignment,
      ]);
      const allFacultyData = facultyList.data;
      const allUGAData = UGAAlignment.data;
      setData(allFacultyData);
      setUgaAlignments(allUGAData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
        <h3>
          <KeyboardArrowLeftOutlined onClick={goBack} /> View Program
        </h3>
        <div className="row mt-3 mb-3">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              {/* Form content */}
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label className="form-label-bold">
                  Name<span className="text-danger"></span>
                </label>
                <div className="form-control-readonly">{programName}</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label className="form-label-bold">
                  Academic Level<span className="text-danger"></span>
                </label>
                <div className="form-control-readonly">{academicLevel}</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label className="form-label-bold">Faculty</label>
                <div className="form-control-readonly">{selectedFaculty}</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label className="form-label-bold">
                  Revision Start Date<span className="text-danger"></span>
                </label>
                <div className="form-control-readonly">{revisionDate}</div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label className="form-label-bold">Document ID</label>
                <div className="form-control-readonly">{docID}</div>
              </div>
              <div className="col-12 mt-3">
                <h4>Outcomes and UGA Alignments</h4>
                {/* Outcome content */}
                {outcomes.length > 0 ? (
                  <div className="outcomes-container">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                        <label className="form-label-bold">Description</label>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                        <label className="form-label-bold">UGA Alignments</label>
                      </div>
                    </div>
                    {outcomes.map((outcome, index) => (
                      <div key={index} className="row">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                          <div className="form-control-readonly">{outcome.description}</div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                          <div className="form-control-readonly">
                            {outcome.alignments.length > 0
                              ? outcome.alignments.join(", ")
                              : "No Alignments"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3">No Outcomes Available</div>
                )}
              </div>
              {error && <div className="error text-danger">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewProgram;