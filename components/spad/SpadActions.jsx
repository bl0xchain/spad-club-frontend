import WalletContext from '@/context/WalletContext';
import { formatUSDC } from '@/helpers/helpers';
import { getContribution } from '@/helpers/tokenClub';
import React, { useContext, useEffect, useState } from 'react'
import Contribute from './Contribute';
import ClaimTarget from './ClaimTarget';
import ClaimInvestment from './ClaimInvestment';

const SpadActions = ({ clubAddress, spadId, spad, loadSpad, creator }) => {
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
                    <Contribute address={address} clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} contribution={contribution} />
                }
                </> :
                <>
                {
                    spad.targetClaimed ?
                    <ClaimInvestment address={address} clubAddress={clubAddress} spadId={spadId} contribution={contribution} /> :
                    <>
                    {
                        address == creator ?
                        <ClaimTarget address={address} clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} /> :
                        <p className='font-semibold text-lg text-orange-400'>Target is not yet claimed</p>
                    }
                        
                    </>
                }
                    
                </>
            }
        </div>
    )
}

export default SpadActions