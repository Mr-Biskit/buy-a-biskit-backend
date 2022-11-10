const { verify } = require("../utils/verify")
const { network, ethers } = require("hardhat")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const buyABiskit = await deploy("BuyABiskit", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (network.config.chainId === 5 && process.env.ETHERSCAN_KEY) {
        log("Verifying....")
        await verify(buyABiskit.address, [])
    }
    log("-------------------------------------------------------------------")
}

module.exports.tags = ["all", "main"]
