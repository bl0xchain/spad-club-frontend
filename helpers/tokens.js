import { actionsAddress } from "./actions";
import web3 from "./web3";

const erc20Abi = require("../helpers/abis/erc20.json");
export const usdcContractAddress = "0x6e557F271447FD2aA420cbafCdCD66eCDD5A71A8";
export const daiContractAddress = "0x02adaF2718cdc07503d66212f9EE850C813638EC";

export const currencies = {
    "": {
        "name": "ETH",
        "decimals": 18
    }
}
currencies[usdcContractAddress] = {
    "name": "USDC",
    "decimals": 6
}
currencies[daiContractAddress] = {
    "name": "DAI",
    "decimals": 18
}

export const getCurrencyContract = (currencyAddress) => {
    return new web3.eth.Contract(
        erc20Abi, currencyAddress
    );
}

export const getDecimals = (currencyAddress, amount) => {
    const decimals = currencies[currencyAddress].decimals;
    if(decimals === 6) {
        return web3.utils.toWei(amount, 'mwei');
    
    } else {
        return web3.utils.toWei(amount, 'ether');
    }
}

export const getFromDecimals = (currencyAddress, amount) => {
    const decimals = currencies[currencyAddress].decimals;
    if(decimals === 6) {
        return web3.utils.fromWei(amount, 'mwei');
    } else {
        return web3.utils.fromWei(amount, 'ether');
    }
}

export const getCurrencyName = (currencyAddress) => {
    return currencies[currencyAddress].name;
}

export const getCurrencyAllowance = async(address, currencyAddress) => {
    const contract = getCurrencyContract(currencyAddress);
    const allowance = await contract.methods.allowance(address, actionsAddress).call({
        from: address
    });
    return getFromDecimals(currencyAddress, allowance);
}

export const allowCurrency = async(address, currencyAddress, amount) => {
    const contract = getCurrencyContract(currencyAddress);

    try {
        const response = await contract.methods.approve(actionsAddress, getDecimals(currencyAddress, amount.toString())).send({
            from: address,
            value: 0
        });
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            code: 403,
            status: error.message ? error.message : "This transaction has been declined."
        };
    }
}

export const approveTokens = async(address, currencyAddress, amount) => {
    const contract = getCurrencyContract(currencyAddress);

    try {
        const response = await contract.methods.approve(actionsAddress, amount).send({
            from: address,
            value: 0
        });
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            code: 403,
            status: error.message ? error.message : "This transaction has been declined."
        };
    }
}

export const getTokenBalance = async(address, tokenAddress, currencyAddress) => {
    const contract = getCurrencyContract(tokenAddress);
    const balance = await contract.methods.balanceOf(address).call({
        from: address
    });
    return getFromDecimals(currencyAddress, balance);
}

export const getEthBalance = async(address) => {
    const balance = await web3.eth.getBalance(address);
    return getFromDecimals("", balance);
}

export const getTokenData = async(tokenAddress) => {
    const tokenContract = getCurrencyContract(tokenAddress);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = await tokenContract.methods.decimals().call();

    return {
        address: tokenAddress,
        name: name,
        symbol: symbol,
        decimals: decimals
    }
}