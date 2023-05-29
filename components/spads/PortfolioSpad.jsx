import { isInvestmentClaimed } from '@/helpers/fund';
import { getPitch } from '@/helpers/pitch';
import { getSpadDetails } from '@/helpers/spad';
import React, { useEffect, useState } from 'react'
import DataLoading from '../layout/DataLoading';
import Link from 'next/link';
import EtherscanAddress from '../layout/EtherscanAddress';
import { FaDotCircle } from 'react-icons/fa';

const PortfolioSpad = ({ address, spadAddress, isInitiator, isPitcher }) => {
    const [spad, setSpad] = useState(null);
    const [claimProcessing, setClaimProcessing] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [pitch, setPitch] = useState(null);

    const spadStatus = {
        1: 'pending',
        2: 'open',
        3: 'expired',
        4: 'closed',
        5: 'acquired'
    }

    const pitchStatus = {
        0: 'invalid',
        1: 'proposed',
        2: 'approved',
        3: 'rejected',
        4: 'selected',
    }

    const loadSpad = async () => {
        const spadDetails = await getSpadDetails(spadAddress, true);
        setSpad(spadDetails);

        if (spadDetails.status == 5) {
            const isClaimed = await isInvestmentClaimed(address, spadAddress);
            setIsClaimed(isClaimed);
        }

        if (isPitcher) {
            const pitch1 = await getPitch(address, spadAddress);
            setPitch(pitch1);
        }
    }

    useEffect(() => {
        if (spadAddress && address) {
            loadSpad();
        }
    }, [spadAddress, address])

    if (spad == null) {
        return <DataLoading />;
    }

    return (
        <tr>
            <td className='pt-4'>
                <Link href={"/spads/" + spadAddress}>
                    {spad.name}
                </Link>
            </td>
            {
                !isPitcher &&
                <td className='pt-4'>
                    {spad.symbol}
                </td>
            }
            <td className='pt-4'>
                <EtherscanAddress address={spadAddress} icon={true} />
            </td>
            <td className="uppercase spad-feature-list pt-4">
                <FaDotCircle className={`${spadStatus[spad.status]} inline-block`} /> {" "}
                {spadStatus[spad.status]}
            </td>
            {
                (isPitcher && pitch) &&
                <td className="uppercase pt-4">
                    {pitchStatus[pitch.status]}
                </td>
            }
        </tr>
    )
}

export default PortfolioSpad