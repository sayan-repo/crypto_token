import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisabled, setDisable] = useState(false);
  const [btnText, setText] = useState("Gimme Gimme");

  async function handleClick(event) {
    setDisable(true); 

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DIME coins to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button disabled={isDisabled} id="btn-payout" onClick={handleClick}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
