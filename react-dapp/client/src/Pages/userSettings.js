import React from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

var rootStyle = {
    'height': '86vh'
}

export default function UserSettings(){
    return (
        <>
        <NavBarUser></NavBarUser>
        <div style={rootStyle}>
        <h4>User settings</h4>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab" aria-controls="notifications" aria-selected="false">Notifications</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="safety-tab" data-bs-toggle="tab" data-bs-target="#safety" type="button" role="tab" aria-controls="safety" aria-selected="false">Safety and privacy</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade align-items-start show active" id="profile" role="tabpanel" aria-labelledby="home-tab">
                    <ul>
                        <li>User name</li>
                        <li>Change email</li>
                        <li>Change address</li>
                        <li>Obtain validation code</li>
                        <li>Connect to other accounts</li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <ul>
                        <li>Allow email notifications</li>
                        <li>Manage email notifications
                            <ul>
                                <li>New document to sign</li>
                                <li>Document successfully signed</li>
                            </ul>
                        </li>
                        <li>Allow SMS notifications</li>
                        <li>Manage SMS notifications
                            <ul>
                                <li>New document to sign</li>
                                <li>Document successfully signed</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">
                    <ul>
                        <li>Change password</li>
                        <li>Set Multi Factor Authentication</li>
                        <li>Delete account</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}