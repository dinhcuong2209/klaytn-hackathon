const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ConcertFactory", function () {
  let factory;
  let ticketFactory;
  let owner;
  let user;
  const ticketPrice = ethers.utils.parseEther("0.005"); // Ticket price in ether

  before(async function () {
    const Factory = await ethers.getContractFactory("ConcertFactory");
    factory = await Factory.deploy();
    await factory.deployed();

    const TicketFactory = await ethers.getContractFactory("TicketERC721");
    ticketFactory = await TicketFactory.deploy("TicketCollection", "TICKET");
    await ticketFactory.deployed();

    [owner, user] = await ethers.getSigners();

    await factory.addNftList(ticketFactory.address);
    await factory.setTicket(ticketFactory.address, ticketPrice, "TicketURI");
  });

  it("should allow the owner to create a new ticket collection", async function () {
    const ownerBalanceBefore = await ticketFactory.balanceOf(owner.address);

    await factory.createCollection("NewCollection", "NEW");

    const ownerBalanceAfter = await ticketFactory.balanceOf(owner.address);

    expect(ownerBalanceAfter).to.equal(ownerBalanceBefore.add(1));
  });

  it("should allow a user to buy a ticket", async function () {
    const userBalanceBefore = await ticketFactory.balanceOf(user.address);

    await factory.connect(user).buyTicket(user.address, ticketPrice, ticketFactory.address);

    const userBalanceAfter = await ticketFactory.balanceOf(user.address);

    expect(userBalanceAfter).to.equal(userBalanceBefore.add(1));
  });

  it("should allow the owner to add and remove an NFT from the allowed list", async function () {
    const nftAddress = await ticketFactory.address;

    await factory.addNftList(nftAddress);
    expect(await factory.isNftAllowed(nftAddress)).to.be.true;

    await factory.removeNftFromList(nftAddress);
    expect(await factory.isNftAllowed(nftAddress)).to.be.false;
  });

  it("should allow the owner to set ticket information", async function () {
    const newTicketPrice = ethers.utils.parseEther("0.2");
    const newTicketURI = "NewTicketURI";

    await factory.setTicket(ticketFactory.address, newTicketPrice, newTicketURI);
    const ticketInfo = await factory.getTicketInfo(ticketFactory.address);

    expect(ticketInfo.price).to.equal(newTicketPrice);
    expect(ticketInfo.uri).to.equal(newTicketURI);
  });
});
