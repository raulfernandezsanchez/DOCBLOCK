import React from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

var rootStyle = {
    'position': 'relative',
    'top': '0px',
    'height': '86vh',
    'bottom': '20px'
}

export default function UserSettings(){
    return (
        <>
        <NavBarUser></NavBarUser>
        <div style={rootStyle}>
            <h3 align='left'>User settings</h3>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Profile</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="notifications-tab" data-bs-toggle="tab" data-bs-target="#notifications" type="button" role="tab" aria-controls="notifications" aria-selected="false">Notifications</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="safety-tab" data-bs-toggle="tab" data-bs-target="#safety" type="button" role="tab" aria-controls="safety" aria-selected="false">Safety and privacy</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade align-items-start show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <li>User name</li>
                    <li>Change email</li>
                    <li>Change address</li>
                    <li>Obtain validation code</li>
                    <li>Connect to other accounts</li>
                </div>
                <div class="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
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
                </div>
                <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">
                    <li>Change password</li>
                    <li>Set Multi Factor Authentication</li>
                    <li>Delete account</li>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}