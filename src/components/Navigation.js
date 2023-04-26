import React from 'react';
import { Link } from "react-router-dom";
import './Navigation.css'

export const Navigation = () => {

    return (
        <div className="navbar">
            <div className="nav-title"><Link to="/">Cheffing It Up </Link></div>
            <ul className="nav-links">
                <Link to="/foodlist">Recipe List</Link>
                <Link to="/addrecipe">Add a Recipe</Link>
            </ul>
        </div>
    );
}
