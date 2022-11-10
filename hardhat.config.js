require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const GOERLI_RPC_URL = process.env.GOERLI_URL
const ETHERSCAN = process.env.ETHERSCAN_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        goerli: {
            chainId: 5,
            blockConfirmations: 2,
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        localhost: {
            chainId: 31337,
        },
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN,
        },
        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                    apiURL: "https://api-goerli.etherscan.io/api",
                    browserURL: "https://goerli.etherscan.io",
                },
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
