import React, { useState, Fragment } from 'react';
import { Button, Card, Input, Select, Typography } from 'antd';

import Deposit from '../components/Deposit';

import '../App.css';
import { colors } from '../lib';
import metamaskLogo from '../metamaskLogo.png';

const { Text, Title } = Typography;
const { Option } = Select;

const styles = {
  container: {
    color: 'white',
    backgroundColor: colors.modal,
    height: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 40,
  },
  font: {
    color: 'white',
  },
  title: {
    color: 'white',
  },
  labelContainer: {
    textAlign: 'left',
  },
  label: {
    color: 'white',
  },
  input: {
    margin: 'auto',
    height: '52px',
    borderRadius: '3px',
    border: 'solid 0.9px rgba(255, 255, 255, 0.25)',
    backgroundColor: 'gray',
  },
  prefix: {
    maxHeight: 20,
  },
  coinPrice: {
    textAlign: 'left',
  },
};

function Modal(props) {
  const { connect, tbtc } = props;

  const [bestRateLogo, setBestRateLogo] = useState(null);
  const [bestRateText, setBestRateText] = useState(null);
  const [calculatedEarnings, setCalculatedEarnings] = useState(null);
  const [displayBitcoinModal, setDisplayBitcoinModal] = useState(false);
  const [depositMethod, setDepositMethod] = useState(0); // 0 initiate // 1 complete
  const [bitcoinAddress, setBitcoinAddress] = useState('');

  function renderText(text) {
    return (
      <div style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
      </div>
    );
  }

  function renderCard(children) {
    return (
      <Card style={styles.input}>
        {children}
      </Card>
    )
  }

  function renderCoinText(text) {
    return <div style={styles.font}>{text}</div>;
  }

  const BtcPrice = '$7,000';
  const BtcPercent = '+2.0%';

  function renderCoinPrice(text) {
    return <div style={styles.coinPrice}>Current {text} price: {BtcPrice} {BtcPercent}</div>;
  }

  function updateModal(address) {
    setBitcoinAddress(address);
    setDisplayBitcoinModal(true);
  }

  function renderBitcoinModal() {
    return(
      <Fragment>
        <Title style={styles.title} level={3}>Send BTC to this address</Title>
        <div>
        {renderText('Bitcoin wallet address')}
        <Input
          className='modalInput'
          style={styles.input}
          placeholder={bitcoinAddress}
          suffix={'copy'}
        /></div>
        {renderBottomFields()}
      </Fragment>
    )
  }

  function renderBottomFields() {
    return (
      <Fragment>
        <div>
        {renderText('How much would you like to deposit?')}
        <Input
          className='modalInput'
          style={styles.input}
          suffix={renderCoinText('BTC')}
        />
      </div>
      <div>
        {renderText('Best interest rate:')}
        <Input
          className='modalInput'
          prefix={bestRateLogo}
          value={bestRateText}
          style={styles.input}
        />
      </div>
      <div>
        {renderText('Potential earnings:')}
        <Input
          className='modalInput'
          style={styles.input}
          value={calculatedEarnings}
          suffix={renderCoinText('BTC')}
        />
        {renderCoinPrice('BTC')}
      </div></Fragment>
    );
  }

  return (
    <div style={styles.container} className="Modal">
      {!displayBitcoinModal && (
        <Fragment>
      <Title style={styles.title} level={3}>Calculate your potential profit</Title>
      <div>
        {renderText('Select a wallet')}
        <Input
          className='modalInput'
          style={styles.input}
          prefix={<img src={metamaskLogo} style={styles.prefix} />}
          placeholder={'MetaMask'}
        />
      </div>
      {renderBottomFields()}
      </Fragment>
      )}
      {displayBitcoinModal && renderBitcoinModal()}
      <Deposit
        connect={connect}
        tbtc={tbtc}
        displayBitcoinModal={(address) => updateModal(address)}
        method={depositMethod}
      />
    </div>
  );
}

export default Modal;
