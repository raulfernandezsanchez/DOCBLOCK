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
      logEvents(instance);

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

  function signTransaction(name, doc) {
   const EthereumTx = require('ethereumjs-tx').Transaction;

   web3Provider.eth.getTransactionCount(account, function (err, nonce) {
     console.log("nonce value is ", nonce);

     const functionAbi = contract.methods.signDocument(String(name), String(doc)).encodeABI();

     var details = {
       "nonce": nonce,
       "gasPrice": web3Provider.utils.toHex(web3Provider.utils.toWei('47', 'gwei')),
       "gas": 300000,
       "to": address,
       "value": 0,
       "data": functionAbi,
     };

     const transaction = new EthereumTx(details);
     transaction.sign(Buffer.from(pk, 'hex'));
     var rawData = '0x' + transaction.serialize().toString('hex');

     web3Provider.eth.sendSignedTransaction(rawData)

     .on('transactionHash', function(hash) {
     console.log(['transferToStaging Trx Hash:' + hash]);
     })
     .on('receipt', function(receipt){
     console.log(['transferToStaging Receipt:', receipt]);
     })
     .on('error', console.error);
   });
  }

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

  function logEvents(contract) {
    console.log(`Listening Transfer events`);
    contract.events
        .signAdded()
        .on("data", (event) => {
        document.getElementById("log").innerHTML += `
                <tr class="table-success">
                  <td class="table-success">${event.transactionHash}</td>
                  <td class="table-success">${event.returnValues.name}</td>
                  <td class="table-success">${event.returnValues.document}</td>
                  <td class="table-success">${getDate(event.returnValues.timestamp)}</td>
                  <td class="table-success">${getTime(event.returnValues.timestamp)}</td>
                </tr>
        `;
        console.log(event);
        })
        .on("error", (error) => console.log(error));
  }

  async function handleSign(event, doc) {
    event.preventDefault();
    if(name !== "") {
      const response = await contract.methods.getSignedDocuments(name).call();
      var alreadySigned = false;
      if(response.length !== 0) {
        for (let i = 0; i < response.length; i++) {
          if (response[i].document === doc) {
            alreadySigned = true;
            alert(doc + " already signed.")
          }
        }
      }
      if(!alreadySigned) {
        var x = document.getElementById("showDocs");
        if(name !== showName){
          setShowSignedDocs(false);
          x.innerHTML = "";
        }
        await signTransaction(name, doc);
        setSignMap([...signMap, {name: name, document: doc}]);
        if(showSignedDocs && name === showName) {
          const response = await contract.methods.getSignedDocuments(name).call();
          x.innerHTML += `
            <li class="list-group-item list-group-item-primary">${response[response.length - 1].document}</li>
          `;
        }
      }
    } else {
      alert("Enter username!");
    }
  }

  async function handleShow(){
    if (showSignedDocs === false) {
      if(name !== "") {
        setShowName(name);
        const response = await contract.methods.getSignedDocuments(name).call();
        if(response.length !== 0) {
          var x = document.getElementById("showDocs");
          for (let i = 0; i < response.length; i++) {
            x.innerHTML += `
              <li class="list-group-item list-group-item-primary">${response[i].document}</li>
            `;
          }
        } else {
          alert("No documents signed!");
        }
        setShowSignedDocs(true);
      } else {
        alert("Enter username!");
      }
    } else {
      var x = document.getElementById("showDocs");
      x.innerHTML = "";
      setShowSignedDocs(false);
    }
  }

  if (!web3Provider) {
    return <p>Loading web3, contract, accounts ...</p>
  }

  const showDocsList = showSignedDocs;

  return (

      <>
      <NavBarUser></NavBarUser>
      <div className="about-section" width="100%">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
      </div>
        <div className="container">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>Document 1</td>
                <td>
                  <button type="submit" className="btn btn-primary" onClick={(e) => handleSign(e, "Document 1")}>Sign</button>
                </td>
              </tr>
              <tr>
                <td>Document 2</td>
                <td>
                  <button type="submit" className="btn btn-primary" onClick={(e) => handleSign(e, "Document 2")}>Sign</button>
                </td>
              </tr>
              <tr>
                <td>Document 3</td>
                <td>
                  <button type="submit" className="btn btn-primary" onClick={(e) => handleSign(e, "Document 3")}>Sign</button>
                </td>
              </tr>
            </tbody>
          </table>
          <ul className="list-group">
            { showDocsList
              ? <button type="show" className="btn btn-primary" onClick={(e) => handleShow()}>Hide signed documents</button>
              : <button type="show" className="btn btn-primary" onClick={(e) => handleShow()}>Show signed documents</button>
            }
            <div id="showDocs" className="my-3"></div>
          </ul>
          <div className="card border-secondary mb-3">
            <div className="card-header">Account</div>
            <div className="card-body text-secondary">
              <h5 className="card-title">{account}</h5>
              <p className="card-text">Balance: {accountBalance} ETH</p>
            </div>
          </div>
          <table className="table border">
            <thead>
              <tr>
                <th scope="col">Hash</th>
                <th scope="col">User</th>
                <th scope="col">Document</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody id="log"></tbody>
          </table>
      </div>
      <Footer></Footer>
      </>
  );
}
