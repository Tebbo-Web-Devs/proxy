const { ethers, upgrades } = require("hardhat");

async function main() {
  // Load the contract factory
  const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");

  // Deploy the proxy with initialization arguments
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100], {
    initializer: "initialize",
  });

  // Wait for the proxy deployment transaction to be mined
  await proxy.deploymentTransaction().wait();

  // Get the implementation address
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy.target);

  // Log details
  console.log("Proxy contract address: " + proxy.target);
  console.log("Implementation contract address: " + implementationAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
