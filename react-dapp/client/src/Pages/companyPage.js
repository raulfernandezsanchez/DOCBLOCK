import React from "react";
import { useState } from 'react';
import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";
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

    const companyID = localStorage.getItem('userID');

    // the value of the search field
    const [name, setName] = useState('');

    // the search result
    const [foundUsers, setFoundUsers] = useState('');

    // loaded users
    const [loadedUsers, setLoadedUsers] = useState('');

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
    }, []);

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
        <div id="homeCompany" style={{'marginLeft': '20px'}}>
            <h4>{companyID}</h4>
            <ul>
                <li>Contacts tracking</li>
                <li>Pending contracts</li>
                <li>General information</li>
                <li>Overview of the companys's status</li>
            </ul>
        </div>
        <div className="container search-wrapper">
        <h2>Users</h2>
        <div className="input-group rounded">
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
                            <a href="#" className="table-link">
            									<span className="fa-stack">
            										<i className="fa fa-square fa-stack-2x"></i>
            										<i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
            									</span>
            								</a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
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
        </>
    );
}
