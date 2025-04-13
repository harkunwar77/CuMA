import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../constants";
import "./TabMaps.css";

const colorOptions = ["I", "R", "M"];

const TabMaps = () => {
  const { projectId } = useParams(); // Extract projectId from URL
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [outcomes, setOutcomes] = useState([]);
  const [programsCoursesData, setProgramsCoursesData] = useState([]);
  const [selectedCell, setSelectedCell] = useState({});
  const [error, setError] = useState("");
  const [courseDescriptions, setCourseDescriptions] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${BaseURL}/getAllProgramsOfProject?id=${projectId}`);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
        setError("Error fetching programs. Please check the console for more details.");
      }
    };

    fetchPrograms();
  }, [projectId]);

  useEffect(() => {
    if (!selectedProgramId) return;
  
    const fetchData = async () => {
      try {
        const allOutcomes = `${BaseURL}/getProgramOutcomes?project_id=${projectId}&program_id=${selectedProgramId}`;
        const allProgramsCourses = `${BaseURL}/getProgramCourses?project_id=${projectId}&program_id=${selectedProgramId}`;
        const courseDescriptionsUrl = `${BaseURL}/getCourseDescriptions?project_id=${projectId}`;
  
        const getAllOutcomes = axios.get(allOutcomes);
        const getAllProgramsCourses = axios.get(allProgramsCourses);
        const getCourseDescriptions = axios.get(courseDescriptionsUrl);
  
        const [
          allOutcomesResponse,
          allProgramsCoursesResponse,
          courseDescriptionsResponse,
        ] = await axios.all([
          getAllOutcomes,
          getAllProgramsCourses,
          getCourseDescriptions,
        ]);
  
        console.log("Outcomes Response:", allOutcomesResponse.data);
        console.log("Programs Courses Response:", allProgramsCoursesResponse.data);
        console.log("Course Descriptions Response:", courseDescriptionsResponse.data);
  
        setOutcomes(allOutcomesResponse.data); // Set outcomes fetched from the program-specific endpoint
        setCourses(allProgramsCoursesResponse.data); // Update courses based on selected program
        setProgramsCoursesData(allProgramsCoursesResponse.data);
        setCourseDescriptions(courseDescriptionsResponse.data);
      } catch (error) {
        console.error("Error fetching outcomes and courses:", error);
        setError(
          "Error fetching outcomes and courses. Please check the console for more details."
        );
      }
    };
  
    fetchData();
  }, [projectId, selectedProgramId]);
  

  const handleProgramChange = (event) => {
    setSelectedProgramId(event.target.value);
  };

  const handleCellClick = (courseId, outcomeId) => {
    setSelectedCell({ courseId, outcomeId });
  };

  const handleColorChange = (event, courseId, outcomeId) => {
    const selectedColor = event.target.value;
    const updatedData = programsCoursesData.map((pc) =>
      pc.course_id === courseId && pc.outcome_id === outcomeId
        ? { ...pc, status: selectedColor }
        : pc
    );

    // If no existing mapping found, add a new one
    if (!updatedData.some((pc) => pc.course_id === courseId && pc.outcome_id === outcomeId)) {
      updatedData.push({ course_id: courseId, outcome_id: outcomeId, status: selectedColor });
    }

    setProgramsCoursesData(updatedData);
    setSelectedCell({});
  };

  const handleSave = async () => {
    try {
      await axios.post(`${BaseURL}/saveProgramCourseMapping`, {
        project_id: projectId,
        program_id: selectedProgramId,
        mapping: programsCoursesData,
      });
      alert("Mapping saved successfully!");
    } catch (error) {
      console.error("Error saving mapping:", error);
      alert("Error saving mapping. Please check the console for more details.");
    }
  };

  const getColorStyle = (status) => {
    switch (status) {
      case "I":
        return { backgroundColor: "green", color: "white" };
      case "R":
        return { backgroundColor: "yellow", color: "black" };
      case "M":
        return { backgroundColor: "red", color: "white" };
      default:
        return {};
    }
  };

  return (
    <div className="tab-maps">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mt-4 plo-table-container2">
        <h3>Instructions:</h3>
        <ol>
          <li>Select a program to begin the mapping process.</li>
          <li>Click on a cell to change the status of a course for a particular outcome.</li>
          <li>Use the dropdown to select the status: I for Introductory, R for Reinforcement, and M for Mastery.</li>
          <li>Click the "Save Mapping" button to save your changes.</li>
        </ol>
      </div>

      {/* Program Selection Dropdown */}
      <div className="mt-4">
        <label>Select Program:</label>
        <select onChange={handleProgramChange} value={selectedProgramId || ""}>
          <option value="" disabled>Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProgramId && (
        <>
          <div className="mt-4">
            <h2>Programs and Courses Mapping</h2>

            <table className="table">
              <thead>
                <tr>
                  <th>Course</th>
                  {outcomes.length > 0 &&
                    outcomes.map((outcome, index) => (
                      <th key={outcome.id}>{`PLO ${index + 1}`}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.course_name}</td>
                    {outcomes.length > 0 &&
                      outcomes.map((outcome, index) => {
                        const outcomeId = outcome.id;
                        const cellData = programsCoursesData.find(
                          (pc) =>
                            pc.course_id === course.course_id && pc.outcome_id === outcomeId
                        );
                        const cellStatus = cellData ? cellData.status : "";
                        return (
                          <td
                            key={outcomeId}
                            onClick={() => handleCellClick(course.course_id, outcomeId)}
                            style={getColorStyle(cellStatus)}
                          >
                            {selectedCell.courseId === course.course_id &&
                            selectedCell.outcomeId === outcomeId ? (
                              <select
                                onChange={(event) =>
                                  handleColorChange(event, course.course_id, outcomeId)
                                }
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select Status
                                </option>
                                {colorOptions.map((color) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              cellStatus || ""
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="button" onClick={handleSave}>
              Save Mapping
            </button>
          </div>
          <div className="mt-4">
            <h4>Course Descriptions</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {courseDescriptions.map((course) => (
                  <tr key={course.course_code}>
                    <td>{course.course_code}</td>
                    <td>{course.also_known_as}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 plo-table-container">
            <h4>Outcomes Reference</h4>
            <table className="plo-table">
              <thead>
                <tr>
                  <th>PLO</th>
                  <th>Description</th>
                  <th>UGA Alignment Labels</th>
                </tr>
              </thead>
              <tbody>
                {outcomes.map((outcome, index) => (
                  <tr key={outcome.id}>
                    <td>{`PLO ${index + 1}`}</td>
                    <td style={{ paddingLeft: "30px", paddingTop: "2px" }}>{outcome.description}</td>
                    <td>{outcome.uga_alignment?.replace(/\$/g, "  ")}</td> {/* Replace $ with space */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TabMaps;
