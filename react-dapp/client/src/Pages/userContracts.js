import React, {Component} from "react";

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

class UserContracts extends Component{
    render() {
        return (
            <>
            <NavBarUser></NavBarUser>
            <div id="services" style={{'marginLeft': '20px'}}>
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
