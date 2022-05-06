import React from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";


var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

export default function UserPage(){
    const userID = localStorage.getItem('userID');
    return (
        <>
        <NavBarUser></NavBarUser>
        <div id="homeuser" style={rootStyle}>
            <h3 align='left'>Hello user: {userID}</h3>
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