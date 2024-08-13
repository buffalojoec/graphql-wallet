import './NavBar.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/accounts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Accounts
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/transactions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Transactions
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/explorer" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Explorer
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
