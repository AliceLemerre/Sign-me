import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import * as styles from './navbar.css';
// import "./Navbar.css";


interface NavbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Navbar({ isOpen }: NavbarProps) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
  const isDark = localStorage.getItem("dark") === "true";
  document.documentElement.classList.toggle("dark", isDark);
}, []);

  return (
     
    <nav className="navbar">

      <div className="navbar-container">
        {/* <button className="menu-toggle" onClick={onToggle}>
          Menu
        </button> */}

        <input className="checkbox" type="checkbox" />
        <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
        </div>
    

        {/* <div className={`menu-items nav-links ${isOpen ? "open" : ""}`}> */}
        <div className='open'>
          <Link to="/" className="nav-link">
                 Accueil
              </Link>

          {user && (
            <>
              <Link to="/exercices" className="nav-link">
                 Formation
              </Link>

              {/* <Link to="/course/exercise" className="nav-link">
                Exercices
              </Link> */}
              <Link to="/account" className="nav-link">
                 Paramètres
              </Link>
            </>
             
          )}

          {user ? (
            <>
              <button className="menu-item cta cta-danger log-btn" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-link cta log-btn">Connexion</button>
              </Link>

              <Link to="/signup">
                <button className="nav-link cta log-btn">Inscription</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
