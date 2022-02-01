import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule("0x775B1445c92481327466B7eC0aE018979c2d9e75");
const tokenModule = sdk.getTokenModule("0x14A436C06108e9D93A3e39A7500b98bd393B28B0");

(async () => {
    try {
        const amount = 420_000;
        // Create proposoal to mint 420_000 new tokens in the treasury
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + " tokens into the treasury?",
            [
                {
                    // Our native token is ETH, so this denotes how much ETH we want to send in this
                    // proposal. We're minting new governance tokens in this proposal, so this value is 0.
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // We're minting to our vote module's contract address, which is the treasury
                        "mint",
                        [
                            voteModule.address, 
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    // We send the transaction data to the token module, which executes the mint
                    toAddress: tokenModule.address,
                }
            ]
        ); 
        console.log("✅ Successfully created proposal to mint tokens");
    } catch(err) {
        console.error("Failed to create first proposal", err);
        process.exit(1);
    }

    try {
        const amount = 6_900;
        // Create a proposal to transfer ourselves 6900 tokens - nice
        await voteModule.propose(
            "Should the DAO transfer " + amount + " tokens from the treasury to " 
            + process.env.WALLET_ADDRESS + " for being awesome?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        // Transferring from the treasury to our wallet
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ],
                    ),
                    toAddress: tokenModule.address,
                }
            ]
        );

        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    } catch(err) {
        console.error("Failed to create second proposal", err);
    }
})();