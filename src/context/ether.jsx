import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants';

const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
};

export const CrowdfundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = 'Crowd Funding Contract';
  const [currentAccount, setCurrentAccount] = useState();

  const createCampaign = async (campaign) => {
    if (!currentAccount) {
      console.log("Please connect your wallet first.");
      return;
    }

    console.log(campaign);

    const { title, description, amount, deadline } = campaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.parseEther(amount), // Use ethers.parseEther instead of ethers.utils.parseUnits
        new Date(deadline).getTime()
      );
      await transaction.wait();
      console.log('Contract call success', transaction);
    } catch (err) {
      console.log('Contract call failure', err);
    }
  };

  const getCampaigns = async () => {
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545", {
  chainId: 31337,
  name: "hardhat",
  ensAddress: null, // Disable ENS resolution
});
    const contract = fetchContract(provider);

    const campaigns = await contract.getCampaigns();
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatEther(campaign.target.toString()), // Use ethers.formatEther
      deadline: Number(campaign.deadline), // Convert BigInt to number
      amountCollected: ethers.formatEther(campaign.amountCollected.toString()), // Use ethers.formatEther
      pid: i,
    }));
    return parsedCampaigns;
  };

  const donate = async (pId, amount) => {
    if (!window.ethereum) {
      console.log("Install MetaMask");
      return;
    }

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    try {
      console.log(pId,amount);
      const transaction = await contract.donateToCampaign(pId, {
        value: ethers.parseEther(amount), // Use ethers.parseEther
      });
      await transaction.wait();
      window.location.reload();
      return transaction;
    } catch (err) {
      console.log('Donation failed', err);
    }
  };

  /*const getDonations = async (pId) => {
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545", {
  chainId: 31337,
  name: "hardhat",
  ensAddress: null, // Disable ENS resolution
});
    const contract = fetchContract(provider);

    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    return donations[0].map((donator, i) => ({
      donator,
      donation: ethers.formatEther(donations[1][i].toString()), // Use ethers.formatEther
    }));
  };*/

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log('Install MetaMask');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No Account found');
      }
    } catch (err) {
      console.log('Error connecting to wallet', err);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log('Install MetaMask');

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log('Error while connecting to wallet', err);
    }
  };

  return (
    <CrowdfundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        donate,
        connectWallet,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};
