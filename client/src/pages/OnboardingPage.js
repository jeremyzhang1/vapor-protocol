import React, { useEffect, useState } from 'react';
import MultiChainSwapUniV3 from "../contracts/MultiChainSwapUniV3.json";
import Web3 from 'web3';
import downArrow from "../images/downArrow.png"
import { Form, Button, Col, Row } from "react-bootstrap";
import "../Onboarding.css"


function OnboardingPage() {
  const [contract, setContract] = useState(null);
  const [whichNetwork, setWhichNetwork] = useState(null);
  const [address, setAddress] = useState("");
  const [startChain, setStartChain] = useState("");
  const [numChains, setNumChains] = useState(0);
  const [endChains, setEndChains] = useState([]);
  const [endChainAmounts, setEndChainAmounts] = useState([]);
  const [amountToSend, setAmountToSend] = useState(0);
  const [sumDistributions, setSumDistributions] = useState(0);
  const [inputFields, setInputFields] = useState([{ chainID: "", amount: "" }]);

  const chainToID = { 
    "ethereum" : 5,
    "bsc" : 97,
    "polygon" : 80001,
    "klaytn" : 1001
  };

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
    const web3 = window.web3;

    const networkId = await web3.eth.net.getId();

    console.log(networkId);

    if (networkId) {
      setWhichNetwork(networkId);
      const instance = new web3.eth.Contract(
        MultiChainSwapUniV3.abi,
        "0xe5b8D677992f7db7503C2af504C5AA741004F5F2"
      );
      setContract(instance);
    }
  }

  const loadMetaMask = async () => {
    const web3 = window.web3;
    // find the metamask account
    let accounts = await web3.eth.getAccounts().then();
    setAddress(accounts[0].toString());
    console.log(accounts[0].toString());
  }

  const handleNumChains = (event) => {
    event.preventDefault();
    setNumChains(event.target.value);
    console.log(event.target.value);
    let temp = [];
    for (let i = 0; i < event.target.value; i++) {
      temp.push(0);
    }
    setEndChains(temp);
    setEndChainAmounts(temp);
  }
  
  const submitChains = async () => {
    const web3 = window.web3;
    console.log(endChains);

    for (let i = 0; i < endChains.length; i++) {
      alert("sending " + endChainAmounts[i] + " gas to: " + endChains[i] + " at chain ID: " + chainToID[endChains[i]]);
      console.log(address);
      console.log(chainToID[endChains[i]]);
      console.log(endChainAmounts[i].toString());
      await contract.methods.swapETHForTokensCrossChain(web3.utils.keccak256(address), "0x0000000000000000000000000000000000000000", true, 0, chainToID[endChains[i]], 80000000).send({ from: address, value: Web3.utils.toWei(endChainAmounts[i].toString(), "ether") });
    }
  }

  const handleEndChains = (val, index) => {
    let data = [...endChains];
    console.log(index);
    data[index] = val;
    setEndChains(data);
    console.log(data);
  }

  const handleEndChainAmounts = (val, index) => {
    let data = [...endChainAmounts];
    data[index] = val;
    setEndChainAmounts(data);
    console.log(data);

  }

  useEffect(() => {
    loadWeb3();
    loadMetaMask();
    // loadUserData();
  }, []);

  return (
    <div className="onboarding">
      <br/>
      <br/>
      <h1 style={{color: "white"}}>Fuel Here!</h1>
      <br />
      <div
        className="sidebar-background"
        style={{ width: "40%", margin: "auto", marginTop: "1rem" }}
      >
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>What chain would you like to start from?</Form.Label>
              <Form.Select name="start" defaultValue="default" onChange={event => setStartChain(event.target.value)}>
                <option value="default" disabled>Select a Chain</option>
                <option value="ethereum">Ethereum Goerli</option>
                <option value="bsc">BSC Testnet</option>
                <option value="klaytn">Klaytn Baobab</option>
                <option value="polygon">Polygon Mumbai</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>How many tokens would you like to send?</Form.Label>
              <Form.Control type="number" min="0" onChange={event => setAmountToSend(event.target.value)} />
            </Form.Group>
          </Row>

          <img style={{ width: 50, height: 50 }} src={downArrow} />

          <Form.Group>
            <Form.Label>How many chains would you like to split too?</Form.Label>
            <Form.Control type="number" step="1" min="1" max="3" onChange={event => handleNumChains(event)} />
          </Form.Group>
          <br/>
          <div>
            <h4 style={{ marginTop: "0px" }}>You are going to split to {numChains} chains</h4>
            <p>Select your chains below and indicate your weights for each. <b>Weights must add up to 100!</b></p>
          </div>

          {endChains.map((val, index) => {
            return (
              <Row className="mb-3 d-flex align-items-end" key={index}>
                <Form.Group as={Col} sm={6}>
                  <Form.Select name="finalChain" defaultValue="default" onChange={event => handleEndChains(event.target.value, index)}>
                    <option value="default" disabled>Select a Chain</option>
                    <option value="ethereum">Ethereum Goerli</option>
                    <option value="bsc">BSC Testnet</option>
                    <option value="klaytn">Klaytn Baobab</option>
                    <option value="polygon">Polygon Mumbai</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Control type="number" name="distribution" placeholder="100" onChange={event => handleEndChainAmounts(event.target.value, index)}></Form.Control>
                </Form.Group>
              </Row>
            )

          })}
          <br/>
          <Button variant="dark" onClick={submitChains}>
            Send Gas
          </Button>
        </Form>
      </div>
      <br />
      <br />
    </div>
  )
}

export default OnboardingPage
