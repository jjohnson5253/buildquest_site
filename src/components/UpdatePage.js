//
// Update Page
//

import { NavLink, useLocation } from "react-router-dom";
import React, { } from "react";
import { connect } from "@textile/tableland";
import { ethers } from "ethers";

// TODO: uncomment when we stop using metamask for connecting to tables
//import { Wallet, providers } from "ethers";

const UpdatePage = () => {

  // get location which allows us to access data passed through router.
  // We can pass info like currentConnected wallet
  let location = useLocation();

  // TODO: eventually remove metamask and use this so we always use the same wallet.
  // not sure if this works, untested
  /*const privateKey = "private key here";
  const wallet = new Wallet(privateKey);
  const provider = new providers.AlchemyProvider("rinkeby", "DbhFMNZuRkiPvq6C-jiSBuDm2v4WNKPy");
  const signer = wallet.connect(provider);*/

  // using metamask for now, b/c I don't want to store private key on github it feels wrong
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // function to read tables minted on connected account
  const ReadTables = async () => {
    const tbl = await connect({ network: "testnet", signer });
    const tables = await tbl.list();

    console.log("Tables:")
    console.log(tables)
  }

  return (
    <div>
      <h1>Update Page</h1>

      <p>Connected Account: {location.state.currentAccount}</p>

      <button onClick={ReadTables}>Read Tables</button>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
