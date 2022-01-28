import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x54a0448E03c6C654C270819798408FceAA0f3cf2");

(async () => {
    try {
        const voteModule = await app.deployVoteModule({
            name: "DropoutDAO Voting Platform",

            // Address of our ERC-20 contract whose tokens are the requirement for voting
            votingTokenAddress: "0x14A436C06108e9D93A3e39A7500b98bd393B28B0",

            // How long members have to wait after proposal creation to start voting
            proposalStartWaitTimeInSeconds: 0,

            // How long members have to vote on a proposal after voting starts
            // In this case , we give members 24 hours to vote
            proposalVotingTimeInSeconds: 24 * 60 * 60,

            // Percentage of token supply votes in favour required to pass a proposal
            // i.e. for a fraction of 60, those who collectively hold 60% or more of the tokens
            // must vote in favour of the proposal for it to pass. 
            votingQuorumFraction: 0,

            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log("✅ Successfully deployed vote module, address:", voteModule.address);
    } catch(err) {
        console.error("Failed to deploy vote module", err);
    }
})();