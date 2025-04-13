from sqlalchemy.exc import SQLAlchemyError

from app import app, conn
from app.services.dbServices import createSession, closeSession
from app.services.facultyServices import (
    getFacultyByID,
    getAllFaculty,
    addFaculty,
    updateFacultyByID,
    deleteFacultyByID, getFacultyCount,
)
from app.services.courseServices import (
    getAllCoursesOfProject,
    getProjectCourseByID,
    addProjectCourse,
    updateProjectCourseByID,
    deleteProjectCourse,
    searchProjectCourse,
    copyCoursesToProject,
    beginRevision,
    getAllCourses,
    deleteCourseByID,
)
from app.services.programServices import (
    getAllProgramsOfFaculty,
    getAllProgramsOfProject,
    getProjectProgramByID,
    addProjectProgram,
    updateProjectProgramByID,
    deleteProgramByID,
    searchProjectProgram,
    copyProgramsToProject,
    beginRevisionProgram,
    mapCoursesToPrograms,
    deleteProjectProgram,
    getAllProgramsCoursesOfProject,
    getAllPrograms,
    getCount, updateProgram, getProgramCourses, getOfficialProgramByID,
)
from app.services.projectServices import (
    addProject,
    get_projects_of_user,
    get_project_by_ID,
    update_project,
)
from app.services.ugaAlignmentServices import (
    getUgaAlignmentByID,
    getAllUgaAlignments,
    addUgaAlignment,
    updateUgaAlignmentByID,
    deleteUgaAlignmentByID,
)
from flask import request, jsonify, session
from datetime import datetime

from app.model.faculty import Faculty
from app.model.project_course import ProjectCourse
from app.model.projectProgram import ProjectProgram, ProjectProgramOutcome
from app.model.program import Program
from app.model.course import Course
from app.model.project import Project
from app.model.project_permissions import ProjectPermissions
import traceback


@app.route("/test", methods=["GET"])
def test():
    return "testing"


def validate_login():
    return True
    # print(session)
    # if 'user_id' in session:
    #     return True
    # else:
    #     return False


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    uwinid = data["uwinid"]
    password = data["password"]
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM login_uwin WHERE uwinid=%s AND password=%s", (uwinid, password)
    )
    user = cur.fetchone()
    print(user, data)
    cur.close()
    if user:
        session["user_id"] = user[1]
        print("session created->", session)
        return jsonify(
            {
                "message": "Login successful!",
                "success": "true",
                "username": user[1][0 : user[1].find("@")],
            }
        )
    else:
        return jsonify({"message": "Invalid username or password", "success": "false"})


##API to know wether a user is logged or not
@app.route("/status")
def session_status():
    if not validate_login():
        return getAllCourses()
        # return jsonify({'message': 'User not logged in'}), 401
    else:
        return jsonify("ok"), 200


@app.route("/logout")
def logout():
    session.clear()
    return jsonify({"message": "Logout successful!", "success": "true"})


##
# http://localhost:5000/faculty_list
##

@app.route("/faculty_list", methods=["GET"])
def get_faculty_list():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return getAllFaculty(), 200


##
# http://localhost:5000/faculty_list_by_id?id=4
##
@app.route("/faculty_list_by_id", methods=["GET"])
def get_faculty_list_by_id():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        if id is None:
            return jsonify({"message": "Missing ID parameter"}), 400

        return getFacultyByID(id), 200


##
# http://localhost:5000/addFaculty
# {
#    "name": "testFaculty"
# }
##
@app.route("/addFaculty", methods=["POST"])
def addFaculty_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        name = request.json["name"]
        faculty = Faculty(name=name)
        if name is None:
            return jsonify({"message": "Missing name parameter"}), 400

        return addFaculty(faculty), 200


##
# http://localhost:5000/updatefaculty
# {
#    "name": "testFacultynew",
#    "id": 10
# }
##
@app.route("/updatefaculty", methods=["POST"])
def updatefaculty():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.json["id"]
        name = request.json["name"]
        faculty = Faculty(id=id, name=name)
        if name is None or id is None:
            return jsonify({"message": "Missing name or id parameter"}), 400

        return updateFacultyByID(faculty), 200


##
# http://localhost:5000/deletefaculty
# {
#    "id": 10
# }
##
@app.route("/deletefaculty", methods=["POST"])
def deletefaculty():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.json["id"]
        if id is None:
            return jsonify({"message": "Missing id parameter"}), 400

        return deleteFacultyByID(id)


##
# http://localhost:5000/getAllCoursesOfProject?id=4
##
@app.route("/getAllCoursesOfProject", methods=["GET"])
def getAllCoursesOfProject_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        print("ID : ",id)
        return getAllCoursesOfProject(id)


##
@app.route("/getAllCourses", methods=["GET"])
def getAllCourses_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return getAllCourses()


# Route for fetching official program details
@app.route("/getOfficialProgramByID", methods=["GET"])
def getOfficialProgramByID_route():
    program_id = request.args.get("program_id")

    if not program_id:
        return jsonify({"error": "Missing program_id parameter"}), 400

    try:
        program = getOfficialProgramByID(program_id)
        return program
    except Exception as e:
        return jsonify({"error": "Failed to fetch official program", "message": str(e)}), 500


##
# http://localhost:5000/getProjectCourseByID?project_id=4&course_id=1
##
@app.route("/getProjectCourseByID", methods=["GET"])
def getProjectCourseByID_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        project_id = int(request.args.get("project_id"))
        course_id = int(request.args.get("course_id"))
        if id is None:
            return jsonify({"message": "Missing ID parameter"}), 400

        return getProjectCourseByID(project_id, course_id)


