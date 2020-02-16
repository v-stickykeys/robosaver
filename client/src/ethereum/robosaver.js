import BigNumber from 'bignumber.js';

import { web3 } from './index';

import RobosaverMetaContractAbi from './contracts/Robosaver.json';
import ERC20 from './contracts/ERC20.json';

const from = web3.eth.defaultAccount;

const RobosaverMetaContractAddress = '0xCf9B7F518AD918820f6894e47928c72a9F861D75';
export const RobosaverMetaContract = new web3.eth.Contract(
  RobosaverMetaContractAbi,
  RobosaverMetaContractAddress
);

const ERC20Abi = ERC20.abi;
const TBTCContractAddress = '';

export const getAmount = () => {
  return web3.utils.toWei(BigNumber(2**32).toString());
}

export const deposit = async (assetTicker, accountAddress, amount) => {
  let Contract = null;
  if (assetTicker === 'TBTC') {
    console.log(accountAddress);
    Contract = new web3.eth.Contract(
      ERC20Abi,
      TBTCContractAddress,
    );
  }

  const result = await Contract.methods.transfer(accountAddress, amount)
    .send({ from })
    .on('transactionHash', console.log)
    .catch((err) => {
      console.error(err);
      return false;
    });
  return result;
}

export const createAccount = async () => {
  const result = await RobosaverMetaContract.methods.createContract(from)
    .send({ from })
    .on('transactionHash', console.log)
    .catch((err) => {
      console.error(err);
      return false;
    });
    return result;
}

export const checkAccountExists = async () => {

  const [defaultAccount] = await web3.eth.getAccounts();

  console.log(defaultAccount)

  const result = await RobosaverMetaContract.methods.userContractMapping(defaultAccount)
    .call()
    .then((accountAddress) => {
      if (accountAddress.includes("0x000")) {
        return '';
      }
      return accountAddress;
    })
      .catch((err) => {
        console.error(err);
        return false;
      });
    return result;
}
