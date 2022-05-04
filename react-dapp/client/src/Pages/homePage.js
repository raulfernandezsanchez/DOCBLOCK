import React, {Component} from "react";
import '../Assets/styles.css';

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
                        <h4>Descripción de DocBlock</h4>
                        <p>Descripción de la "empresa"</p>
                        <a className="btn btn-primary" href="/">Explorar planes de pago</a>
                    </div>
                </div>
                <div className="card text-white bg-secondary my-5 py-4 text-center">
                    <div className="card-body">
                        <p className="text-white m-0" fontSize="xx-large">Catchphrase de DocBlock</p>
                    </div>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5">

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Functionalities</h2>
                            <p className="card-text">Cabecera de las diferentes funcionalidades que ofrece DocBlock</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our product</h2>
                            <p className="card-text">Descripción del producto que ofrecemos</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>

                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our team</h2>
                            <p className="card-text">Descripción de los componentes que forman el equipo.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>
                <div className="col-sm-3 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Our partners</h2>
                            <p className="card-text">Descripción de las empresas partner (fundació  épica)</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="/">More Info</a></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            </>
        );
    }
} export default HomePage;
