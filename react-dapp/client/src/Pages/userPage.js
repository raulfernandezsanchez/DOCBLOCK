import React from "react";
import '../css/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";


export default function UserPage(){
    const userID = localStorage.getItem('userID');
    return (
        <>
        <NavBarUser></NavBarUser>
        <div id="homeuser">
            <h4>{userID}</h4>
            <ul>
                <li>Pending contracts</li>
                <li>General information</li>
                <li>Overview of the user's status</li>
            </ul>
        </div>
        <Footer></Footer>
        </>
    );
};
