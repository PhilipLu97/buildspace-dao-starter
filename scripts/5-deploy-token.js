import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x54a0448E03c6C654C270819798408FceAA0f3cf2");

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "DropoutDAO Governance Token",
            symbol: "DROPOUT",
        });
        console.log("✅ Successfully deployed token module, address:", tokenModule.address);
    } catch(error) {
        console.error("Failed to deploy token module", error);
    }
})