import { getClubData, getSpadDetails } from '@/helpers/spad-club'
import React, { useEffect, useState } from 'react'
import Card from '../template/Card'
import DataLoading from '../layout/DataLoading'
import Text from '../template/Text'
import { formatUSDC, getExcerpt } from '@/helpers/helpers'
import ProgressBar from '../template/ProgressBar'
import Button from '../template/Button'
import Button2 from '../template/Button2'

const PortfolioClubSpad = ({ address, clubAddress, spadId }) => {
    const [club, setClub] = useState(null)
    const [spad, setSpad] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentInvestment, setCurrentInvestment] = useState(0)

    const loadClub = async () => {
        const data = await getClubData(clubAddress);
        setClub(data);
    }

    const loadSpad = async () => {
        setLoading(true);
        const data = await getSpadDetails(address, clubAddress, spadId, "");
        setSpad(data);
        const investmentPct = (parseInt(data.currentInvestment) * 100 / parseInt(data.target))
        setCurrentInvestment(investmentPct);
        setLoading(false);
    }

    useEffect(() => {
        loadClub()
        loadSpad()
    }, [])

    if (spad == null) {
        return (
            <Card>
                <DataLoading />
            </Card>
        )
    }
    return (
        <Card>
            <div>
                <h2 className='text-xl font-bold mb-0'>
                    <Text>{spad?.spadName}</Text>

                </h2>
                <p className="font-normal text-gray-400 mb-2">
                    {club?.name}
                </p>
                <div className='mb-4'>
                    <ProgressBar progress={currentInvestment} />
                    <p className='text-sm text-end'>
                        {`${formatUSDC(spad.currentInvestment)} / ${formatUSDC(spad.target)} USDC`}
                    </p>
                </div>
            </div>
            <div className='inline-block mx-auto'>
                <Button href={`/clubs/${clubAddress}/${spadId}`} className="mx-auto">Go to SPAD</Button>
            </div>
        </Card>
    )
}

export default PortfolioClubSpad