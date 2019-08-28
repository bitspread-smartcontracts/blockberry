const BLB = artifacts.require("BLB");
contract("BlockBerry BLB Trial Test", async accounts => {
	let jordan = accounts[0];
	let ritika = accounts[1];
	let cedric = accounts[2];
	let jordanTwo = accounts[3];
	it("initial supply is 0", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 0);
	});
	it("initial cap is 1 million", async () => {
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
	it("ritika mints 1 million", async () => {
		let bb = await BLB.deployed();
		await bb.mint(web3.utils.toWei("1000000", "ether"), { from: ritika });
	});
	it("new supply is 1 million", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 1000000);
	});
	it("ritika cannot mint an additional 1 million because cap has been reached", async () => {
		try {
			let bb = await BLB.deployed();
			await bb.mint(web3.utils.toWei("1000000", "ether"), { from: ritika });
			assert(false);
		} catch (e) {
			assert(e.toString().includes("Cap exceeded"));
		}
	});
	it("ritika burns 0.5 million", async () => {
		let bb = await BLB.deployed();
		await bb.burn(web3.utils.toWei("500000", "ether"), { from: ritika });
	});
	it("new supply is 0.5 million", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), 500000);
	});
	it("jordan cannot mint any coins because he is no longer the owner", async () => {
		try {
			let bb = await BLB.deployed();
			await bb.mint(web3.utils.toWei("500000", "ether"), { from: jordan });
			assert(false);
		} catch (e) {
			assert(e.toString().includes("caller is not the owner"));
		}
	});
	it("ritika tries to transfer 10 million to cedric which will fail as ritika only has 0.5 million", async () => {
		try {
		let bb = await BLB.deployed();
		let transfer = await bb.transfer(cedric, web3.utils.toWei("10000000", "ether"), { from: ritika })
		assert(false);
		} catch (e) {
			assert(e.toString().includes("overflow"));
		}
	});
	it("ritika transfers 0.1 million to cedric", async () => {
		let bb = await BLB.deployed();
		let transfer = await bb.transfer(cedric, web3.utils.toWei("100000", "ether"), { from: ritika })
		assert(transfer);
	});
	it("ritika approves 0.1 million to jordan", async () => {
		let bb = await BLB.deployed();
		let approval = await bb.approve(jordan, web3.utils.toWei("100000", "ether"), { from: ritika })
		assert(approval);
	});
	it("after approval, jordan transfers 0.1 million from ritika's account to his own account", async () => {
		let bb = await BLB.deployed();
		let transfer = await bb.transferFrom(ritika, jordan, web3.utils.toWei("100000", "ether"), { from: jordan })
		assert(transfer);
	});
	it("ritika calls increaseAllowance of 0.3 million to cedric", async () => {
		let bb = await BLB.deployed();
		let approval = await bb.increaseAllowance(cedric, web3.utils.toWei("300000", "ether"), { from: ritika })
		assert(approval);
	});
	it("cedric's allowance to spend from ritika is 0.3 million", async () => {
		let bb = await BLB.deployed();
		let allowance = await bb.allowance(ritika, cedric);
		assert.equal(web3.utils.fromWei(allowance, "ether"), "300000");
	});
	it("ritika calls decreasesAllowance of 0.1 million to cedric", async () => {
		let bb = await BLB.deployed();
		let approval = await bb.decreaseAllowance(cedric, web3.utils.toWei("100000", "ether"), { from: ritika })
		assert(approval);
	});
	it("cedric's allowance to spend from ritika is 0.2 million", async () => {
		let bb = await BLB.deployed();
		let allowance = await bb.allowance(ritika, cedric);
		assert.equal(web3.utils.fromWei(allowance, "ether"), "200000");
	});
	it("after increase and decrease in allowance, cedric transfers 0.2 million from ritika's account to his own account", async () => {
		let bb = await BLB.deployed();
		let transfer = await bb.transferFrom(ritika, cedric, web3.utils.toWei("200000", "ether"), { from: cedric })
		assert(transfer);
	});
	it("ritika cannot freeze her own account because she is the owner", async () => {
		try{
		let bb = await BLB.deployed();
		let freeze = await bb.freeze(ritika, { from: ritika })
		assert(false);
		} catch (e) {
			assert(e.toString().includes("owner cannot freeze own account"));
		}
	});
	it("cedric cannot freeze jordan's account because he is not the owner of the contract", async () => {
		try{
		let bb = await BLB.deployed();
		let freeze = await bb.freeze(jordan, { from: cedric})
		assert(false);
		} catch (e) {
			assert(e.toString().includes("caller is not the owner"));
		}
	});
	it("ritika freezes jordan's account with 0.1 million inside", async () => {
		let bb = await BLB.deployed();
		let freeze = await bb.freeze(jordan, { from: ritika })
		assert(freeze);
	});
	it("we can see that jordan's account is frozen", async () => {
		let bb = await BLB.deployed();
		let frozen = await bb.isFrozen(jordan);
		assert(frozen);
	});
	it("jordan cannot transfer any token from his account to another second account jordanTwo", async () => {
		try{
		let bb = await BLB.deployed();
		let transfer = await bb.transfer(jordanTwo, web3.utils.toWei("100000", "ether"), { from: jordan });
		assert(false);
		} catch (e) {
			assert(e.toString().includes("Account is frozen"));
		}
	});
	it("despite being frozen, jordan can give allowance of 0.1 million to jordanTwo", async () => {
		let bb = await BLB.deployed();
		let transfer = await bb.increaseAllowance(jordanTwo, web3.utils.toWei("100000", "ether"), { from: jordan });
		assert(true);
	});
	it("however, jordanTwo cannot initiate a transferFrom jordan's account because jordan is frozen", async () => {
		try {
			let bb = await BLB.deployed();
			let transferFrom = await bb.transferFrom(jordan, jordanTwo, web3.utils.toWei("100000", "ether"), { from: jordanTwo });
			assert(false);
		} catch (e) {
			assert(e.toString().includes("Account is frozen"));
		}
	});
	it("total supply does not change with freezing an account and remains at 0.5 million", async () => {
		let bb = await BLB.deployed();
		let supply = await bb.totalSupply();
		assert.equal(web3.utils.fromWei(supply, "ether"), "500000");
	});
	it("ritika unfreezes jordan's account with 0.1 million inside", async () => {
		let bb = await BLB.deployed();
		let unfreeze = await bb.unfreeze(jordan, { from: ritika })
		assert(unfreeze);
	});
	it("we can see that jordan's account is unfrozen", async () => {
		let bb = await BLB.deployed();
		let frozen = await bb.isFrozen(jordan);
		assert.equal(frozen, false);
	});
	it("ownership can possibly be renounced", async () => {
		let bb = await BLB.deployed();
		let renounce= await bb.renounceOwnership({from:ritika});
		assert(renounce);
	});
});