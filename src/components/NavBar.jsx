import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
    return (
        <div className="navbar-container">
            <h1 className="navbar-title">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    &#127916; MovieDash!
                </Link>
            </h1>
            <div className="navbar-sections">
                <Link to="/" className="navbar-link">
                    &#128202; Dashboard
                </Link>
                <Link to="/about" className="navbar-link">
                    &#8505;&#65039; About
                </Link>
            </div>
        </div>
    );
};

export default NavBar;