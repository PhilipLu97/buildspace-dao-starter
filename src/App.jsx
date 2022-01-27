import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

// Instantiate the sdk on Rinkeby
const sdk = new ThirdwebSDK("rinkeby", {maxGasPriceInGwei: 1000});

// Get a reference to our ERC-1155 contract and access the bundle drop functionality
const bundleDropModule = sdk.getBundleDropModule("0x0705D4aBD1D06caFA3ebeE5E016316815D3aE75a");

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  // Get the signer so we can sign transactions on the blockchain
  const signer = provider ? provider.getSigner() : undefined;
  // State variable to track user's NFT ownership
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isCLaiming lets us keep a loading state while the NFT is minting
  const[isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // We interact with our deployed contract through passing the signer to the sdk
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    // If they don't have a connected wallet, exit
    if(!address) {
      return;
    }

    // Use bundleDropModule.balanceOf to check NFT ownership
    return bundleDropModule
    .balanceOf(address, "0")
    .then((balance) => {
      // The user has the NFT if the balance is greater than 0
      if (balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("🌟 this user has a membership NFT!")
      } else {
        setHasClaimedNFT(false);
        console.log("😭 this user doesn't have a membership NFT.")
      }
    })
    .catch((error) => {
      setHasClaimedNFT(false);
      console.error("Failed to get NFT balance", error);
    });
  }, [address])

  // if the user's wallet hasn't been connected yet
  if(!address) {
    return (
      <div className="landing">
        <h1>DropoutDAO - dropouts tap in!</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if(hasClaimedNFT) {
    return(
      <div className="member-page">
        <h1> DAO Member Page</h1>
        <p>Thanks for being a member :).</p>
      </div>
    );
  };

  const mintNft = () => {
    setIsClaiming(true);
    // Call bundleDropModule.claim("0", 1) to mint the nft to the user's wallet
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      setHasClaimedNFT(true);
      console.log(`🌊 Successfully Minted! Check it out on OpenSea: 
      https://testnets.opensea.io/assets/${bundleDropModule.address.toLowerCase()}/0`);
    })
    .catch((err) => {
      console.error("Failed to claim", err);
    })
    .finally(() => {
      // Stop loading state
      setIsClaiming(false);
    })
  }

  return (
    <div className="mint-nft">
      <h1> Mint your free DAO Membership NFT</h1>
      <button 
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );

  /*
  return (
    <div className="landing">
      <h1>👀 Welcome, dropout </h1>
    </div>
  );
  */
};

export default App;
