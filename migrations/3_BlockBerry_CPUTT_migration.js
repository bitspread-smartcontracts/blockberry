const CPUTT = artifacts.require("CPUTT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		CPUTT,
		"BlockBerry CPUTT Token",
		"CPUTT",
		web3.utils.toWei("1000000", "ether")
	);
};