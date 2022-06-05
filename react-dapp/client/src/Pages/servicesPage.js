import React, {Component} from "react";
import '../css/aboutPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class ServicesPage extends Component{
  render() {
      return (
          <>
          <NavBar></NavBar>
          <div className="about-section" width="100%">
              <h1>Services</h1>
              <p>Functionalities we provide with DocBlock.</p>
          </div>
          <div className="row">
              <div className="col d-flex justify-content-center">
                  <div className="card">
                      <img src={require("../Assets/user.jpg")} alt="Diego Núñez" id='memberImage'/>
                      <div className="container">
                          <h2>Users</h2>
                          <p className="title">Services for users:</p>
                          <li>Tracking your contracts.</li>
                          <li>Sign your contracts.</li>
                          <li>Visualization of your contracts.</li>
                          <li>Validate your experience.</li>
                      </div>
                  </div>
              </div>
              <div className="col d-flex justify-content-center">
                  <div className="card">
                      <img src={require("../Assets/business.jpg")} alt="Diego Núñez" id='memberImage'/>
                      <div className="container">
                          <h2>Companies</h2>
                          <p className="title">Services for companies:</p>
                          <li>Visualization of your documents.</li>
                          <li>Assign documents to your employees.</li>
                          <li>Control and monitoring of the contracts assigned.</li>
                          <li>Validate a candidate's experience.</li>
                      </div>
                  </div>
              </div>
          </div>
          <pre></pre>
          <Footer></Footer>
          </>
      );
  }
} export default ServicesPage;
