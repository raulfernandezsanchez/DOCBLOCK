import React, {useState} from "react";
import emailjs from 'emailjs-com';

import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";

import DocBlockContract from "./../contracts/DocBlock.json";
import getWeb3 from "./../getWeb3";
import Deploy from "./../deploy.json"

export default function UserContracts(){
  const userID = localStorage.getItem('userID');

  // user
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [userContracts, setUserContracts] = useState('');

  const [web3Provider, setWeb3Provider] = useState('');
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [signMap, setSignMap] = useState('');
  const [showName, setShowName] = useState('');
  const [showSignedDocs, setShowSignedDocs] = useState(false);

  const acc = Deploy.account; //account
  const pk  = Deploy.private_key;  // private key of your account
  const address = Deploy.contract_address; //Contract Address

  async function connectWeb3() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DocBlockContract.networks[networkId];

      const instance = new web3.eth.Contract(
         DocBlockContract.abi,
         deployedNetwork && deployedNetwork.address,
      );

      let ethBalance = await web3.eth.getBalance(acc);
      ethBalance = web3.utils.fromWei(ethBalance, 'ether');
      setAccountBalance(ethBalance);

      // Set web3, account, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setWeb3Provider(web3);
      setAccount(acc);
      setContract(instance);
      getPastLog(instance);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, account, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

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
         setName(data.user.name)
       });

       connectWeb3();

     }, []);

  function getDate(timestamp) {
   let t = new Date(timestamp * 1000);
   return ('0' + t.getDate()).slice(-2) + '/' + ('0' + (t.getMonth() + 1) ).slice(-2) + '/' + (t.getFullYear());
  }

  function getTime(timestamp) {
   let t = new Date(timestamp * 1000);
   return ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2);
  }

  function getPastLog(contract) {
    console.log(`Returns all the past events`);

    contract.getPastEvents("signAdded", {fromBlock: 0}, (error, events) => {
      if(!error) {
        let log = document.getElementById("log");
        for(let i = 0; i < events.length; ++i) {
          let event = events[i];
          log.innerHTML += `
                  <tr class="table-success">
                    <td class="table-success">${event.transactionHash}</td>
                    <td class="table-success">${event.returnValues.name}</td>
                    <td class="table-success">${event.returnValues.document}</td>
                    <td class="table-success">${getDate(event.returnValues.timestamp)}</td>
                    <td class="table-success">${getTime(event.returnValues.timestamp)}</td>
                  </tr>
          `;
        }
        console.log(events);
      } else {
        console.log(error);
      } });
  }

  if (!web3Provider) {
    return (
      <>
      <NavBarUser></NavBarUser>
      <div className="about-section" width="100%">
          <h1>History</h1>
          <p>Transaction tracking.</p>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <p>Loading web3, contract, accounts ...</p>
        </div>
      </div>
      <Footer></Footer>
      </>
      );
  }

  const showDocsList = showSignedDocs;

  return (
      <>
      <NavBarUser></NavBarUser>
      <div className="about-section" width="100%">
          <h1>History</h1>
          <p>Transaction tracking.</p>
      </div>
      <div className="row mx-5 my-5">
        <div className="col-lg-12">
          <div className="main-box clearfix">
            <div className="table-responsive">
              <table className="table user-list">
                <thead>
                  <tr>
                    <th><span>Hash</span></th>
                    <th><span>User</span></th>
                    <th><span>Document</span></th>
                    <th><span>Date</span></th>
                    <th><span>Time</span></th>
                  </tr>
                </thead>
                <tbody id="log"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      </>
  );
}
