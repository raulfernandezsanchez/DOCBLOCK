import React, {Component} from "react";
import '../css/aboutPage.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";



class AboutPage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div className="about-section" width="100%">
                <h1>About DocBlock</h1>
                <p>Some text about who we are and what we do.</p>
            </div>

            <h2 id='titleSection'>Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card" style={{height: "625px"}}>
                        <img src={require("../Assets/pink.jpg")} style={{height: "350px"}} alt="Arnau Llobet" id='memberImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Arnau Llobet</h2></div>
                            <div className="row"><p className="title">Blockchain developer</p></div>
                            <div className="row"><p>UPC 4th year student with computer science expertise.</p></div>
                            <div className="row"><a href="mailto:arnau.llobet.massalle@estudiantat.upc.edu" className="button">Contact</a></div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card" style={{height: "625px"}}>
                        <img src={require("../Assets/orange.jpg")} style={{height: "350px"}} alt="Raúl Sánchez" id='memberImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Raúl Fernández</h2></div>
                            <div className="row"><p className="title">Back-end developer</p></div>
                            <div className="row"><p>UPC 4th year student with software expertise.</p></div>
                            <div className="row"><a href="mailto:raul.fernandez.sanchez@estudiantat.upc.edu" className="button">Contact</a></div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card" style={{height: "625px"}}>
                        <img src={require("../Assets/light_blue.jpg")} style={{height: "350px"}} alt="Diego Núñez" id='memberImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Diego Núñez</h2></div>
                            <div className="row"><p className="title">Blockchain developer</p></div>
                            <div className="row"><p>UPC 4th year student with computer science expertise.</p></div>
                            <div className="row"><a href="mailto:diego.nunez@estudiantat.upc.edu" className="button">Contact</a></div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="card" style={{height: "625px"}}>
                        <img src={require("../Assets/green.jpg")} style={{height: "350px"}} alt="Xavier Gervilla" id='memberImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Xavier Gervilla</h2></div>
                            <div className="row"><p className="title">Front-end developer</p></div>
                            <div className="row"><p>UPC 4th year student with computer science expertise.</p></div>
                            <div className="row"><a href="mailto:xavier.gervilla@estudiantat.upc.edu" className="button">Contact</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <pre></pre>
            <h2 id='titleSection'>Our Partners</h2>
            <div className="row">
                <div className="column-company">
                    <div className="card" style={{height: "600px"}}>
                        <img src={require("../Assets/green.jpg")} alt="Universitat Politècnica de Catalunya" id='partnerImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Universitat Politècnica de Catalunya</h2></div>
                            <div className="row"><p className="title">BarcelonaTech</p></div>
                            <div className="row"><p>Public institution of research and higher education in the fields of engineering, architecture, sciences and technology, and one of the leading technical universities in Europe.</p></div>
                            <div className="row"><a href="https://www.upc.edu/ca" className="button">Learn more about UPC</a></div>
                        </div>
                    </div>
                </div>
                <div className="column-company">
                    <div className="card" style={{height: "600px"}}>
                        <img src={require("../Assets/light_blue.jpg")} alt="Èpica Foundation" id='partnerImage'/>
                        <div className="row align-content-between card-body">
                            <div className="row"><h2>Èpica Foundation</h2></div>
                            <div className="row"><p className="title">LA FURA DELS BAUS</p></div>
                            <div className="row"><p>Multidisciplinary learning space geared towards the performing arts</p></div>
                            <div className="row"><a href="https://epicalab.com/es/" className="button">Learn more about Èpica Foundation</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default AboutPage;
