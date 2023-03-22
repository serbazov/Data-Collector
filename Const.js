const ethers = require("ethers");
const WMOVR = "0x98878B06940aE243284CA214f92Bb71a2b032B8A".toLowerCase();
const Frax = "0x1A93B23281CC1CDE4C4741353F3064709A16197d".toLowerCase();
const MFAM = "0xBb8d88bcD9749636BC4D2bE22aaC4Bb3B01A58F1".toLowerCase();
const USDC = "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d".toLowerCase();
const SOLAR = "0x6bD193Ee6D2104F14F94E2cA6efefae561A4334B".toLowerCase();
const BUSD = "0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818".toLowerCase();
const PoolToken = "0xe537f70a8b62204832B8Ba91940B77d3f79AEb81".toLowerCase(); //Wmovr/Usdc
const FraxDecimals = 18;
const UsdcDecimals = 6;
const SolarDecimals = 18;
const WmovrDecimals = 18;
const SolarRouter = "0xAA30eF758139ae4a7f798112902Bf6d65612045f".toLowerCase();
const SolarDistributor =
  "0x0329867a8c457e9F75e25b0685011291CD30904F".toLowerCase();
const providerURL =
  "https://moonriver.blastapi.io/81a966d1-5645-4eba-a0e0-d701ad03d79a";
const web3Provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
  chainId: 1285,
  name: "moonriver",
});

module.exports = {
  WMOVR,
  Frax,
  MFAM,
  USDC,
  SOLAR,
  BUSD,
  FraxDecimals,
  UsdcDecimals,
  SolarDecimals,
  WmovrDecimals,
  PoolToken,
  SolarRouter,
  SolarDistributor,
  web3Provider,
};
