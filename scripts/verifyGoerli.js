const { verify } = require("../utils/verify")

const goerliAddress = "0x441E9B7CBD651A4C3469A5B52C87D6D7141532e0"
const args = []

verify(goerliAddress, args)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
