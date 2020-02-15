import React, { useEffect, useState } from 'react';
import Home from './pages/Home';

import { connectProvider, web3 } from './ethereum';
import configureTbtc from './ethereum/tbtc';

import logo from './logo.svg';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [tbtc, setTbtc] = useState(null);

  useEffect(() => {
    if (connected === true) {
      connectTbtc();
    }
  }, [connected]);

  async function connectTbtc() {
    const tbtcConfigured = await configureTbtc(web3);
    setTbtc(tbtcConfigured);
  }

  async function connect() {
    const connected = await connectProvider();
    console.log('connect from app', connected);
    setConnected(connected);
  }

  function testTbtc() {
    if (tbtc) {
      tbtc.Deposit.availableSatoshiLotSizes().then(console.log);
    } else {
      console.error('TBTC test failed');
    }
  }

  return (
    <div className="App">
      <Home connect={connect} />
      <div onClick={testTbtc}>Test</div>
    </div>
  );
}

export default App;
