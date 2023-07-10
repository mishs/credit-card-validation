import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark  text-body">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <div>
            <li className="nav-brand">
              <span className="nav-link text-white">
                Credit Card Validation
              </span>
            </li>
          </div>

          <div className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-white">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add-card" className="nav-link text-white">
                Add card
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
}
