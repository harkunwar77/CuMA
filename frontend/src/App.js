import Landingpage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Layout from "./Layout";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProgramList from "./pages/programList/ProgramList";
import EditProgram2 from "./pages/editProgram/EditProgram2";
import UserProfile from "./pages/userProfile/UserProfile";
import Home from "./pages/home/Home";
import NewProject from "./pages/newProject/newProject";
import CourseList from "./pages/courseList/CourseList";
import Projects from "./pages/projects/Projects";
import EditProject from "./pages/editProject/EditProject";
import NewProgram from "./pages/newProgram/newProgram";
import Faculties from "./pages/Faculties/Faculties";
import NewFaculty from "./pages/newFaculty/NewFaculty";
import Course from "./pages/course/Course";
import NewCourse from "./pages/newCourse/newCourse";
import CuriMaps from "./pages/curiMaps/CuriMaps";
import NewMap from "./pages/newMap/NewMap";
import EditMap from "./pages/editMaps/EditMap";
import Board from "./pages/board/Board";
import ProjectList from "./pages/projectList/ProjectList";
import FacultyList from "./pages/Faculties/FacultyList";
import PdcPackages from "./components/tabs/tab-pdc/PdcPackages"; // Importing PdcPackages component
import PdcPackage from "./components/tabs/tab-pdc/PdcPackage";  // Importing PdcPackage component
import ViewProgram from "./pages/viewProgram/ViewProgram"; // Importing ViewProgram component
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Login />} />
        <Route index element={<Landingpage />} />
        <Route path="/" element={<Layout />}>
          
          <Route path="home" element={<Home />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project_list" element={<ProjectList />} />
          <Route path="edit-project/:projectId" element={<EditProject />} />
          <Route path="addprojectprogram/:projectId" element={<NewProgram />} />
          <Route path="faculties" element={<Faculties />} />
          <Route path="facultyList" element={<FacultyList />} />
          <Route path="program-list" element={<ProgramList />} />
          <Route path="new-faculty" element={<NewFaculty />} />
 
          {/* <Route
            path="edit-program/:projectId/:programId"
            element={<EditProgram />}
          /> */}
          <Route
            path="edit-program/:programId"
            element={<EditProgram2 />}
          />
        
          <Route path="new-project" element={<NewProject />} />
          <Route path="edit-project" element={<EditProject />} />
          <Route path="course-list" element={<CourseList />} />
          <Route path="course/:courseId" element={<Course />} />
          <Route path="addProjectCourse" element={<NewCourse />} />
          <Route path="curiMaps" element={<CuriMaps />} />
          <Route path="newMap" element={<NewMap />} />
          <Route path="editMap" element={<EditMap />} />
          <Route path="board" element={<Board />} />
 
          {/* Adding routes for PdcPackages and PdcPackage */}
          <Route path="pdc-packages" element={<PdcPackages />} />
          <Route path="create-pdc-package/:projectId" element={<PdcPackage />} />

          {/* Adding route for viewing official program details */}
          <Route path="view-program/:programId" element={<ViewProgram />} />
        </Route>
      </Routes>
    </Router>
  );
}
 
export default App;
