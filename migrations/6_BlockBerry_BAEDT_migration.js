const BAEDT = artifacts.require("BAEDT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		BAEDT,
		"BlockBerry BAEDT Token",
		"BAEDT",
		web3.utils.toWei("1000000", "ether")
	);
};