##
# http://localhost:5000/addProjectCourse
# {
#     "project_id": 19,
#     "course_code": "CSE101",
#     "also_known_as": "Intro to Computer Science",
#     "formerly_known_as": "CS101",
#     "name": "Computer Science Fundamentals",
#     "document_id": "DOC001",
#     "revision_start_date": "2023-06-01",
#     "latest_modified": "2023-06-01" #assign current date
#     "state": "draft" #default for newely creating projects
#     "parent_course_id": null # default null for newly created projects
#     "alignments" :
# [
#         {
#             "description": "Interpret mathematically about basic (discrete) structures used in Computer Science.",
#             "legend": "C"
#         },
#         {
#             "description": "Calculate the computational time complexity of algorithms (also relevant to Section A).\n",
#             "legend": "CA"
#         }
#     ]
# }
##

# @app.route("/addProjectCourse", methods=["POST"])
# def addProjectCourse_route():
#     if not validate_login():
#         return jsonify({"message": "User not logged in"}), 401
#     else:
#         try:
#             project_id = request.json["project_id"]
#             course_code = request.json["course_code"]
#             also_known_as = request.json.get(
#                 "also_known_as"
#             )  # Use get for optional fields
#             formerly_known_as = request.json.get(
#                 "formerly_known_as"
#             )  # Use get for optional fields
#             name = request.json["name"]
#             document_id = request.json.get("document_id")  # Use get for optional fields
#             prerequisite = request.json.get("prerequisite")  # Use get for optional fields
#             postrequisite = request.json.get("postrequisite")  # Use get for optional fields
#             revision_start_date_str = request.json.get(
#                 "revision_start_date", datetime.now().strftime("%Y-%m-%d")
#             )
#             # Parse date strings to date objects
#             revision_start_date = datetime.strptime(
#                 revision_start_date_str.split("T")[0], "%Y-%m-%d"
#             ).date()
 
#             latest_modified_str = request.json.get(
#                 "latest_modified", datetime.now().strftime("%Y-%m-%d")
#             )  # Default to now if not provided
           
#             latest_modified = datetime.strptime(
#                 latest_modified_str.split("T")[0], "%Y-%m-%d"
#             ).date()
#             state = request.json.get("state")  # Use get for optional fields
#             outcome_description = request.json["outcome"]["description"]
#             outcome_alignments = request.json["outcome"]["alignments"] # Default to empty list if not provided
#             # Extract outcome details
#             outcomes = request.json.get("outcomes", [])
#             if outcomes:
#                 outcome_description = outcomes[0]["description"]
#                 outcome_alignments = outcomes[0]["alignments"]
#             else:
#                 outcome_description = ""
#                 outcome_alignments = []
#             parent_course_id = request.json.get(
#                 "parent_course_id"
#             )  # Use get for optional fields
 
#             if any(
#                 value is None
#                 for value in [project_id, course_code, name, revision_start_date_str]
#             ):
#                 return jsonify({"message": "Missing required parameters"}), 400
 
#             projectCourse = ProjectCourse(
#                 project_id=project_id,
#                 course_code=course_code,
#                 also_known_as=also_known_as,
#                 formerly_known_as=formerly_known_as,
#                 name=name,
#                 document_id=document_id,
#                 revision_start_date=revision_start_date,
#                 latest_modified=latest_modified,
#                 state=state,
#                 parent_course_id=parent_course_id,
#                  prerequisite=prerequisite,  # Include new field
#                 postrequisite=postrequisite,  # Include new field
                
#             )
 
#             # Attempt to add the project course and alignments
#             response = addProjectCourse(projectCourse, outcome_description, outcome_alignments)
#             return response
 
#         except Exception as e:
#             print(f"Error adding project course: {e}")  # Ideally, use proper logging
#             return (
#                 jsonify(
#                     {"message": "Failed to add project course, internal server error"}
#                 ),
#                 500,
#             )

@app.route("/addProjectCourse", methods=["POST"])
def addProjectCourse_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Extract the main course details
        project_id = request.json["project_id"]
        course_code = request.json["course_code"]
        also_known_as = request.json.get("also_known_as")
        formerly_known_as = request.json.get("formerly_known_as")
        name = request.json["name"]
        document_id = request.json.get("document_id")
        prerequisite = request.json.get("prerequisite")
        postrequisite = request.json.get("postrequisite")
        revision_start_date_str = request.json.get("revision_start_date", datetime.now().strftime("%Y-%m-%d"))
        revision_start_date = datetime.strptime(revision_start_date_str.split("T")[0], "%Y-%m-%d").date()
        latest_modified_str = request.json.get("latest_modified", datetime.now().strftime("%Y-%m-%d"))
        latest_modified = datetime.strptime(latest_modified_str.split("T")[0], "%Y-%m-%d").date()
        state = request.json.get("state")
        indigenous_course = request.json["indigenous_course"]

        # Extract outcomes from request (assumed to be a list of dictionaries)
        outcomes = request.json.get("outcomes", [])  # Expecting a list of outcomes

        # Validate required fields
        if any(value is None for value in [project_id, course_code, name, revision_start_date_str]):
            return jsonify({"message": "Missing required parameters"}), 400

        # Create the ProjectCourse object
        projectCourse = Course(
            project_id=project_id,
            course_code=course_code,
            also_known_as=also_known_as,
            formerly_known_as=formerly_known_as,
            name=name,
            document_id=document_id,
            latest_modified=latest_modified,
            state=state,
            revision_start_date=revision_start_date,
            prerequisite=prerequisite,
            postrequisite=postrequisite,
            indigenous_course=indigenous_course,
           
        )

        # Call the updated backend service to add the course and its outcomes
        response = addProjectCourse(projectCourse, outcomes)
        return response

    except Exception as e:
        print(f"Error adding project course: {e}")
        return jsonify({"message": "Failed to add project course, internal server error"}), 500


