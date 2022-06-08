import React, {useState} from "react";
import getWeb3 from "./../getWeb3";

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";
import DocBlockContract from "./../contracts/DocBlock.json";
import Deploy from "./../deploy.json"

function ValidationPage(){
    const [searchShow, setSearchShow] = useState(false);
    const [searchField, setSearchField] = useState("");

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState();
    const [userContracts, setUserContracts] = useState('');

    const [web3Provider, setWeb3Provider] = useState('');
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [signMap, setSignMap] = useState('');
    const [showName, setShowName] = useState('');
    const [showSignedDocs, setShowSignedDocs] = useState(false);
    const [smartContract, setSmartContract] = useState();

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

        setSmartContract(instance);
        let ethBalance = await web3.eth.getBalance(acc);
        ethBalance = web3.utils.fromWei(ethBalance, 'ether');
        setAccountBalance(ethBalance);

        // Set web3, account, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setWeb3Provider(web3);
        setAccount(acc);
        setContract(instance);
        //getPastLog(instance);

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
       if(searchField !== '') setSearchShow(true);
       fetch("https://vast-peak-05541.herokuapp.com/api/users/", {
           method:'GET',
           headers:{
               "Content-Type":'application/json',
           }
       }).then(response => response.json())
         .then(data => {
         });

         connectWeb3();

       }, []);

    function getMyUser(arr) {
       const myuser = arr.filter(user => user._id == searchField);
       setUser(myuser[0].name)
       return myuser[0];
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
            if(event.returnValues.name == name) {
              log.innerHTML = `
                      <tr class="table-success">
                        <td class="table-success">${event.transactionHash}</td>
                        <td class="table-success">${event.returnValues.document}</td>
                        <td class="table-success">${getDate(event.returnValues.timestamp)}</td>
                        <td class="table-success">${getTime(event.returnValues.timestamp)}</td>
                      </tr>
              `;
            }
          }
          console.log(events);
        } else {
          console.log(error);
        } });
    }


    function handleSearch() {
      if(searchField !== '') setSearchShow(true);
      getPastLog(smartContract);
    };

    function changeSubmit(e){
        setSearchField(e.target.value)
        setSearchShow(false);
        fetch("https://vast-peak-05541.herokuapp.com/api/users/", {
            method:'GET',
            headers:{
                "Content-Type":'application/json',
            }
        }).then(response => response.json())
          .then(data => {
            let my_user = getMyUser(data);
            setName(my_user.name);
          });
    };

    return (
        <>
        <NavBar></NavBar>
        <div id="validation" style={{'textAlign': 'center'}}>
            <h4>Enter an ID to validate a candidate experience</h4>
            <input onChange={changeSubmit} placeholder="User code" size="30"></input>
            <br/><br/>
            <button type='submit' onClick={handleSearch} className="btn btn-primary btn-block">Search</button>
            <br/><br/><br/><br/>
        </div>
        <div style={{'textAlign': 'center'}}>
            {searchShow ? (<h2>{name}'s profile</h2>) : (<p></p>)}
        </div>
        <div className="row mx-5 my-5">
          <div className="col-lg-12">
            <div className="main-box clearfix">
              <div className="table-responsive">
                <table className="table user-list">
                  <thead>
                    <tr>
                      <th><span>Hash</span></th>
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
} export default ValidationPage;
