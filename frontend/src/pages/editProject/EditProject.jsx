import "./editproject.css";

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import TabProgram from "../../components/tabs/tab-program/tabProgram";
import TabCourse from "../../components/tabs/tab-course/tabCourse";
import { useParams } from "react-router-dom";
import TabAssignCourseToProgram from "../../components/tabs/tab-assignCourseToProgram/tabAssignCourseToProgram";
import TabMaps from "../TabMaps/TabMaps";
import TabSettings from "../tab-settings/tabsettings";
import PdcPackages from "../../components/tabs/tab-pdc/PdcPackages";

const EditProject = () => {
  const { projectId, courseId } = useParams();
  const [activeTab, setActiveTab] = useState();

  return (
    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 mt-4">
      <div className="row">
        <div className="col-12">
          <Tabs
            fill
            className="mt-3 mb-3"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
          >
            <Tab eventKey="programs" title="Programs">
              <TabProgram projectId={projectId} />
            </Tab>
            <Tab eventKey="courses" title="Courses">
              <TabCourse projectId={projectId} courseId={courseId} />
            </Tab>
            <Tab
              eventKey="assign-courses-to-programs"
              title="Assign Courses to Program"
            >
              <TabAssignCourseToProgram projectId={projectId} />
            </Tab>
            <Tab eventKey="maps" title="Maps">
              <TabMaps />
            </Tab>
            <Tab eventKey="pdc-packages" title="PDC Packages">
              <PdcPackages projectId={projectId} />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <TabSettings/>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
