import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom';
function Nav() {
    return (
        <ul className="topnav">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li style={{ float: 'left' }}><NavLink to="/about">About</NavLink></li>
        </ul >
    );
}

export default Nav;