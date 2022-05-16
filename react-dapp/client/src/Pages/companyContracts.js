import React, { useState} from "react";

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";

export default function CompanyContracts(){
    const [filename, setFilename] = useState('No PDF uploaded');
    const [fileContent, setFileContent] = useState();
    
    function updateFilename(e){
        e.preventDefault();
        setFilename(e.target.files[0].name);
        const reader = new FileReader();
        reader.onload = async (e) =>{
            setFileContent(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div id="services" style={{'marginLeft': '20px'}}>
            <h4>Main page to manage contracts</h4>
            <p>This page will show the different contracts a user has and will allow him/her to sign them</p>
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
                    <div className="row justify-content-around">
                        <div className="col-sm-4">
                            <label htmlFor="formFile" className="form-label">Select a contract to upload
                                <input className="form-control" type="file" accept=".pdf" id="formFile" onChange={updateFilename}/>
                            </label>
                            <br/>
                            {/*<a href={filename} target='_blank' className="btn btn-primary btn-block" rel='noopener noreferrer' onClick={() => alert(filename)}>Upload</a>*/}
                            <button className="btn btn-primary btn-block" onClick={() => alert(filename)}>Upload</button>
                        </div>
                        <div className="col-sm-8">
                        {fileContent ? <iframe src={fileContent} title='PDF' width="100%" height={window.innerHeight*0.85}></iframe> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}


