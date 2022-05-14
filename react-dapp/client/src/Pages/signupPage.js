import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

var rootStyle = {
    'height': '86vh',
    'textAlign': 'center'
}

export default function SignupPage() {
    const navigate = useNavigate();
    const [isCompany, setChecked] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState()

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
                /*
                if( signApiCompany(email,password, firstname, lastname) ){
                    saveSession(email);
                    navigate("/homeCompany");
                }
                else{
                    alert(mensajeError);
                }
                */
                let name = firstname.concat(" ", lastname); 
                let item ={email,password,name}
                alert("llega")
                let result = await fetch("https://vast-peak-05541.herokuapp.com/api/users",{
                    method:'GET',
                    //body: JSON.stringify(item),
                    headers:{
                        "Content-Type":'application/json',
                    },
                    //mode: 'no-cors'
                });
                result = await result.text();
                console.log(result);



                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('isCompany', true);
                localStorage.setItem('userID', email);
                navigate("/homeCompany");
            }
            //login de user
            else{
                /*
                if( signApiUser(email,password, firstname, lastname) ){
                    saveSession(email);
                    navigate("/homeUser");
                }
                else{
                    alert(mensajeError);
                }
                */

                let name = firstname.concat(" ", lastname); 
                let item ={email,password,name}

                let result = await fetch("https://vast-peak-05541.herokuapp.com/api/users",{
                    method:'GET',
                    //body: JSON.stringify(item),
                    headers:{
                        "Content-Type":'application/json',
                    },
                    //mode: 'no-cors'
                });
                result = await result.text();
                if(!result) alert("vacío")
                console.log(result);
                
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('isCompany', false);
                localStorage.setItem('userID', email);
                navigate("/homeUser");
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