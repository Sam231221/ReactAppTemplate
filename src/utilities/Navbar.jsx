import React from "react";
import { NavLink } from "react-router-dom";
import {Logo} from "./Logo";
export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <Logo width='40' height='40' />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <NavLink to="/" className="nav-link px-2">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/" className="nav-link px-2">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact/" className="nav-link px-2">
                  Contact
                </NavLink>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
    </div>
  );
};
