import { Outlet } from "react-router-dom";
import { SidebarHospital } from "../components/hospital/SidebarHospital";
// import '../../css/DashBoardHospital.css';
export const DashBoardHospital = () => {
  console.log("DashBoardHospital rendered");
  return (
    <div className="container-dashboards-hospital">
    <SidebarHospital />
      <div className="main-content-hospital">
        <Outlet />
    </div>
    </div>
  );
}