import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

var rootStyle = {
    'textAlign': 'center'
}

export default function SignupPage() {
    const navigate = useNavigate();
    const [isCompany, setChecked] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState()

    function isRegistered(registered){
        for(let i = 0; i<registered.length; ++i){
            if(registered[i].email === email) return true;
        }
        return false;
    }

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que los campos tienen contenido:
        if (typeof email === 'undefined' || typeof password === 'undefined'  || typeof firstname === 'undefined' || typeof lastname === 'undefined'){
            alert('Wrong credentials, please try again');
        }
        //si tienen contenido, se comprueban con la api
        else{
            //signup de company
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
                    //nuevo usuario
                    let new_user = {
                        useremail : email,
                        userpassword : password,
                        username : firstname.concat(' ', lastname),
                    };
                    let resultPost = await fetch("https://vast-peak-05541.herokuapp.com/api/companies", {
                        body: JSON.stringify(new_user),
                        method:'POST',
                        headers:{
                            "Content-Type":'application/json',
                        },
                    });
                    //checkear errores de resultPost
                    console.log(resultPost)

                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('isCompany', true);
                    localStorage.setItem('userID', email);
                    navigate("/homeCompany");
                }
                else {
                    alert('The mail address is already being used!');
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
                    //nuevo usuario
                    let new_user = {
                        useremail : email,
                        userpassword : password,
                        username : firstname.concat(' ', lastname),
                    };
                    let resultPost = await fetch("https://vast-peak-05541.herokuapp.com/api/users", {
                        body: JSON.stringify(new_user),
                        method:'POST',
                        headers:{
                            "Content-Type":'application/json',
                        },
                    });
                    //checkear errores de resultPost
                    console.log(resultPost);

                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('isCompany', false);
                    localStorage.setItem('userID', email);
                    navigate("/homeUser");
                }
                else {
                    alert('The mail address is already being used!');
                }
            }
        }
    }

    const handleCheck = () =>{
        setChecked(!isCompany);
    };

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
                <br/><br/><br/>
                <label><input type="checkbox" checked={isCompany} onChange={handleCheck}/> Create account as company</label>
                <br/><br/>
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
