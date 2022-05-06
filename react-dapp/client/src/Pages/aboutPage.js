import React, {Component} from "react";
import '../Assets/aboutPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

var memberStyle = {
    'width': '100%',
    'height': '350px'
}

var partnerStyle = {
    'width': '100%',
    'height': '300px'
}



class AboutPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <body>
                <div class="about-section" width="100%">
                    <h1>About DocBlock</h1>
                    <p>Some text about who we are and what we do.</p>
                </div>

                <h2 text-align='center'>Our Team</h2>
                <div class="row">
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/pink.jpg")} alt="Arnau Llobet" style={memberStyle}/>
                            <div class="container">
                                <h2>Member 1</h2>
                                <p class="title">Blockchain developer</p>
                                <p>Description</p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                        <img src={require("../Assets/orange.jpg")} alt="Raúl Sánchez" style={memberStyle}/>
                        <div class="container">
                            <h2>Member 2</h2>
                            <p class="title">Back-end developer</p>
                            <p>Description</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/light_blue.jpg")} alt="Diego Núñez" style={memberStyle}/>
                            <div class="container">
                                <h2>Member 3</h2>
                                <p class="title">Blockchain developer</p>
                                <p>Description</p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/green.jpg")} alt="Xavier Gervilla" style={memberStyle}/>
                            <div class="container">
                                <h2>Member 4</h2>
                                <p class="title">Front-end developer</p>
                                <p>Description</p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <pre></pre>
                    <h2 text-align="center">Our Partners</h2>
                    <div class="column-company">
                        <div class="card">
                            <img src={require("../Assets/green.jpg")} alt="John" style={partnerStyle}/>
                            <div class="container">
                                <h2>Company 1</h2>
                                <p class="title">Lema</p>
                                <p>Description of the company</p>
                                <p></p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                    <div class="column-company">
                        <div class="card">
                            <img src={require("../Assets/light_blue.jpg")} alt="John" style={partnerStyle}/>
                            <div class="container">
                                <h2>Company 2</h2>
                                <p class="title">Lema</p>
                                <p>Description of the company</p>
                                <p></p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            <Footer></Footer>
            </>
        );
    }
} export default AboutPage;