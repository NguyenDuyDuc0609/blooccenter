import { Outlet } from "react-router-dom"
import { SidebarAdmin } from "../components/admin/SidebarAdmin";

export const DashBoardAdmin = () => {
    console.log("DashBoardAdmin rendered");
    return (
        <div className="container-dashboards-admin">
            <SidebarAdmin />
            <div className="main-content-admin">
                <Outlet />
            </div>
        </div>
    )
}