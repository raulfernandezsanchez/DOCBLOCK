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
    if(this.state.name != "") {
      await contract.methods.sign(this.state.name, doc).send({from: this.state.accounts});
      const response = await contract.methods.get(this.state.name, 0).call();
      this.setState({signMap: [...this.state.signMap, {name: this.state.name, document: response}]});
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
            <li className="list-group-item">Log</li>
            { this.state.signMap.map((doc, key) => {
              return(
                <div key={key}>
                  <li className="content list-group-item list-group-item-success">{doc.name} has signed {doc.document}</li>
                </div>
              )
            })}
          </ul>
      </div>
    </div>
    );
  }
}

export default App;
