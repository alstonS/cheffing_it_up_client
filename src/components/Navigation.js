import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css'

export const Navigation = () => {

    return (
        <div className="navbar">
            <div className="logo">Cheffing It Up</div>
            <ul className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/foodlist">Food List</Link>
            </ul>
        </div>
    );
}
