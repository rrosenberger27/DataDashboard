import React from "react";
import "../styles/NavBar.css";

const NavBar = () => {
    return (
        <div className="navbar-container">
            <h1 className="navbar-title">
                &#127916; MovieDash!
            </h1>
            <div className="navbar-sections">
                <h2 className="navbar-link">
                    &#128202; Dashboard
                </h2>

                <h2 className="navbar-link">
                    &#128269; Search
                </h2>
                
                <h2 className="navbar-link">
                    &#8505;&#65039; About
                </h2>
            </div>
        </div>
    )
}

export default NavBar;