import React, {Component} from "react";
import '../Assets/aboutPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class AboutPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <body>
                <div class="about-section">
                    <h1>About DocBlock</h1>
                    <p>Some text about who we are and what we do.</p>
                </div>

                <h2 text-align='center'>Our Team</h2>
                <div class="row">
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/pink.jpg")} alt="John" width = "100%"/>
                            <div class="container">
                                <h2>Member 1</h2>
                                <p class="title">Responsability</p>
                                <p>Description</p>
                                <p>email</p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                        <img src={require("../Assets/orange.jpg")} alt="John" width = "100%"/>
                        <div class="container">
                            <h2>Member 2</h2>
                            <p class="title">Responsability</p>
                            <p>Description</p>
                            <p>email</p>
                            <p><button class="button">Contact</button></p>
                        </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/light_blue.jpg")} alt="John" width="100%"/>
                            <div class="container">
                                <h2>Member 3</h2>
                                <p class="title">Responsability</p>
                                <p>Description</p>
                                <p>email</p>
                                <p><button class="button">Contact</button></p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="card">
                            <img src={require("../Assets/green.jpg")} alt="John" width="100%"/>
                            <div class="container">
                                <h2>Member 4</h2>
                                <p class="title">Responsability</p>
                                <p>Description</p>
                                <p>email</p>
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
                            <img src={require("../Assets/green.jpg")} alt="John" width="100%"/>
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
                            <img src={require("../Assets/light_blue.jpg")} alt="John" width="100%"/>
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