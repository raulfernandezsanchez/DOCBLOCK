import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/loginPage.css';

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

export default function SignupPage() {
    const navigate = useNavigate();
    const [isCompany, setChecked] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [companyName, setFirstname] = useState();


    function isRegistered(registered){
        for(let i = 0; i < registered.length; ++i){
            if(registered[i].email === email) return true;
        }
        return false;
    }

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que los campos tienen contenido:
        if (typeof email === 'undefined' || typeof password === 'undefined'  || typeof companyName === 'undefined'){
            alert('Wrong credentials, please try again');
        }
        //si tienen contenido, se comprueban con la api
        else{
            setChecked(true);
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
                        companyemail : email,
                        companypassword : password,
                        companyname : companyName,
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
                    localStorage.setItem('companyName', companyName);
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
                        username : companyName,
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
        <div class="body">
            <body>
                <div class="main2">
                    <p class="sign" align="center">Company Sign Up</p>
                    <form class ="form1">
                        <input class="fn" type="text" onChange={e => setFirstname(e.target.value)} placeholder="Company Name" />
                        <input class="un " type="email" onChange={e => setEmail(e.target.value)} align="center" placeholder='Email'></input>
                        <input class="pass " type="password" onChange={e => setPassword(e.target.value)} align="center" placeholder='Password'></input>
                        <button class="submit" onClick={handleSubmit} align="center">Sign Up</button>
                        <div class = "forgot" align="center">
                            <a href="/login">Already registered? Sign in</a>
                        </div>
                    </form>
                </div>
            </body>
        </div>

        <Footer></Footer>
        </>
    );
}
