import { Link } from "react-router-dom";
import courseStyle from "./course.module.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import windsor from "../../images/windsor.png";
import { Publish } from "@material-ui/icons";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";
import Card from "../../components/card/card";

const Course = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 product">
      <div className="row">
        <div className="col-10">
          <h3>Course Details</h3>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <Card>
            <Chart
              data={productData}
              dataKey="Sales"
              title="Course Performance"
            />
          </Card>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <Card className="h-100">
            <div>
              <h3>Basic Information of Course</h3>
            </div>
            <div className="mt-4">
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">
                  <span>ID: </span>
                  <span>
                    <b>COMP-8967</b>
                  </span>
                </li>
                <li className="list-group-item">
                  <span>No of Students: </span>
                  <span>
                    <b>5123</b>
                  </span>
                </li>
                <li className="list-group-item">
                  <span>Approved: </span>
                  <span>
                    <b>yes</b>
                  </span>
                </li>
                <li className="list-group-item">
                  <span>Active: </span>
                  <span>
                    <b>yes</b>
                  </span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <Card>
            <h3>Edit Course Details</h3>
            <form className="row">
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <label>Course Name</label>
                <input
                  type="text"
                  placeholder="Internship/Project II"
                  className="form-control"
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <label>Approved</label>
                <select name="inStock" id="inStock" className="form-control">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <label>Active</label>
                <select name="active" id="active" className="form-control">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <img
                  src={windsor}
                  alt="product"
                  className={courseStyle.productUploadImg}
                />
                <label for="file">
                  <Button>
                    <Publish />
                    Upload Image
                  </Button>
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <div className="mt-3">
                <Button className={classes.primary}>Update</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Course;
