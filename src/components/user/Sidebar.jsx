import React from 'react';
import '../css/Side.css'
import { Link } from 'react-router-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { CommitLogout } from '../layout/CommitLogout';
export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isUserInfoActive =
    location.pathname === '/dashboard/inforUser' ||
    location.pathname === '/dashboard/changePassword';
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
          <NavLink to="/dashboard/activityGoing" className={({ isActive }) => isActive ? "active" : ""}>
            Hoạt động đang diễn ra
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/histories" className={({ isActive }) => isActive ? "active" : ""}>
            Lịch sử hiến máu
          </NavLink>
        </li>
        <li className="submenu">
          <span className={`submenu-title${isUserInfoActive ? " active" : ""}`}>Thông tin người dùng</span>
          <ul className="submenu-list">
            <li>
              <NavLink to="/dashboard/inforUser" className={({ isActive }) => isActive ? "active" : ""}>
                Thay đổi thông tin
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/changePassword" className={({ isActive }) => isActive ? "active" : ""}>
                Đổi mật khẩu
              </NavLink>
            </li>
          </ul>
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
