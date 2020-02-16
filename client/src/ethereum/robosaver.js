import BigNumber from 'bignumber.js';

import { web3 } from './index';

import RobosaverContractAbi from './contracts/Robosaver.json';
import RobosaverFactoryContractAbi from './contracts/Robosaver.json';

const RobosaverContractAddress = '';
const RobosaverFactoryContractAddress = '';

export const RobosaverContract = new web3.eth.Contract(
  RobosaverContractAbi,
  RobosaverContractAddress
);

export const RobosaverFactoryContract = new web3.eth.Contract(
  RobosaverFactoryContractAbi,
  RobosaverFactoryContractAddress
);

export const deposit = () => {
  const amount = web3.utils.toWei(BigNumber(2**32).toString());

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
}
