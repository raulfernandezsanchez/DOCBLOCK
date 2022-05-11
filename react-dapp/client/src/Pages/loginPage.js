import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

var rootStyle = {
    'height': '86vh',
    'textAlign': 'center'
}


export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isCompany, setChecked] = useState(false);

    const handleCheck = () =>{
        setChecked(!isCompany);
    };

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que el email y la password tienen contenido:
        if (typeof email === 'undefined' || typeof password === 'undefined'){
            alert('Wrong credentials, please try again');
        }
        //si tienen contenido, se comprueban con la api
        else{
            //login de company
            if(isCompany){
                /*
                if( checkApiCompany(email,password) ){
                    saveSession(email);
                    navigate("/homeCompany");
                }
                else{
                    alert(mensajeError);
                }
                */
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('isCompany', true);
                localStorage.setItem('userID', email);
                localStorage.setItem('password', password);
                navigate("/homeCompany");
            }
            //login de user
            else{
                /*
                if( checkApiUser(email,password) ){
                    saveSession(email);
                    navigate("/homeUser");
                }
                else{
                    alert(mensajeError);
                }
                */
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('isCompany', false);
                localStorage.setItem('userID', email);
                localStorage.setItem('password', password);
                navigate("/homeUser");
            }
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
                    <br/><br/><br/>
                    <label><input type="checkbox" checked={isCompany} onChange={handleCheck}/> Log in as a company</label>
                    <br/><br/>
                </div>
                <div>
                    <button type='submit' onClick={handleSubmit} className="btn btn-primary btn-block">Log in</button>
                </div><br/>
                <a href="/recovery">Forgot password?</a><br/><br/>
                <a href="/signup">New user? Sign up</a>
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}