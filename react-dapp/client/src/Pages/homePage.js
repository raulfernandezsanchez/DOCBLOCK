import React, {Component} from "react";

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

class HomePage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" src={require("../Assets/logo_name.png")} alt="Logo & name" /></div>
                    <div className="col-lg-5">
                        <h4>What is DocBlock?</h4>
                        <p>DocBlock is the most suitable tool to<br/>track, sign and manage your documents.</p>
                        <a className="btn btn-primary" href="/">Explore payment plans</a>
                    </div>
                </div>
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body">
                        <h3 className="text-white m-0" fontSize="xx-large">Benefit from the immutability of Blockchain to manage your contracts</h3>
                    </div>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5">

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Functionalities</h2>
                            <p className="card-text">Explore all the functionalities DocBlock offers</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/services">Learn more</a></div>
                    </div>
                </div>

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our product</h2>
                            <p className="card-text">The future of transactions, today</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/services">Learn more</a></div>
                    </div>
                </div>

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our team and partners</h2>
                            <p className="card-text">Young professionals and companies that trust in our product</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/about">Learn more</a></div>
                    </div>
                </div>
                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Blockchain</h2>
                            <p className="card-text">Learn more about the technology behind DocBlock </p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/about">Learn more</a></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default HomePage;
