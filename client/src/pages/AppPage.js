import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import MultiChainSwapUniV3 from "../contracts/MultiChainSwapUniV3.json";
import "../Onboarding.css"

function AppPage() {
  const [address, setAddress] = useState("");

  const loadUserData = async () => {
    const web3 = window.web3;
    try {
      let accounts = await web3.eth.getAccounts().then();
      setAddress(accounts[0]);
      const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
      await instance.methods.setInteractorByChainId(1001, web3.utils.keccak256("0xe5b8D677992f7db7503C2af504C5AA741004F5F2")).send({ from: accounts[0] });
    }
    catch (error) {
      console.log(error)
      window.alert('Something went wrong! Check the console for more details.');
    }
  }

  const loadUserData2 = async () => {
    const web3 = window.web3;

    // TODO: figure out how to deal with getting the correct lockbox onto the frontend in a more user friendly way
    try {
      let accounts = await web3.eth.getAccounts().then();
      setAddress(accounts[0]);
      // console.log(accounts[0]);
      const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
      console.log("loaded")
      await instance.methods.setInteractorByChainId(80001, web3.utils.keccak256("0xe5b8D677992f7db7503C2af504C5AA741004F5F2")).send({ from: accounts[0] });
      console.log("check")
    }
    catch (error) {
      console.log(error)
      window.alert('Invalid Lockbox contract address.');
    }
  }

  const loadUserData3 = async () => {
    const web3 = window.web3;

    // TODO: figure out how to deal with getting the correct lockbox onto the frontend in a more user friendly way
    try {
      let accounts = await web3.eth.getAccounts().then();
      setAddress(accounts[0]);
      // console.log(accounts[0]);
      const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
      console.log("loaded")
      await instance.methods.setInteractorByChainId(80001, web3.utils.keccak256("0xe5b8D677992f7db7503C2af504C5AA741004F5F2")).send({ from: accounts[0] });
      console.log("check")
    }
    catch (error) {
      console.log(error)
      window.alert('Invalid Lockbox contract address.');
    }
  }

  const handleSwapToken = async () => {
    const web3 = window.web3;
    console.log(web3.utils.keccak256("0xB487DFF311d2a02f60299c6887DE01feafd831f2"))
    let accounts = await web3.eth.getAccounts().then();
    const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
    let amount = "0.08"
    await instance.methods.swapETHForTokensCrossChain(web3.utils.keccak256("0xB487DFF311d2a02f60299c6887DE01feafd831f2"), "0x0000000000000000000000000000000000000000", true, 0, 1001, 80000000).send({ from: accounts[0], value: Web3.utils.toWei(amount, "ether") })
  }

  const handleSwapToken2 = async () => {
    const web3 = window.web3;
    let accounts = await web3.eth.getAccounts().then();
    const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
    let amount = "40"
    await instance.methods.swapETHForTokensCrossChain(web3.utils.keccak256("0x773894804b0AEE6975E3474846Cd5499704bA6BC"), "0x0000000000000000000000000000000000000000", true, 0, 80001, 80000000).send({ from: accounts[0], value: Web3.utils.toWei(amount, "ether") })
  }

  const handleSwapToken3 = async () => {
    const web3 = window.web3;
    let accounts = await web3.eth.getAccounts().then();
    const instance = new web3.eth.Contract(MultiChainSwapUniV3.abi, "0xe5b8D677992f7db7503C2af504C5AA741004F5F2");
    let amount = "0.02"
    await instance.methods.swapETHForTokensCrossChain(web3.utils.keccak256("0x773894804b0AEE6975E3474846Cd5499704bA6BC"), "0x0000000000000000000000000000000000000000", true, 0, 80001, 80000000).send({ from: accounts[0], value: Web3.utils.toWei(amount, "ether") })
  }

  return (
    <div className="onboarding">
      <div
        className="sidebar-background"
        style={{ width: "40%", margin: "auto", marginTop: "4rem" }}
      >
        <h1>Debugging Utilities Page</h1>
      </div>
      <div className="sidebar-background" style={{ width: "40%", margin: "auto", marginTop: "4rem" }}>
        <h3>Utilities to establish cross chain address links:</h3>
        <button onClick={loadUserData}>Click this if on Mumbai!</button>
        <br />
        <button onClick={loadUserData2}>Click this is on Baobab!</button>
        <br />
        <button onClick={loadUserData3}>Click this if on Goerli!</button>
      </div>
      <div
        className="sidebar-background"
        style={{ width: "40%", margin: "auto", marginTop: "4rem" }}
      >
        <h3>Test swaps to various chains:</h3>
        <button onClick={handleSwapToken}>Click to test swap, must be on matic</button>
        <br />
        <button onClick={handleSwapToken2}>Click to test swap, must be on Baobab</button>
        <br />
        <button onClick={handleSwapToken3}>Click to test swap Goerli to polygon</button>
      </div>
    </div>
  )
}

export default AppPage