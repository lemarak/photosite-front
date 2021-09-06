import React from "react";

import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ token, setUser, slug }) => {
  // Render
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
          {!token ? (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={`/profile/${slug}`}>Mon profil</Link>
              </li>
              <li
                onClick={() => {
                  setUser("");
                }}
              >
                Se déconnecter
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
