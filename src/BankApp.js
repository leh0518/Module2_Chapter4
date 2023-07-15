import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './Bank.module.css';
import simple_token_abi from './Contracts/bank_app_abi.json';
import Interactions from './Interactions';

const BankApp = () => {
  let contractAddress = '0x59eFE99aA926a79edEA31F7ED3b2661b1F9e2F62';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [checkAcc, setCheckAcc] = useState('false');
  const [accStatus, setAccStatus] = useState('');

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
    setContract(tempContract);
  };

  const createAccount = async () => {
    try {
      const tx = await contract.createAcc();
      await tx.wait();
      setAccStatus('Your Account is created');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const checkAccountExists = async () => {
    try {
      const exists = await contract.accountExists();
      setCheckAcc(exists ? 'true' : 'false');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const DepositBalance = async (e) => {
    e.preventDefault();
    let depositAmount = e.target.depositAmount.value;
    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(depositAmount),
      });
      await tx.wait();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const WithdrawBalance = async (e) => {
    e.preventDefault();
    let withdrawAmount = e.target.withdrawAmount.value;
    try {
      const tx = await contract.withdraw(withdrawAmount);
      await tx.wait();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected()) {
      connectWalletHandler();
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bank Dapp</h2>
      <button className={styles.walletButton} onClick={connectWalletHandler}>
        {connButtonText}
      </button>

      <div className={styles.card}>
        <div className={styles.addressContainer}>
          <h3>Address</h3>
          <p>{defaultAccount}</p>
        </div>
      </div>

      <div className={styles.interactionsContainer}>
        <div className={styles.interactionsCard}>
          <h3 className={styles.cardTitle}>Account Actions</h3>
          <button onClick={createAccount} className={styles.interactionsButton}>
            Create Account
          </button>
          <button onClick={checkAccountExists} className={styles.interactionsButton}>
            Check Account Exists
          </button>
          <h4 className={styles.statusTitle}>Account Status</h4>
          <p className={styles.status}>{checkAcc}</p>
        </div>

        <div className={styles.interactionsCard}>
          <h3 className={styles.cardTitle}>Deposit</h3>
          <form onSubmit={DepositBalance}>
            <input
              type="number"
              id="depositAmount"
              min="0"
              step="1"
              placeholder="Enter amount"
              className={styles.inputField}
            />
            <button type="submit" className={styles.interactionsButton}>
              Deposit
            </button>
          </form>
        </div>

        <div className={styles.interactionsCard}>
          <h3 className={styles.cardTitle}>Withdraw</h3>
          <form onSubmit={WithdrawBalance}>
            <input
              type="number"
              id="withdrawAmount"
              min="0"
              step="1"
              placeholder="Enter amount"
              className={styles.inputField}
            />
            <button type="submit" className={styles.interactionsButton}>
              Withdraw
            </button>
          </form>
        </div>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};

export default BankApp;
