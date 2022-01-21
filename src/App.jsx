import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋 Address:", address)

  // if the user's wallet hasn't been connected yet
  if(!address) {
    return (
      <div className="landing">
        <h1>DropoutDAO - dropouts tap in!</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }
  return (
    <div className="landing">
      <h1>👀 Welcome, dropout </h1>
    </div>
  );
};

export default App;
