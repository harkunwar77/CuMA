import axios from "axios";
import React, { useState, useEffect } from "react";
import createCourseStyle from "./newCourse.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import { MultiSelect } from "react-multi-select-component";

const NewCourse = () => {
  const location = useLocation();
  const { projectId } = location.state;

  const [data, setData] = useState([]);
  const [ugaAlignments, setUgaAlignments] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [alsoKnownAs, setAlsoKnownAs] = useState("");
  const [formerlyKnownAs, setFormerlyKnownAs] = useState("");
  const [courseName, setCourseName] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [docID, setDocID] = useState("");
  const [isPrerequisite, setIsPrerequisite] = useState(false);
  const [isPostrequisite, setIsPostrequisite] = useState(false);
  const [error, setError] = useState("");
  const [outcomes, setOutcomes] = useState([{ description: "", alignments: [] }]);
  const [isIndigenous, setIsIndigenous] = useState(false);

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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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

  const handleUGAChange = (selectedOptions, outcomeIndex) => {
    setOutcomes((prevOutcomes) => {
      const updatedOutcomes = [...prevOutcomes];
      updatedOutcomes[outcomeIndex].alignments = selectedOptions;
      return updatedOutcomes;
    });
  };

  const handleAddOutcome = () => {
    if (outcomes.length < 20) {
      const newOutcome = { description: "", alignments: [] };
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
  
    const url = `${BaseURL}addProjectCourse`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
  
    // Filter out outcomes that are empty
    const nonEmptyOutcomes = outcomes.filter(
      (outcome) => outcome.description.trim() !== "" || outcome.alignments.length > 0
    );
  
    // Format outcomes as a list of dictionaries
    const outcomesData = nonEmptyOutcomes.map((outcome) => ({
      description: outcome.description,
      uga_alignment: outcome.alignments.map((alignment) => alignment.value).join("$"),
    }));
  
    const body = {
      project_id: projectId,
      course_code: courseCode,
      also_known_as: alsoKnownAs,
      formerly_known_as: formerlyKnownAs,
      name: courseName,
      document_id: docID,
      revision_start_date: revisionDate ? new Date(revisionDate) : null,
      latest_modified: new Date().toISOString().split("T")[0],
      state: "draft",
      parent_course_id: null,
      prerequisite: isPrerequisite ? "yes" : "no",
      postrequisite: isPostrequisite ? "yes" : "no",
      indigenous_course: isIndigenous ? "yes" : "no",
      outcomes: outcomesData,  // Pass the filtered outcomes
    };
  
    try {
      const response = await axios.post(url, body, config);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        window.location.href = `/edit-project/${projectId}`;
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the course.");
    }
  };
  
  

  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
      <h3>New Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3 mb-3">
          <div className="col-12">
            <label>Course Code</label>
            <input
              type="text"
              placeholder="Course Code"
              className="form-control"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>Also Known As</label>
            <input
              type="text"
              placeholder="Also Known As"
              className="form-control"
              value={alsoKnownAs}
              onChange={(e) => setAlsoKnownAs(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>Formerly Known As</label>
            <input
              type="text"
              placeholder="Formerly Known As"
              className="form-control"
              value={formerlyKnownAs}
              onChange={(e) => setFormerlyKnownAs(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>Course Name</label>
            <input
              type="text"
              placeholder="Course Name"
              className="form-control"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>Revision Start</label>
            <input
              type="date"
              placeholder="mm-dd-yyyy"
              className="form-control"
              value={revisionDate}
              onChange={(e) => setRevisionDate(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>Document ID</label>
            <input
              type="text"
              placeholder="Document ID"
              className="form-control"
              value={docID}
              onChange={(e) => setDocID(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <label>
              Prerequisite
              <input
                type="checkbox"
                checked={isPrerequisite}
                onChange={(e) => setIsPrerequisite(e.target.checked)}
              />
            </label>
          </div>
          <div className="col-12 mt-3">
            <label>
              Postrequisite
              <input
                type="checkbox"
                checked={isPostrequisite}
                onChange={(e) => setIsPostrequisite(e.target.checked)}
              />
            </label>
          </div>
          <div className="col-12 mt-3">
            <label>
              Indigenous Course
              <input
                type="checkbox"
                checked={isIndigenous}
                onChange={(e) => setIsIndigenous(e.target.checked)}
              />
            </label>
          </div>
        </div>

        <div className="mt-3">
          <h4>Outcomes and UGA Alignments</h4>
          {outcomes.map((outcome, index) => (
            <div key={index} className="row">
              <div className="col-12 mt-3">
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
              <div className="col-12 mt-3">
                <label>UGA Alignments</label>
                <MultiSelect
                  options={UGA_OPTIONS}
                  value={outcome.alignments}
                  onChange={(selectedOptions) => handleUGAChange(selectedOptions, index)}
                  labelledBy="Select"
                />
              </div>
              <div className="col-12 mt-3">
                <Button className={classes.danger} onClick={() => handleDeleteOutcome(index)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <div className="col-12 mt-3">
            <Button type="button" className={`${classes.primary} add-outcome-button`} onClick={handleAddOutcome}>
              Add Outcome
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <Button className={classes.primary}>Create Course</Button>
          {error && <div className="error text-danger">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default NewCourse;
