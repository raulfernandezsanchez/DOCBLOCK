import React from "react";
import { useState } from 'react';
import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";
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

export default function CompanyPage(){

    //popup button info
    const [buttonPopupInfo, setButtonPopupInfo] = useState(false);
    //popup button assigned
    const [buttonPopupAssign, setButtonPopupAssign] = useState(false);

    //popup info
    const [popupUserName, setPopupUserName] = useState('');
    const [popupUserEmail, setPopupUserEmail] = useState('');
    const [popupUserContracts, setPopupUserContracts] = useState([]);

    const companyID = localStorage.getItem('userID');
    const companyName = localStorage.getItem('companyName');

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
        fetch("https://vast-peak-05541.herokuapp.com/api/users", {
          method:'GET',
          headers:{
              "Content-Type":'application/json',
          }
        }).then(response => response.json())
        .then(data => {
          let users = getUnique(data, 'name');
          setFoundUsers(users);
          setLoadedUsers(users);
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

    function handlePopupAssign(event, user) {
      event.preventDefault();
      setAssignedUser(user);
      setButtonPopupAssign(true);
    }

    function isContractAssigned(contract) {
      let already_assigned_contracts = assignedUser.assignedContracts;
      let assign = false;
      let i = 0;
      while (!assign && i < already_assigned_contracts.length) {
        if (contract == already_assigned_contracts[i]) {
          assign = true;
        }
        ++i;
      }
      return assign;
    }

    function assignContract(event, contract) {
      event.preventDefault();

      if (!isContractAssigned(contract)) {
        let new_contract = {
          userassignedContracts : contract
        }
        fetch("https://vast-peak-05541.herokuapp.com/api/users/" + assignedUser._id, {
            body: JSON.stringify(new_contract),
            method:'PUT',
            headers:{
                "Content-Type":'application/json',
            }
        }).then(response => response.json())
          .then(data => {
            console.log(assignedUser);
          });

      } else {
        console.log("Contract already assigned!");
      }
    }

    const filter = (e) => {
      const keyword = e.target.value;

      if (keyword !== '') {
        const results = foundUsers.filter((user) => {
          return user.name.toLowerCase().startsWith(keyword.toLowerCase());
          // Use the toLowerCase() method to make it case-insensitive
        });
        setFoundUsers(results);
      } else {
        setFoundUsers(loadedUsers);
        // If the text field is empty, show all users
      }
      setName(keyword);
    };
    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div className="about-section" width="100%">
            <h1>{companyName}</h1>
            <p>{companyID}</p>
        </div>
        <div className="container search-wrapper">
        <h2>Users</h2>
        <div className="rounded">
          <input type="search" value={name} onChange={filter} className="input form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>
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
                          <div className="row">
                            <div className="col d-flex justify-content-center">
                              <a onClick={(e) => handlePopupInfo(e, user.name, user.email, user.assignedContracts)} className="table-link">
                                <span className="fa-stack info-button">
                                  <i className="fa fa-square fa-stack-2x"></i>
                                  <i className="fa fa-info-circle fa-stack-1x fa-inverse"></i>
                                </span>
                                <div className="hide hide-info-button">User information</div>
                              </a>
                            </div>
                            <div className="col d-flex justify-content-center">
                              <a onClick={(e) => handlePopupAssign(e, user)} className="table-link">
                                  <span className="fa-stack assign-button">
                                      <i className="fa fa-square fa-stack-2x"></i>
                                      <i className="fa fa-file fa-stack-1x fa-inverse"></i>
                                  </span>
                                  <div className="hide hide-assign-button">Assign contract</div>
                              </a>
                            </div>
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
                      </tr>
                    </thead>
                    <tbody>
                      {popupUserContracts && popupUserContracts.length > 0 ? (
                        popupUserContracts.map((contract) => (
                          <tr key={contract} className="">
                            <td className="user-id">{contract}</td>
                            <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
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
        <Popup trigger={buttonPopupAssign} setTrigger={setButtonPopupAssign}>
          <div className="row">
            <div className="col-lg-12">
              <div className="main-box clearfix">
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th><span>Contract</span></th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foundContracts && foundContracts.length > 0 ? (
                        foundContracts.map((contract) => (
                          <tr key={contract.name} className="">
                            <td className="user-id">{contract.name}</td>
                            <td>
                              <button onClick={(e) => assignContract(e, contract.name)} type="button" className="btn btn-primary">Assign</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2">No contracts available!</td>
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
