"use client";

import ClubCard from '@/components/ClubCard';
import DataLoading from '@/components/DataLoading';
import { getClubs } from '@/helpers/tokenClub';
import React, { useEffect, useState } from 'react'

const ClubsPage = () => {
    const [clubs, setClubs] = useState([])
    const [loading, setLoading] = useState(true)

    const loadClubs = async() => {
        const data = await getClubs();
        setClubs(data);
        setLoading(false);
    }

    useEffect(() => {
        loadClubs()
    }, [])

    if(loading) {
        return <DataLoading />
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            { clubs.map((clubAddress) => (
                <ClubCard key={clubAddress} clubAddress={clubAddress} />
            )) }
        </div>
    )
}

export default ClubsPage