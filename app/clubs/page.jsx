"use client";

import ClubCard from '@/components/ClubCard';
import DataLoading from '@/components/layout/DataLoading';
import Container from '@/components/template/Container';
import WalletContext from '@/context/WalletContext';
import { getClubs } from '@/helpers/spad-club';
import React, { useContext, useEffect, useState } from 'react'

const ClubsPage = () => {
    const [clubs, setClubs] = useState([])
    const [loading, setLoading] = useState(true)
    const { address } = useContext(WalletContext)

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
        <Container>
            <div className='md:grid md:grid-cols-3 gap-4'>
                { clubs.map((clubAddress) => (
                    <ClubCard key={clubAddress} clubAddress={clubAddress} address={address} />
                )) }
            </div>
        </Container>
    )
}

export default ClubsPage