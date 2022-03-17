//
// Update Page
//

import { NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "@textile/tableland";
import MaterialTable from 'material-table'

import { Wallet, providers } from "ethers";

const UpdatePage = () => {
  const [checked, setChecked] = useState();
  const [tableData,setTableData]=useState();

  const maxSelections = 1; // max boxes in table that can be checked

  // material-table columns
  const columns=[
    {title:"Name",field:"name"},
    {title:"Id",field:"_id"},
    {title:"Owner",field:"owneraddress"},
  ]

  // get location which allows us to access data passed through router.
  // We can pass info like currentConnected wallet
  let location = useLocation();

  useEffect(() => {
     // function to read tables minted on connected account
    const ReadTables = async () => {

      // get web3 wallet stuff
      const privateKey = process.env.REACT_APP_PRIVATE_KEY;
      const wallet = new Wallet(privateKey);
      const provider = new providers.AlchemyProvider("rinkeby", process.env.REACT_APP_ALCHEMY_API_KEY);
      const signer = wallet.connect(provider);

      // connect to tableland
      const tbl = await connect({ network: "testnet", signer });
  
      // read from tableland
      const { data: { rows, columns }} = await tbl.query(`SELECT * FROM game_records_365;`);
  
      // parse data for material-table to use
      let newTableData = []
      for (const [rowId, row] of Object.entries(rows)) {
        console.log(`print row so react doesn't complain about unused: ${rowId}`);
        let myRow = {}
        for (const [colId, data] of Object.entries(row)) {
          const { name } = columns[colId];
          myRow[name] = data
          //console.log(`  ${name}: ${data}`);
        }
        newTableData.push(myRow)
      }
  
      // set material-table data
      setTableData(newTableData)
    }

    ReadTables();
  }, []);

  // material table props to only allow one box to be selected
  const handleSelectionProps = rowData => {
    return {
      disabled:
        checked && checked.length >= maxSelections && !rowData.tableData.checked
          ? true
          : false
    };
  };

  // function to mint stuff
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
        onSelectionChange={rows => setChecked(rows)}
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

      <button onClick={MintStuff}>Mint</button>

      <NavLink to="/HomePage"><button className = "myButton">Home Page</button></NavLink>
    </div>
  );
}

export default UpdatePage;
