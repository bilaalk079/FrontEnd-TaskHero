import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
const PrivateRoute = ({children}) => {
    const accessToken = useAuthStore((state) => state.accessToken)

    if(!accessToken){
        return <Navigate to={'/login'} replace/>
    }
  return children
}

export default PrivateRoute