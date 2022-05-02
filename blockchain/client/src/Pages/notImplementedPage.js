import React, {Component} from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

class NotImplemented extends Component{
    render() {
        return (
            <>
            <NavBarUser></NavBarUser>
            <div id="services" style={rootStyle}>
                <h1>Feature not available</h1>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default NotImplemented;