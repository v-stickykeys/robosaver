import React, {useState, useEffect} from 'react';

import { deposit as robosaverDeposit, checkAccountExists, createAccount } from '../ethereum/robosaver';

function Deposit(props) {
  const { startFlow, connect, tbtc, displayBitcoinModal, showLoader, amount } = props;

  const [deposit, setDeposit] = useState(null);
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if (startFlow) {
      connect();
    }
  }, [startFlow]);

  useEffect(() => {
    if ((tbtc !== null) && (!initiated)) {
      setInitiated(true);
      initiateDeposit();
    }
  }, [tbtc]);

  async function initiateDeposit() {

    const lotSizes = await tbtc.Deposit.availableSatoshiLotSizes();
    console.log(lotSizes);
    const deposit = await tbtc.Deposit.withSatoshiLotSize(lotSizes[0]);
    setDeposit(deposit);

    deposit.autoSubmit();

    deposit.onBitcoinAddressAvailable(async (address) => {
      const lotSize = await deposit.getSatoshiLotSize();
      console.log(
          "\tGot deposit address:", address,
          "; fund with:", lotSize.toString(), "satoshis please.",
      );
      displayBitcoinModal(address);
      console.log("Now monitoring for deposit transaction...")
    });

    deposit.onActive(async (deposit) => {
      showLoader(true);
      console.log("Deposit is active, minting...");
      const tbtcBits = await deposit.mintTBTC();
      console.log(`Minted ${tbtcBits} TBTC bits!`);
      await fundAccount();
    });
  }

  async function fundAccount() {
    let accountAddress = await checkAccountExists();
    if (accountAddress === '') {
      accountAddress = await createAccount();
    }
    await robosaverDeposit('TBTC', accountAddress, amount);
  }

  return (
    <div className="Deposit"></div>
  );
}

export default Deposit;
