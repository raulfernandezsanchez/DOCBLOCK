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
    await contract.methods.sign(this.state.name, doc).send({from: this.state.accounts});
    console.log("iepa");
    const response = await contract.methods.get(this.state.name, 0).call();
    this.setState({signMap: [...this.state.signMap, {name: this.state.name, document: response}]});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Welcome to DocBlock!</h1>
        <form onSubmit={this.handleChange}>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={this.state.name} onChange={this.handleChange.bind(this)}/>
        </form>
        <div> {this.state.newSignature.name} has signed {this.state.newSignature.document}</div>
        <form onSubmit={(e) => this.handleSign(e, "Document1")}>
          <p>Document 1</p>
          <button type="submit">Sign</button>
        </form>
        <form onSubmit={(e) => this.handleSign(e, "Document2")}>
          <p>Document 2</p>
          <button type="submit">Sign</button>
        </form>

        <ul id="signDocs" className="list-unstyled">
          { this.state.signMap.map((doc, key) => {
            return(
              <div key={key}>
                <span className="content">{doc.name} has signed {doc.document}</span>
              </div>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
