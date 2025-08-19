import axios from 'axios'
import React, { useEffect, useState, createContext } from 'react'

export const userDataContext = createContext()

const UserContext = ({ children }) => {
  const serverUrl = "https://virtualassistant-backend-nfgu.onrender.com"

  const [userData, setUserData] = useState(null)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // 👈 added loading state

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
      setUserData(result.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUserData(null);
      } else {
        console.error("Error fetching current user:", error);
      }
    } finally {
      setLoadingUser(false); // 👈 stop loading after fetch
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true })
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
    loadingUser // 👈 added here
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
