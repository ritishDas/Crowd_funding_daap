import { ethers } from 'ethers';
import contract from './contract.js';

async function test() {
  // Connect to the local Hardhat network (or any other network)
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Hardhat node
  const signer = await provider.getSigner();

  // Load the contract factory
  const CF_DApp = new ethers.ContractFactory(
    contract.abi, // Replace with your contract's ABI
    contract.bytecode, // Replace with your contract's bytecode
    signer
  );

  // Attach to the deployed contract
  const cfDApp = CF_DApp.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // Replace with your contract address
  // Create a new campaign
//  const tx = await cfDApp.createCampaign("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", title, description, target, deadline);
 // await tx.wait();

  console.log("Campaign created!");

  // Fetch all campaigns
  const campaigns = await cfDApp.getCampaigns();
  console.log("Campaigns:", campaigns);
  return campaigns;
}

export default test;