##
# http://localhost:5000/updateProjectCourseByID
# {   "id":12,
#     "project_id": 19,
#     "course_code": "CSE101",
#     "also_known_as": "Intro to Computer Science",
#     "formerly_known_as": "CS101",
#     "name": "Computer Science Fundamentals",
#     "document_id": "DOC001",
#     "revision_start_date": "2023-06-01",
#     "latest_modified": "2023-06-01" #assign current date
#     "state": "draft" #default for newely creating projects
#     "parent_course_id": 1,
#     "alignments" :
# [
#         {
#             "description": "Interpret mathematically about basic (discrete) structures used in Computer Science.",
#             "legend": "C"
#         },
#         {
#             "description": "Calculate the computational time complexity of algorithms (also relevant to Section A).\n",
#             "legend": "CA"
#         }
#     ]
# }
##
@app.route("/updateProjectCourseByID", methods=["POST"])
def updateProjectCourseByID_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.json["id"]
        project_id = request.json["project_id"]
        course_code = request.json["course_code"]
        also_known_as = request.json["also_known_as"]
        formerly_known_as = request.json["formerly_known_as"]
        name = request.json["name"]
        document_id = request.json["document_id"]
        revision_start_date = request.json["revision_start_date"]
        latest_modified = request.json["latest_modified"]
        state = request.json["state"]
        alignments = request.json["alignments"]
        parent_course_id = request.json["parent_course_id"]

        projectCourse = ProjectCourse(
            id=id,
            project_id=project_id,
            course_code=course_code,
            also_known_as=also_known_as,
            formerly_known_as=formerly_known_as,
            name=name,
            document_id=document_id,
            revision_start_date=revision_start_date,
            latest_modified=latest_modified,
            state=state,
            parent_course_id=parent_course_id,
        )

        if any(value is None for value in [id, course_code, name, alignments]):
            return jsonify({"message": "Missing required parameters"}), 400

        return updateProjectCourseByID(projectCourse, alignments)


##
# http://localhost:5000/deleteProjectCourse
# {
#     "project_course_id": 10,
#     "project_id": 10
# }
##
@app.route("/deleteProjectCourse", methods=["POST"])
def deleteProjectCourse_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        project_course_id = request.json["project_course_id"]
        project_id = request.json["project_id"]
        if id is None:
            return jsonify({"message": "Missing id parameter"}), 400

        return deleteProjectCourse(project_course_id, project_id)


##
# http://localhost:5000/searchProjectCourse?search_query=test-100
##
@app.route("/searchProjectCourse", methods=["GET"])
def searchProjectCourse_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    search_query = request.args.get("search_query")

    return searchProjectCourse(search_query)


#
# http://localhost:5000/copyCoursesToProject
# {
#     "project_id":"19",
#     "course_ids":[2]
# }
@app.route("/copyCoursesToProject", methods=["POST"])
def copyCoursesToProject_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Get the project ID and course IDs from the request
        data = request.json
        project_id = data.get("project_id")
        course_ids = data.get("course_ids")

        if project_id is None or course_ids is None:
            return jsonify({"message": "Missing project ID or course IDs"}), 400

        # Call the function to copy the courses to the project
        result = copyCoursesToProject(project_id, course_ids)
        return result

    except Exception as e:
        return (
            jsonify({"error": "Failed to copy courses to project", "message": str(e)}),
            500,
        )


##
# http://localhost:5000/beginRevision
# {
#     "project_id":"19",
#     "course_id":2
# }
@app.route("/beginRevision", methods=["POST"])
def beginRevision_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    project_id = request.json.get("project_id")
    course_id = request.json.get("course_id")

    if project_id is None or course_id is None:
        return jsonify({"error": "Missing project_id or course_id parameter"}), 400

    return beginRevision(project_id, course_id)


##
# http://localhost:5000/getAllProgramsOfProject?id=19
##
@app.route("/getAllProgramsOfProject", methods=["GET"])
def getAllProgramsOfProject_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        print("Id is: ",id)
        return getAllProgramsOfProject(id)

##
# http://localhost:5000/getProjectProgramByID?project_id=19&program_id=1
##
@app.route("/getProjectProgramByID", methods=["GET"])
def getProjectProgramByID_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        project_id = request.args.get("project_id")
        program_id = request.args.get("program_id")
        if project_id is None:
            return jsonify({"message": "Missing ID parameter"}), 400

        return getProjectProgramByID(project_id, program_id)


##
# http://localhost:5000/addProjectProgram
# {
#     "project_id": 19,
#     "name": "Computer Science Program",
#     "academic_level": "Undergraduate",
#     "faculty_id": 5,
#     "document_id": "DOC002",
#     "latest_modified": "2023-06-01",  # assign current date
#     "revision_start_date": "2023-06-01",
#     "state": "draft",  # default for newly creating projects
#     "parent_program_id": null,  # default null for newly created projects
#     "alignments": [
#         {
#             "legend": "C",
#             "description": "Interpret mathematically about basic (discrete) structures used in Computer Science."
#         },
#         {
#             "legend": "CA",
#             "description": "Calculate the computational time complexity of algorithms (also relevant to Section A).\n"
#         }
#     ]
# }
##

