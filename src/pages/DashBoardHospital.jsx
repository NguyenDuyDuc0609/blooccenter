import { Outlet } from "react-router-dom";
import { SidebarHospital } from "../components/hospital/SidebarHospital";
import "../css/DashBoardHospital.css";

export const DashBoardHospital = () => {
  return (
    <div className="container-dashboards-hospital">
      <div className="container-sidebar">
        <SidebarHospital />
      </div>
      <div className="main-content-hospital">
        <Outlet />
      </div>
    </div>
  );
}