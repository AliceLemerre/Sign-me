import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/private-route/PrivateRoute";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import { StrictMode } from 'react'
import { AuthProvider } from './context/AuthContext.tsx'
import HomePage from './homePage.jsx'
import AccountPage from "./components/auth/AccountPage";

function App() {
    const [selectedConfigs, setSelectedConfigs] = useState([]);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
         <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />

       {/* <Route
          path="/formation"
          element={
            <PrivateRoute>
              <Course />
            </PrivateRoute>
          }
        />


        <Route
          path="/formation/:id"
          element={
            <PrivateRoute>
              <CourseExercice/>
            </PrivateRoute>
          }
        /> */}
   
{/* 
        <Route path="/404" element={<Page404 />} />
        
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </BrowserRouter>


    
  )
}



export default App
