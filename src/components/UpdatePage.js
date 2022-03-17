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
  const maxSelections = 1;
  const [checked, setChecked] = useState();

  const [tableData,setTableData]=useState();
  const columns=[
    {title:"Name",field:"name"},
    {title:"Id",field:"_id"},
    {title:"Owner",field:"owneraddress"},
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

    /*console.log("Here")
    console.log("rows")
    console.log(rows)
    console.log("columns")
    console.log(columns)*/

    let newTableData = []

    for (const [rowId, row] of Object.entries(rows)) {
      console.log(`row: ${rowId}`);
      let myRow = {}
      for (const [colId, data] of Object.entries(row)) {
        const { name } = columns[colId];
        myRow[name] = data
        console.log(`  ${name}: ${data}`);
      }
      console.log('myRow')
      console.log(myRow)
      newTableData.push(myRow)
    }

    console.log("newTableData")
    console.log(newTableData)

    setTableData(newTableData)

  }

  const handleSelectionProps = rowData => {
    return {
      disabled:
        checked && checked.length >= maxSelections && !rowData.tableData.checked
          ? true
          : false
    };
  };

  const selectRow = rows =>
  {
    setChecked(rows);
  }

  const MintStuff = () => {
    console.log("minting this row")
    console.log(checked)
  }

  return (
    <div>
      <h1>Update Page</h1>
      <p>Connected Account: {location.state.currentAccount}</p>

      <MaterialTable
        columns={columns}
        data={tableData}
        onSelectionChange={rows => selectRow(rows)}
        options={{
          search: false,
          selection: true,
          showTitle: false,
          toolbar: false,
          paging: false,
          selectionProps: handleSelectionProps,
          showSelectAllCheckbox: false,
        }}
      />

      <button onClick={ReadTables}>Read from Tableland</button>
      <button onClick={MintStuff}>Mint</button>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
