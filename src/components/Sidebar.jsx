import React from 'react';
import './css/Side.css'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const Sidebar = () => {
  const {logout} = useAuth();
  const handleLogout = () => {
          logout();
      }
  return (
    <div className="container-sidebar">
      <h3 className="sidebar-title">Dashboard</h3>
      <ul className="sidebar-menu">
        <li>
            <NavLink to="/dashboard/activityGoing" className={({ isActive }) => isActive ? "active" : ""}>
            Hoạt động đang diễn ra
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/histories" className={({ isActive }) => isActive ? "active" : ""}>
            Lịch sử hiến máu
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard/inforUser" className={({ isActive }) => isActive ? "active" : ""}>
            Thông tin người dùng
            </NavLink>
        </li>
        <li>
            <NavLink onClick={handleLogout} to="/login" className="">Đăng xuất</NavLink> {/* không cần active */}
        </li>
        </ul>

    </div>
  );
};
