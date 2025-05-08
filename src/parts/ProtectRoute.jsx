import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export const ProtectRoute = ({children}) => {
    const {user} = useAuth();
    if(!user){
        return <Navigate to='/login' replace/>;
    }
  return (
    children
  )
};
