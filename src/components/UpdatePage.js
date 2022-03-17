//
// Update Page
//

import { NavLink, useLocation } from "react-router-dom";
import React, { } from "react";
import { connect } from "@textile/tableland";
import { ethers } from "ethers";
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css";

// TODO: uncomment when we stop using metamask for connecting to tables
//import { Wallet, providers } from "ethers";

//////////////////////////////////////////////////////

//const ReactTable = window.ReactTable.default

const response = {
  initial_data: [
   {
     "Did I see this plant in 2016?":"No",
     "Did I see this plant in 2017?":"Yes",
     "How Many?":1,
     "User Data 4":"x",
     "User Data 5":"",
     "Did I see this plant in 2022?":"No",
     "Name":"Abronia alpina"
   },
   {
     "Did I see this plant in 2016?":"No",
     "Did I see this plant in 2017?":"No",
     "How Many?":11,
     "User Data 4":"x",
     "User Data 5":"",
     "Did I see this plant in 2022?":"Yes",
     "Name":"Abronia alpina1"
   }]
}
//////////////////////////////////////////////////////


const UpdatePage = () => {

  //////////////////////////////////////////////////////
  let testData = response.initial_data

  let columns = Object.keys(response.initial_data[0]).map((key, id)=>{
    return {
      Header: key,
      accessor: key
    }
  })
  //////////////////////////////////////////////////////

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

      <ReactTable
        data = { testData }
        columns = { columns }
      />

      <p>Connected Account: {location.state.currentAccount}</p>

      <button onClick={ReadTables}>Read Tables</button>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
