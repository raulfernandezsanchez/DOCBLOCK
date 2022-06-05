const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "galaxy boat reopen scout session bitter patch absorb belt hurdle code child";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/74d79952ad504146a3e261f3427b8d63", 0)
      },
      network_id: 3,
      gas: 7000000,
      gasPrice: 1000,
    }
  },
  compilers: {
    solc: {
      version: "0.6",
    }
  }
};
