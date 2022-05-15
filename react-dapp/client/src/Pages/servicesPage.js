import React, {Component} from "react";

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class ServicesPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div id="services" style={{'marginLeft':'20px'}}>
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
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ServicesPage;
