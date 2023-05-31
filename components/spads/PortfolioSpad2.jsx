import { isInvestmentClaimed } from '@/helpers/fund';
import { getPitch } from '@/helpers/pitch';
import { getSpadDetails } from '@/helpers/spad';
import React, { useEffect, useState } from 'react'
import DataLoading from '../layout/DataLoading';
import Link from 'next/link';
import EtherscanAddress from '../layout/EtherscanAddress';
import { FaDotCircle } from 'react-icons/fa';
import Card from '../template/Card';
import ProgressBar from '../template/ProgressBar';
import Button from '../template/Button';
import Text from '../template/Text';

const PortfolioSpad2 = ({ address, spadAddress, isInitiator, isPitcher }) => {
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
        return <Card>
            <DataLoading />
        </Card>;
    }

    return (
        <Card className="relative">
            <div>
                <p className={`spad-feature-list uppercase text-sm absolute top-0 right-0 px-1`}>
                    <span className={spadStatus[spad.status]}>{spadStatus[spad.status]}</span>
                </p>
                <h2 className='text-xl font-bold mb-0'>
                    <Text>{spad.name}</Text>

                </h2>
                <p className="font-normal text-gray-400 mb-2">
                    {spad.symbol}
                </p>
                <div className='mb-4'>
                    <ProgressBar progress={spad.currentInvstPercent} />
                    <p className='text-sm text-end'>
                        {`${spad.currentInvestmentView} / ${spad.targetView} ${spad.investmentCurrency}`}
                    </p>
                </div>
            </div>
            <div className='inline-block mx-auto'>
                <Button href={`/spads/${spadAddress}`}>Go to SPAD</Button>
            </div>
        </Card>
    )
}

export default PortfolioSpad2