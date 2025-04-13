import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import profile from "../../images/profile.png";
import userStyle from "../editProgram/editProgram.module.css";
import Card from "../../components/card/card";
import Button from "../../components/button/button";
import classes from "../../components/button/button.module.css";

const User = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4 mb-4">
      <div className="row">
        <h3 className="userTitle">Profile</h3>
      </div>
      <div className="row mt-3 mb-3">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <Card>
            <div className={userStyle.userTopShow}>
              <img src={profile} alt="user" className={userStyle.userShowImg} />
              <div className={userStyle.userShowTopTitle}>
                <h4>User</h4>
                <span className={userStyle.userShowjob}>Faculty Member</span>
              </div>
            </div>
            <div className={userStyle.userShowBottom}>
              <p className={userStyle.userShowTitle}>Details</p>
              <div className={userStyle.usershowInfo}>
                <PermIdentity className={userStyle.userShowTitle} />
                <span className={userStyle.userShowInfoTitle}>
                  Prof. Kalyani
                </span>
              </div>
              <div className={userStyle.usershowInfo}>
                <CalendarToday className={userStyle.userShowTitle} />
                <span className={userStyle.userShowInfoTitle}>02/23/23</span>
              </div>
              <p className={userStyle.userShowTitle}>Contact Details</p>
              <div className={userStyle.usershowInfo}>
                <PhoneAndroid className={userStyle.userShowTitle} />
                <span className={userStyle.userShowInfoTitle}>
                  +1 234046 38
                </span>
              </div>
              <div className={userStyle.usershowInfo}>
                <MailOutline className={userStyle.userShowTitle} />
                <span className={userStyle.userShowInfoTitle}>
                  kalyani@uwindsor.ca
                </span>
              </div>
              <div className={userStyle.usershowInfo}>
                <LocationSearching className={userStyle.userShowTitle} />
                <span className={userStyle.userShowInfoTitle}>windsor</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <Card>
            <h4>Edit Profile</h4>
            <form className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Prof. Kalyani"
                  />
                </div>
                <div className="mb-3">
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MAC"
                  />
                </div>
                <div className="mb-3">
                  <label>Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+1 234046 38"
                  />
                </div>
                <div className="mb-3">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="windsor"
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="kalyani@uwindsor.ca"
                  />
                </div>
                <div className="mb-3">
                  <Button className={classes.primary}>Update</Button>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <div className={userStyle.userUpdateUpload}>
                  <img
                    src={profile}
                    alt="upload"
                    className={userStyle.userUpdateImg}
                  />
                  <br></br>
                  <label htmlFor="file">
                    <Button>
                      <Publish className="userUpdateIcon" /> Upload
                    </Button>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;
