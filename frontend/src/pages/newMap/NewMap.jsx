import React from "react";
import newMapStyle from "./newmap.module.css";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";

const NewUser = () => {
  return (
    <React.Fragment>
    <main className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
      <h3>Create a New Map</h3>
      <div className="row mt-3 mb-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <form className="row">
            <div className="col-6 mt-3">
              <label>Kind</label>
              <select name="Kind" id="Kind" className="form-control">
                <option value="Courses to Program Outcomes">
                  Courses to Program Learning Outcomes
                </option>
                <option value="Courses to CEAB Accreditation Standards">
                  Courses to CEAB Accreditation Standards
                </option>
              </select>
            </div>
            <div className="col-6 mt-3">
              <label>Program</label>
              <select name="program" id="program" className="form-control">
                <option value="717">717</option>
                <option value="718">718</option>
                <option value="719">719</option>
              </select>
            </div>

            <div className="col-6 mt-3">
              <label>Access Controls</label>
              <div className="form-check">
                <label className="form-check-label" for="male">
                  Owners
                </label>
                <input
                  type="radio"
                  name="access-control"
                  id="owners"
                  value="owners"
                  className="form-check-input"
                />
              </div>
              <div className="form-check">
                <label className="form-check-label" for="female">
                  Members
                </label>
                <input
                  type="radio"
                  name="access-control"
                  id="members"
                  value="members"
                  className="form-check-input"
                />
              </div>
              <div className="form-check">
                <label className="form-check-label" for="others">
                  Guests
                </label>
                <input
                  type="radio"
                  name="access-control"
                  id="guests"
                  value="guests"
                  className="form-check-input"
                />
              </div>
            </div>

            <div className="mt-3">
              <Button className={classes.primary}>Create New Map</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
    </React.Fragment>
  );
};

export default NewUser;
