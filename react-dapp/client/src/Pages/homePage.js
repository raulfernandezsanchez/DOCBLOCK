import React, {Component} from "react";
import '../Assets/styles.css';

import NavBar from "../Components/navbar";
import Footer from "../Components/footer";

class HomePage extends Component{
    render() {
        return (
            <>
            <NavBar></NavBar>
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 align-items-center my-5">
                    <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0" src={require("../Assets/logo_name.png")} alt="Logo & name" /></div>
                    <div class="col-lg-5">
                        <h4>What is DocBlock?</h4>
                        <p>DocBlock is the most suitable tool to<br/>track, sign and manage your documents.</p>
                        <a class="btn btn-primary" href="/">Explore payment plans</a>
                    </div>
                </div>
                <div class="card text-white bg-secondary my-5 py-4 text-center">
                    <div class="card-body">
                        <h3 class="text-white m-0" font-size="xx-large">Managing contracts has never been easier</h3>
                    </div>
                </div>
            </div>
            <div class="row gx-4 gx-lg-5">

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Functionalities</h2>
                            <p class="card-text">Explore all the functionalities DocBlock offers</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/services">Learn more</a></div>
                    </div>
                </div>

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our product</h2>
                            <p class="card-text">Platform to manage<br/> and sign documents</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/services">Learn more</a></div>
                    </div>
                </div>

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our team</h2>
                            <p class="card-text">Young professionals</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/about">Learn more</a></div>
                    </div>
                </div>
                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our partners</h2>
                            <p class="card-text">Companies that trust<br/> in our product</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/about">Learn more</a></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default HomePage;