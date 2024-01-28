import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">ConnectCo</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Projects</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/calendar" className="nav-link">Calendar</Link>
          </li> */}
          <li className="navbar-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};