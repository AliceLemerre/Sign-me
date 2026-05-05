import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
// import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar isOpen={isMenuOpen} onToggle={toggleMenu} />
       <header className="section header">
        <div className="title-section">
          <h1><span>Sign me</span> <br/>le dictionnaire de la LSF <br/>vers le français</h1>
        </div>
        <div className="description-section">
          <p>As-tu déjà rencontré un signe en LSF dont tu n'as pas compris la signification ? Avec sign me, il suffit de sélectionner la ou les configurations et le mouvement, s'il y en a un, pour retrouver la traduction ! </p>
        </div>
      </header>
    </>

  );
}

export default Header;