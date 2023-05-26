import { getDecimals } from "./tokens";
import web3 from "./web3";

const actionsAbi = require("../helpers/abis/spad-actions.json");
export const actionsAddress = "0x404F8A0B7066402F2a6210d4b3A94B810E794AFD";
export const actionsContract = new web3.eth.Contract(actionsAbi, actionsAddress);

export const activateSpad = async(address, spadAddress, amount, currencyAddress, pitchDetails, tokenAddress, tokenAmount) => {
    if (!window.ethereum || address === null || address === "") {
        return {
            status: "💡 Connect your Metamask wallet to Activate a SPAD.",
            code: 403
        };
    }
    let value = "0";
    if(currencyAddress === "") {
        value = amount.toString();
    }
    if(tokenAddress === "") {
        tokenAddress = '0x0000000000000000000000000000000000000000';
    }
    try {
        const response = await actionsContract.methods.activateSpad(spadAddress, pitchDetails, tokenAddress, tokenAmount).send({
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

export const contribute = async(address, spadAddress, amount, currencyAddress, passKey) => {
    let value = "0";
    if(currencyAddress === "") {
        value = getDecimals("", amount);    
    }
    try {
        const response = await actionsContract.methods.contribute(spadAddress,  getDecimals(currencyAddress, amount), passKey).send({
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

export const pitchSpad = async(address, spadAddress, name, description, tokenAddress, tokenAmount) => {
    let value = "0";
    if(tokenAddress === "") {
        tokenAddress = '0x0000000000000000000000000000000000000000';
    }
    try {
        const response = await actionsContract.methods.pitchSpad(spadAddress, name, description, tokenAddress, tokenAmount).send({
            from: address,
            value: value
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

export const getContributionEvents = (spadAddress, callback) => {
    if (!window.ethereum || spadAddress === "") {
        return false;
    }
    actionsContract.getPastEvents('Contributed', {
        filter: {spadAddress: spadAddress},
        fromBlock: 0,
        toBlock: 'latest'
    }, callback)
    .then(function(events) {
        return Promise.resolve(events);
    });
}

export const getPitchers = async(spadAddress) => {
    const pitchers = [];
    const pitches = await actionsContract.getPastEvents('PitchProposed', {
        filter: { spadAddress: spadAddress },
        fromBlock: 0,
        toBlock: 'latest'
    });
    pitches.forEach((event) => {
        pitchers.push(event.returnValues.pitcher);
    });
    return pitchers;
}

export const pitchReview = async(address, spadAddress, pitcher, approval) => {
    try {
        const response = await actionsContract.methods.pitchReview(spadAddress, pitcher, approval).send({
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

export const claimTokens = async(address, spadAddress) => {
    try {
        const response = await actionsContract.methods.claimTokens(spadAddress).send({
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

export const claimPitch = async(address, spadAddress) => {
    try {
        const response = await actionsContract.methods.claimPitch(spadAddress).send({
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

export const getClaimedTokens = async(address, spadAddress) => {
    const claims = await actionsContract.getPastEvents('InvestmentClaimed', {
        filter: { spadAddress: spadAddress, contributor: address },
        fromBlock: 0,
        toBlock: 'latest'
    });
    if(claims.length > 0) {
        return claims[0].returnValues.amount;
    } else {
        return 0;
    }
}

export const getContributedSpads = async(address) => {
    const spadAddresses = [];
    const spads = await actionsContract.getPastEvents('Contributed', {
        filter: { contributor: address },
        fromBlock: 0,
        toBlock: 'latest'
    });
    spads.forEach((event) => {
        if(spadAddresses.indexOf(event.returnValues.spadAddress) == -1) {
            spadAddresses.push(event.returnValues.spadAddress);
        }
    })
    return spadAddresses.reverse();
}

export const getPitchedSpads = async(address) => {
    const spadAddresses = [];
    const spads = await actionsContract.getPastEvents('PitchProposed', {
        filter: { pitcher: address },
        fromBlock: 0,
        toBlock: 'latest'
    });
    spads.forEach((event) => {
        spadAddresses.push(event.returnValues.spadAddress);
    })
    return spadAddresses.reverse();
}