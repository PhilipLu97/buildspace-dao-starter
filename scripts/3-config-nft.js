import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule("0x0705D4aBD1D06caFA3ebeE5E016316815D3aE75a");

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "The Bill",
                description: "Pending tuition, you are hereby admitted to DropoutDAO :).",
                image: readFileSync("./scripts/assets/tuition.jpg"),
            }
        ]);
        console.log("✅ Successfully created a new NFT in the drop!")
    } catch(error) {
        console.error("Failed to create the new NFT", error)
    }
})()