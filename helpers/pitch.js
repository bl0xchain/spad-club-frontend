import { getCurrencyContract, getFromDecimals } from "./tokens";
import web3 from "./web3";

const pitchAbi = require("../helpers/abis/pitch.json");
export const pitchAddress = "0x83a7480D975D11524dab44B2A32c7aee301D403e";
export const pitchContract = new web3.eth.Contract(pitchAbi, pitchAddress);

export const getPitch = async(address, spadAddress) => {
    const pitch = await pitchContract.methods.getPitch(spadAddress, address).call();
    if(pitch.status != 0) {
        if(pitch.tokenAddress != "0x0000000000000000000000000000000000000000") {
            const tokenContract = getCurrencyContract(pitch.tokenAddress);
            pitch.tokenName = await tokenContract.methods.name().call();
            pitch.tokenSymbol = await tokenContract.methods.symbol().call();
            pitch.tokenDecimals = await tokenContract.methods.decimals().call();
        } else {
            pitch.tokenName = "";
            pitch.tokenSymbol = "";
            pitch.tokenDecimals = 18;
        }
        
        if(pitch.tokenDecimals == 18) {
            pitch.amount = getFromDecimals("", pitch.tokenAmount);
        } else {
            pitch.amount = getFromDecimals("USDC", pitch.tokenAmount);
        }
    }
    return pitch;
} 

export const getAcquiredBy = async(spadAddress) => {
    const acquiredBy = await pitchContract.methods.getAcquiredBy(spadAddress).call();
    return acquiredBy;
} 