# Route to add a new project program
@app.route("/addProjectProgram", methods=["POST"])
def addProjectProgram_route():
    if not validate_login():  # Assuming validate_login is a function that checks user authentication
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Extract data from the request
        project_id = request.json["project_id"]
        name = request.json["name"]
        academic_level = request.json["academic_level"]
        faculty_id = request.json["faculty_id"]
        document_id = request.json["document_id"]
        latest_modified = request.json["latest_modified"]
        revision_start_date = request.json["revision_start_date"]
        state = request.json["state"]
        parent_program_id = request.json.get("parent_program_id")

        outcomes = request.json.get("outcomes", [])  # List of outcomes and their alignments

        # Create a ProjectProgram instance
        projectProgram = Program(
            name=name,
            project_id=project_id,
            academic_level=academic_level,
            faculty_id=faculty_id,
            document_id=document_id,
            latest_modified=latest_modified,
            revision_start_date=revision_start_date,
            state=state, 
            parent_program_id=parent_program_id,
        )

        if any(value is None for value in [name]):
            return jsonify({"message": "Missing required parameters"}), 400

        # Add project program to the database
        response = addProjectProgram(projectProgram, outcomes)
        return response

    except SQLAlchemyError as e:
        print(f"SQLAlchemy Error: {e}")
        return jsonify({"message": "Failed to add project program, internal server error"}), 500
    except Exception as e:
        print(f"Error adding project program: {e}")
        return jsonify({"message": "Failed to add project program, internal server error"}), 500


##
# http://localhost:5000/updateProjectProgramByID
# {
#     "id": 1,
#     "project_id": 19,
#     "name": "Computer Science Program",
#     "academic_level": "Undergraduate",
#     "faculty_id": 5,
#     "document_id": "DOC002",
#     "latest_modified": "2023-06-01",  # assign current date
#     "revision_start_date": "2023-06-01",
#     "state": "draft",  # default for newly creating projects
#     "parent_program_id": null,  # default null for newly created projects
#     "alignments": [
#         {
#             "legend": "C",
#             "description": "Interpret mathematically about basic (discrete) structures used in Computer Science."
#         },
#         {
#             "legend": "CA",
#             "description": "Calculate the computational time complexity of algorithms (also relevant to Section A).\n"
#         }
#     ]
# }
##
@app.route("/updateProjectProgramByID", methods=["POST"])
def updateProjectProgramByID_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.json["id"]
        project_id = request.json["project_id"]
        name = request.json["name"]
        academic_level = request.json["academic_level"]
        faculty_id = request.json["faculty_id"]
        document_id = request.json["document_id"]
        latest_modified = request.json["latest_modified"]
        revision_start_date = request.json["revision_start_date"]
        state = request.json["state"]
        parent_program_id = request.json["parent_program_id"]
        alignments = request.json["alignments"]

        projectProgram = ProjectProgram(
            id=id,
            project_id=project_id,
            name=name,
            academic_level=academic_level,
            faculty_id=faculty_id,
            document_id=document_id,
            latest_modified=latest_modified,
            revision_start_date=revision_start_date,
            state=state,
            parent_program_id=parent_program_id,
        )

        if any(value is None for value in [id, name, faculty_id, alignments]):
            return jsonify({"message": "Missing required parameters"}), 400

        return updateProjectProgramByID(projectProgram, alignments)


##
# http://localhost:5000/deleteprogram
# {
#     "id": 10
# }
##


@app.route("/deleteprogram/<int:id>", methods=["DELETE"])
def deleteprogram(id: int):
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        if id is None:
            return jsonify({"message": "Missing id parameter"}), 400

        return deleteProgramByID(id)


@app.route("/deleteCourse/<int:id>", methods=["DELETE"])
def deleteCourse(id: int):
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        if id is None:
            return jsonify({"message": "Missing id parameter"}), 400

        return deleteCourseByID(id)


##
# http://localhost:5000/searchProjectProgram?search_query=test-100
##
@app.route("/searchProjectProgram", methods=["GET"])
def searchProjectProgram_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    search_query = request.args.get("search_query")

    return searchProjectProgram(search_query)


##
# http://localhost:5000/copyProgramsToProject
# {
#     "project_id":"19",
#     "program_ids":[2]
# }
@app.route("/copyProgramsToProject", methods=["POST"])
def copyProgramsToProject_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    try:
        data = request.json
        project_id = data.get("project_id")
        program_ids = data.get("program_ids")

        if project_id is None or program_ids is None:
            return jsonify({"message": "Missing project ID or program IDs"}), 400

        result = copyProgramsToProject(project_id, program_ids)
        return result

    except Exception as e:
        return (
            jsonify({"error": "Failed to copy programs to project", "message": str(e)}),
            500,
        )


##
# http://localhost:5000/beginRevisionProgram
# {
#     "project_id":"19",
#     "program_id":2
# }
@app.route("/beginRevisionProgram", methods=["POST"])
def beginRevisionProgram_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    project_id = request.json.get("project_id")
    program_id = request.json.get("program_id")

    if project_id is None or program_id is None:
        return jsonify({"error": "Missing project_id or program_id parameter"}), 400

    return beginRevisionProgram(project_id, program_id)


