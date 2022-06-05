import React, { useState } from "react";

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";
import UploadImageToS3WithReactS3 from "../Components/UploadImageToS3WithReactS3"
import Popup from "../Components/popup";

function getUnique(arr, index) {
  const unique = arr
       .map(e => e[index])
       // store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
       // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

export default function CompanyContracts(){

    // the value of the search field
    const [filename, setFilename] = useState('');
    const [fileContent, setFileContent] = useState('');
    // the search result
    const [foundContract, setFoundContract] = useState('');

    // loaded contracts
    const [loadedContracts, setLoadedContracts] = useState('');

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupContract, setPopupContract] = useState('');

    React.useEffect(() => {
       fetch("https://vast-peak-05541.herokuapp.com/api/contracts", {
         method:'GET',
         headers:{
             "Content-Type":'application/json',
         }
     }).then(response => response.json())
       .then(data => {
         let contracts = getUnique(data, 'name');
         setFoundContract(contracts);
         setLoadedContracts(contracts);
       });
   }, []);


   const filter = (e) => {
     const keyword = e.target.value;

     if (keyword !== '') {
       const results = foundContract.filter((contract) => {
         return contract.name.toLowerCase().startsWith(keyword.toLowerCase());
         // Use the toLowerCase() method to make it case-insensitive
       });
       setFoundContract(results);
     } else {
       setFoundContract(loadedContracts);
       // If the text field is empty, show all users
     }
     setFilename(keyword);
   };

   async function handleContractInfo(event, contractID, contractURL) {
    event.preventDefault();
    setButtonPopup(true);
    setPopupContract(contractID);
    setFileContent(contractURL);
   };

   function closePopup(event) {
    event.preventDefault();
    setButtonPopup(false);
    setFileContent('');
   };

    return (
        <>
        <NavBarCompany></NavBarCompany>
        <div className="about-section" width="100%">
            <h1>Contracts</h1>
            <p>Current contracts uploaded.</p>
        </div>
        <div id="services" style={{'marginLeft': '20px'}}>
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
                    <div className="container search-wrapper">
                    <h2>Contracts</h2>
                    <div className="input-group rounded">
                      <input type="search" value={filename} onChange={filter} className="input form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    </div>
                    <div className="row">
                    	<div className="col-lg-12">
                    		<div className="main-box clearfix">
                    			<div className="table-responsive">
                            <table className="table user-list">
                              <thead>
                                <tr>
                                  <th><span>Document</span></th>
                                  <th><span>Visualization</span></th>
                                  <th>&nbsp;</th>
                                </tr>
                              </thead>
                              <tbody>
                                {foundContract && foundContract.length > 0 ? (
                                  foundContract.map((contract) => (
                                    <tr key={contract.id} className="contract">
                                      <td className="user-id">{contract.name}</td>
                                      <td className="user-name">
                                      <button className="button" variant="primary" onClick={(e) => handleContractInfo(e, contract.name, contract.contractPDF)}>View contract</button>
                                      </td>
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
                </div>
                <div className="tab-pane fade" id="notifications" role="tabpanel" aria-labelledby="notifications-tab">
                    <div className="row justify-content-around">
                        <div className="col-sm-4">
                        <UploadImageToS3WithReactS3></UploadImageToS3WithReactS3>
                        {fileContent ? <iframe src={fileContent} title='PDF' width="100%" height={window.innerHeight*0.85}></iframe> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <h4>Document {popupContract}</h4>
              </div>
            </div>
            <div className="row">
              {fileContent ? <iframe src={fileContent} title='PDF' width='100%' height={window.innerHeight*0.8}></iframe> : <></>}
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mx-2" onClick={(e) => closePopup(e)}>Close</button>
              </div>
            </div>
          </Popup>
        </>
    );
}
