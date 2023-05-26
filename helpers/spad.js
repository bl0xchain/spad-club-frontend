import { getContribution, getFundData } from "./fund";
import { getCurrencyName, getFromDecimals } from "./tokens";
import web3 from "./web3";

const spadAbi = require("../helpers/abis/spad.json");
const privacyAbi = require("../helpers/abis/privacy.json");
export const privacyAddress = "0x9a7E234163b225FA5D09D1EEDF122c1F99dc391A";
export const privacyContract = new web3.eth.Contract(privacyAbi, privacyAddress);

const getSpadContract = (spadAddress) => {
    return new web3.eth.Contract(
        spadAbi,
        spadAddress
    );
}

export const getSpadDetails = async (spadAddress, addPitch = false) => {
    const spadContract = getSpadContract(spadAddress);
    const spadDetails = {};

    spadDetails.name = await spadContract.methods.name().call();
    spadDetails.symbol = await spadContract.methods.symbol().call();
    spadDetails.target = await spadContract.methods.target().call();
    spadDetails.minInvestment = await spadContract.methods.minInvestment().call();
    spadDetails.maxInvestment = await spadContract.methods.maxInvestment().call();
    spadDetails.creator = await spadContract.methods.creator().call();
    spadDetails.status = await spadContract.methods.status().call();
    spadDetails.currencyAddress = await spadContract.methods.currencyAddress().call();
    if (spadDetails.currencyAddress == '0x0000000000000000000000000000000000000000') {
        spadDetails.currencyAddress = "";
    }
    spadDetails.created = await spadContract.methods.created().call();
    spadDetails.targetView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.target));
    spadDetails.minInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.minInvestment));
    spadDetails.maxInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.maxInvestment));
    spadDetails.investmentCurrency = getCurrencyName(spadDetails.currencyAddress);

    spadDetails.creatorContribution = await getContribution(spadDetails.creator, spadAddress);
    spadDetails.creatorContributionView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.creatorContribution));
    const fund = await getFundData(spadAddress);
    spadDetails.currentInvestment = fund.currentInvestment;
    spadDetails.currentInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.currentInvestment));
    spadDetails.investorCount = fund.investorCount;

    spadDetails.currentInvstPercent = Math.round((spadDetails.currentInvestmentView / spadDetails.targetView) * 10000) / 100;

    if (spadDetails.status == 5) {
        spadDetails.acquiredBy = await pitchService.getAcquiredBy(spadAddress);
        if (addPitch) {
            spadDetails.pitch = await pitchService.getPitch(spadDetails.acquiredBy, spadAddress);
        }
    }

    spadDetails.isPrivate = await privacyContract.methods.isPrivate(spadAddress).call();

    return spadDetails;
}