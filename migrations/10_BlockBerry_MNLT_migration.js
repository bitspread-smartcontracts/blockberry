const MNLT = artifacts.require("MNLT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		MNLT,
		"BlockBerry MNLT Token",
		"MNLT",
		web3.utils.toWei("1000000", "ether")
	);
};