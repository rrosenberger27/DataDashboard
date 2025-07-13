import React from "react";
import "../styles/BroadStat.css";

const BroadStat = ({stat, title}) => {    
    return (
        <div className="broad-stat-card">
            <h1 className="stat-value"> {stat} </h1>
            <p className="stat-title"> {title} </p>
        </div>
    )
}

export default BroadStat;