import { getAllSpads } from '@/helpers/spad-factory'
import React, { useEffect, useState } from 'react'
import DataLoading from '../layout/DataLoading'
import SpadCard from './SpadCard'
import Disclaimer from '../layout/Disclaimer'

const PublicSpads = () => {
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
        <>
        <div className='mb-5 bg-rose-100 text-rose-500 rounded-xl px-3 py-2'>
            <Disclaimer />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            { spadAddresses.map((spadAddress) => (
                <SpadCard key={spadAddress} spadAddress={spadAddress} />
            )) }
        </div>
        </>
    )
}

export default PublicSpads