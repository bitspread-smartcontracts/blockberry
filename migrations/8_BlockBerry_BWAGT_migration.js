const BWAGT = artifacts.require("BWAGT");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		BWAGT,
		"BlockBerry BWAGT Token",
		"BWAGT",
		web3.utils.toWei("1000000", "ether")
	);
};