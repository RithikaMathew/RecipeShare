import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './images/logo.png';
const Navbar = () => {
  return (
    <nav>
<Link to="/"><img src={logo} alt="Home" id='logo'/></Link>

  <div className="button-container">

        <Link to="/"><button> Home 🏠 </button></Link>
        <Link to="/read"><button> Explore Challenges 🔍  </button></Link>
        <Link to="/new"><button> Submit Challenge 🏆 </button></Link>
      </div>
    </nav>
  );
};

export default Navbar;