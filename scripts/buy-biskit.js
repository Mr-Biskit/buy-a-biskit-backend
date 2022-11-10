const hre = require("hardhat")

async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address)
    return hre.ethers.utils.formatEther(balanceBigInt)
}

async function printBalances(addresses) {
    let idx = 0
    for (const address of addresses) {
        console.log(`Address ${idx} balance: `, await getBalance(address))
        idx++
    }
}

async function printMemos(memos) {
    for (const memo of memos) {
        const timestamp = memo.timestamp
        const sender = memo.name
        const senderAddress = memo.from
        const message = memo.message
        console.log(`At ${timestamp}, ${sender} (${senderAddress}) said: "${message}"`)
    }
}

async function main() {
    const [owner, sender, sender2, sender3] = await hre.ethers.getSigners()

    const BuyABiskit = await hre.ethers.getContractFactory("BuyABiskit")
    const buyABiskit = await BuyABiskit.deploy()

    await buyABiskit.deployed()
    console.log("buyABiskit deployed to:", buyABiskit.address)

    const addresses = [owner.address, sender.address, buyABiskit.address]
    console.log("== start ==")
    await printBalances(addresses)

    const tip = { value: hre.ethers.utils.parseEther("1") }
    await buyABiskit.connect(sender).buyBiskit("Jack", "An NFT for cafe loyalty cards", tip)
    await buyABiskit.connect(sender2).buyBiskit("Chris", "A DAO for turtle rescue", tip)
    await buyABiskit.connect(sender3).buyBiskit("Steve", "PoA for techno festivals", tip)

    console.log("== bought biskit ==")
    await printBalances(addresses)

    await buyABiskit.connect(owner).withdraw()

    console.log("== withdrawTips ==")
    await printBalances(addresses)

    console.log("== memos ==")
    const memos = await buyABiskit.getMemos()
    printMemos(memos)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
