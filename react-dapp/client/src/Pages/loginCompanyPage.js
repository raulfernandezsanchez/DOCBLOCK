import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loginPage.css';

import NavBar from '../Components/navbar';
import Footer from '../Components/footer';

export default function LoginPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function isRegistered(registered){
        for(let i = 0; i<registered.length; ++i){
            if(registered[i].email === email) return true;
        }
        return false;
    }

    async function handleSubmit (event) {
        event.preventDefault();
        //comprobacion de que el email y la password tienen contenido:
        if (typeof email === 'undefined' || typeof password === 'undefined'){
            alert('Wrong credentials, please try again');
        }
        //si tienen contenido, se comprueban con la api
        else{
            const isCompany = true;
            if(isCompany){
                try {
                    let result = await fetch("https://vast-peak-05541.herokuapp.com/api/companies/" + email, {
                    method:'GET',
                    headers:{
                        "Content-Type":'application/json',
                    }
                });
                const data = await result.json();
                console.log(data);
                localStorage.setItem('isAuthenticated', true);
                console.log(data.company.email);
                localStorage.setItem('userID', email);
                console.log(data.company._id);
                localStorage.setItem('id', data.company._id);
                navigate("/homeCompany");
                } catch (error) {
                    alert('No company with this mail!')
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
                    alert('No user with this mail!')
                }
                else {
                    //comprobar que la contraseña es correcta
                    localStorage.setItem('isAuthenticated', true);
                    localStorage.setItem('userID', email);
                    localStorage.setItem('password', password);
                    navigate("/homeUser")
                }
            }
        }
    }

    return(
        <>
        <NavBar></NavBar>
        <div className="body">
          <div className="main">
              <p className="sign" align="center"> Company Log in</p>
              <form className ="form1">
                  <input className="un " type="email" onChange={e => setEmail(e.target.value)} align="center" placeholder='Email'></input>
                  <input className="pass " type="password" onChange={e => setPassword(e.target.value)} align="center" placeholder='Password'></input>
                  <button type="button" className="submit btn btn-primary"  onClick={handleSubmit} align="center">Log in</button>
                  <div className = "register m-3" align="center">
                      <a href="/signupCompany" >New company? Sign up</a>
                  </div>
              </form>
          </div>
        </div>
        <Footer></Footer>
        </>
    )
}
