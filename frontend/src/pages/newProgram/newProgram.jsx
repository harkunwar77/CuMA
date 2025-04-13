import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import { MultiSelect } from "react-multi-select-component";

const NewProgram = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [ugaAlignments, setUgaAlignments] = useState([]);
  const [programName, setProgramName] = useState("");
  const [academicLevel, setAcademicLevel] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [docID, setDocID] = useState("");
  const [error, setError] = useState("");
  const [outcomes, setOutcomes] = useState([{ description: "", alignment: [] }]);
 
  const UGA_OPTIONS = [
    { value: "A", label: "A - the acquisition, application and integration of knowledge" },
    { value: "B", label: "B - research skills, including the ability to define problems and access, retrieve and evaluate information (information literacy)" },
    { value: "C", label: "C - critical thinking and problem-solving skills" },
    { value: "D", label: "D - literacy and numeracy skills" },
    { value: "E", label: "E - responsible behaviour to self, others and society" },
    { value: "F", label: "F - interpersonal and communications skills" },
    { value: "G", label: "G - teamwork, and personal and group leadership skills" },
    { value: "H", label: "H - creativity and aesthetic appreciation" },
    { value: "I", label: "I - the ability and desire for continuous learning" },
  ];
 
  const fetchData = async () => {
    try {
      const allFacultyURL = `${BaseURL}faculty_list`;
      const UGAAlignmentURL = `${BaseURL}uga_alignments_list`;
 
      const [facultyResponse, UGAAlignmentResponse] = await axios.all([
        axios.get(allFacultyURL),
        axios.get(UGAAlignmentURL),
      ]);
 
      setData(facultyResponse.data);
      setUgaAlignments(UGAAlignmentResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
  };
 
  const handleAcademicLevelChange = (e) => {
    setAcademicLevel(e.target.value);
  };
 
  const handleUGAChange = (selectedOptions, outcomeIndex) => {
    setOutcomes((prevOutcomes) => {
      const updatedOutcomes = [...prevOutcomes];
      updatedOutcomes[outcomeIndex].alignment = selectedOptions;
      return updatedOutcomes;
    });
  };
 
  const handleAddOutcome = () => {
    if (outcomes.length < 20) {
      const newOutcome = { description: "", alignment: [] };
      setOutcomes((prevOutcomes) => [...prevOutcomes, newOutcome]);
    } else {
      setError("You can only add up to 20 outcomes.");
    }
  };
 
  const handleDeleteOutcome = (outcomeIndex) => {
    setOutcomes((prevOutcomes) => {
      const updatedOutcomes = [...prevOutcomes];
      updatedOutcomes.splice(outcomeIndex, 1);
      return updatedOutcomes;
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!programName || !academicLevel || !selectedFaculty || !revisionDate) {
      setError("Please fill in all required fields.");
      return;
    }
  
    // Validate outcomes to ensure that no outcome description is empty
    const validOutcomes = outcomes.filter(outcome => outcome.description.trim() !== "");
    if (validOutcomes.length === 0) {
      setError("Please add at least one valid outcome with a description.");
      return;
    }
  
    const url = `${BaseURL}addProjectProgram`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
  
    const outcomesData = validOutcomes.map((outcome) => ({
      description: outcome.description,
      uga_alignment: outcome.alignment.map((alignment) => alignment.value).join("$")
    }));
  
    const body = {
      project_id: projectId,
      name: programName,
      academic_level: academicLevel,
      faculty_id: selectedFaculty,
      document_id: docID,
      revision_start_date: new Date(revisionDate).toISOString().split("T")[0],
      latest_modified: new Date().toISOString().split("T")[0],
      state: "draft",
      parent_program_id: null,
      outcomes: outcomesData,
    };
  
    try {
      const response = await axios.post(url, body, config);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        navigate(`/edit-project/${projectId}`);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the program.");
    }
  };
  
  const goBack = () => {
    navigate(-1);
  };
 
  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
      <h3>New Program</h3>
      <div className="row mt-3 mb-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <form className="row" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Program Name"
                  className="form-control"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>
                  Academic Level<span className="text-danger">*</span>
                </label>
                <select
                  name="academic level"
                  id="academic level"
                  className="form-control"
                  value={academicLevel}
                  onChange={handleAcademicLevelChange}
                >
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>Faculty</label>
                <select
                  name="faculty"
                  id="faculty"
                  className="form-control"
                  value={selectedFaculty}
                  onChange={handleFacultyChange}
                >
                  <option value="">Select Faculty</option>
                  {data.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>
                  Revision Start<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  placeholder="yyyy-mm-dd"
                  className="form-control"
                  value={revisionDate}
                  onChange={(e) => setRevisionDate(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>Document ID</label>
                <input
                  type="text"
                  placeholder="Program scope"
                  className="form-control"
                  value={docID}
                  onChange={(e) => setDocID(e.target.value)}
                />
              </div>
              <div className="col-12 mt-3">
                <h4>Outcomes and UGA Alignments</h4>
                {outcomes.map((outcome, index) => (
                  <div key={index} className="row">
                    <div className="col-4 mt-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        value={outcome.description}
                        onChange={(e) => {
                          const updatedOutcomes = [...outcomes];
                          updatedOutcomes[index].description = e.target.value;
                          setOutcomes(updatedOutcomes);
                        }}
                      />
                    </div>
                    <div className="col-4 mt-3">
                      <label>UGA Alignments</label>
                      <MultiSelect
                        options={UGA_OPTIONS}
                        value={outcome.alignment}
                        onChange={(selectedOptions) => handleUGAChange(selectedOptions, index)}
                        labelledBy="Select"
                      />
                    </div>
                    <div className="col-2 mt-3 d-flex justify-content-center align-items-center">
                      <Button
                        className={classes.danger}
                        onClick={() => handleDeleteOutcome(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-12 mt-3">
                <Button
                  type="button"
                  className={`${classes.primary} add-outcome-button`}
                  onClick={handleAddOutcome}
                >
                  Add
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <Button className={classes.primary} type="submit">
                Create Program
              </Button>
              {error && <div className="error text-danger">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default NewProgram;
