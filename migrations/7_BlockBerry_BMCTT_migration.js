const BMCTT = artifacts.require("BMCTT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		BMCTT,
		"BlockBerry BMCTT Token",
		"BMCTT",
		web3.utils.toWei("1000000", "ether")
	);
};