##
# http://localhost:5000/mapCoursesToPrograms
##
# {
#   "project_id": 19,
#   "mapping": {
#     "1": [
#       [2, true],
#       [5, false]
#     ],
#     "2": [
#       [3, true],
#       [6, false]
#     ]
#   }
# }
@app.route("/mapCoursesToPrograms", methods=["POST"])
def mapCoursesToPrograms_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Get the project ID and mapping from the request
        data = request.json
        project_id = data.get("project_id")
        mapping = data.get("mapping")

        if project_id is None or mapping is None:
            return jsonify({"message": "Missing project ID or mapping"}), 400

        # Call the function to map courses to programs
        result = mapCoursesToPrograms(project_id, mapping)
        return result

    except Exception as e:
        return (
            jsonify({"error": "Failed to map courses to programs", "message": str(e)}),
            500,
        )


##
# http://localhost:5000/getAllProgramsCoursesOfProject?project_id=19
##
@app.route("/getAllProgramsCoursesOfProject", methods=["GET"])
def getAllProgramsCoursesOfProject_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    project_id = request.args.get("project_id")

    return getAllProgramsCoursesOfProject(project_id)


@app.route("/getProgramCourseMappings", methods=["GET"])
def getProgramCourseMappings():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    project_id = request.args.get("project_id")
    program_id = request.args.get("program_id")
    if not project_id or not program_id:
        return jsonify({"message": "Project ID and Program ID are required"}), 400

    try:
        cur = conn.cursor()
        # Adjust the query to match your schema
        query = """
            SELECT map_id, project_id, course_id, outcome_ids, statuses
            FROM public.program_course_mapping_1
            WHERE project_id = %s AND course_id IN (
                SELECT course_id FROM public.program_course_mapping_1
                WHERE project_id = %s
            );
        """
        print(f"Executing SQL query: {query} with project_id: {project_id}, program_id: {program_id}")
        cur.execute(query, (project_id, project_id))
        rows = cur.fetchall()

        print("SQL Query Results:", rows)  # Log the query results

        data = []
        for row in rows:
            data.append({
                "map_id": row[0],
                "project_id": row[1],
                "course_id": row[2],
                "outcome_ids": row[3],
                "statuses": row[4]
            })

        cur.close()
        conn.commit()  # Commit the transaction
        return jsonify(data), 200

    except Exception as e:
        conn.rollback()  # Rollback the transaction on error
        print(f"Error fetching data: {e}")
        return jsonify({"message": "Error fetching data"}), 500


@app.route("/getProgramCourses", methods=["GET"])
def getProgramCourses_route():
    project_id = request.args.get("project_id")
    program_id = request.args.get("program_id")

    if not project_id or not program_id:
        return jsonify({"error": "Missing project_id or program_id parameter"}), 400

    return getProgramCourses(project_id, program_id)

## New route to get outcomes of a specific program within a project
# This route returns the learning outcomes (PLOs) that belong to the selected program of a project
# http://localhost:5000/getProgramOutcomes?project_id=4&program_id=2
@app.route("/getProgramOutcomes", methods=["GET"])
def getProgramOutcomes_route():
    project_id = request.args.get("project_id")
    program_id = request.args.get("program_id")

    if not project_id or not program_id:
        return jsonify({"error": "Missing project_id or program_id parameter"}), 400

    try:
        session = createSession()
        outcomes = session.query(ProjectProgramOutcome).filter(
            ProjectProgramOutcome.program_id == program_id
        ).all()

        outcomes_list = []
        for outcome in outcomes:
            outcomes_list.append({
                "id": outcome.id,
                "description": outcome.description,
                "uga_alignment": outcome.uga_alignment
            })

        closeSession(session)
        return jsonify(outcomes_list), 200
    except SQLAlchemyError as e:
        return jsonify({"error": "Failed to fetch program outcomes", "message": str(e)}), 500


# @app.route("/getProgramCourseMappings", methods=["GET"])
# def get_program_course_mappings():
#     project_id = request.args.get("project_id")
#     map_id = request.args.get("map_id")

#     if not project_id or not map_id:
#         return jsonify({"error": "Missing project_id or map_id parameter"}), 400

#     try:
#         cur = conn.cursor()
#         cur.execute("""
#             SELECT map_id, project_id, course_id, outcome_ids, statuses
#             FROM public.program_course_mapping_1
#             WHERE project_id = %s AND map_id = %s;
#         """, (project_id, map_id))
#         results = cur.fetchall()
#         cur.close()

#         mappings = []
#         for row in results:
#             mappings.append({
#                 "map_id": row[0],
#                 "project_id": row[1],
#                 "course_id": row[2],
#                 "outcome_ids": row[3],
#                 "statuses": row[4]
#             })

#         if mappings:
#             return jsonify(mappings)
#         else:
#             return jsonify({"message": "No data found for the given map_id"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


@app.route("/getMapData", methods=["GET"])
def get_map_data():
    map_id = request.args.get("map_id")
    if not map_id:
        return jsonify({"error": "Missing map_id parameter"}), 400

    try:
        cur = conn.cursor()
        query = """
            SELECT pcm.course_id, pc.name as course_name, pcm.outcome_ids, pcm.statuses
            FROM program_course_mapping_1 pcm
            JOIN project_course pc ON pcm.course_id = pc.id
            WHERE pcm.map_id = %s
        """
        print(f"Executing SQL query: {query} with map_id: {map_id}")
        cur.execute(query, (map_id,))
        result = cur.fetchone()
        cur.close()

        if result:
            course_id, course_name, outcome_ids, statuses = result
            return jsonify({
                "course_id": course_id,
                "course_name": course_name,
                "outcome_ids": outcome_ids,
                "statuses": statuses
            }), 200
        else:
            return jsonify({"error": "No data found for the given map_id"}), 404
    except Exception as e:
        print(f"Error fetching data: {e}")
        return jsonify({"error": str(e)}), 500






