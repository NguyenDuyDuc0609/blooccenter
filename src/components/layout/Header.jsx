  import React from 'react';
  import { Link } from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { useAuth } from '../../context/AuthContext';

  export const Header = () => {
    const { user, logout } = useAuth(); 
      const handleLogout = () => {
          logout();
      }
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Blood Center
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav w-100 d-flex flex-wrap justify-content-between align-items-center overflow-hidden">
          <div className="d-flex gap-3 flex-wrap">
            <a className="nav-item nav-link" href="#">Thông tin</a>
            <a className="nav-item nav-link" href="#">Tin tức</a>
            <a className="nav-item nav-link" href="#">Liên hệ</a>
          </div>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {user ? (
              <>
                <span className="nav-item nav-link">Xin chào, {user.username}</span>
                <button onClick={handleLogout} className="btn btn-link nav-item nav-link">Đăng xuất</button>
              </>
            ) : (
              <Link className="nav-item nav-link" to="/login">Đăng nhập</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
    );
  };
