const BLB = artifacts.require("BLB");
contract("BlockBerry BLB Trial Test", async accounts => {
	let jordan = accounts[0];
	let ritika = accounts[1];
	it("initial supply is 0", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 0);
	});
	it("initial cap is 1 million (Ether units)", async () => {
		let bb = await BLB.deployed();
		let cap = await bb.cap();
		assert.equal(web3.utils.fromWei(cap, "ether"), 1000000);
	});
	it("initial owner is jordan", async () => {
		let bb = await BLB.deployed();
		let owner = await bb.owner();
		assert.equal(owner, jordan);
	});
	it("new owner is ritika", async () => {
		let bb = await BLB.deployed();
		await bb.transferOwnership(ritika, { from: accounts[0] });
		let owner = await bb.owner();
		assert.equal(owner, ritika);
	});
	it("ritika mints 1 million (Ether units)", async () => {
		let bb = await BLB.deployed();
		await bb.mint(web3.utils.toWei("1000000", "ether"), { from: ritika });
	});
	it("new supply is 1 million (Ether units)", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 1000000);
	});
	it("ritika cannot mint an additional 1 million (Ether units) because cap has been reached", async () => {
		try {
			let bb = await BLB.deployed();
			await bb.mint(web3.utils.toWei("1000000", "ether"), { from: ritika });
			assert(false);
		} catch (e) {
			assert(e.toString().includes("Cap exceeded"));
		}
	});
	it("ritika burns 0.5 million (Ether units)", async () => {
		let bb = await BLB.deployed();
		await bb.burn(web3.utils.toWei("500000", "ether"), { from: ritika });
	});
	it("new supply is 0.5 million (Ether units)", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 500000);
	});
	it("jordan cannot mint any coins because he is no longer the owner", async () => {
		try {
			let bb = await BLB.deployed();
			await bb.mint(web3.utils.toWei("500000", "ether"), { from: jordan});
			assert(false);
		} catch (e) {
			assert(e.toString().includes("caller is not the owner"));
		}
	});
});