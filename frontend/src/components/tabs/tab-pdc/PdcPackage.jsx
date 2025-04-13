import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseURL } from "../../../constants";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./PdcPackages.css";

const PdcPackage = () => {
  const { projectId } = useParams();
  const [programData, setProgramData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [selectedMapIds, setSelectedMapIds] = useState([]);

  const fetchData = async () => {
    try {
      console.log("Fetching data for project ID:", projectId);

      const allProgramsOfProject = `${BaseURL}/getAllProgramsOfProject?id=${projectId}`;
      const allProgramsCoursesOfProject = `${BaseURL}/getAllProgramsCoursesOfProject?project_id=${projectId}`;

      const getAllPrograms = axios.get(allProgramsOfProject);
      const getAllProgramsCourses = axios.get(allProgramsCoursesOfProject);

      const [allProgramsResponse, allProgramsCoursesResponse] = await axios.all([getAllPrograms, getAllProgramsCourses]);

      console.log("Programs Response:", allProgramsResponse.data);
      console.log("Programs-Courses Response:", allProgramsCoursesResponse.data);

      setProgramData(allProgramsResponse.data);
      setCourseData(allProgramsCoursesResponse.data);

      // Fetch mappings for each program
      const mappingPromises = allProgramsResponse.data.map((program) =>
        axios.get(`${BaseURL}/getProgramCourseMappings`, {
          params: { project_id: projectId, program_id: program.id },
        })
      );

      const mappingsResponses = await axios.all(mappingPromises);
      const mappingsData = mappingsResponses.flatMap(response => response.data);

      console.log("Mappings Data:", mappingsData);
      setMappings(mappingsData);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleProgramSelect = (programId) => {
    console.log("Program selected:", programId);
    setSelectedPrograms((prevSelected) =>
      prevSelected.includes(programId)
        ? prevSelected.filter((id) => id !== programId)
        : [...prevSelected, programId]
    );
  };

  const handleMapSelect = (mapId) => {
    console.log("Map selected:", mapId);
    setSelectedMapIds((prevSelected) =>
      prevSelected.includes(mapId)
        ? prevSelected.filter((id) => id !== mapId)
        : [...prevSelected, mapId]
    );
  };

  const fetchMapData = async (mapId) => {
    try {
      const response = await axios.get(`${BaseURL}/getMapData`, {
        params: { map_id: mapId }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching map data for map ID: ${mapId}`, error);
      throw error;
    }
  };

//   const generatePDF = async () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Programs and Courses Mapping", 14, 22);

//     const tableColumn = ["Course ID", "Course Name", "PLO 1", "PLO 2"];
//     const tableRows = [];

//     for (const mapId of selectedMapIds) {
//         try {
//             const response = await axios.get(`${BaseURL}/getMapData`, {
//                 params: { map_id: mapId },
//             });

//             const mapData = response.data;
//             if (mapData) {
//                 const outcomes = mapData.outcome_ids.split(",");
//                 const statuses = mapData.statuses.split(",");

//                 const courseData = [
//                     mapData.course_id,
//                     mapData.course_name,
//                     outcomes[0] ? statuses[0] : '',
//                     outcomes[1] ? statuses[1] : ''
//                 ];
//                 tableRows.push(courseData);
//             }
//         } catch (error) {
//             console.error("Error fetching map data", error);
//         }
//     }

//     doc.autoTable({
//         startY: 30,
//         head: [tableColumn],
//         body: tableRows,
//         didDrawCell: (data) => {
//             if (data.column.index === 2 && data.row.index >= 0) {
//                 const status = data.cell.raw;
//                 if (status === 'I') {
//                     doc.setFillColor(0, 128, 0); // Green
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(255, 255, 255); // White text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 } else if (status === 'M') {
//                     doc.setFillColor(255, 255, 0); // Yellow
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(0, 0, 0); // Black text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 } else if (status === 'R') {
//                     doc.setFillColor(255, 0, 0); // Red
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(255, 255, 255); // White text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 }
//             } else if (data.column.index === 3 && data.row.index >= 0) {
//                 const status = data.cell.raw;
//                 if (status === 'I') {
//                     doc.setFillColor(0, 128, 0); // Green
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(255, 255, 255); // White text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 } else if (status === 'M') {
//                     doc.setFillColor(255, 255, 0); // Yellow
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(0, 0, 0); // Black text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 } else if (status === 'R') {
//                     doc.setFillColor(255, 0, 0); // Red
//                     doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
//                     doc.setTextColor(255, 255, 255); // White text
//                     doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
//                 }
//             }
//         },
//     });

//     doc.save("programs_courses_mapping.pdf");
// };
const generatePDF = async () => {
  const doc = new jsPDF();

  // Reduce font size for the title
  doc.setFontSize(14);
  doc.text("Programs and Courses Mapping", 14, 22);

  const tableColumn = ["Course ID", "Course Name", "PLO 1", "PLO 2", "PLO 3", "PLO 4", "PLO 5"];
  const tableRows = [];

  for (const mapId of selectedMapIds) {
      try {
          const response = await axios.get(`${BaseURL}/getMapData`, {
              params: { map_id: mapId },
          });

          const mapData = response.data;
          if (mapData) {
              const outcomes = mapData.outcome_ids.split(",");
              const statuses = mapData.statuses.split(",");

              const courseData = [
                  mapData.course_id,
                  mapData.course_name,
                  outcomes[0] ? statuses[0] : '',
                  outcomes[1] ? statuses[1] : '',
                  outcomes[2] ? statuses[2] : '',
                  outcomes[3] ? statuses[3] : '',
                  outcomes[4] ? statuses[4] : ''
              ];
              tableRows.push(courseData);
          }
      } catch (error) {
          console.error("Error fetching map data", error);
      }
  }

  // Adjust the autoTable settings
  doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 8, cellPadding: 1 },
      didDrawCell: (data) => {
          const status = data.cell.raw;
          const colors = {
              'I': [0, 128, 0, 255, 255, 255], // Green, White text
              'M': [255, 255, 0, 0, 0, 0], // Yellow, Black text
              'R': [255, 0, 0, 255, 255, 255] // Red, White text
          };

          if (status in colors) {
              doc.setFillColor(...colors[status].slice(0, 3)); // Background color
              doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
              doc.setTextColor(...colors[status].slice(3)); // Text color
              doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2, { align: 'center' });
          }
      },
  });

  doc.save("programs_courses_mapping.pdf");
};


  useEffect(() => {
    const filterCourses = () => {
      if (selectedPrograms.length === 0) {
        setFilteredCourses([]);
        return;
      }

      const selectedCourses = courseData.filter((course) =>
        selectedPrograms.includes(course.program_id)
      );

      console.log("Filtered Courses:", selectedCourses);
      setFilteredCourses(selectedCourses);
    };

    filterCourses();
  }, [selectedPrograms, courseData]);

  useEffect(() => {
    console.log("Mappings State:", mappings);
    console.log("Filtered Courses State:", filteredCourses);
  }, [mappings, filteredCourses]);

  return (
    <div className="container">
      <div className="list-container">
        <div className="list-title">Programs</div>
        {error && <div className="alert alert-danger">{error}</div>}
        <ul className="list-unstyled">
          {programData.map((program) => (
            <li
              key={program.id}
              className={`list-item ${
                selectedPrograms.includes(program.id) ? "selected" : ""
              }`}
              onClick={() => handleProgramSelect(program.id)}
            >
              <span className="mb-3">Program ID: {program.id}</span>
              <br />
              <span className="mb-3">Program Name: {program.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="list-container">
        <div className="list-title">Map IDs</div>
        <ul className="list-unstyled">
          {mappings.map((mapping) => (
            <li
              key={mapping.map_id}
              className={`list-item ${
                selectedMapIds.includes(mapping.map_id) ? "selected" : ""
              }`}
              onClick={() => handleMapSelect(mapping.map_id)}
            >
              <span className="mb-3">Map ID: {mapping.map_id}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary" onClick={generatePDF}>Create PDF</button>
    </div>
  );
};

export default PdcPackage;
