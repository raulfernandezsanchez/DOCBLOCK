import React, { Component } from "react";
import '../css/footer.css'

class Footer extends Component{
    render(){
        return (
            <footer className="bg-dark text-center text-white">
              <div className="container py-3">
                <p className="text-center m-2">
                  Projecte Aplicat d'Enginyeria - UPC
                </p>
                <section className="button-wrapper">
                  <a className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://www.upc.edu/ca" role="button">
                    <img rel="icon" src="logo_upc_black.png" alt="UPC"/>
                  </a>
                  <a className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://twitter.com/la_UPC" role="button">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-floating m-1" target="_blank" rel="noopener noreferrer" href="https://epicalab.com/es/" role="button">
                    <i className="fab fa-github"></i>
                  </a>
                  <a className="btn btn-outline-light btn-floating m-1" href="mailto:info@docblock.com?subject=DocBlock%20information" role="button">
                    <i className="fa fa-envelope"></i>
                  </a>
                </section>
                <p className="text-center m-2">
                  © 2022 Copyright: All rights reserved.
                </p>
              </div>



            </footer>

        );
    }
}
export default Footer;
