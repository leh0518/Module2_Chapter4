import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './WalletCard.css';

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [balanceToAdd, setBalanceToAdd] = useState(0);
  const [balanceToRemove, setBalanceToRemove] = useState(0);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const addBalanceHandler = () => {
    if (balanceToAdd > 0) {
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              to: defaultAccount,
              value: ethers.utils.parseEther(balanceToAdd.toString()),
            },
          ],
        })
        .then((transactionHash) => {
          console.log('Transaction successful:', transactionHash);
          setBalanceToAdd(0);
          getAccountBalance(defaultAccount);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Please enter a valid balance to add');
    }
  };

  const removeBalanceHandler = () => {
    if (balanceToRemove > 0) {
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: defaultAccount,
              to: '0x5FbDB2315678afecb367f032d93F642f64180aa3', // Address to burn balance
              value: ethers.utils.parseEther(balanceToRemove.toString()),
            },
          ],
        })
        .then((transactionHash) => {
          console.log('Transaction successful:', transactionHash);
          setBalanceToRemove(0);
          getAccountBalance(defaultAccount);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Please enter a valid balance to remove');
    }
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid-use of the application
    window.location.reload();
  };

  // listen for account changes
  useEffect(() => {
    window.ethereum.on('accountsChanged', accountChangedHandler);
    window.ethereum.on('chainChanged', chainChangedHandler);

    // Clean up event listeners on component unmount
    return () => {
      window.ethereum.removeListener('accountsChanged', accountChangedHandler);
      window.ethereum.removeListener('chainChanged', chainChangedHandler);
    };
  }, []);

  return (
    <div className='walletCard'>
      <h4>Connect Metamask</h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
      <div className='balanceControls'>
        <input
          type='number'
          placeholder='Balance to Add'
          value={balanceToAdd}
          onChange={(e) => setBalanceToAdd(e.target.value)}
        />
        <button onClick={addBalanceHandler}>Add Balance</button>
        <input
          type='number'
          placeholder='Balance to Remove'
          value={balanceToRemove}
          onChange={(e) => setBalanceToRemove(e.target.value)}
        />
        <button onClick={removeBalanceHandler}>Remove Balance</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default WalletCard;
