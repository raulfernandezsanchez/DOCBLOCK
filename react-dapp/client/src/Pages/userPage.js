import React, {useState} from "react";
import emailjs from 'emailjs-com';
import Footer from "../Components/footer";
import NavBarUser from "../Components/navbaruser";
import Popup from "../Components/popup"
import "../css/companyPage.css";

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import DocBlockContract from "./../contracts/DocBlock.json";
import getWeb3 from "./../getWeb3";
import Deploy from "./../deploy.json"


export default function UserPage(){

    const userID = localStorage.getItem('userID');

    // user
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [userContracts, setUserContracts] = useState('');
    const [userSignedContracts, setUserSignedContracts] = useState([]);
    const [renderPending, setRenderPending] = useState(false);

    //popup de contrato
    const [buttonPopup, setButtonPopup] = useState(false);
    const [popupContract, setPopupContract] = useState('');
    const [minVal] = useState(1000000);
    const [maxVal] = useState(1000000000);
    const [randomNum, setRandomNum] = useState(0);
    const [fileContent, setFileContent] = useState();

    //web3
    const [web3Provider, setWeb3Provider] = useState('');
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState('');
    const [accountBalance, setAccountBalance] = useState('');

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
        const userName = localStorage.getItem('userName');
        setTimeout(() => {
          getPastLog(instance, userName)
          setTimeout(() => setRenderPending(true), "100")
        }, "500")
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
             localStorage.setItem('userName', data.user.name);
             setUserContracts(data.user.assignedContracts);
        });

        connectWeb3();

    }, []);

    const generateRandomNum = () =>{
        let newVal = Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
        setRandomNum(newVal);
        numRand = newVal;
        console.log(newVal)
    };

    //para debugar
    let mail = 'infodocblock@gmail.com';
    let numRand = 0;

    const sendEmail = (e, contractID) =>{
        var templateParams = {
            user_email: mail, //user.email,
            number: numRand,
            contract: contractID
        };

        e.preventDefault();
        emailjs.send('Docblock_support', 'Signature_template', templateParams, 'XWMGER03w0eoay02e').then((result) =>{
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    function closePopup(event) {
        event.preventDefault();
        setButtonPopup(false);
    };

    async function handleContractInfo(event, contractID) {
            event.preventDefault();
            setButtonPopup(true);
            setPopupContract(contractID);
            generateRandomNum();
            sendEmail(event, contractID);
            let result = await fetch("https://vast-peak-05541.herokuapp.com/api/contracts/" + contractID, {
                method:'GET',
                headers:{
                    "Content-Type":'application/json',
                }
            });
            const data = await result.json();
            setFileContent(data.company.contractPDF);
    };

    function notAlreadySignedContract(doc) {
      for (let i = 0; i < userSignedContracts.length; ++i) {
        if (userSignedContracts[i] === doc) {
          return false;
        }
      }
      return true;
    }

    function signTransaction(name, doc) {
      const EthereumTx = require('ethereumjs-tx').Transaction;

      web3Provider.eth.getTransactionCount(account, function (err, nonce) {
        //console.log("nonce value is ", nonce);
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

    function getPastLog(contract, username) {
      console.log("Loading signed documents.");

      contract.getPastEvents("signAdded", {fromBlock: 0}, (error, events) => {
        if(!error) {
          let list = document.getElementById("contracts-list");
          for(let i = 0; i < events.length; ++i) {
            let event = events[i];
            if (event.returnValues.name === username) {
              list.innerHTML += `
              <tr>
                <td class="user-id">${event.returnValues.document}</td>
                <td class="user-name" style="width:62.5%"><span class="c-pill c-pill--success">Signed</span></td>
              </tr>
            `;
            }
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
          setUserSignedContracts(userSignedContracts.push(event.returnValues.document))
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

            // To sign contract with MetaMask:
            await contract.methods.signDocument(name, doc).send({from: account});

            // To sign contract without Metamask:
            //await signTransaction(name, doc);

            var pendingContracts = userContracts.filter(x => {
              return x != doc;
            })
            setUserContracts(pendingContracts);

            let remove_contract = {
              userassignedContracts : doc
            }

            //remove pending contract
            fetch("https://vast-peak-05541.herokuapp.com/api/users/" + user._id + "/deletecontract", {
                body: JSON.stringify(remove_contract),
                method:'PUT',
                headers:{
                    "Content-Type":'application/json',
                }
            }).then(response => response.json())
              .then(data => {
                console.log(data);
              });

            setButtonPopup(false);

            Store.addNotification({
              message: doc + " signed successfully!",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });

          }
        }

    };

    return (
        <>
        <NavBarUser></NavBarUser>
        <ReactNotifications/>
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
                    {userContracts && userContracts.length && renderPending > 0 ? (
                      userContracts.map((contract) => (
                          <tr key={contract}>
                            <td className="user-id">{contract}</td>
                            <td className="user-name"><span className="c-pill c-pill--warning">Pending</span></td>
                            <td>
                              <button className="button" variant="primary" onClick={(e) => handleContractInfo(e, contract)}>Sign</button>
                            </td>
                          </tr>
                      ))
                    ) : (
                      <tr>
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
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <h4>Sign {popupContract}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                  <p>Enter the code from your email:</p>
                  <input type='text' id='signInput'/>
              </div>
              <div className="col-sm-8">
                  {fileContent ? <iframe src={fileContent} title='PDF' width='100%' height={window.innerHeight*0.8}></iframe> : <></>}
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mx-2" onClick={(e) => closePopup(e)}>Close</button>
                <button type="button" className="btn btn-primary" hidden={false} onClick={(e) => handleSign(e, popupContract)}>Confirm signature</button>
              </div>
            </div>
          </Popup>
        </>
    );
}
