import React, { useEffect, useState } from 'react';
import MultiChainSwapUniV3 from "../contracts/MultiChainSwapUniV3.json";
import Web3 from 'web3';


function OnboardingPage() {
  const [address, setAddress] = useState("");

  const loadWeb3 = async () => {
    // TODO for Charles: window.ethereum.enable is going to be deprecated very soon, look into
    // fix laid out here: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadUserData = async () => {
    const web3 = window.web3;

    // TODO: figure out how to deal with getting the correct lockbox onto the frontend in a more user friendly way
    try {
      let accounts = await web3.eth.getAccounts().then();
      setAddress(accounts[0]);
      // console.log(accounts[0]);
      const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
      console.log("loadded")
      await instance.methods.setInteractorByChainId(1001, web3.utils.keccak256("0xe5b8D677992f7db7503C2af504C5AA741004F5F2")).send({ from: accounts[0]});
      console.log("check")
    }
    catch (error) {
      console.log(error)
      window.alert('Invalid Lockbox contract address.');
    }
  }


  const loadMetaMask = async () => {
    const web3 = window.web3;
    console.log("fadsfoiasjdfkahkh")
    console.log(web3)
    // find the metamask account
    let accounts = await web3.eth.getAccounts().then();
    setAddress(accounts[0]);

    // this might be problematic to automatically assume everything sets login = true,
    // even if you are not a member
  }

  useEffect(() => {
    // loadMetaMask();
    loadWeb3();
    // loadUserData();
  }, []);

  return (
    <div>

      <button onClick={loadUserData}>Click this!</button>
      <h1>Placeholder Onboarding Page</h1>
    </div>
  )
}

export default OnboardingPage