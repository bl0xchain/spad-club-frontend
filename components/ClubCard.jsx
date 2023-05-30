import React, { useEffect, useState } from 'react'
import { getExcerpt } from '@/helpers/helpers'
import { getClubData } from '@/helpers/spad-club'
import Card from './template/Card'
import DataLoading from './layout/DataLoading'
import EtherscanAddress from './layout/EtherscanAddress'

const ClubCard = ({ clubAddress }) => {
    const [club, setClub] = useState([])
    const [loading, setLoading] = useState(true)

    const loadClub = async() => {
        const data = await getClubData(clubAddress);
        setClub(data);
        setLoading(false);
    }

    useEffect(() => {
        loadClub()
    }, [])

    if(loading) {
        return (
            <Card>
                <DataLoading />
            </Card>
        )
    }

    return (
        <Card href={`/clubs/${clubAddress}`}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                { club.name }
            </h5>
            <p className='text-sm text-gray-500'>
                By {" "}
                <span className='hover:text-gray-800 hover:underline'>
                    <EtherscanAddress address={ club.creator } />
                </span>
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                { getExcerpt(club.description) }
            </p>
        </Card>
    )
}

export default ClubCard