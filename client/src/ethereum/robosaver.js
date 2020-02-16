import BigNumber from 'bignumber.js';

import { web3 } from './index';

import RobosaverFactoryAbi from './contracts/RobosaverFactory.json';
import RobosaverAbi from './contracts/Robosaver.json';
import ERC20Abi from './contracts/ERC20.json';

const RobosaverMetaContractAddress = '0x51c4BC5A7A89EEa3D4e0d1821237612Dc75581D4';
export const RobosaverMetaContract = new web3.eth.Contract(
  RobosaverFactoryAbi,
  RobosaverMetaContractAddress
);

const TBTCContractAddress = '0x083f652051b9CdBf65735f98d83cc329725Aa957';

export const getAmount = () => {
  // 2**32
  return web3.utils.toWei(BigNumber(0.0001).toString());
}

function handleTxHash(txHash, data) {
  console.log(txHash);
  console.log('data', data);
  return true;
}

function handleTxError(err) {
  console.error(err);
  return false;
}

export const deposit = async (assetTicker, accountAddress, amount) => {

  let success = false;

  const [defaultAccount] = await web3.eth.getAccounts();
  const from = defaultAccount;

  let Contract = null;
  if (assetTicker === 'TBTC') {
    Contract = new web3.eth.Contract(
      ERC20Abi,
      TBTCContractAddress,
    );
  }

  success = await Contract.methods.approve(accountAddress, amount)
    .send({ from })
    .on('transactionHash', handleTxHash)
    .catch(handleTxError);

  success = await Contract.methods.transfer(accountAddress, amount)
    .send({ from })
    .on('transactionHash', handleTxHash)
    .catch(handleTxError);
  
  success = await Contract.methods.moveAllTbtcToCompound()
    .send({ from })
    .on('transactoinHash', handleTxHash)
    .catch(handleTxError);

  return success;
}

export const createAccount = async () => {

  const [defaultAccount] = await web3.eth.getAccounts();
  const from = defaultAccount;

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
