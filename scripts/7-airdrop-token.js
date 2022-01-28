import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Address of our ERC-1155 membership NFT contract
const bundleDropModule = sdk.getBundleDropModule("0x0705D4aBD1D06caFA3ebeE5E016316815D3aE75a");
// Address of our ERC-20 governance token contract
const tokenModule = sdk.getTokenModule("0x14A436C06108e9D93A3e39A7500b98bd393B28B0");

(async () => {
    try {
        // Get all claimers of the ID 0 token (our membership NFT)
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if(walletAddresses === 0) {
            console.log("No NFTs have been claimed yet: go get some friends bozo XD");
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            // Pick a random amount of tokens between 1000 to 10000 to drop on each address
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop ", randomAmount, " tokens to ", address);
        
            const airdropTarget = {
                address, 
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };

        return airdropTarget;
    }); 

        console.log("🌈 Starting airdrop...");
        // Use transferBatch to airdrop the tokens to the membership NFT holders
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch(error) {
        console.error("Failed to airdrop tokens", error);
    }
})();