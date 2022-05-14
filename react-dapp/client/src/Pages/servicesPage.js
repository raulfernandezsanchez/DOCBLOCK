import React, {Component} from "react";
<<<<<<< HEAD
import '../css/styles.css';
=======
import '../css/aboutPage.css';
>>>>>>> main

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'bottom': '20px'
}

class ServicesPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
<<<<<<< HEAD
            <div id="services" style={rootStyle}>
                <h2>For companies</h2>
                <ul>
                    <li>Assign contracts to users</li>
                    <li>Follow and control the progress</li>
                    <li>External consult</li>
                </ul>
                <br/>
                <h2>For users</h2>
                <ul>
                    <li>Easy sign</li>
                    <li>Validate experience</li>
                </ul>
=======
            <div className="container">

>>>>>>> main
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ServicesPage;
