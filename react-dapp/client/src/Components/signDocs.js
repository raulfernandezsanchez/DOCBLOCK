import React, { Component } from "react";
import '../css/styles.css';

import Footer from "../Components/footer";
import NavBar from "../Components/navbar";

import DocBlockContract from "./../contracts/DocBlock.json";
import getWeb3 from "./../getWeb3";

import Deploy from "./../deploy.json"

const acc = Deploy.account; //account
const pk  = Deploy.private_key;  // private key of your account
const address = Deploy.contract_address; //Contract Address

class SignDocs extends Component {

  state = {
    web3Provider: null,
    account: null,
    contract: null,
    name: "",
    signMap: [],
    showName: "",
    showSignedDocs: false,
    accountBalance: null
  };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleSign = this.handleSign.bind(this);

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
      this.setState({ accountBalance: ethBalance });

      // Set web3, account, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3Provider: web3, account: acc, contract: instance });
      this.getPastLog(instance);
      this.logEvents(instance);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, account, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  signTransaction(name, doc) {
    const EthereumTx = require('ethereumjs-tx').Transaction;
    const web3 = this.state.web3Provider;
    const contract = this.state.contract;

    web3.eth.getTransactionCount(this.state.account, function (err, nonce) {
      console.log("nonce value is ", nonce);

      const functionAbi = contract.methods.signDocument(String(name), String(doc)).encodeABI();

      var details = {
        "nonce": nonce,
        "gasPrice": web3.utils.toHex(web3.utils.toWei('47', 'gwei')),
        "gas": 300000,
        "to": address,
        "value": 0,
        "data": functionAbi,
      };

      const transaction = new EthereumTx(details);
      transaction.sign(Buffer.from(pk, 'hex'));
      var rawData = '0x' + transaction.serialize().toString('hex');

      web3.eth.sendSignedTransaction(rawData)

      .on('transactionHash', function(hash) {
      console.log(['transferToStaging Trx Hash:' + hash]);
      })
      .on('receipt', function(receipt){
      console.log(['transferToStaging Receipt:', receipt]);
      })
      .on('error', console.error);
    });
  }

  getDate(timestamp) {
    let t = new Date(timestamp * 1000);
    return ('0' + t.getDate()).slice(-2) + '/' + ('0' + (t.getMonth() + 1) ).slice(-2) + '/' + (t.getFullYear());

  }

  getTime(timestamp) {
    let t = new Date(timestamp * 1000);
    return ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2);
  }

  getPastLog(contract) {
    console.log(`Returns all the past events`);
    //const {account, contract } = this.state;

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
                    <td class="table-success">${this.getDate(event.returnValues.timestamp)}</td>
                    <td class="table-success">${this.getTime(event.returnValues.timestamp)}</td>
                  </tr>
          `;
        }
        console.log(events);
      } else {
        console.log(error);
      } });
  }

  logEvents(contract) {
    console.log(`Listening Transfer events`);
    //const {account, contract } = this.state;
    contract.events
        .signAdded()
        .on("data", (event) => {
        document.getElementById("log").innerHTML += `
                <tr class="table-success">
                  <td class="table-success">${event.transactionHash}</td>
                  <td class="table-success">${event.returnValues.name}</td>
                  <td class="table-success">${event.returnValues.document}</td>
                  <td class="table-success">${this.getDate(event.returnValues.timestamp)}</td>
                  <td class="table-success">${this.getTime(event.returnValues.timestamp)}</td>
                </tr>
        `;
        console.log(event);
        })
        .on("error", (error) => console.log(error));
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  async handleSign(event, doc) {
    event.preventDefault();
    const {account, contract } = this.state;
    if(this.state.name !== "") {
      const response = await contract.methods.getSignedDocuments(this.state.name).call();
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
        if(this.state.name !== this.state.showName){
          this.state.showSignedDocs = false;
          x.innerHTML = "";
        }
        await this.signTransaction(this.state.name, doc);
        this.setState({signMap: [...this.state.signMap, {name: this.state.name, document: doc}]});
        if(this.state.showSignedDocs && this.state.name === this.state.showName) {
          const response = await contract.methods.getSignedDocuments(this.state.name).call();
          x.innerHTML += `
            <li class="list-group-item list-group-item-primary">${response[response.length - 1].document}</li>
          `;
        }
      }
    } else {
      alert("Enter username!");
    }
  }

  async handleShow(){
    const {account, contract } = this.state;
    if (this.state.showSignedDocs === false) {
      if(this.state.name !== "") {
        this.setState({showName: this.state.name});
        const response = await contract.methods.getSignedDocuments(this.state.name).call();
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
        this.setState({showSignedDocs: true});
      } else {
        alert("Enter username!");
      }
    } else {
      var x = document.getElementById("showDocs");
      x.innerHTML = "";
      this.setState({showSignedDocs: false});
    }
  }

  render() {
    if (!this.state.web3Provider) {
      return <div>Loading Web3, account, and contract...</div>;
    }

    const showDocsList = this.state.showSignedDocs;

    return (
        <>
        <div className="App">
          <div className="container">
            <div className="form-row">
              <div className="form-group my-5">
                <label htmlFor="username">Username</label>
                <input type="email" className="form-control" id="username" value={this.state.name} onChange={this.handleChange.bind(this)} placeholder="Enter username"/>
              </div>
            </div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Document 1</td>
                  <td>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSign(e, "Document 1")}>Sign</button>
                  </td>
                </tr>
                <tr>
                  <td>Document 2</td>
                  <td>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSign(e, "Document 2")}>Sign</button>
                  </td>
                </tr>
                <tr>
                  <td>Document 3</td>
                  <td>
                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSign(e, "Document 3")}>Sign</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <ul className="list-group">
              { showDocsList
                ? <button type="show" className="btn btn-primary" onClick={(e) => this.handleShow()}>Hide signed documents</button>
                : <button type="show" className="btn btn-primary" onClick={(e) => this.handleShow()}>Show signed documents</button>
              }
              <div id="showDocs" className="my-3"></div>
            </ul>
            <div className="card border-secondary mb-3">
              <div className="card-header">Account</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">{this.state.account}</h5>
                <p className="card-text">Balance: {this.state.accountBalance} ETH</p>
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
      </div>
      </>
    );
  }
} export default SignDocs;
