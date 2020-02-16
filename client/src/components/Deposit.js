import React, {useState} from 'react';

function Deposit(props) {
  const {tbtc} = props;

  const [deposit, setDeposit] = useState(null);

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
      )
      console.log("Now monitoring for deposit transaction...")
    });

    deposit.onActive(async (deposit) => {
      console.log("Deposit is active, minting...");
      const tbtcBits = await deposit.mintTBTC();
      console.log(`Minted ${tbtcBits} TBTC bits!`);
    });
  }

  return (
    <div className="Deposit">
      <div onClick={initiateDeposit}>Request deposit</div>
    </div>
  );
}

export default Deposit;
