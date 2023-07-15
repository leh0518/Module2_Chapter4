# BankApp

This is a React component called `BankApp` that represents a decentralized banking application. It allows users to interact with a deployed smart contract on the Ethereum blockchain. The component provides various functionalities such as connecting a wallet, creating an account, checking if an account exists, depositing funds, and withdrawing funds.

## Prerequisites

To use this application, you need to have the MetaMask browser extension installed. MetaMask provides a wallet interface for interacting with the Ethereum blockchain.

## Installation

Before running this code, make sure you have the following dependencies installed:

- React
- ethers.js

You can install these dependencies by running the following command:

```bash
npm install react ethers
```

## Usage

To use the `BankApp` component, follow these steps:

1. Import the component into your React application:

   ```jsx
   import BankApp from './BankApp';
   ```

2. Include the `BankApp` component in your JSX code:

   ```jsx
   function App() {
     return (
       <div>
         {/* Other components */}
         <BankApp />
       </div>
     );
   }
   ```

3. Start your React application and the `BankApp` component will be rendered.

## Functionality

The `BankApp` component provides the following functionality:

- Connect Wallet: Allows the user to connect their MetaMask wallet to the application.
- Deposit: Allows the user to deposit funds into their bank account by providing an amount and calling the `deposit` function on the deployed smart contract.
- Withdraw: Allows the user to withdraw funds from their bank account by providing an amount and calling the `withdraw` function on the deployed smart contract.

## Dependencies

The `BankApp` component requires the following dependencies:

- React: A JavaScript library for building user interfaces.
- ethers: A library for interacting with the Ethereum blockchain.

## Contract Address

The `contractAddress` variable in the code represents the address of the deployed smart contract. You need to replace it with the actual address of your deployed contract for the application to function correctly.

## Styling

The component uses CSS modules for styling. The styles are defined in the `Bank.module.css` file and imported into the component.

## Error Handling

If any errors occur during the execution of the smart contract functions or the wallet connection process, error messages will be displayed in the application.

Note: This README assumes basic knowledge of React, Ethereum, and smart contracts.
