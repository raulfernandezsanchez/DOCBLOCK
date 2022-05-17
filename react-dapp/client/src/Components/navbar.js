import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../css/navbar.css'

const NavBar = () =>{
    const [display, setDisplay] = useState('none');
    const handleCheck = () =>{
        if (display === 'none'){
            setDisplay('block')
        }
        else{
            setDisplay('none')
        }
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-4">
                <a className="navbar-brand" href="/">
                  <img className="img-fluid rounded mx-2 mb-4 mb-lg-0" src={require("../Assets/logo_no_background.png")} width="50" height="50" alt="Dockblock logo" />
                  DocBlock
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id="menu">
                        <li className="nav-item">
                            <a href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a href="/services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a href="/validation">Validation</a>
                        </li>
                        <li>
                          <a href="#"> User</a>
                          <ul className="menu-vertical" id="submenu">
                            <li><a href="/login">Log in</a></li>
                            <li><a href="/signup">Sign up</a></li>
                          </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavBar;
