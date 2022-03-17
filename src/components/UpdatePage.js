//
// Update Page
//

import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "@textile/tableland";
import { ethers } from "ethers";
import MaterialTable from 'material-table'

// TODO: uncomment when we stop using metamask for connecting to tables
//import { Wallet, providers } from "ethers";

const UpdatePage = () => {

  const [tableData,setTableData]=useState([
    {name:"Nick",email:"nick@gmail.com"},
    {name:"Bob",email:"bob@gmail.com"},
    {name:"Tony",email:"tony@gmail.com"},
  ])
  const columns=[
    {title:"Name",field:"name"},
    {title:"Email",field:"email"},
  ]
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

    // print out all tables associated with wallet
    /*const tables = await tbl.list();
    console.log("Tables:")
    console.log(tables)*/

    // print out specific table
    const { data: { rows, columns }} = await tbl.query(`SELECT * FROM game_records_365;`);
    //const myQuery = await tbl.query(`SELECT * FROM game_records_365;`);
    console.log("TABLE game_records_365:")
    
    for (const [rowId, row] of Object.entries(rows)) {
      console.log(`row: ${rowId}`);
      for (const [colId, data] of Object.entries(row)) {
        const { name } = columns[colId];
        console.log(`  ${name}: ${data}`);
      }
    }

    setTableData([
      {name:"Ally",email:"ally@gmail.com"},
      {name:"Bertha",email:"bertha@gmail.com"},
      {name:"Rachel",email:"rachel@gmail.com"},
    ])

  }

  return (
    <div>
      <h1>Update Page</h1>

      <MaterialTable
        columns={columns}
        data={tableData}
        title={"demo title"}
      />

      <p>Connected Account: {location.state.currentAccount}</p>

      <button onClick={ReadTables}>Read Tables</button>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
