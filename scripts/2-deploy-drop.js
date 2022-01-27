import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// Get our functionality packaged in a module at our app address
const app = sdk.getAppModule("0x54a0448E03c6C654C270819798408FceAA0f3cf2");

( async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            // The collection's name, ex. CryptoPunks
            name: "DropoutDAO Membership",
            // A description for the collection
            description: "A DAO for uni dropouts who feel disenfranchised by their schools",
            // The image for the collection that will show up on OpenSea
            image: readFileSync("./scripts/assets/library.jpg"),
            // We don't plan on charging anyone for the nft drop, so the "proceeds" go
            // to address 0x0 (burned)
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log("✅ Successfully deployed bundleDrop module, address: ", bundleDropModule.address);
        console.log("✅ bundleDrop metadata: ", await bundleDropModule.getMetadata());
    } catch (error) {
        console.log("Failed to deploy bundleDrop module", error);
    }
})()