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
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState()

    function isRegistered(registered){
        for(let i = 0; i < registered.length; ++i){
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
            setChecked(false);
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

                    let companyName = firstname.concat(' ', lastname);
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
        <div className="body">
          <div className="main2">
              <p className="sign" align="center">User Sign Up</p>
              <form className ="form1">
                  <input className="fn" type="text" onChange={e => setFirstname(e.target.value)} placeholder="First Name" />
                  <input className="ln" type="text" onChange={e => setLastname(e.target.value)} placeholder="Last Name" />
                  <input className="un " type="email" onChange={e => setEmail(e.target.value)} align="center" placeholder='Email'></input>
                  <input className="pass " type="password" onChange={e => setPassword(e.target.value)} align="center" placeholder='Password'></input>
                  <button type="button" className="submit btn btn-primary" onClick={handleSubmit} align="center">Sign Up</button>
                  <div className="forgot p-2" align="center">
                      <a href="/login">Already registered? Sign in</a>
                  </div>
              </form>
          </div>
        </div>
        <Footer></Footer>
        </>
    );
}
