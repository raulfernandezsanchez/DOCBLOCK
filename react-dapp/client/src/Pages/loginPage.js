import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}


export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que el email y la password son validos:
        //si no lo son, wrong credentials y seguimos en la pagina
        if (typeof email === 'undefined' || typeof password === 'undefined'){
            alert('Wrong credentials');
        }
        //si son validas, vamos a la pagina de usuario
        else{
            alert("Valid credentials")
            navigate("/homeuser");
        }
    }

    return(
        <>
        <NavBar></NavBar>
        <div style={rootStyle}>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} placeholder="name@domain.com"></input>
                </div><br/>
                <div>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password"></input>
                </div><br/>
                <div>
                    <button type='submit' onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
                </div><br/><br/><br/>
                <a href="/signup">New user? Sign up</a>
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}