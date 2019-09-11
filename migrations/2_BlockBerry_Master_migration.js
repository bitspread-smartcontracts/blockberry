const BLB = artifacts.require("BLB");

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(
		BLB,
		"BlockBerry BLB Token",
		"BLB",
		web3.utils.toWei("100000000", "ether")
	);
};