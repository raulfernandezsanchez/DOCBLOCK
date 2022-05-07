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

var titleStyle = {
    'textAlign': 'center'
}



class AboutPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div className="about-section" width="100%">
                <h1>About DocBlock</h1>
                <p>Some text about who we are and what we do.</p>
            </div>

            <h2 style={titleStyle}>Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/pink.jpg")} alt="Arnau Llobet" style={memberStyle}/>
                        <div className="container">
                            <h2>Member 1</h2>
                            <p className="title">Blockchain developer</p>
                            <p>Description</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                    <img src={require("../Assets/orange.jpg")} alt="Raúl Sánchez" style={memberStyle}/>
                    <div className="container">
                        <h2>Member 2</h2>
                        <p className="title">Back-end developer</p>
                        <p>Description</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/light_blue.jpg")} alt="Diego Núñez" style={memberStyle}/>
                        <div className="container">
                            <h2>Member 3</h2>
                            <p className="title">Blockchain developer</p>
                            <p>Description</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card">
                        <img src={require("../Assets/green.jpg")} alt="Xavier Gervilla" style={memberStyle}/>
                        <div className="container">
                            <h2>Member 4</h2>
                            <p className="title">Front-end developer</p>
                            <p>Description</p>
                            <p><button className="button">Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <pre></pre>
            <h2 style={titleStyle}>Our Partners</h2>
            <div className="row">
                <div className="column-company">
                    <div className="card">
                        <img src={require("../Assets/green.jpg")} alt="John" style={partnerStyle}/>
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
                        <img src={require("../Assets/light_blue.jpg")} alt="John" style={partnerStyle}/>
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