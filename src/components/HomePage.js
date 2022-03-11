//
// Home Page
//

import React, { /*Component,*/ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
  // state variable to hold connected account
  const [currentAccount, setCurrentAccount] = useState("");

  const navigate = useNavigate();

  // method to connect user's wallet through metamask
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
  
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error)
    }
  }

  // method to update connected wallet variable if already connected
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      }
      
      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
    
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  // function for going to CreatePage. Passes currentAccount data
  const GoToCreatePage = () => {
    navigate('/CreatePage', { state: { currentAccount: currentAccount} });
  }

  // function for going to UpdatePage. Passes currentAccount data
  const GoToUpdatePage = () => {
    navigate('/UpdatePage', { state: { currentAccount: currentAccount} });
  }

  return (
      <div>
        <h1>Home Page</h1>

        {/* Show current account */}
        {currentAccount && (
          <p>Connected Account: {currentAccount}</p>
        )}

        {/* If there is no current Account render this button */}
        {!currentAccount && (
          <div>
            <button onClick={connectWallet}>
              Connect Wallet
           </button>
          </div>
        )}  

        {/* Buttons to go to other pages */}
        <button onClick={GoToCreatePage} className = "myButton">Create Page</button>
        <button onClick={GoToUpdatePage} className = "myButton">Update Page</button>
      </div>
  );
}

export default HomePage;
