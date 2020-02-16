import React, { useEffect, useState } from 'react';
import { PageHeader } from 'antd';
import Home from './pages/Home';

import { connectProvider, web3 } from './ethereum';
import configureTbtc from './ethereum/tbtc';

import logo from './logo.svg';
import { colors } from './lib';
import 'antd/dist/antd.css';
import './App.css';

const styles = {
  header: {
    marginTop: 20,
    height: 60,
    marginBottom: 20,
    borderBottom: 'solid 0.5px gray',
    borderBottomColor: colors.modal,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

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
      <div style={styles.header}>
        <img src={logo} />
      </div>
      <Home connect={connect} tbtc={tbtc} />
      {/* <div onClick={testTbtc}>Test</div> */}
    </div>
  );
}

export default App;
