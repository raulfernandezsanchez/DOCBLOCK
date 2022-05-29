import React, { Component } from "react";
import { useState } from 'react';
import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";
import SignDocs from "../Components/signDocs"

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

export default function UserPage(){

    const userID = localStorage.getItem('userID');

    // user
    const [user, setUser] = useState('');
    const [userContracts, setUserContracts] = useState('');

    // loaded contracts
    const [foundContracts, setFoundContracts] = useState('');

    // load users and contracts
     React.useEffect(() => {
       fetch("https://vast-peak-05541.herokuapp.com/api/users/" + userID, {
           method:'GET',
           headers:{
               "Content-Type":'application/json',
           }
       }).then(response => response.json())
         .then(data => {
           setUser(data.user);
           setUserContracts(data.user.assignedContracts);
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

    return (
        <>
        <NavBarUser></NavBarUser>
        <div className="about-section" width="100%">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
        <div className="row mx-5 my-5">
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
                    {userContracts && userContracts.length > 0 ? (
                      userContracts.map((contract) => (
                        <tr key={contract} className="">
                          <td className="user-id">{contract}</td>
                          <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
                          <td>
                            <div className="col d-flex justify-content-center">
                                <button className="button" variant="primary">Sign</button>
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
          <Footer></Footer>
        </>
    );
}
