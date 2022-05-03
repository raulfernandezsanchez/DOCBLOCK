import React, {Component} from "react";
import '../Assets/aboutPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

class AboutPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>

            <div className="about-section">
                <h1>About DocBlock</h1>
                <p>Some text about who we are and what we do.</p>
            </div>

            <h2 text-align='center'>Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/pink.jpg")} alt="John" width = "100%"/>
                        <div className="container">
                            <h2>Member 1</h2>
                            <p className="title">Responsability</p>
                            <p>Description</p>
                            <p>email</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                    <img src={require("../Assets/orange.jpg")} alt="John" width = "100%"/>
                    <div className="container">
                        <h2>Member 2</h2>
                        <p className="title">Responsability</p>
                        <p>Description</p>
                        <p>email</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/light_blue.jpg")} alt="John" width="100%"/>
                        <div className="container">
                            <h2>Member 3</h2>
                            <p className="title">Responsability</p>
                            <p>Description</p>
                            <p>email</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/green.jpg")} alt="John" width="100%"/>
                        <div className="container">
                            <h2>Member 4</h2>
                            <p className="title">Responsability</p>
                            <p>Description</p>
                            <p>email</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <pre></pre>
                <h2 text-align="center">Our Partners</h2>
                <div className="column-company">
                    <div className="card">
                        <img src={require("../Assets/green.jpg")} alt="John" width="100%"/>
                        <div className="container">
                            <h2>Company 1</h2>
                            <p className="title">Lema</p>
                            <p>Description of the company</p>
                            <p></p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className="column-company">
                    <div className="card">
                        <img src={require("../Assets/light_blue.jpg")} alt="John" width="100%"/>
                        <div className="container">
                            <h2>Company 2</h2>
                            <p className="title">Lema</p>
                            <p>Description of the company</p>
                            <p></p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
            </>
        );
    }
} export default AboutPage;
