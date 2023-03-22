const ethers = require("ethers"); // Load Ethers library
const { BigNumber } = require("ethers");
const { getTokenBalanceWallet, errCatcher } = require("./Utilities");
const USDC = "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d".toLowerCase();
const WMOVR = "0x98878B06940aE243284CA214f92Bb71a2b032B8A".toLowerCase();
var args = process.argv.slice(2);
const SolarFactoryABI = require("./abi/SolarFactoryABI.json");
const SolarFactory = "0x049581aEB6Fe262727f290165C29BDAB065a1B68".toLowerCase();
const { UsdcDecimals, WmovrDecimals, web3Provider } = require("./Const");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1ZwX7UmVZjYY2HbdxB_96rA0AH04b1dPD0OQDRpCl00c"
);
const creds = require("./credentials.json");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function getReserves(wallet, Token1, Token2, web3Provider) {
  const Factory = new ethers.Contract(
    SolarFactory,
    SolarFactoryABI,
    web3Provider
  );
  const FactoryContract = Factory.connect(wallet);
  const pairAddress = await FactoryContract.getPair(Token1, Token2);
  const reserves1 = await getTokenBalanceWallet(
    Token1,
    pairAddress,
    web3Provider
  );
  const reserves2 = await getTokenBalanceWallet(
    Token2,
    pairAddress,
    web3Provider
  );
  return [reserves1, reserves2];
}

async function getToken2UsdcPrice(wallet, web3Provider, Token = WMOVR) {
  const reserves = await getReserves(wallet, USDC, Token, web3Provider);
  const price =
    reserves[0] / 10 ** UsdcDecimals / (reserves[1] / 10 ** WmovrDecimals);
  return price;
}

async function run() {
  const WALLET_ADDRESS =
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266".toLowerCase();
  const WALLET_SECRET =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80".toLowerCase();
  const wallet = new ethers.Wallet(WALLET_SECRET, web3Provider);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  while (true) {
    const price = await errCatcher(getToken2UsdcPrice, [wallet, web3Provider]);
    await sheet.addRow([Date(Date.now), Date.now(), price]);
    await timer(1000 * 59);
  }
}

run();
