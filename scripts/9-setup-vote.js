import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0x775B1445c92481327466B7eC0aE018979c2d9e75");
const tokenModule = sdk.getTokenModule("0x14A436C06108e9D93A3e39A7500b98bd393B28B0");

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log("Successfully gave vote module permissions to act on token module");
    } catch(err) {
        console.error("Failed to grant vote module permissions on token module", error);
        process.exit(1);
    }

    try {
        // At this point, we own the entire supply of tokens, so we want to distribute, say,
        // 90% of them
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        // Take 90% of what we own
        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        // Transfer the 90% share to our voting contract
        await tokenModule.transfer(voteModule.address, percent90);

        console.log("✅ Successfully transferred tokens to vote module");
    } catch(err) {
        console.error("Failed to transfer tokens to vote module:", err);
    }
})();