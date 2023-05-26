import web3 from "./web3";

export const currencies = {
    "": {
        "name": "ETH",
        "decimals": 18
    },
    "0x6e557F271447FD2aA420cbafCdCD66eCDD5A71A8": {
        "name": "USDC",
        "decimals": 6
    },
    "0x02adaF2718cdc07503d66212f9EE850C813638EC": {
        "name": "DAI",
        "decimals": 18
    }
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