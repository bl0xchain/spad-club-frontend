import WalletContext from '@/context/WalletContext';
import { formatUSDC } from '@/helpers/helpers';
import { getContribution } from '@/helpers/tokenClub';
import React, { useContext, useEffect, useState } from 'react'
import Contribute from './Contribute';
import TokensForDistribution from './TokensForDistribution';
import ClaimInvestment from './ClaimInvestment';
import EtherscanAddress from '../EtherscanAddress';
import { Button } from 'flowbite-react';

const SpadActions = ({ clubAddress, spadId, spad, loadSpad, creator, password }) => {
    const { address } = useContext(WalletContext)
    const [contribution, setContribution] = useState(0);

    const loadContribution = async() => {
        const data = await getContribution(address, clubAddress, spadId);
        setContribution(data);
    }

    useEffect(() => {
        loadContribution();
    }, [])

    return (
        <div className='flex flex-col items-center justify-between'>
            <h3 className=' mb-6'><span className='font-semibold text-gray-400'>Your Contribution:</span> {formatUSDC(contribution)} USDC</h3>
            {
                parseInt(spad.target) > parseInt(spad.currentInvestment) ?
                <>
                {
                    parseInt(spad.maxInvestment) > parseInt(contribution) &&
                    <Contribute address={address} clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} contribution={contribution} password={password} />
                }
                </> :
                <>
                {
                    spad.targetClaimed ?
                    <ClaimInvestment address={address} clubAddress={clubAddress} spadId={spadId} contribution={contribution} /> :
                    <>
                    {
                        address == creator ?
                        <TokensForDistribution address={address} clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} /> :
                        <>
                            <p className='font-semibold text-lg text-orange-400 mb-4'>Tokens not yet deposited by SpadClub creator (<EtherscanAddress address={creator} />)</p>
                            <Button disabled>Claim Investment</Button>
                        </>
                    }
                        
                    </>
                }
                    
                </>
            }
        </div>
    )
}

export default SpadActions