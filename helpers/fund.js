import web3 from "./web3";

const fundAbi = require("../helpers/abis/fund.json");
export const fundAddress = "0x5c68B994Aa960063A0fc74B4c00995024183DbcF";
export const fundContract = new web3.eth.Contract(fundAbi, fundAddress);

export const getContribution = async(address, spadAddress) => {
    const contribution = await fundContract.methods.getContribution(spadAddress, address).call();
    return contribution;
} 

export const getFundData = async(spadAddress) => {
    const data = await fundContract.methods.getFundData(spadAddress).call();
    return data;
} 

export const isInvestmentClaimed = async(address, spadAddress) => {
    const isClaimed = await fundContract.methods.isInvestmentClaimed(spadAddress, address).call();
    return isClaimed;
}