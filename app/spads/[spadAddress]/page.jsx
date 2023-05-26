"use client";
import DataLoading from '@/components/layout/DataLoading';
import CompletedSpad from '@/components/spads/CompletedSpad';
import CreatorPitch from '@/components/spads/CreatorPitch';
import Participants from '@/components/spads/Participants';
import SpadDetailsCard from '@/components/spads/SpadDetailsCard';
import Container from '@/components/template/Container'
import { getSpadDetails } from '@/helpers/spad';
import React, { useEffect, useState } from 'react'

const SpadPage = ({ params }) => {
    const spadAddress = params.spadAddress;
    const [spad, setSpad] = useState(null);

    const loadSpad = async() => {
        const spadDetails = await getSpadDetails(spadAddress, true);
        setSpad(spadDetails);
    }

    useEffect(() => {
        if(spadAddress !== undefined) {
            loadSpad()
        }
    }, [spadAddress])

    if (spad === null) {
        return (<Container>
            <DataLoading />
        </Container>)
    }

    return (
        <div className='max-w-4xl mx-auto px-10'>
            <SpadDetailsCard spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} />
            {
                (spad.status == 4) &&
                <CompletedSpad spadAddress={spadAddress} spad={spad} />
            }
            {
                spad.isPrivate &&
                <CreatorPitch spadAddress={spadAddress} creator={spad.creator} />
            }
            <hr className='my-10 bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 h-1' />
            <Participants spadAddress={spadAddress} spad={spad} />
        </div>
    )
}

export default SpadPage