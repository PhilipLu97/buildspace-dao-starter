import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule("0x0705D4aBD1D06caFA3ebeE5E016316815D3aE75a");

(async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();
        // Specify conditions
        claimConditionFactory.newClaimPhase({
            startTime: new Date(), // minting can start immediately after deployment
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1 // only 1 nft can be minted in a single transaction
        });

        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch(error) {
        console.error("Failed to set claim condition", error);
    }
})()