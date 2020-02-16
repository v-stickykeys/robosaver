import React, { useState, Fragment } from 'react';
import { Button, Card, Icon, Input, Select, Spin, Typography } from 'antd';

import { getAmount, deposit as robosaverDeposit, checkAccountExists, createAccount } from '../ethereum/robosaver';

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
  depositButton: {
    backgroundColor: colors.green,
    width: 160,
    margin: 'auto',
  }
};

function Modal(props) {
  const { startFlow, bitcoinAddress, displayBitcoinModal, loading } = props;

  const [bestRateLogo, setBestRateLogo] = useState(null);
  const [bestRateText, setBestRateText] = useState(null);
  const [calculatedEarnings, setCalculatedEarnings] = useState(null);

  function renderText(text) {
    return (
      <div style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
      </div>
    );
  }

  function renderCoinText(text) {
    return <div style={styles.font}>{text}</div>;
  }

  const BtcPrice = '$7,000';
  const BtcPercent = '+2.0%';

  function renderCoinPrice(text) {
    return <div style={styles.coinPrice}>Current {text} price: {BtcPrice} {BtcPercent}</div>;
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
          value={bitcoinAddress}
          suffix={<Icon type="copy" />}
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
      </div>
      </Fragment>
    );
  }

  function renderMain() {
    return (
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
      <Button
        style={styles.depositButton}
        type="primary"
        size={'large'}
        onClick={startFlow}
      >
        DEPOSIT
      </Button>
      </Fragment>
    )
  }

  function renderLoading() {
    return (
      <div>
        This process may take a few minutes.
        Please confirm your request on MetaMask.
        <div>
          <Spin />
        </div>
      </div>
    )
  }

  async function testSendTBTC() {
    const amount = getAmount;
    console.log(amount);
    let accountAddress = await checkAccountExists();
    if (accountAddress === '') {
      accountAddress = await createAccount();
    }
    await robosaverDeposit('TBTC', accountAddress, amount);
  }

  return (
    <div style={styles.container} className="Modal">
      {loading && renderLoading()}
      {!displayBitcoinModal && !loading && renderMain()}
      {displayBitcoinModal && !loading && renderBitcoinModal()}
      <div onClick={testSendTBTC}> Test Send TBTC </div>
    </div>
  );
}

export default Modal;
