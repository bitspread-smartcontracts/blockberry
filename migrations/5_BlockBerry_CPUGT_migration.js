const CPUGT = artifacts.require("CPUGT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		CPUGT,
		"BlockBerry CPUGT Token",
		"CPUGT",
		web3.utils.toWei("1000000", "ether")
	);
};