import React from "react";

import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <p>PhotoSite</p>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/gallery">Galerie</Link>
            </li>
            <li>
              <Link to="/outing">Sorties</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Mon profil</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
