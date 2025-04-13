import React from "react";
import widgetStyle from "./widgetLg.module.css";
import windsor from "../../images/windsor.png";
import Label from "../label/label";
import labelStyle from "../label/label.module.css";
import Card from "../card/card";

const WidgetLg = () => {
  return (
    <Card>
      <h3 className={widgetStyle.widgetLgTitle}>Published Maps</h3>
      <div className="table-responsive">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th></th>
              <th className={widgetStyle.widgetLgTh}>program</th>
              <th className={widgetStyle.widgetLgTh}>date</th>
              <th className={widgetStyle.widgetLgTh}>scope</th>
              <th className={widgetStyle.widgetLgTh}>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">
                <img
                  className={widgetStyle.widgetLgImg}
                  src={windsor}
                  alt="user"
                />
              </td>
              <td className="align-middle">
                <span className="widgetLgName">BA Honours in Economics</span>
              </td>
              <td className="align-middle">21 Feb 2023</td>
              <td className="align-middle">Core/Elective</td>
              <td className="align-middle">
                <Label className={labelStyle.success}>Approved</Label>
              </td>
            </tr>
            <tr>
              <td className="align-middle">
                <img
                  className={widgetStyle.widgetLgImg}
                  src={windsor}
                  alt="user"
                />
              </td>
              <td className="align-middle">
                <span className="widgetLgName">Project</span>
              </td>
              <td className="align-middle">21 Feb 2023</td>
              <td className="align-middle">Core/Elective</td>
              <td className="align-middle">
                <Label className={labelStyle.danger}>Decline</Label>
              </td>
            </tr>
            <tr>
              <td className="align-middle">
                <img
                  className={widgetStyle.widgetLgImg}
                  src={windsor}
                  alt="user"
                />
              </td>
              <td className="align-middle">
                <span className="widgetLgName">Project</span>
              </td>
              <td className="align-middle">21 Feb 2023</td>
              <td className="align-middle">Core/Elective</td>
              <td className="align-middle">
                <Label className={labelStyle.warning}>Pending</Label>
              </td>
            </tr>
            <tr>
              <td className="align-middle">
                <img
                  className={widgetStyle.widgetLgImg}
                  src={windsor}
                  alt="user"
                />
              </td>
              <td className="align-middle">
                <span className="widgetLgName">BA in Economics</span>
              </td>
              <td className="align-middle">21 Feb 2023</td>
              <td className="align-middle">Core/Elective</td>
              <td className="align-middle">
                <Label className={labelStyle.success}>Approved</Label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default WidgetLg;
