import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../Assets/styles.css";

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState()

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que el email y la password son validos:
        //si no lo son, wrong credentials y seguimos en la pagina
        if (typeof email === 'undefined' || typeof password === 'undefined' || typeof firstname === 'undefined' || typeof lastname === 'undefined'){
            alert('Wrong credentials');
        }
        //si son validas, vamos a la pagina de usuario
        else{
            alert("Valid credentials")
            navigate("/homeuser");
        }
    }

    return (
        <>
        <NavBar></NavBar>
        <form style={rootStyle} onSubmit={handleSubmit} >
            <div className="form-group">
                <p>First name</p>
                <input type="text" onChange={e => setFirstname(e.target.value)} placeholder="Juan" />
            </div>
            <br/>
            <div className="form-group">
                <p>Last name</p>
                <input type="text" onChange={e => setLastname(e.target.value)} placeholder="Garcia Lopez" />
            </div>
            <br/>
            <div className="form-group">
                <p>Email address</p>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="name@domain.com" />
            </div>
            <br/>
            <div className="form-group">
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password" />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} >Sign Up</button>
            <br/><br/>
            <p className="forgot-password text-right">
                <a href="/login">Already registered? Sign in</a>
            </p>
        </form>
        <Footer></Footer>
        </>
    );
}