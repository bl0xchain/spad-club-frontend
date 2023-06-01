import WalletContext from '@/context/WalletContext';
import { formatUSDC } from '@/helpers/helpers';
import { getContribution } from '@/helpers/spad-club';
import React, { useContext, useEffect, useState } from 'react'
import Button from '../template/Button';
import Contribute from './Contribute';
import EtherscanAddress from '../layout/EtherscanAddress';
import TokensForDistribution from './TokensForDistribution';
import ClaimInvestment from './ClaimInvestment';

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
            <h3 className='mt-4 mb-2'><span className='font-semibold text-gray-400'>Your Contribution:</span> {formatUSDC(contribution)} USDC</h3>
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
                    spad.externalTokenAdded ? 
                    <>
                    {
                        address == creator &&
                        <p className='text-green-800 text-lg'>SPAD Tokens are added for distribution</p>
                    }
                    <ClaimInvestment address={address} clubAddress={clubAddress} spadId={spadId} contribution={contribution} spad={spad} /> 
                    </>:
                    <>
                    {
                        address == creator ? 
                        <TokensForDistribution address={address} clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} /> :
                        <>
                            <p className='font-semibold text-lg text-orange-400 mb-4'>Tokens not yet deposited by SpadClub creator (<EtherscanAddress address={creator} />)</p>
                            <Button disabled pill={true} className='button-color'>Claim Investment</Button>
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