# @app.route("/getAllProgramsCoursesOfProject", methods=["GET"])
# def getAllProgramsCoursesOfProject_route():
#     if not validate_login():
#         return jsonify({"message": "User not logged in"}), 401

#     project_id = request.args.get("project_id")
#     if not project_id:
#         return jsonify({"message": "Project ID is required"}), 400

#     try:
#         conn = get_db_connection()
#         cur = conn.cursor()
#         query = """
#             SELECT project_id, course_id, outcome_ids, statuses
#             FROM public.program_course_mapping_1
#             WHERE project_id = %s;
#         """
#         cur.execute(query, (project_id,))
#         rows = cur.fetchall()

#         data = []
#         for row in rows:
#             data.append({
#                 "project_id": row[0],
#                 "course_id": row[1],
#                 "outcome_ids": row[2],
#                 "statuses": row[3]
#             })

#         cur.close()
#         conn.close()

#         return jsonify(data), 200

#     except Exception as e:
#         print(f"Error fetching data: {e}")
#         return jsonify({"message": "Error fetching data"}), 500

##
# http://localhost:5000/deleteProjectProgram
##
# {
#   "project_program_id": 1,
#   "project_id": 19
# }
@app.route("/deleteProjectProgram", methods=["POST"])
def deleteProjectProgram_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    try:
        data = request.json
        project_program_id = data.get("project_program_id")
        project_id = data.get("project_id")

        if project_program_id is None or project_id is None:
            return (
                jsonify(
                    {"error": "Missing project_program_id or project_id parameter"}
                ),
                400,
            )

        return deleteProjectProgram(project_program_id, project_id)

    except Exception as e:
        return (
            jsonify({"error": "Failed to delete project program", "message": str(e)}),
            500,
        )


##
# http://localhost:5000/addproject
##
# {
#     "name" : "lol",
#     "owners" : "test@uwindsor.ca",
#     "default_read" : false,
#     "default_read_write" : false,
#     "members": "test@uwindsor.ca",
#     "guests": ""
# }
@app.route("/addproject", methods=["POST"])
def add_project():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:

        pname = request.json["name"]
        owner = request.json["owners"]
        members = request.json["members"]
        guests = request.json["guests"]
        default_read = request.json["default_read"]
        default_read_write = request.json["default_read_write"]

        if any(
            value is None for value in [pname, owner, default_read, default_read_write]
        ):
            return jsonify({"message": "Missing required parameters"}), 400

        project = Project(
            name=pname,
            owner=owner,
            default_read=default_read,
            default_read_write=default_read_write,
        )

        return addProject(project, members, guests)


##
# http://localhost:5000/project_list
##
@app.route("/project_list", methods=["GET"])
def project_list():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return get_projects_of_user()

@app.route("/getCourseDescriptions", methods=["GET"])
def get_course_descriptions():
    if not validate_login():  # Assuming validate_login is a function that checks user authentication
        return jsonify({"message": "User not logged in"}), 401

    try:
        project_id = request.args.get('project_id')
        if not project_id:
            return jsonify({"message": "Project ID is required"}), 400

        try:
            project_id = int(project_id)
        except ValueError:
            return jsonify({"message": "Invalid Project ID"}), 400

        # Use the existing service function to get all courses of a project
        courses = getAllCoursesOfProject(project_id)

        # Prepare course descriptions
        course_descriptions = [
            {"course_code": course["course_code"], "also_known_as": course["also_known_as"]}
            for course in courses
        ]

        print("Course Descriptions: ", course_descriptions)

        return jsonify(course_descriptions), 200

    except SQLAlchemyError as e:
        print(f"SQLAlchemy Error: {e}")
        return jsonify({"message": "Failed to fetch course descriptions"}), 500


##
# http://localhost:5000/projectdetail_by_id?id=10
##
@app.route("/projectdetail_by_id", methods=["GET"])
def projectdetail_by_id():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        return get_project_by_ID(id)


##
# http://localhost:5000/updateproject
##
# {
#     "id": 17,
#     "name" : "lol",
#     "owner" : "test@uwindsor.ca",
#     "default_read" : false,
#     "default_read_write" : false,
#     "members": "patel4r4@uwindsor.ca",
#     "guests": ""
# }
@app.route("/updateproject", methods=["POST"])
def updateproject():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.json["id"]
        name = request.json["name"]
        owner = request.json["owner"]
        default_read = request.json["default_read"]
        default_read_write = request.json["default_read_write"]
        members = request.json["members"]
        guests = request.json["guests"]

        project = Project(
            id=id,
            name=name,
            owner=owner,
            default_read=default_read,
            default_read_write=default_read_write,
        )

        if any(
            value is None
            for value in [
                id,
                name,
                owner,
                default_read_write,
                default_read,
            ]
        ):
            return jsonify({"message": "Missing required parameters"}), 400

        return update_project(project, members, guests)


##
# http://localhost:5000/uga_alignments_list
##
@app.route("/uga_alignments_list", methods=["GET"])
def get_uga_alignments_list():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return getAllUgaAlignments(), 200


