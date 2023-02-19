import React, { useEffect, useState } from 'react';
import MultiChainSwapUniV3 from "../contracts/MultiChainSwapUniV3.json";
import Web3 from 'web3';
import downArrow from "../images/downArrow.png"
// import { Form } from "react-bootstrap";


function OnboardingPage() {
  const [address, setAddress] = useState("");
  const [endChains, setEndChains] = useState(0);

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


  const loadMetaMask = async () => {
    const web3 = window.web3;
    // find the metamask account
    let accounts = await web3.eth.getAccounts().then();
    setAddress(accounts[0]);

    // this might be problematic to automatically assume everything sets login = true,
    // even if you are not a member
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
  const handleNumChains = (event) => {
    event.preventDefault();
    setEndChains(event.target.value);
    console.log(endChains);
  }

  useEffect(() => {
    // loadMetaMask();
    loadWeb3();
    // loadUserData();
  }, []);

  return (
    <div>
      <h1>Fuel Here!</h1>
      <br/>
      <form>
        <label>Starting Chain</label>
        <select name="start">
          <option value="ethereum">Ethereum Goerli</option>
          <option value="bsc">BSC Testnet</option>
          <option value="klaytn">Klaytn Baobab</option>
          <option value="polygon">Polygon Mumbai</option>
        </select>
      </form>
      <img style={{ width: 50, height: 50 }} src={downArrow}></img>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {
        endChains == 0 ?
        <form>
          <label>How many chains would you like to split too?</label>
          <input type="number" step="1" min="1" max="3" onChange={event => handleNumChains(event)}></input>
        </form>
        :
        <div/>


      }
      <button onClick={loadUserData}>Click this if on Mumbai!</button>
      <button onClick={loadUserData2}>Click this is on Baobab!</button>
      <h1>Placeholder Onboarding Page</h1>
      <button onClick={handleSwapToken}>Click to test swap, must be on matic</button>
      <br/>
      <button onClick={handleSwapToken2}>Click to test swap, must be on Baobab</button>
    </div>
  )
}

export default OnboardingPage