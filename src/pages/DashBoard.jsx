import React from 'react'
import { Sidebar } from '../components/user/Sidebar'
import '../css/DashBoard.css'
import { Outlet, Navigate } from 'react-router-dom'
export const DashBoard = () => {
  return (
    <div className="container-dashboards">
      <Sidebar />
      <div className="main-content">
        <Outlet/>
      </div>
    </div>
  )
}
