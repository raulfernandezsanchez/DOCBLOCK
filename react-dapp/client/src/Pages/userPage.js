import React, {useState} from "react";
import emailjs from 'emailjs-com';
import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";
import "../css/companyPage.css";

import DocBlockContract from "./../contracts/DocBlock.json";
import getWeb3 from "./../getWeb3";
import Deploy from "./../deploy.json"

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
    const [name, setName] = useState('');
    const [userContracts, setUserContracts] = useState('');

    // loaded contracts
    const [foundContracts, setFoundContracts] = useState('');

    //popup de contrato
    //const [buttonPopupInfo, setButtonPopupInfo] = useState(false);
    const [popupContract, setPopupContract] = useState('');
    const [minVal] = useState(1000000);
    const [maxVal] = useState(1000000000);
    const [randomNum, setRandomNum] = useState(0);
    const fileContent = localStorage.getItem('contractContent');

    //web3
    const [web3Provider, setWeb3Provider] = useState('');
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState('');
    const [accountBalance, setAccountBalance] = useState('');
    const [signMap, setSignMap] = useState('');

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
           setName(data.user.name);
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
          
          connectWeb3();

       }, []);

    const generateRandomNum = () =>{
        let newVal = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        setRandomNum(newVal);
        console.log(newVal)
    };
    window.onload = () =>{
        generateRandomNum();
    };
    //para debugar
    let mail = 'infodocblock@gmail.com';

    const sendEmail = (e) =>{
        const firstNameInput = document.getElementById('signInput');
        const modalSigned = document.getElementById('signModal');
        modalSigned.hidden = false;
        firstNameInput.disabled = false;
        var templateParams = {
            user_email: mail, //user.mail,
            number: randomNum,
            contract: popupContract
        };

        e.preventDefault();
        emailjs.send('Docblock_support', 'Signature_template', templateParams, 'XWMGER03w0eoay02e').then((result) =>{
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    function handleContractInfo(event, contractID) {
        event.preventDefault();
        setPopupContract(contractID);
        //sendEmail(event);
    };

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

    function getPastLog(contract) {
      console.log(`Returns all the past events`);

      contract.getPastEvents("signAdded", {fromBlock: 0}, (error, events) => {
        if(!error) {
          let list = document.getElementById("contracts-list");
          for(let i = 0; i < events.length; ++i) {
            let event = events[i];
            list.innerHTML += `
              <tr>
                <td class="user-id">${event.returnValues.document}</td>
                <td class="user-name" style="width:62.2%"><span class="c-pill c-pill--success">Signed</span></td>
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
          document.getElementById("contracts-list").innerHTML += `
            <tr>
              <td class="user-id">${event.returnValues.document}</td>
              <td class="user-name" style="width:62.2%"><span class="c-pill c-pill--success">Signed</span></td>
            </tr>
          `;
          console.log(event);
          })
          .on("error", (error) => console.log(error));
    }


    async function handleSign(event, doc) {
        event.preventDefault();
        const signInput = document.getElementById('signInput');
        if (parseInt(signInput.value,10) !== randomNum){
          alert('Wrong number, try again');
          console.log(randomNum);
        }
        else{
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
            var x = document.getElementById("contracts-list");
            await signTransaction(name, doc);
            setSignMap([...signMap, {name: name, document: doc}]);
            const modalSigned = document.getElementById('signModal');
            alert('Successfully signed');
            modalSigned.hidden = true;
            signInput.disabled = true;
          }
        }
        signInput.value = '';
    };

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
                        <tr key={contract}>
                          <td className="user-id">{contract}</td>
                          <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
                          <td>
                            <div className="col d-flex justify-content-center">
                                <button className="button" variant="primary" data-bs-toggle="modal" data-bs-target="#multifactor" onClick={(e) => handleContractInfo(e, contract)}>Sign</button>
                                <div className="modal fade " id="multifactor" tabIndex="-1" aria-labelledby="multifactor" aria-hidden="true">
                                    <div className="modal-dialog modal-xl">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="multifactor">Sign {popupContract}</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={generateRandomNum}></button>
                                            </div>
                                            <div className="modal-body" >
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <p>Enter the code from your email:</p>
                                                        <input type='number' id='signInput'/>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        {fileContent ? <iframe src={fileContent} title='PDF' width='100%' height={window.innerHeight*0.8}></iframe> : <></>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={generateRandomNum}>Close</button>
                                                <button type="button" id='signModal' className="btn btn-primary" hidden={false} onClick={(e) => handleSign(e, popupContract)}>Confirm signature</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">No pending contracts!</td>
                      </tr>
                    )}
                  </tbody>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                    </thead>
                    <tbody id="contracts-list">
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
