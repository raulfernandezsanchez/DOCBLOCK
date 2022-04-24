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
                        <h4>Descripción de DocBlock</h4>
                        <p>Descripción de la "empresa"</p>
                        <a class="btn btn-primary" href="/">Explorar planes de pago</a>
                    </div>
                </div>
                <div class="card text-white bg-secondary my-5 py-4 text-center">
                    <div class="card-body">
                        <p class="text-white m-0" font-size="xx-large">Catchphrase de DocBlock</p>
                    </div>
                </div>
            </div>
            <div class="row gx-4 gx-lg-5">

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Functionalities</h2>
                            <p class="card-text">Cabecera de las diferentes funcionalidades que ofrece DocBlock</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our product</h2>
                            <p class="card-text">Descripción del producto que ofrecemos</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>

                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our team</h2>
                            <p class="card-text">Descripción de los componentes que forman el equipo.</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>
                <div class="col-sm-3 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">Our partners</h2>
                            <p class="card-text">Descripción de las empresas partner (fundació  épica)</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default HomePage;