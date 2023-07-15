import hre from 'hardhat';

async function main() {
    // Retrieve the contract factory
    const BankApp = await hre.ethers.getContractFactory('Token');

    const bankApp = await BankApp.deploy();
    // Wait for the contract to be mined
    await bankApp.deployed();

    // Log the deployed contract address
    console.log(`A contract deployed to: ${bankApp.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
