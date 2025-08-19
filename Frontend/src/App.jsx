import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './pages/Header'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import Home from './pages/Home'
import Customize2 from './pages/Customize2'

const App = () => {
  const { userData, loadingUser } = useContext(userDataContext)

  if (loadingUser) {
    return <div>Loading...</div> // ⏳ wait until we know userData
  }

  return (
    <Routes>
      <Route path='/' element={<Header />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/home"} />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/home"} />} />
      <Route path='/customize' element={userData ? <Customize /> : <Navigate to={"/signup"} />} />
      <Route path='/customize2' element={userData ? <Customize2 /> : <Navigate to={"/signup"} />} />
      <Route path='/home' element={(userData?.assistantImage && userData?.assistantName) ? <Home /> : <Navigate to={"/customize"} />} />
    </Routes>
  )
}

export default App
