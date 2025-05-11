const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.getContractFactory("CF_DApp");

  // Deploying without arguments
  const con = await contract.deploy();

  // Ensure it's fully deployed before accessing address
  await con.waitForDeployment();
  
  const address = await con.getAddress();

  console.log("Contract deployed to:",address );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
