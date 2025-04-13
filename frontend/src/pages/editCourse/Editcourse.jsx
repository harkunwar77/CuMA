import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../constants";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import { MultiSelect } from "react-multi-select-component";
import { KeyboardArrowLeftOutlined } from "@material-ui/icons";

const EditCourse = () => {
  const { projectId, courseId } = useParams();
  const [data, setData] = useState([]);
  const [ugaAlignments, setUgaAlignments] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [alsoKnownAs, setAlsoKnownAs] = useState("");
  const [formerlyKnownAs, setFormerlyKnownAs] = useState("");
  const [courseName, setCourseName] = useState("");
  const [revisionDate, setRevisionDate] = useState("");
  const [docID, setDocID] = useState("");
  const [error, setError] = useState("");
  const [selectedUGAAlignments, setSelectedUGAAlignments] = useState([]);
  const [outcomes, setOutcomes] = useState([{ description: "", alignments: [] }]);
  const [file, setFile] = useState("");

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };


  const fetchData = async () => {
    try {
      // Fetch data from the API and set the state
      const url = `${BaseURL}getProjectCourseByID?project_id=${projectId}&course_id=${courseId}`;
      const courseData = await axios.get(url);
      setCourseCode(courseData.data.course_code);
      setAlsoKnownAs(courseData.data.also_known_as);
      setFormerlyKnownAs(courseData.data.formerly_known_as);
      setCourseName(courseData.data.name);
      setRevisionDate(courseData.data.revision_start_date);
      setDocID(courseData.data.document_id);

      // Update the outcomes state with proper conditional check
      const fetchedOutcomes = courseData.data.outcomes.map((outcome) => ({
        description: outcome.description,
        alignments: outcome.legend ? outcome.legend.split("") : [],
      }));
      setOutcomes(fetchedOutcomes);

      // Fetch additional data like faculty and UGA alignments
      const UGAAlignmentList = `${BaseURL}uga_alignments_list`;
      const getUGAAlignment = axios.get(UGAAlignmentList);
      const UGAAlignmentResponse = await getUGAAlignment;
      const allUGAData = UGAAlignmentResponse.data;
      setUgaAlignments(allUGAData);
      setSelectedUGAAlignments(allUGAData.filter((uga) => courseData.data.alignments.includes(uga.legend)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId, courseId]);

  const handleUGAChange = (selectedOptions, outcomeIndex) => {
    const selectedLegends = selectedOptions.map((option) => option.value);
    setOutcomes((prevOutcomes) => {
      const updatedOutcomes = [...prevOutcomes];
      updatedOutcomes[outcomeIndex].alignments = selectedLegends;
      return updatedOutcomes;
    });
  };

  const handleAddOutcome = () => {
    const newOutcome = { description: "", alignments: [] };
    setOutcomes((prevOutcomes) => [...prevOutcomes, newOutcome]);
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
    const url = `${BaseURL}updateProjectCourseByID`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };

    const body = {
      id: courseId,
      project_id: projectId,
      course_code: courseCode,
      also_known_as: alsoKnownAs,
      formerly_known_as: formerlyKnownAs,
      name: courseName,
      document_id: docID,
      revision_start_date: new Date(revisionDate),
      latest_modified: new Date().toISOString().split("T")[0],
      state: "draft",
      parent_course_id: null,
      alignments: outcomes.map((outcome) => ({
        description: outcome.description,
        legend: outcome.alignments.map((uga) => uga.value).join(""),
      })),
    };

    try {
      const response = await axios.post(url, body, config);
      if (response.data.success === false) {
        setError(response.data.message);
      } else {
        // Update the UI or perform any necessary actions with the updated course data
        window.location.href = `/edit-project/${projectId}`;
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while updating the course.");
    }
  };

  return (
    <React.Fragment>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
        <h3><KeyboardArrowLeftOutlined onClick={goBack} />Edit Course</h3>
        <div className="row mt-3 mb-3">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-12">
                <label>Course</label>
                <input
                  type="file"
                  placeholder="select"
                  className="form-control"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                />
              </div>
              <h2 className="divider mt-3 mb-3 text-center">OR</h2>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>
                  Course Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Course Code"
                  className="form-control"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>Also Known As</label>
                <input
                  type="text"
                  placeholder="Also Known As"
                  className="form-control"
                  value={alsoKnownAs}
                  onChange={(e) => setAlsoKnownAs(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                <label>Formerly Known As</label>
                <input
                  type="text"
                  placeholder="Formerly Known As"
                  className="form-control"
                  value={formerlyKnownAs}
                  onChange={(e) => setFormerlyKnownAs(e.target.value)}
                />
              </div>

              <div className="row mt-3">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                  <label>
                    Course Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Course Name"
                    className="form-control"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                  <label>
                    Revision Start<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="mm-dd-yyyy"
                    className="form-control"
                    value={revisionDate}
                    onChange={(e) => setRevisionDate(e.target.value)}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mt-3">
                  <label>Document ID</label>
                  <input
                    type="text"
                    placeholder="Course scope"
                    className="form-control"
                    value={docID}
                    onChange={(e) => setDocID(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
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
                          options={ugaAlignments.map((uga) => ({
                            value: uga.legend,
                            label: `${uga.legend} - ${uga.description}`,
                          }))}
                          value={outcome.alignments}
                          onChange={(selectedOptions) => handleUGAChange(selectedOptions, index)}
                          labelledBy="Select UGA Alignment"
                          selectAllLabel="Select All"
                          disableSearch={false}
                          overrideStrings={{
                            selectSomeItems: "Select UGA Alignments",
                            allItemsAreSelected: "All UGA Alignments are selected",
                            searchPlaceholder: "Search UGA Alignments",
                            noOptions: "No UGA Alignments found",
                          }}
                        />
                      </div>

                      <div className="col-2 mt-3 d-flex justify-content-center align-items-center">
                        <Button className={classes.danger} onClick={() => handleDeleteOutcome(index)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
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
              </div>

              <div className="mt-3">
                <Button className={classes.primary}>Update Course</Button>
                {error && <div className="error text-danger">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditCourse;
