const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("Buy A Biskit Unit Tests", function () {
    let biskit, deployer

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        biskit = await ethers.getContract("BuyABiskit", deployer)
    })

    describe("buyBigBiskit() functionality", function () {
        it("Should revert if 0.005 is not sent", async function () {
            const tx = biskit.buyBigBiskit("Name", "Message", {
                value: ethers.utils.parseEther("0.00001"),
            })
            await expect(tx).to.be.revertedWith("Please enter minimum amount")
        })
    })

    describe("buyBiskit() functionality", function () {
        it("Should revert if 0.001 is not sent", async function () {
            const tx = biskit.buyBiskit("Name", "Message", {
                value: ethers.utils.parseEther("0.0001"),
            })
            await expect(tx).to.be.revertedWith("Please enter minimum amount")
        })
    })

    describe("changeOwner() functionailty", function () {
        it("Should only allow the owner to call this function", async function () {
            const accounts = await ethers.getSigners()
            const alienAcc = accounts[1]
            const user = await biskit.connect(alienAcc)
            await expect(
                user.changeOwner("0x532B8A5646759b0E4B87C2825412CBe072402Bd5")
            ).to.be.revertedWith("CallerNotOwner")
        })
    })
})
