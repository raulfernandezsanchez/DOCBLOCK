import React from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";


var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

export default function CompanyPage(){
    const companyID = localStorage.getItem('userID');
    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div id="homeCompany" style={rootStyle}>
            <h3 align='left'>Hello company: {companyID}</h3>
            <ul>
                <li>Contacts tracking</li>
                <li>Pending contracts</li>
                <li>General information</li>
                <li>Overview of the companys's status</li>
            </ul>
        </div>
        <Footer></Footer>
        </>
    );
}