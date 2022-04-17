const main = async () => {
  const CMGallery = await hre.ethers.getContractFactory("CMGallery");
  const cmgallary = await CMGallery.deploy();

  await cmgallary.deployed();

  console.log("CMGallery deployed to:", cmgallary.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();