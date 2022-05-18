import React from "react";
import { useState } from 'react';
import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";
import Popup from "../Components/popup"
import "../css/companyPage.css"

function getUnique(arr, index) {
  const unique = arr
       .map(e => e[index])
       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

function getMyUser(arr, email) {
  const myuser = arr.filter(user => user.email == email);
  return myuser;
}

export default function CompanyPage(){

    //popup button info
    const [buttonPopupInfo, setButtonPopupInfo] = useState(false);
    //popup button assigned
    const [buttonPopupAssign, setButtonPopupAssign] = useState(false);

    //popup info
    const [popupUserName, setPopupUserName] = useState('');
    const [popupUserEmail, setPopupUserEmail] = useState('');
    const [popupUserContracts, setPopupUserContracts] = useState([]);

    const userID = localStorage.getItem('userID');
    //const userName = localStorage.getItem('userName');
    // the value of the search field
    const [name, setName] = useState('');

    // the search result
    const [foundUsers, setFoundUsers] = useState('');

    // loaded users
    const [loadedUsers, setLoadedUsers] = useState('');
    // loaded contracts
    const [foundContracts, setFoundContracts] = useState('');
    //
    const [assignedUser, setAssignedUser] = useState('');

    // load users and contracts
     React.useEffect(() => {
       fetch("https://vast-peak-05541.herokuapp.com/api/users/", {
           method:'GET',
           headers:{
               "Content-Type":'application/json',
           }
       }).then(response => response.json())
         .then(data => {
           let user = getUnique(data, 'name');
           let myUser = getMyUser(user, userID);
           setFoundUsers(myUser);
           setLoadedUsers(myUser);
         });
        fetch("https://vast-peak-05541.herokuapp.com/api/contracts", {
            method:'GET',
            headers:{
                "Content-Type":'application/json',
            }
        }).then(response => response.json())
          .then(data => {
            let contracts = getUnique(data, 'name');
            setFoundContracts(contracts);
          });

       }, []);

       function handlePopupInfo(event, username, useremail, contracts) {
         event.preventDefault();
         setPopupUserName(username);
         setPopupUserEmail(useremail);
         setPopupUserContracts(contracts);
         setButtonPopupInfo(true);
       }

    return (
        <>
        <NavBarUser></NavBarUser>
        <div className="about-section" width="100%">
            <h1>{userID}</h1>
            <p>{userID}</p>
        </div>
        <div className="container search-wrapper">
          <h2>{userID}</h2>
          <div className="row">
          	<div className="col-lg-12">
          		<div className="main-box clearfix">
          			<div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th><span>User</span></th>
                        <th><span>Email</span></th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foundUsers && foundUsers.length > 0 ? (
                        foundUsers.map((user) => (
                          <tr key={user.id} className="user">
                            <td className="user-id">{user.name}</td>
                            <td className="user-name">{user.email}</td>
                            <td>
                              <div className="col d-flex justify-content-center">
                                <a onClick={(e) => handlePopupInfo(e, user.name, user.email, user.assignedContracts)} className="table-link">
                                  <span className="fa-stack info-button">
                                    <i className="fa fa-square fa-stack-2x"></i>
                                    <i className="fa fa-info-circle fa-stack-1x fa-inverse"></i>
                                  </span>
                                  <div className="hide hide-info-button">User information</div>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">User not found.</td>
                        </tr>
                      )}
                    </tbody>
                    </table>
            			</div>
            		</div>
            	</div>
            </div>
          </div>
          <Footer></Footer>
          <Popup trigger={buttonPopupInfo} setTrigger={setButtonPopupInfo}>
            <div className="popup-user-info">
              <div className="row name">
                {popupUserName}
              </div>
              <div className="row">
                {popupUserEmail}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="main-box clearfix">
                  <div className="table-responsive">
                    <table className="table user-list">
                      <thead>
                        <tr>
                          <th><span>Contract</span></th>
                          <th><span>Status</span></th>
                          <th><span>Action</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {popupUserContracts && popupUserContracts.length > 0 ? (
                          popupUserContracts.map((contract) => (
                            <tr key={contract} className="">
                              <td className="user-id">{contract}</td>
                              <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
                              <td>
                                <div className="col d-flex justify-content-center">
                                    <button className="button" variant="primary">Firm</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2">No contracts assigned!</td>
                          </tr>
                        )}
                      </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          </Popup>
        </>
    );
}
