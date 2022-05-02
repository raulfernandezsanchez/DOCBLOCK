import React from "react";
import { NavLink } from "react-router-dom";
import '../Assets/styles.css';

const NavBar = () =>{
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <a class="navbar-brand" href="/">DocBlock</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NavLink to="/" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/about" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>About</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/services" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Services</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/contact" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Contact</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/signDocs" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Sign Docs</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/login" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Log in</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavBar;
