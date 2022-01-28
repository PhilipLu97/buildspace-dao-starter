import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x14A436C06108e9D93A3e39A7500b98bd393B28B0");

(async () => {
    try {
        // total supply of tokens
        const amount = 1_000_000;
        const amount18Decimals = ethers.utils.parseUnits(amount.toString(), 18);

        await tokenModule.mint(amount18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "✅ There now is",
            ethers.utils.formatUnits(totalSupply, 18),
            "$", tokenModule.symbol, " in circulation",
          );
    } catch(error) {
        console.error("Failed to print money", error);
    }
})();