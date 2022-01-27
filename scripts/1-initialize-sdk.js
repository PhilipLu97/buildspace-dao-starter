import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Import and configure our .env file which securely stores private environment variables
import dotenv from "dotenv"
dotenv.config();

// Confirm that our .env is working:
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
    console.log("🛑 Private key not found.")
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
    console.log("🛑 Alchemy API URL not found.")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
    console.log("🛑 Wallet address not found.")
}

const sdk = new ThirdwebSDK(
    // Create a wallet instance using the wallet private key and the Alchemy API URL to broadcast transactions to miners
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    ),
    {maxGasPriceInGwei: 1000},
);

(async () => {
    try {
        // Try to access the apps inside of the Thirdweb SDK
        const apps = await sdk.getApps();
        console.log("Your app address is: ", apps[0].address)
    } catch(err) {
        console.error("Failed to get apps from the sdk", err);
        process.exit(1);
    }
}) ()

// Export the initialized thirdweb SDK for use in other scripts
export default sdk;