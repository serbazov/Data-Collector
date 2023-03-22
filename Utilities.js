const { ethers, BigNumber } = require("ethers");
const fetch = require("node-fetch"); // node-fetch@1.7.3
const ERC20ABI = require("./abi/ERC20ABI.json");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function errCatcher(f, arguments) {
  doLoop = true;
  do {
    try {
      return await f.apply(this, arguments);
    } catch (err) {
      console.log(err);
      await timer(180000);
    }
  } while (doLoop);
}

/**
 * Get token balance on wallet
 * @param {String} TokenAddress
 * @param {String} wallet_address
 * @param {String} provider
 * @returns {BigNumber} tokenBalance
 */
async function getTokenBalanceWallet(TokenAddress, wallet_address, provider) {
  const Token = new ethers.Contract(TokenAddress, ERC20ABI, provider);
  const tokenBalance = await Token.balanceOf(wallet_address);
  return tokenBalance;
}

module.exports = {
  errCatcher,
  timer,
  getTokenBalanceWallet,
};
