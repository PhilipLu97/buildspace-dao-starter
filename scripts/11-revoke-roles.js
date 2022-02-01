import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x14A436C06108e9D93A3e39A7500b98bd393B28B0");

(async () => {
    try {
        console.log(
            "👀 Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
        );
    
        // Revoke all the powers the creator wallet had over the ERC-20 governance token contract
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);

        console.log(
            "🎉 Roles after revoking ourselves:",
          await tokenModule.getAllRoleMembers());
          console.log("✅ Successfully revoked our superpowers from the ERC-20 contract"
        );
    } catch(err) {
        console.error("Failed to revoke ourselves from the DAO treasury", error);
    }
})();