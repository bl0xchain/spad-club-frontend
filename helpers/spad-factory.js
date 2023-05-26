import { getDecimals } from "./tokens";
import web3 from "./web3";

const factoryAbi = require("../helpers/abis/spad-factory.json");
export const spadFactoryAddress = "0x06B12aac28f12964b5840B98a985dB0178Ca3579";
export const spadFactory = new web3.eth.Contract(factoryAbi, spadFactoryAddress);

export const startSpad = async(address, name, symbol, target, minInvestment, maxInvestment, currency, passKey) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "💡 Connect your Metamask wallet to Start a SPAD.",
            code: 403
        };
    }
    let value = "0";
    const currencyAddress = (currency == "") ? '0x0000000000000000000000000000000000000000' : currency;
    
    try {
        const response = await spadFactory.methods.createSpad(name, symbol, getDecimals(currency, target), getDecimals(currency, minInvestment), getDecimals(currency, maxInvestment), currencyAddress, passKey).send({
            from: address,
            value: value
        });
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            code: 403,
            status: error.message ? error.message : "This transaction has been declined."
        };
    }
}

export const getAllSpads = async () => {
    const spadAddresses = [];
    const spads = await spadFactory.getPastEvents('SpadCreated', {
        filter: {},
        fromBlock: 0,
        toBlock: 'latest'
    });
    spads.forEach((event) => {
        spadAddresses.push(event.returnValues.spadAddress);
    })
    return spadAddresses.reverse();
}