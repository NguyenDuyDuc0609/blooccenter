import React from 'react';
import '../css/Side.css'
import { Link } from 'react-router-dom';
import '../css/Side.css'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { CommitLogout } from '../layout/CommitLogout';
export const SidebarHospital = () => {
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);  
  const handleLogout = () => {
    setShowLogout(true); 
  }
  const handleCancelLogout = () => {
    setShowLogout(false); 
  }
  const handleConfirmLogout = () => {
    logout();
    setShowLogout(false);
  }
  return (
    <div className="container-sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard/hospital/activities" className={({ isActive }) => isActive ? "active" : ""}>
            Hoạt động của bệnh viện
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/hospital/requestblood" className={({ isActive }) => isActive ? "active" : ""}>
            Yêu cầu chuyển máu
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/hospital/histories" className={({ isActive }) => isActive ? "active" : ""}>
            Lịch sử hoạt động
          </NavLink>
        </li>
        <li>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </li>
        </ul>
        {showLogout && (
        <CommitLogout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </div>
  );
};
