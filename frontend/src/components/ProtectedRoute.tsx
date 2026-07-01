import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}:{children:React.ReactNode}) => {
    const {token} = useAuth();
    if(!token){
        return <Navigate to="/signin" replace/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute