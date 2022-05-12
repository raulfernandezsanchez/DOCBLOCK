import React, {Component} from "react";
import '../css/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'bottom': '20px'
}

class UserContracts extends Component{
    render() {
        return (
            <>
            <NavBarUser></NavBarUser>
            <div id="services" style={rootStyle}>
                <h1>Main page to manage contracts</h1>
                <br/><br/>
                <h3>This page will show the different contracts a<br/>
                    user has and will allow him/her to sign them</h3>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default UserContracts;
