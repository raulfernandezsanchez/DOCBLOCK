import React, { Component } from "react";
import DocBlockContract from "./contracts/DocBlock.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null, name: "", signMap: [], newSignature: { name: "", document: "" } };

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleSign = this.handleSign.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DocBlockContract.networks[networkId];
      const instance = new web3.eth.Contract(
        DocBlockContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts: accounts[0], contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  async handleSign(event, doc) {
    event.preventDefault();
    const {accounts, contract } = this.state;
    if(this.state.name !== "") {
      const response = await contract.methods.get(this.state.name).call();
      var alreadySigned = false;
      if(response.length !== 0) {
        for (var i=0; i<response.length; i++) {
          if (response[i].document === doc) {
            alreadySigned = true;
            alert(doc + " already signed.")
          }
        }
      }
      if(!alreadySigned) {
        await contract.methods.sign(this.state.name, doc).send({from: this.state.accounts});
        this.setState({signMap: [...this.state.signMap, {name: this.state.name, document: doc}]});
      }
    }
  }

  async handleShow(){
    const {accounts, contract } = this.state;
    if(this.state.name !== "") {
      const response = await contract.methods.get(this.state.name).call();
      if(response.length !== 0) {
        var x = document.getElementById("showDocs");
        x.innerHTML = "Documents signed: <br>";
        for (var i=0; i<response.length; i++) {
          x.innerHTML += response[i].document
          x.innerHTML += "<br>";
        }
      }
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="container">
          <h1>Welcome to DocBlock!</h1>
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
            <li className="list-group-item">{this.state.name}'s Log</li>
          </ul>
          <button type="show" className="btn btn-primary" onClick={(e) => this.handleShow()}>Show</button>
          <div id="showDocs">
          </div>
      </div>
    </div>
    );
  }
}

export default App;
