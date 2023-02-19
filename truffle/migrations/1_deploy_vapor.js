const Vapor = artifacts.require("MultiChainSwapUniV2");

module.exports = async function (deployer, network) {
  if (network == "mumbai") {
    deployer.deploy(Vapor, "0x000054d3A0Bc83Ec7808F52fCdC28A96c89F6C5c", "0x000080383847bd75f91c168269aa74004877592f", "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
  } else if (network == "goerli") {
    console.log("Deploying to goerli")
    deployer.deploy(Vapor, "0x00007d0BA516a2bA02D77907d3a1348C1187Ae62", "0xCc7bb2D219A0FC08033E130629C2B854b7bA9195", "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D")
  } else if (network == "bnb_testnet") {
    console.log("Deploying to bnb testnet")
    deployer.deploy(Vapor, "0x000054d3A0Bc83Ec7808F52fCdC28A96c89F6C5c","0x000080383847bd75f91c168269aa74004877592f", "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3")
  }
};
