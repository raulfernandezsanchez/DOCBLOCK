import React, {Component} from "react";
import '../css/servicesPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class ServicesPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div className="about-section" width="100%">
                <h1>Services</h1>
                <p>DocBlock has different functionah2ties.</p>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="column">
                <div className="cardServices">
                  <h5>Companies</h5>
                  <h2>Assign contracts to users.</h2>
                  <h2>Follow and control the progress.</h2>
                  <h2>External consult.</h2>
                </div>
              </div>
              <div className="column">
                <div className="cardServices">
                    <h5>Users</h5>
                    <h2>Sign your documents.</h2>
                    <h2>Validate your experience.</h2>
                </div>
              </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default ServicesPage;
