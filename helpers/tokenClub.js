import web3 from "./web3";

const factoryAbi = require("../helpers/abis/token-club-factory.json")
const clubAbi = require("../helpers/abis/token-club.json")
const tokenAbi = require("../helpers/abis/custom-token.json")
export const factoryAddress = "0xc9D38b29eD93447D4920e304Df5f5834cF8A1Bdf"
export const usdcAddress = "0xd9037B8A07Ec697014E8c94c52Cb41f67132B4a8";
export const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress)
export const usdcContract = new web3.eth.Contract(tokenAbi, usdcAddress)

const getClubContract = (clubAddress) => {
    return new web3.eth.Contract(clubAbi, clubAddress)
}

export const createTokenClub = async(address, name, description) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to Create a Club.",
            code: 403
        };
    }

    try {
        const response = await factoryContract.methods.createTokenClub(name, description).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            status: "Error while creating a TokenClub",
            code: 400
        }
    }
}

export const getClubs = async() => {
    const createdClubs = [];
    const clubs = await factoryContract.getPastEvents('TokenClubCreated', {
        filter: { },
        fromBlock: 0,
        toBlock: 'latest'
    })
    clubs.forEach((event) => {
        createdClubs.push(event.returnValues.tokenClub)
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

export const claimTarget = async(address, clubAddress, spadId, externalToken, amount) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "Connect your Metamask wallet to claim target.",
            code: 403
        };
    }
    const clubContract = getClubContract(clubAddress);
    const tokenContract = new web3.eth.Contract(tokenAbi, externalToken)
    const tokenAmount = web3.utils.toWei(amount, 'ether');
    try {
        const approvalResponse = await tokenContract.methods.approve(clubAddress, tokenAmount).send({
            from: address,
            value: 0
        })
        const response = await clubContract.methods.claimTarget(spadId, tokenAmount).send({
            from: address,
            value: 0
        })
        return {
            code: 200,
            data: response
        }
    } catch (error) {
        return {
            status: "Error while claiming target",
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