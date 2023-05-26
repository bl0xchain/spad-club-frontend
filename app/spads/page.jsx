"use client"

import DataLoading from '@/components/layout/DataLoading'
import SpadCard from '@/components/spads/SpadCard'
import Container from '@/components/template/Container'
import { getAllSpads } from '@/helpers/spad-factory'
import React, { useEffect, useState } from 'react'

const SpadsPage = () => {
    const [spadAddresses, setSpadAddresses] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadSpadAddresses = async() => {
        setLoading(true);
        const addresses = await getAllSpads();
        setSpadAddresses(addresses);
        setLoading(false);
    }

    useEffect(() => {
        loadSpadAddresses();
    }, [])

    if(loading) {
        return <DataLoading />
    }

    return (
        <Container>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                { spadAddresses.map((spadAddress) => (
                    <SpadCard key={spadAddress} spadAddress={spadAddress} />
                )) }
            </div>
        </Container>
    )
}

export default SpadsPage