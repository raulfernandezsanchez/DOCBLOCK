import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isCompany, setChecked] = useState(false);

    function isRegistered(registered){
        for(let i = 0; i<registered.length; ++i){
            if(registered[i].email === email) return true;
        }
        return false;
    }

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
            if(isCompany){
                let result = await fetch("https://vast-peak-05541.herokuapp.com/api/companies", {
                    method:'GET',
                    headers:{
                        "Content-Type":'application/json',
                    }
                });
                result = await result.json();

                //comprobar si el usuario ya tiene una cuenta
                if (!isRegistered(result)) {
                    alert('No account with this mail!')
                }
                else {
                    //comprobar que la contraseña es correcta
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('isCompany', true);
                    localStorage.setItem('userID', email);
                    localStorage.setItem('password', password);
                    navigate("/homeCompany");
                }
            }
            //login de user
            else{
                let result = await fetch("https://vast-peak-05541.herokuapp.com/api/users", {
                    method:'GET',
                    headers:{
                        "Content-Type":'application/json',
                    }
                });
                result = await result.json();

                //comprobar si el usuario ya tiene una cuenta
                if (!isRegistered(result)) {
                    alert('No account with this mail!')
                }
                else {
                    //comprobar que la contraseña es correcta
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('isCompany', false);
                    localStorage.setItem('userID', email);
                    localStorage.setItem('password', password);
                    navigate("/homeUser");
                }
            }
        }
    }

    return(
        <>
        <NavBar></NavBar>
        <div style={{'textAlign':'center'}}>
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
                <a href="/recovery">Forgot password? Reset</a><br/><br/>
                <a href="/signup">New user? Sign up</a>
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}
