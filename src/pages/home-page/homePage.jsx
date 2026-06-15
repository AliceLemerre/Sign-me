import { useState } from 'react'
import '../../App.css'
import '../../index.css'
import { signImages } from '../../components/signList/signImages.jsx';
import  List from '../../components/signList/List.jsx'
import Checkbox from '../../components/checkbox/checkbox.jsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../../components/private-route/PrivateRoute.tsx";
import LoginPage from "../../components/auth/LoginPage.tsx";
import SignupPage from "../../components/auth/SignupPage.tsx";
import { StrictMode } from 'react'
import { AuthProvider } from '../../context/AuthContext.tsx'
import Header from '../../components/header/Header.tsx'

function HomePage() {
    const [selectedConfigs, setSelectedConfigs] = useState([]);
    const [selectedConfigsTwo, setSelectedConfigsTwo] = useState([]);

  return (
    
    <>
   <Header></Header>
      
    <section  className="section configurations">
      <h2>configurations</h2>

      <div className="section configuration-main">
        <div className="hand main-hand">
          <h3>Main dominante</h3>
          <Checkbox prefix="one"
            selectedConfigs={selectedConfigs}
            setSelectedConfigs={setSelectedConfigs}
          />
        </div>

       <div className="hand second-hand">
          <h3>Deuxième main</h3>
          <Checkbox prefix="two"
            selectedConfigs={selectedConfigsTwo}
            setSelectedConfigs={setSelectedConfigsTwo}
          />
        </div>
              
      </div>

    </section>

  
     


    <section>
    <div className="resultats">
      <h2>résultats</h2>

       <List selectedConfigs={selectedConfigs} selectedConfigsTwo={selectedConfigsTwo} />
    </div>

      </section>

      
    
</>
  )
}



export default HomePage;