##
# http://localhost:5000/uga_alignment_by_id?id=4
##
@app.route("/uga_alignment_by_id", methods=["GET"])
def get_uga_alignment_by_id():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        if id is None:
            return jsonify({"message": "Missing ID parameter"}), 400

        return getUgaAlignmentByID(id)


###TODO further testing needed (not tested yet)
# http://localhost:5000/add_uga_alignment
##
@app.route("/add_uga_alignment", methods=["POST"])
def add_uga_alignment():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        data = request.json
        if data is None:
            return jsonify({"message": "Missing request body"}), 400

        return addUgaAlignment(data), 200


###TODO further testing needed (not tested yet)
# http://localhost:5000/update_uga_alignment
##
@app.route("/update_uga_alignment", methods=["PUT"])
def update_uga_alignment():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        data = request.json
        if data is None:
            return jsonify({"message": "Missing request body"}), 400

        return updateUgaAlignmentByID(data), 200


###TODO further testing needed (not tested yet)
# http://localhost:5000/delete_uga_alignment?id=4
##
@app.route("/delete_uga_alignment", methods=["DELETE"])
def delete_uga_alignment():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        id = request.args.get("id")
        if id is None:
            return jsonify({"message": "Missing ID parameter"}), 400

        return deleteUgaAlignmentByID(id), 200


##
# http://localhost:5000/getAllPrograms
##
@app.route("/getAllPrograms", methods=["GET"])
def getAllPrograms_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return getAllPrograms()


@app.route("/getCount", methods=["GET"])
def getCount_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        return getCount()


##
# http://localhost:5000/getAllProgramsOfFaculty?faculty_id=1
##
@app.route("/getAllProgramsOfFaculty", methods=["GET"])
def getAllProgramsOfFaculty_route():
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401
    else:
        faculty_id = request.args.get("faculty_id")
        if faculty_id is None:
            return jsonify({"message": "Missing faculty Id parameter"}), 400

        return getAllProgramsOfFaculty(faculty_id), 200


##
# http://localhost:5000/getFacultyCount
##
@app.route('/getFacultyCount', methods=['GET'])
def getFacultyCounts():
    if not validate_login():
        return jsonify({'message': 'User not logged in'}), 401
    else:
        return getFacultyCount()


@app.route("/updatePrograms", methods=["PUT"])
def updatePrograms():
    data = request.json
    if data is None:
        return jsonify({"message": "Missing request body"}), 400
    return updateProgram(data)



# @app.route("/getAllPLOs", methods=["GET"])
# def getAllPLOs_route():
#     print("Received request for /getAllPLOs")
#     if not validate_login():
#         return jsonify({"message": "User not logged in"}), 401
#     try:
#         cur = conn.cursor()
#         cur.execute("SELECT * FROM program_learning_outcome")
#         plos = cur.fetchall()
#         cur.close()

#         plos_list = []
#         for plo in plos:
#             plos_list.append({
#                 "id": plo[0],
#                 "name": plo[1],
#                 "description": plo[2],
#             })

#         return jsonify(plos_list), 200
#     except Exception as e:
#         print(f"Error fetching PLOs: {e}")
#         return jsonify({"message": "Failed to fetch PLOs"}), 500
    

# @app.route("/getAllPLOs", methods=["GET"])
# def getAllPLOs_route():
#     print("Received request for /getAllPLOs")
#     if not validate_login():
#         return jsonify({"message": "User not logged in"}), 401
#     try:
#         cur = conn.cursor()
#         cur.execute("""
#             SELECT id, outcome1_description, outcome2_description, outcome3_description,
#                    outcome4_description, outcome5_description, outcome6_description,
#                    outcome7_description, outcome8_description, outcome9_description,
#                    outcome10_description, outcome11_description, outcome12_description,
#                    outcome13_description, outcome14_description, outcome15_description,
#                    outcome16_description, outcome17_description, outcome18_description,
#                    outcome19_description, outcome20_description
#             FROM public.project_program
#         """)
#         outcomes = cur.fetchall()
#         cur.close()

#         outcomes_list = []
#         for outcome in outcomes:
#             outcomes_list.append({
#                 "id": outcome[0],
#                 "outcome_description": [desc for desc in outcome[1:] if desc]  # Filter out empty descriptions
#             })

#         return jsonify(outcomes_list), 200
#     except Exception as e:
#         print(f"Error fetching outcomes: {e}")
#         return jsonify({"message": "Failed to fetch outcomes"}), 500

# working
# @app.route("/getAllPLOs", methods=["GET"])
# def getAllPLOs_route():
#     print("Received request for /getAllPLOs")
#     if not validate_login():
#         return jsonify({"message": "User not logged in"}), 401
    
#     project_id = request.args.get('project_id')  # Assuming project_id is passed as a query parameter
    
#     try:
#         cur = conn.cursor()
#         cur.execute("""
#             SELECT id, outcome1_description, outcome2_description, outcome3_description,
#                    outcome4_description, outcome5_description, outcome6_description,
#                    outcome7_description, outcome8_description, outcome9_description,
#                    outcome10_description, outcome11_description, outcome12_description,
#                    outcome13_description, outcome14_description, outcome15_description,
#                    outcome16_description, outcome17_description, outcome18_description,
#                    outcome19_description, outcome20_description
#             FROM public.project_program
#             WHERE project_id = %s
#         """, (project_id,))
        
#         outcomes = cur.fetchall()
#         cur.close()

#         outcomes_list = []
#         for outcome in outcomes:
#             outcomes_list.append({
#                 "id": outcome[0],
#                 "outcome_description": [desc for desc in outcome[1:] if desc]  # Filter out empty descriptions
#             })

