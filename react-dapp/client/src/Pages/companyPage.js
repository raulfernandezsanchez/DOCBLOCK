import React from "react";

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";


export default function CompanyPage(){
    const companyID = localStorage.getItem('userID');
    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div id="homeCompany" style={{'marginLeft': '20px'}}>
            <h4>{companyID}</h4>
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
