import BigNumber from 'bignumber.js';
import { web3 } from './index';
import axios from '../axiosConfig';
import ERC20 from './contracts/ERC20.json';
import moneyMarket from './contracts/MoneyMarket';

const ERC20Abi = ERC20.abi;

const moneyMarketAddress = moneyMarket.networks[1].address;
const moneyMarketAddressRinkeby = moneyMarket.networks[4].address;

const getAssetAbi = async (ticker, networkId) => {
  const url = `/assets/${ticker}/abi`;
  const abi = await axios.get(url, {
    params: {
      networkId: networkId
    }
  })
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return resp && resp.data;
    });
  return abi;
}

const getAssetContract = async (ticker, addr, networkId) => {
  const abi = await getAssetAbi(ticker, networkId);
  return new web3.eth.Contract(abi, addr);
}

export const activateAsset = async (assetAddr, userAddr) => {
  if (!web3) {
    console.warn("Can not activate asset");
    return null;
  };
  const Contract = new web3.eth.Contract(ERC20Abi, assetAddr);
  const approveAmount = web3.utils.toWei(BigNumber(2**32).toString());

  const result = await Contract.methods.approve(moneyMarketAddress, approveAmount)
    .send({
      from: userAddr
    })
    .catch((err) => {
      console.error(err);
      return false;
    })
    .then((success) => {
      console.log(success);
      return true;
    });
  return result;
}

export const assetActivated = async (assetAddr, userAddr) => {
  if (!web3) {
    console.warn("Can not detect activated status");
    return null;
  }
  const Contract = new web3.eth.Contract(ERC20Abi, assetAddr);
  const result = await Contract.methods.allowance(userAddr, moneyMarketAddress)
    .call({
      from: userAddr
    })
    .catch((err) => {
      console.error(err);
      return false;
    })
    .then((allowance) => {
      return allowance > 0;
    });
  return result;
}