#         return jsonify(outcomes_list), 200
#     except Exception as e:
#         print(f"Error fetching outcomes: {e}")
#         return jsonify({"message": "Failed to fetch outcomes"}), 500

@app.route("/getAllPLOs", methods=["GET"])
def getAllPLOs_route():
    print("Received request for /getAllPLOs")
    if not validate_login():
        return jsonify({"message": "User not logged in"}), 401

    project_id = request.args.get('project_id')  # Assuming project_id is passed as a query parameter

    try:
        cur = conn.cursor()
        # Fetch outcomes from project_program_outcome table
        cur.execute("""
            SELECT id, program_id, description, uga_alignment
            FROM public.project_program_outcome
            WHERE program_id IN (
                SELECT id FROM public.project_program WHERE project_id = %s
            )
        """, (project_id,))

        outcomes = cur.fetchall()
        cur.close()

        outcomes_list = []
        for outcome in outcomes:
            outcome_data = {
                "id": outcome[0],
                "program_id": outcome[1],
                "description": outcome[2],
                "uga_alignment": outcome[3],
            }
            outcomes_list.append(outcome_data)

        return jsonify(outcomes_list), 200
    except Exception as e:
        print(f"Error fetching outcomes: {e}")
        return jsonify({"message": "Failed to fetch outcomes"}), 500


# @app.route("/saveProgramCourseMapping", methods=["POST"])
# def save_program_course_mapping():
#     data = request.get_json()
#     project_id = data.get("project_id")
#     mapping = data.get("mapping")
 
#     if not project_id or not mapping:
#         return jsonify({"error": "Missing project_id or mapping parameter"}), 400
 
#     try:
#         cur = conn.cursor()
#         for map_item in mapping:
#             course_id = map_item.get("course_id")
#             plo_id = map_item.get("plo_id")
#             status = map_item.get("status")
#             if course_id and plo_id and status:
#                 cur.execute("""
#                     INSERT INTO program_course_mapping (project_id, course_id, plo_id, status)
#                     VALUES (%s, %s, %s, %s)
#                     ON CONFLICT (project_id, course_id, plo_id)
#                     DO UPDATE SET status = EXCLUDED.status;
#                 """, (project_id, course_id, plo_id, status))
#         conn.commit()
#         cur.close()
#         return jsonify({"message": "Mapping saved successfully!"}), 200
#     except Exception as e:
#         conn.rollback()
#         return jsonify({"error": str(e)}), 500

# @app.route("/saveProgramCourseMapping", methods=["POST"])
# def save_program_course_mapping():
#     data = request.get_json()
#     project_id = data.get("project_id")
#     mapping = data.get("mapping")
    
#     if not project_id or not mapping:
#         return jsonify({"error": "Missing project_id or mapping parameter"}), 400
    
#     try:
#         cur = conn.cursor()
#         for map_item in mapping:
#             course_id = map_item.get("course_id")
#             outcome_id = map_item.get("outcome_id")  # Adjusted key name to "outcome_id"
#             status = map_item.get("status")
#             if course_id and outcome_id and status:
#                 cur.execute("""
#                     INSERT INTO program_course_mapping (project_id, course_id, outcome_id, status)
#                     VALUES (%s, %s, %s, %s)
#                     ON CONFLICT (project_id, course_id, outcome_id)
#                     DO UPDATE SET status = EXCLUDED.status;
#                 """, (project_id, course_id, outcome_id, status))
#         conn.commit()
#         cur.close()
#         return jsonify({"message": "Mapping saved successfully!"}), 200
#     except Exception as e:
#         conn.rollback()
#         return jsonify({"error": str(e)}), 500

import traceback
@app.route("/saveProgramCourseMapping", methods=["POST"])
def save_program_course_mapping():
    data = request.get_json()
    project_id = data.get("project_id")
    mapping = data.get("mapping")
 
    if not project_id or not mapping:
        return jsonify({"error": "Missing project_id or mapping parameter"}), 400
 
    try:
        cur = conn.cursor()
        
        # Create a dictionary to store the combined mappings
        combined_mappings = {}
        for map_item in mapping:
            course_id = map_item.get("course_id")
            outcome_id = map_item.get("outcome_id")  # Adjusted key name to "outcome_id"
            status = map_item.get("status")
            if course_id and outcome_id and status:
                key = (project_id, course_id)
                if key not in combined_mappings:
                    combined_mappings[key] = {"outcome_ids": [], "statuses": []}
                combined_mappings[key]["outcome_ids"].append(outcome_id)
                combined_mappings[key]["statuses"].append(status)
        
        # Insert or update the combined mappings
        for key, value in combined_mappings.items():
            project_id, course_id = key
            outcome_ids = ",".join(map(str, value["outcome_ids"]))
            statuses = ",".join(map(str, value["statuses"]))
            cur.execute("""
                INSERT INTO program_course_mapping_1 (project_id, course_id, outcome_ids, statuses)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (project_id, course_id)
                DO UPDATE SET outcome_ids = EXCLUDED.outcome_ids, statuses = EXCLUDED.statuses;
            """, (project_id, course_id, outcome_ids, statuses))
 
        conn.commit()
        cur.close()
        return jsonify({"message": "Mapping saved successfully!"}), 200
    except Exception as e:
        conn.rollback()
        print(traceback.format_exc())
        return jsonify({"error": str(e), "trace": traceback.format_exc()}), 500