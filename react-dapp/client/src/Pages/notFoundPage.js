import React, {Component} from "react";

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class NotFound extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div id="notfound" style={{'textAlign': 'center'}}>
                <div class="notfound">
                    <div class="notfound-404">
                        <br/>
                        <h1>Page not found</h1>
                        <p>The page you are looking for is not available.</p>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default NotFound;
