import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  plugins: [hardhatEthers],
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "prague"
    }
  },
  networks: {
    monadTestnet: {
      type: "http",
      url: "https://testnet-rpc.monad.xyz",
      chainId: 10143,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./src/artifacts"
  }
};
