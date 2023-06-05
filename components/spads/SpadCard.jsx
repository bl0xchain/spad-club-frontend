import { getSpadDetails } from '@/helpers/spad'
import React, { useEffect, useState } from 'react'
import Card from '../template/Card'
import DataLoading from '../layout/DataLoading'
import Link from 'next/link'
import Text from '../template/Text'
import ProgressBar from '../template/ProgressBar'
import Decimal from 'decimal.js-light'
import SpadActions from './SpadActions'

const SpadCard = ({ spadAddress }) => {
    const [spad, setSpad] = useState(null)
    const [creatorContriPct, setCreatorContriPct] = useState(10)

    const spadStatus = {
        1: 'pending',
        2: 'open',
        3: 'expired',
        4: 'closed',
        5: 'acquired'
    }

    const loadSpad = async () => {
        const spadDetails = await getSpadDetails(spadAddress, true);
        setSpad(spadDetails);
        if (spadDetails.creatorContribution > 0) {
            setCreatorContriPct((Math.round((spadDetails.creatorContributionView / spadDetails.targetView) * 10000) / 100));
        }
    }

    useEffect(() => {
        loadSpad()
    }, [])

    if (spad === null) {
        return (<Card>
            <DataLoading />
        </Card>)
    }

    return (
        <Card className='relative text-gray-700 mb-4 md:mb-0'>
            <div className={"spad-status " + spadStatus[spad.status]}>{spadStatus[spad.status]}</div>
            <Link href={`/spads/${spadAddress}`}>
                <Text className='font-bold'>{spad.name}</Text>
            </Link>
            <div className="text-center text-gray-400 font-semibold text-2xl">{spad.symbol}</div>
            <div className="my-4">
                <ProgressBar progress={spad.currentInvstPercent} />
                <div className='flex justify-between'>
                    <div className="text-sm">
                        <b>{spad.currentInvstPercent}%</b> Contribution done
                    </div>
                    <div className="text-sm">
                        Remaining: <b>{Decimal(spad.targetView).minus(spad.currentInvestmentView).toString()} {spad.investmentCurrency}</b>
                    </div>
                </div>
            </div>
            <div className='flex justify-between my-4'>
                <div className='flex-none text-center'>
                    <div className="text-sm font-bold">TOTAL HOLDERS</div>
                    <div className='mt-3 text-xl'>{spad.investorCount}</div>
                </div>
                <div className='flex-auto text-center'>
                    <div className="text-sm font-bold">CONTRIBUTION RANGE</div>
                    <div className='flex justify-between mt-2'>
                        <div className='flex-auto'>
                            <div className="text-xl text-blue-400">{spad.minInvestmentView} {" "} {spad.investmentCurrency}</div>
                            <div className="text-xs text-gray-400">Minimum</div>
                        </div>
                        <div className='flex-auto'>
                            <div className="text-xl text-blue-400">{spad.maxInvestmentView} {" "} {spad.investmentCurrency}</div>
                            <div className="text-xs text-gray-400">Maximum</div>
                        </div>
                    </div>
                </div>
            </div>
            <SpadActions spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} />
        </Card>
    )
}

export default SpadCard