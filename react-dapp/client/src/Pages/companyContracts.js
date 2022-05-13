import React, { useState } from "react";

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";

var rootStyle = {
    'marginLeft': '20px'
}

export default function CompanyContracts(){
    const [filename, setFilename] = useState('')
    const [pdfform, setpdfform] = useState('')
    const [pdfInput, setpdfinput] = useState('')


    function handleSubmit(e){
        console.log("llega")
        //setFilename(e.target.value);
        alert("llega");

        //get secure url from our server
        const {url} = fetch("/s3Url",{
            headers : {
                'Content-type': 'application/json',
                'Accept': 'application/son'
            }
        }).then(res => res.json())
        console.log("llega")
        console.log(url)

        
    };
    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div id="services" style={rootStyle}>
            <h4>Main page to manage contracts</h4>
            <p>This page will show the different contracts a user has and will allow him/her to sign them</p>
            <br/>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">My contracts</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab" aria-controls="notifications" aria-selected="false">New contract</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade align-items-start show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <ul>
                        <li>Actual contacts (tracking)
                            <ul>
                                <li>Contracts to be signed</li>
                                <li>Remind user to sign</li>
                            </ul>
                        </li>
                        <li>Past contracts</li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <ul>
                        <li>Upload contract</li>
                        <li>Assign contract</li>
                    </ul>
                    <div className="mb-3" width="100px" id="pdfform" onChange={e => setpdfform(e.target.value)}>
                        <label htmlFor="formFile" className="form-label">Select a contract to upload
                        <input className="form-control" type="file" accept=".pdf" id="formFile" onChange={e => setpdfinput(e.target.value)}/></label>
                        <br/><button type='submit' onClick={handleSubmit} className="btn btn-primary btn-block">Upload</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}
