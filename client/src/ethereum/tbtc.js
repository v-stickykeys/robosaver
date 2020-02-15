import TBTC from '@keep-network/tbtc.js';

export default async function configureTbtc(web3) {
  const tbtc = await TBTC.withConfig({
    web3: web3,
    bitcoinNetwork: "testnet",
    electrum: {
        "testnet": {
            "server": "electrumx-server.test.tbtc.network",
            "port": 50002,
            "protocol": "ssl"
        },
        "testnetWS": {
            "server": "electrumx-server.test.tbtc.network",
            "port": 50003,
            "protocol": "ws"
        }
    },
  });
  return tbtc;
}
