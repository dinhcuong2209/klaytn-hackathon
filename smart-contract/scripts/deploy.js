const hre = require("hardhat");

async function main() {
  const myContract = await hre.ethers.deployContract("ConcertFactory");
  await myContract.waitForDeployment();

  console.log(`Deployed to Klaytn Testnet, pls check: https://baobab.klaytnscope.com/address/${myContract.target}`);
  console.log(`Please run: `);
  console.log(`npx hardhat verify --network klaytnTestnet ${myContract.target}`)
  console.log(`To verify smart contract`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
