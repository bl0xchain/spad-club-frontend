import web3 from "./web3";

const factoryAbi = require("../helpers/abis/spad-club-factory.json")
const clubAbi = require("../helpers/abis/spad-club.json")
const tokenAbi = require("../helpers/abis/custom-token.json")
export const factoryAddress = "0x7c47218ef2ccd72eEE1bda89eE1Af17E1e85626c"
export const usdcAddress = "0x40Bf6C107CAb17181ec2Aa2959BEE028b4698ee1";
export const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress)
export const usdcContract = new web3.eth.Contract(tokenAbi, usdcAddress)

const getClubContract = (clubAddress) => {
    return new web3.eth.Contract(clubAbi, clubAddress)
}

export const createSpadClub = async(address, name, description) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to Create a Club.",
            code: 403
        };
    }

    try {
        const response = await factoryContract.methods.createSpadClub(name, description).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            status: "Error while creating a SpadClub",
            code: 400
        }
    }
}

export const getClubs = async() => {
    const createdClubs = [];
    const clubs = await factoryContract.getPastEvents('SpadClubCreated', {
        filter: { },
        fromBlock: 0,
        toBlock: 'latest'
    })
    clubs.forEach((event) => {
        createdClubs.push(event.returnValues.spadClub)
    })
    return createdClubs.reverse()
}

export const getClubData = async(clubAddress) => {
    const clubDetails = {};
    const clubContract = getClubContract(clubAddress);
    clubDetails.name = await clubContract.methods.name().call();
    clubDetails.description = await clubContract.methods.description().call();
    clubDetails.creator = await clubContract.methods.creator().call();
    clubDetails.spadCount = await clubContract.methods.spadCount().call();
    
    return clubDetails;
}

export const createSpad = async(address, clubAddress, name, description, password, target, minInvestment, maxInvestment, externalToken, valuation, carry) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to Create a SPAD.",
            code: 403
        };
    }

    const clubContract = getClubContract(clubAddress);
    try {
        const response = await clubContract.methods.createSpad(name, description, password, web3.utils.toWei(target, 'mwei'), web3.utils.toWei(minInvestment, 'mwei'), web3.utils.toWei(maxInvestment, 'mwei'), externalToken, web3.utils.toWei(valuation, 'mwei'), carry).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            status: "Error while creating a SPAD",
            code: 400
        }
    }
}

export const getSpadInfo = async(clubAddress, spadId) => {
    const clubContract = getClubContract(clubAddress);
    const spadInfo = await clubContract.methods.getSpadInfo(spadId).call();
    return spadInfo;
}

export const getSpadDetails = async(address, clubAddress, spadId, password) => {
    const clubContract = getClubContract(clubAddress);
    let spadInfo = {}
    try {
        spadInfo = await clubContract.methods.getSpadDetails(spadId, password).call({
            from: address
        });
        spadInfo.token = await getTokenData(spadInfo.externalToken)
    } catch (error) {
        spadInfo = {
            error: true,
            message: "Invalid Password"
        }
    }
    
    return spadInfo;
}

export const getTokenData = async(tokenAddress) => {
    const contract = new web3.eth.Contract(tokenAbi, tokenAddress);
    const tokenData = {};
    tokenData.name = await contract.methods.name().call();
    tokenData.symbol = await contract.methods.symbol().call();
    tokenData.decimals = await contract.methods.decimals().call();
    return tokenData;
}

export const getContribution = async(address, clubAddress, spadId) => {
    const clubContract = getClubContract(clubAddress);
    const contribution  = await clubContract.methods.getContribution(spadId).call({
        from: address
    });
    return contribution;
}

export const contribute = async(address, clubAddress, spadId, password, amount) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to contribute to the SPAD.",
            code: 403
        };
    }
    const clubContract = getClubContract(clubAddress);
    try {
        const approvalResponse = await usdcContract.methods.approve(clubAddress, web3.utils.toWei(amount, 'mwei')).send({
            from: address,
            value: 0
        })
        const response = await clubContract.methods.contribute(spadId, password, web3.utils.toWei(amount, 'mwei')).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            status: "Error while contribution",
            code: 400
        }
    }
}

export const addTokensForDistribution = async(address, clubAddress, spadId, externalToken, amount, distributionAmount) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to add distribution tokens.",
            code: 403
        };
    }
    const clubContract = getClubContract(clubAddress);
    const tokenContract = new web3.eth.Contract(tokenAbi, externalToken)
    try {
        const approvalResponse = await tokenContract.methods.approve(clubAddress, web3.utils.toWei(distributionAmount.toString(), 'ether')).send({
            from: address,
            value: 0
        })
        const response = await clubContract.methods.addTokensForDistribution(spadId, web3.utils.toWei(amount, 'ether')).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            status: "Error while adding distribution tokens",
            code: 400
        }
    }
}

export const getAllowance = async(address, clubAddress, tokenAddress) => {
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
    const amount = await tokenContract.methods.allowance(address, clubAddress).call();
    console.log(amount);
    return amount;
}

export const isInvestmentClaimed = async(address, clubAddress, spadId) => {
    const clubContract = getClubContract(clubAddress);
    const isClaimed = await clubContract.methods.isInvestmentClaimed(spadId).call({
        from: address
    })
    return isClaimed;
}

export const claimInvestment = async(address, clubAddress, spadId) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to claim investment.",
            code: 403
        };
    }
    const clubContract = getClubContract(clubAddress);
    try {
        const response = await clubContract.methods.claimInvestment(spadId).send({
            from: address,
            value: 0
        })
        console.log(response);
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            status: "Error while claiming investment",
            code: 400
        }
    }
}