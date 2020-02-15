import { web3 } from './index';

import moneyMarket from './contracts/MoneyMarket';

const contractAbi = moneyMarket.abi;

const contractAddress = moneyMarket.networks[1].address;
const contractAddressRinkeby = moneyMarket.networks[4].address;

const MoneyMarket = (web3) ? new web3.eth.Contract(
  contractAbi,
  contractAddress
) : null;
const MoneyMarketRinkeby = (web3) ? new web3.eth.Contract(
  contractAbi,
  contractAddressRinkeby
) : null;

const getContractInstance = (nid) => {
  switch (nid) {
    case "1" || 1:
      return MoneyMarket;
    
    case "4" || 4:
      return MoneyMarketRinkeby;
    
    default:
      return null;
  }
}

export const lend = async (networkId, from, assetAddr, amt) => {
  const Contract = getContractInstance(networkId);
  
  if (Contract !== null) {
    const result = await Contract.methods.supply(assetAddr, amt)
      .send({ from })
      .on('transactionHash', (txHash) => {
        console.log(`https://etherscan.io/tx/${txHash}`);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
    return result;
  } else {
    console.error("No valid contract");
    return false;
  }
}

export const borrow = (networkId, from, assetAddr, amt) => {
  const Contract = getContractInstance(networkId);

  if (Contract !== null) {
    Contract.methods.borrow(assetAddr, amt)
      .send({ from })
      .on('transactionHash', (txHash) => {
        console.log(`https://etherscan.io/tx/${txHash}`);
      });
  } else {
    console.error("No valid contract");
    // error
  }
}

const getAccountAssetBalance = async (networkId, userAddr, assetAddr, opt) => {

  let method = "";
  if (opt === "lend") {
    method = "getSupplyBalance";
  } else if (opt === "borrow") {
    method = "getBorrowBalance";
  } else {
    console.error("Invalid opt given to getAccountAssetBalance");
    return null;
  }

  const Contract = getContractInstance(networkId);
  
  if (Contract !== null) {
    const result = await Contract.methods[method](userAddr, assetAddr)
      .call()
      .then((supplyBalance) => {
        if (supplyBalance == 0) {
          return null;
        }
        return supplyBalance;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    return result;
  } else {
    console.error("No valid contract");
    return null;
  }
}

export const getLendBalance = async (networkId, userAddr, assetAddr) => {
  return await getAccountAssetBalance(networkId, userAddr, assetAddr, "lend");
}

export const getBorrowBalance = async (networkId, userAddr, assetAddr) => {
  return await getAccountAssetBalance(networkId, userAddr, assetAddr, "borrow");
}
