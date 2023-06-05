import WalletContext from '@/context/WalletContext';
import { claimTokens, getClaimedTokens } from '@/helpers/actions';
import { getContribution, isInvestmentClaimed } from '@/helpers/fund';
import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ActivateSpad from './ActivateSpad';
import { getFromDecimals } from '@/helpers/tokens';
import Contribute from './Contribute';
import EtherscanAddress from '../layout/EtherscanAddress';
import Button from '../template/Button';
import Text from '../template/Text';

const SpadActions = ({ spadAddress, spad, loadSpad }) => {

    const [contribution, setContribution] = useState("");
    const [isClaimed, setIsClaimed] = useState(false);
    const [claimProcessing, setClaimProcessing] = useState(false);
    const [claimedTokens, setClaimedTokens] = useState(0);

    const { address, status } = useContext(WalletContext)

    const fetchData = async () => {
        const contrib = await getContribution(address, spadAddress);
        setContribution(parseFloat(getFromDecimals(spad.currencyAddress, contrib)));
        if (spad.status == 5 && contrib > 0) {
            const isClaimed = await isInvestmentClaimed(address, spadAddress);
            setIsClaimed(isClaimed);
            if (isClaimed) {
                const tokens = await getClaimedTokens(address, spadAddress);
                console.log(tokens)
                setClaimedTokens(ethers.formatUnits(tokens, parseInt(spad.pitch.tokenDecimals)));
            }
        }
    }

    const handleClaim = async () => {
        if (status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        setClaimProcessing(true);
        const response = await claimTokens(address, spadAddress);
        if (response.code == 200) {
            toast.success("Claimed investment for SPAD")
            fetchData();
        } else {
            toast.error("Problem with claiming investment for SPAD")
        }
        setClaimProcessing(false);
    }

    useEffect(() => {
        if (address !== '') {
            fetchData();
        }
    }, [address]);

    return (
        <div className='text-center px-2 md:px-0'>
            {
                spad.status === "1" ?
                    <>{
                        spad.creator === address ?
                            <ActivateSpad spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} /> :
                            <p className="mb-0 text-amber-500 font-bold">SPAD is not yet activated</p>
                    }</> :
                    <>{
                        spad.status === "2" ?
                            <Contribute spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} /> :
                            <>
                                {
                                    spad.status === "4" ?
                                        <>
                                            {
                                                contribution === 0 ?
                                                    <Button href={"/spads/pitch/" + spadAddress} className="pr-2" style={{display:'inline-block'}}>PITCH</Button> :
                                                    <>
                                                        <div className="font-bold text-sm text-gray-400">YOUR CONTRIBUTION</div>
                                                        <p className="font-bold text-xl">{contribution} {" "} {spad.investmentCurrency}</p>
                                                    </>
                                            }
                                        </> :
                                        <>
                                            {
                                                spad.status === "5" &&
                                                <>
                                                    {
                                                        spad.creator === address ?
                                                            <p className="font-bold">
                                                                You have approved the pitch of <Text className="underline"><EtherscanAddress address={spad.acquiredBy} /></Text>  and {" "}
                                                                {spad.targetView} {" "} {spad.investmentCurrency} has been transfered to pitcher account.
                                                            </p> :
                                                            <>
                                                                {
                                                                    spad.acquiredBy === address ?
                                                                        <p className="font-bold text-green-700">
                                                                            Your pitch has been approved and {" "}
                                                                            {spad.targetView} {" "} {spad.investmentCurrency} has been transfered to your account.
                                                                        </p> :
                                                                        <p className="font-bold">
                                                                            The SPAD is aquired by <Text className="underline"><EtherscanAddress address={spad.acquiredBy} /></Text>
                                                                        </p>
                                                                }
                                                            </>
                                                    }
                                                </>
                                            }
                                            {
                                                contribution > 0 &&
                                                <div className='mt-5'>
                                                    {
                                                        isClaimed ?
                                                            <p className="text-success1 mb-0">You have claimed your <b>{claimedTokens} {" "} {spad.pitch.tokenSymbol}</b> tokens </p> :
                                                            <div>
                                                                {
                                                                    claimProcessing ?
                                                                        <Button disabled isProcessing={true} className="mx-auto">
                                                                            Claiming Tokens {' '}
                                                                        </Button> :
                                                                        <Button onClick={handleClaim} className="mx-auto">
                                                                            Claim Tokens
                                                                        </Button>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            }
                                        </>
                                }
                            </>
                    }</>
            }
        </div>
    )
}

export default SpadActions