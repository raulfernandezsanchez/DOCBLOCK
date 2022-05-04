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

class ServicesPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div id="services" style={rootStyle}>
                <h1>Services Page</h1>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ServicesPage;