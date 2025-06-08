import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import axios from 'axios'

const LogOut = () => {
    const logout = useAuthStore((state) => state.logout)
    const navigate = useNavigate()

    useEffect(() => {
        const handleLogout = async () => {
            try{
             await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
             logout()
             navigate('/login')
            }catch (err){
                console.error("Error: ", err)
                logout()
                navigate('/login')
            }
        }
        handleLogout()
    }, [logout, navigate])
  return null
}

export default LogOut