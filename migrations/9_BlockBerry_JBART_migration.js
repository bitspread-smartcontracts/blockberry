const JBART = artifacts.require("JBART");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		JBART,
		"BlockBerry JBART Token",
		"JBART",
		web3.utils.toWei("1000000", "ether")
	);
};