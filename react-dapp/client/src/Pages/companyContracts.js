import React, { useState } from "react";

import Footer from "../Components/footer";
import NavBarCompany from "../Components/navbarcompany";

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

    function updateFilename(e){
        e.preventDefault();
        setFilename(e.target.files[0].name);
        const reader = new FileReader();
        reader.onload = async (e) =>{
            setFileContent(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    function uploadFile(){
      alert('File '+ filename +' updated')
      localStorage.setItem('contractFile', filename);
      localStorage.setItem('contractContent', fileContent);
    }


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
                                      <td className="user-name">{contract.url}</td>
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
                    <div className="row justify-content-around m-2">
                        <div className="col-sm-4">
                          <div className="row mx-3 my-3">
                            <label htmlFor="formFile" className="form-label text-center">Select a contract to upload</label>
                            <input className="form-control" type="file" accept=".pdf" id="formFile" onChange={updateFilename}/>
                          </div>
                          <div className="row mx-3">
                            {/*<a href={filename} target='_blank' className="btn btn-primary btn-block" rel='noopener noreferrer' onClick={() => alert(filename)}>Upload</a>*/}
                            <button className="btn btn-primary btn-block" onClick={uploadFile}>Upload</button>
                          </div>
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
