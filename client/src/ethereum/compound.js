import { web3 } from './index';

import axios from '../axiosConfig';
import BigNumber from 'bignumber.js';

import cTBTCAbi from './contracts/cTBTC.json';

export const cTBTCAddress = '0xb40d042a65dd413ae0fd85becf8d722e16bc46f1';
export const cTBTCContract = new web3.eth.Contract(
  cTBTCAbi,
  cTBTCAddress
);

export const getTbtcRate = async () => {
  const supplyRate = (await cTBTCContract.methods.supplyRatePerBlock().call()) / 1e18;
  return supplyRate;
}

export const getCTokenDetails = async () => {
  let url = "https://api.compound.finance/api/v2/ctoken";
  const cTokens = await axios.get(url)
    .then((resp) => {
      return resp && resp.data;
    })
    .catch((err) => {
      console.error(err);
    });
  return cTokens;
}
