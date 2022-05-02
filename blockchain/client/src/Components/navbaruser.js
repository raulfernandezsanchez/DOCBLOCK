import React from "react";
import { NavLink } from "react-router-dom";
import '../Assets/styles.css';

const NavBarUser = () =>{
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <a class="navbar-brand" href="/">DocBlock</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <NavLink to="/homeuser" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>My page</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/mycontracts" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>My contracts</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/settings" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Settings</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Log out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavBarUser;