import React, {Component} from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

class ContactPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div id="contact" style={rootStyle}>
                <h1>Contact Page</h1>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ContactPage;