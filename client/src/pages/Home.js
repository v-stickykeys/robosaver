import React, { useState } from 'react';
import Modal from '../components/Modal';

import { colors } from '../lib';
import Deposit from '../components/Deposit';

const styles = {
  container: {
    backgroundColor: colors.background,
    height: '100vh',
  }
};

function Home(props) {

  const { connect, tbtc } = props;

  const [displayBitcoinModal, setDisplayBitcoinModal] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [startFlow, setStartFlow] = useState(false);
  const [depositMethod, setDepositMethod] = useState(0); // 0 initiate // 1 complete
  const [loading, setLoading] = useState(false);

  function updateModal(address) {
    setBitcoinAddress(address);
    setDisplayBitcoinModal(true);
    setLoading(false);
  }

  function triggerStartFlow() {
    setLoading(true);
    setStartFlow(true);
  }

  return (
    <div style={styles.container} className="Home">
      <Modal
        {...props}
        loading={loading}
        startFlow={triggerStartFlow}
        bitcoinAddress={bitcoinAddress}
        displayBitcoinModal={displayBitcoinModal}
      />
      <Deposit
        startFlow={startFlow}
        connect={connect}
        tbtc={tbtc}
        displayBitcoinModal={(address) => updateModal(address)}
        method={depositMethod}
      />
    </div>
  );
}

export default Home;
