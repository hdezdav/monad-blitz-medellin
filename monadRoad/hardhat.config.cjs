/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun"
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./src/artifacts"
  }
};
