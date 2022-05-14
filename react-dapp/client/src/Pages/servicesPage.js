import React, {Component} from "react";
import '../css/aboutPage.css';

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
            <div className="container">

            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ServicesPage;
