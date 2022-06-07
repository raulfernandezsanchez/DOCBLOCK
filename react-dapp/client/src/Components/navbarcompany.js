import React from "react";
import { NavLink } from "react-router-dom";
import '../css/navbar.css'

const NavBarCompany = () =>{
    const handleClick = () =>{
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userID");
        localStorage.removeItem("isCompany");
        alert("Logging out");
    };
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
                <a className="navbar-brand" href="/homeCompany">
                  <img className="img-fluid rounded mx-2 mb-4 mb-lg-0" src={require("../Assets/logo_no_background.png")} width="30" height="30" alt="Dockblock logo" />
                  DocBlock
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/homeCompany" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>My page</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/companyContracts" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Contracts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/companySettings" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Settings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")} onClick={handleClick}>Log out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavBarCompany;
