const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("GasA", function () {
  async function deployA() {
    const [owner, otherAccount] = await ethers.getSigners();
    const lockedAmount = 1_000_000_000;

    const GasA = await ethers.getContractFactory("GasA");
    const gas = await GasA.deploy({ value: lockedAmount });

    return { gas, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { gas, owner } = await loadFixture(deployA);

      expect(await gas.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds", async function () {
      const { gas, lockedAmount } = await loadFixture(deployA);

      expect(await ethers.provider.getBalance(gas.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the caller is not the owner", async function () {
      const { gas, otherAccount } = await loadFixture(deployA);
      await expect(gas.connect(otherAccount).withdraw()).to.be.revertedWith(
        "You are not the owner"
      );
    });

    it("Should change balances", async function () {
      const { gas, owner, lockedAmount } = await loadFixture(deployA);
      await expect(gas.withdraw()).to.changeEtherBalances(
        [owner, gas],
        [lockedAmount, -lockedAmount]
      );
    });
  });
});

describe("GasB", function () {
  async function deployB() {
    const [owner, otherAccount] = await ethers.getSigners();
    const lockedAmount = 1_000_000_000;

    const GasB = await ethers.getContractFactory("GasB");
    const gas = await GasB.deploy({ value: lockedAmount });

    return { gas, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { gas, owner } = await loadFixture(deployB);

      expect(await gas.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds", async function () {
      const { gas, lockedAmount } = await loadFixture(deployB);

      expect(await ethers.provider.getBalance(gas.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the caller is not the owner", async function () {
      const { gas, otherAccount } = await loadFixture(deployB);
      await expect(gas.connect(otherAccount).withdraw()).to.be.revertedWith(
        "You are not the owner"
      );
    });

    it("Should change balances", async function () {
      const { gas, owner, lockedAmount } = await loadFixture(deployB);
      await expect(gas.withdraw()).to.changeEtherBalances(
        [owner, gas],
        [lockedAmount, -lockedAmount]
      );
    });
  });
});
