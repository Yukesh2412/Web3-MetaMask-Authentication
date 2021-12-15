import React, { useState } from "react";

//use etherium library method istead of web3 library
import { ethers } from "ethers";
import Web3Token from "web3-token";

function App() {
  const [msg, Setmsg] = useState("");
  const signMessage = async () => {
    try {
      if (!window.ethereum)
        console.log("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //token generation
      const token = await Web3Token.sign(
        async (msg) => await signer.signMessage(msg),
        "1d"
      );
      Setmsg(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <header>
        <p>Blockchain login</p>
        <p>This is signature={msg}</p>
        <button onClick={() => signMessage()}>login with metamask</button>
      </header>
    </div>
  );
}

export default App;
