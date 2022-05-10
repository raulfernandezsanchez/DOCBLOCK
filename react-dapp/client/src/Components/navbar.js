import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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
                <a className="navbar-brand" href="/">DocBlock</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/services" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Services</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/validation" className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Validation</NavLink>
                        </li>
                        <div className="nav-item nav-link"  onClick={handleCheck} >User
                            <div>
                                <li><NavLink to='/login' style={{display: display}} className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Log in</NavLink></li>
                                <li><NavLink to='/signup' style={{display: display}} className={({isActive})=>(isActive ? "nav-link active" : "nav-link")}>Sign up</NavLink></li>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavBar;