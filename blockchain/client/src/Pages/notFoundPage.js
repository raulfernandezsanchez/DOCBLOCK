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

class NotFound extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div id="notfound" style={rootStyle}>
                <div class="notfound">
                    <div class="notfound-404">
                        <div></div>
                        <h1>404</h1>
                    </div>
                    <h2>Page not found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default NotFound;