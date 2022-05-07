import React, {Component} from "react";
import '../Assets/styles.css';

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";

var rootStyle = {
    'height': '86vh'
}

class CompanySettings extends Component{
    render() {
        return (
        <>
        <NavBarCompany></NavBarCompany>
        <div style={rootStyle}>
            <h4>Company settings</h4>
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
                    <ul>
                        <li>Company NIF</li>
                        <li>Change name</li>
                        <li>Change email</li>
                        <li>Change address</li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <ul>
                        <li>Allow email notifications</li>
                        <li>Manage email notifications
                            <ul>
                                <li>Document successfully signed</li>
                                <li>Successful Blockchain transaction</li>
                            </ul>
                        </li>
                        <li>Allow SMS notifications</li>
                        <li>Manage SMS notifications
                            <ul>
                                <li>Document successfully signed</li>
                                <li>Successful Blockchain transaction</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">
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
} export default CompanySettings;