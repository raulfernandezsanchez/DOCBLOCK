import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

export default function UserSettings(){
    const navigate = useNavigate();
    //contraseña
    const currentPassword = localStorage.getItem('password');
    //userID (nombre de usuario)
    const userID = localStorage.getItem('userID');
    //mail
    const userMail = localStorage.getItem('userID');
    //dirección (calle)
    const userAddr = localStorage.getItem('userID');
    //codigo de validacion para otras empresas
    const validationCode = localStorage.getItem('userID');

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();

    const [deletion, setDeletion] = useState();

    const [mailNotifications, setMailNotifications] = useState(true);
    const [newDocMail, setNewDocMail] = useState(true);
    const [docSignedMail, setDocSignedMail] = useState(true);

    const [smsNotifications, setSMSNotifications] = useState(true);
    const [newDocSMS, setNewDocSMS] = useState(true);
    const [docSignedSMS, setDocSignedSMS] = useState(true);

    const [newEmail, setNewEmail] = useState();
    const [newAddr, setNewAddr] = useState();

    const confirmPasswordChange = () =>{
        if (typeof password === 'undefined' || typeof newPassword === 'undefined' || typeof newPasswordConfirm === 'undefined'){
            alert('Rellena todos los campos');
        }
        else{
            if(password !== currentPassword){
                alert('Current password is not right');
            }
            else if(newPassword !== newPasswordConfirm){
                alert("New password and confirmation are not equal");
            }
            else{
                localStorage.setItem('password', newPassword);
                alert('Password successfully changed!');
            }
        }
    };

    const confirmEmailChange = () =>{
        if (typeof password === 'undefined' || typeof newEmail === 'undefined'){
            alert('Rellena todos los campos');
        }
        else{
            if(password !== currentPassword){
                alert('Wrong password');
            }
            else{
                localStorage.setItem('userID', newEmail);
                alert('Email successfully changed!');
            }
        }
    };

    const confirmAddrChange = () =>{
        if (typeof password === 'undefined' || typeof newAddr === 'undefined'){
            alert('Rellena todos los campos');
        }
        else{
            if(password !== currentPassword){
                alert('Wrong password');
            }
            else{
                localStorage.setItem('userID', newAddr);
                alert('Email successfully changed!');
            }
        }
    };


    async function confirmAccountDeletion() {
        if (typeof deletion === "undefined" || deletion !== 'Delete'){
            alert("Wrong confirmation");
        }
        else{
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userID");
            localStorage.removeItem("isCompany");
            localStorage.removeItem("password");
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <>
        <NavBarUser></NavBarUser>
        <div style={{'marginLeft': '20px', 'marginTop': '20px'}}>
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
                <br/>
                <div className="tab-pane fade align-items-start show active" id="profile" role="tabpanel" aria-labelledby="home-tab">
                    <ul>
                        <p>User name: {userID}</p>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#emailLabel">
                        Change email</button>
                        <div className="modal fade" id="emailLabel" tabIndex="-1" aria-labelledby="emailLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="emailLabel">Change email</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col">Current email: {userMail}</div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col">New email:</div>
                                            <div className="col">
                                            <input type="email" onChange={e => setNewEmail(e.target.value)} placeholder="name@domain.com"/></div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col">Enter password to confirm:</div>
                                            <div className="col">
                                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password"/></div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={confirmEmailChange}>Confirm change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addrLabel">
                        Change address</button>
                        <div className="modal fade" id="addrLabel" tabIndex="-1" aria-labelledby="addrLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addrLabel">Change address</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col">Current address: {userAddr}</div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col">New address:</div>
                                            <div className="col">
                                            <input type="text" onChange={e => setNewAddr(e.target.value)} placeholder="address"/></div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col">Enter password to confirm:</div>
                                            <div className="col">
                                            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password"/></div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={confirmAddrChange}>Confirm change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#validationLabel">
                        Obtain validation code</button>
                        <div className="modal fade" id="validationLabel" tabIndex="-1" aria-labelledby="validationLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="validationLabel">Your validation code</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col">{validationCode}</div>
                                            <div className="col">
                                                <button type="button" className="btn btn-info" onClick={() => {navigator.clipboard.writeText(validationCode)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2" viewBox="0 0 16 16">
                                                        <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
                                                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                                                    </svg>
                                                    Copy to clipboard
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/><br/>
                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#accountsLabel">
                        Connect to other accounts</button>
                        <div className="modal fade" id="accountsLabel" tabIndex="-1" aria-labelledby="accountsLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="accountsLabel">Connect to other accounts</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col">Linkedin</div>
                                            <div className="col">
                                                <button type="button" className="btn btn-info" onClick={() => {alert('Connected to linkedin')}}>Connect to Linkedin</button>
                                            </div>
                                        </div><br/>
                                        <div className="row">
                                            <div className="col">Facebook</div>
                                            <div className="col">
                                                <button type="button" className="btn btn-info" onClick={() => {alert('Connected to facebook')}}>Connect to Facebook</button>
                                            </div>
                                        </div><br/>
                                        <div className="row">
                                            <div className="col">Twitter</div>
                                            <div className="col">
                                                <button type="button" className="btn btn-info" onClick={() => {alert('Connected to twitter')}}>Connect to Twitter</button>
                                            </div>
                                        </div><br/>
                                        <div className="row">
                                            <div className="col">Gmail</div>
                                            <div className="col">
                                                <button type="button" className="btn btn-info" onClick={() => {alert('Connected to gmail')}}>Connect to Gmail</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <div className="row">
                        <div className="col"><ul>
                            <h4>Mail notifications</h4>
                            <label><input type="checkbox" checked={mailNotifications} onChange={e => setMailNotifications(!mailNotifications)}/> Allow email notifications</label>
                            <div>
                                <ul>
                                    <label><input type="checkbox" checked={newDocMail} onChange={e => setNewDocMail(!newDocMail)} disabled={!mailNotifications}/> New document to sign</label><br/>
                                    <label><input type="checkbox" checked={docSignedMail} onChange={e => setDocSignedMail(!docSignedMail)} disabled={!mailNotifications}/> Document signed successfully</label>
                                </ul>
                            </div>
                        </ul></div>
                        <div className="col"><ul>
                            <h4>SMS notifications</h4>
                            <label><input type="checkbox" checked={smsNotifications} onChange={e => setSMSNotifications(!smsNotifications)}/> Allow SMS notifications</label>
                            <div>
                                <ul>
                                    <label><input type="checkbox" checked={newDocSMS} onChange={e => setNewDocSMS(!newDocSMS)} disabled={!smsNotifications}/> New document to sign</label><br/>
                                    <label><input type="checkbox" checked={docSignedSMS} onChange={e => setDocSignedSMS(!docSignedSMS)} disabled={!smsNotifications}/> Document signed successfully</label>
                                </ul>
                            </div>
                        </ul></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#passwordLabel">
                    Change password
                    </button>
                    <div className="modal fade" id="passwordLabel" tabIndex="-1" aria-labelledby="passwordLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="passwordLabel">Change password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">Current password:</div>
                                    <div className="col">
                                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password"/></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col">New password:</div>
                                    <div className="col">
                                    <input type="password" onChange={e => setNewPassword(e.target.value)} placeholder="new password"/></div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col">Confirm new password:</div>
                                    <div className="col">
                                    <input type="password" onChange={e => setNewPasswordConfirm(e.target.value)} placeholder="new password"/></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={confirmPasswordChange}>Confirm change</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <br/><br/>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#multifactor">
                    Multi Factor Authentication
                    </button>
                    <div className="modal fade" id="multifactor" tabIndex="-1" aria-labelledby="multifactor2" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="multifactor">Multi Factor Authentication</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Configuration of Multi Factor Authentication
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Set uthentication</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteLabel">
                    Delete account
                    </button>
                    <div className="modal fade" id="deleteLabel" tabIndex="-1" aria-labelledby="deletLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteLabel">Delete account</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="col">
                                    <div className="row">To confirm deleting your account, write 'Delete':</div>
                                    <div className="row">
                                    <input type="text" onChange={e => setDeletion(e.target.value)} placeholder="Delete"/></div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmAccountDeletion}>Confirm deletion</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}
