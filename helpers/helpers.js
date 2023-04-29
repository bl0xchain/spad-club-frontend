import web3 from "./web3";

export const parseCallbackUrl = (url) => {
    const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
    return res;
} 

export const getShortAddress = (address) => {
    return String(address).substring(0, 6) + "..." + String(address).substring(38)
}

export const formatUSDC = (amount) => {
    return web3.utils.fromWei(amount.toString(), 'mwei')
}

export const getExcerpt = (text, size = 150) => {
    if (text.length > size) {
        return text.substring(0, size) + "...";
    }
    return text;
}