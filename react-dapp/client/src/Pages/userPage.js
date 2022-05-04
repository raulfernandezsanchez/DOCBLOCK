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

class UserPage extends Component{
    render() {
        return (
            <>
            <NavBarUser></NavBarUser>
            <div id="homeuser" style={rootStyle}>
                <h1>User page</h1>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default UserPage;