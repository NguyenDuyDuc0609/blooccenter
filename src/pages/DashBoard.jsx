import React from 'react'
import { Sidebar } from '../components/Sidebar'
import '../css/DashBoard.css'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export const DashBoard = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="container-dashboards">
      {user.role && user.role[0] === 'Donor' && <Sidebar />}
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  )
}
