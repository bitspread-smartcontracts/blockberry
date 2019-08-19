const CPUST = artifacts.require("CPUST");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		CPUST,
		"BlockBerry CPUST Token",
		"CPUST",
		web3.utils.toWei("1000000", "ether")
	);
};