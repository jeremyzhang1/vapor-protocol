import React, { useEffect, useState } from 'react';
import MultiChainSwapUniV3 from "../contracts/MultiChainSwapUniV3.json";
import Web3 from 'web3';
import downArrow from "../images/downArrow.png"
import { Form, Button, Col, Row } from "react-bootstrap";
import "../Onboarding.css"


function OnboardingPage() {
  const [address, setAddress] = useState("");
  const [startChain, setStartChain] = useState("");
  const [numChains, setNumChains] = useState(0);
  const [endChains, setEndChains] = useState([]);
  const [amountToSend, setAmountToSend] = useState(0);
  const [sumDistributions, setSumDistributions] = useState(0);

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

  const loadMetaMask = async () => {
    const web3 = window.web3;
    // find the metamask account
    let accounts = await web3.eth.getAccounts().then();
    setAddress(accounts[0]);
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
  }
  
  const submitChains = () => {

  }

  useEffect(() => {
    // loadMetaMask();
    loadWeb3();
    // loadUserData();
  }, []);

  return (
    <div className="onboarding">
      <h1>Fuel Here!</h1>
      <br/>
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

          <img style={{ width: 50, height: 50 }} src={downArrow}></img>

          {
            numChains == 0 ?
            <Form.Group>
              <Form.Label>How many chains would you like to split too?</Form.Label>
              <Form.Control type="number" step="1" min="1" max="3" onChange={event => handleNumChains(event)} />
            </Form.Group>
            :
            <div>
              <h4>You are going to split to <b>{numChains} chains</b></h4>
              <br/>
              <h4>Select your chains below and indicate your weights for each (weights must add up to 100!)</h4>
              <br/>
  
            </div>
          }
        {endChains.map((val, index) => {
          return (
            <Row className="mb-3 d-flex align-items-end" key={index}>
              <Form.Group as={Col} sm={6}>
                <Form.Select name="finalChain" defaultValue="default" onChange={event => setStartChain(event.target.value)}>
                  <option value="default" disabled>Select a Chain</option>
                  <option value="ethereum">Ethereum Goerli</option>
                  <option value="bsc">BSC Testnet</option>
                  <option value="klaytn">Klaytn Baobab</option>
                  <option value="polygon">Polygon Mumbai</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control type="number" name="distribution" placeholder="100" ></Form.Control>
              </Form.Group>
            </Row>
          )

        })}

          <Button variant="dark" onClick={submitChains}>
            Send Gas
          </Button>
      </Form>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {
        numChains == 0 ?
        <form>
          <label>How many chains would you like to split too?</label>
          <input type="number" step="1" min="1" max="3" onChange={event => handleNumChains(event)}></input>
        </form>
        :
        <div>
          <h4>You are going to split to <b>{numChains} chains</b></h4>
          <br/>
          <h4>Select your chains below and indicate your weights for each (weights must add up to 100!)</h4>
          <br/>

        </div>
      }
    </div>
  )
}

export default OnboardingPage
