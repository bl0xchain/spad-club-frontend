"use client";

import PortfolioClubSpad from '@/components/spad/PortfolioClubSpad';
import PortfolioSpad from '@/components/spads/PortfolioSpad';
import PortfolioSpad2 from '@/components/spads/PortfolioSpad2';
import Card from '@/components/template/Card';
import Container from '@/components/template/Container'
import Text from '@/components/template/Text';
import WalletContext from '@/context/WalletContext'
import { getContributedSpads, getPitchedSpads } from '@/helpers/actions'
import { getSpadClubs } from '@/helpers/spad-club';
import { getCreatedPrivateSpads, getCreatedSpads } from '@/helpers/spad-factory'
import React, { useContext, useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

const PortfolioPage = () => {
    const [createdSpads, setCreatedSpads] = useState([])
    const [investedSpads, setInvestedSpads] = useState([])
    const [pitchedSpads, setPitchedSpads] = useState([])
    const [privateSpads, setPrivateSpads] = useState([])
    const [clubSpads, setClubSpads] = useState([])

    const { address } = useContext(WalletContext)

    useEffect(() => {
        async function fetchData() {
            const spadAddresses = await getCreatedSpads(address);
            setCreatedSpads(spadAddresses);
            const spadAddresses1 = await getContributedSpads(address);
            setInvestedSpads(spadAddresses1);
            const spadAddresses2 = await getPitchedSpads(address);
            setPitchedSpads(spadAddresses2);
            const spadAddresses3 = await getCreatedPrivateSpads(address);
            setPrivateSpads(spadAddresses3);
            const clubs = await getSpadClubs(address);
            console.log(clubs);
            setClubSpads(clubs);
        }

        if (address !== '') {
            fetchData();
        }

    }, [address])

    if (address == "") {
        return (
            <Container>
                <h1 className='my-10 text-amber-600 text-2xl text-center'>Please connect your wallet</h1>
            </Container>
        )
    }

    return (
        <Container className="max-w-5xl">
            {
                (clubSpads.length > 0) &&
                <>
                    <h2 className="text-2xl font-bold mb-4"><Text>ClubSpads</Text></h2>
                    <div className='flex gap-5 mb-10'>
                        {
                            clubSpads.map((clubSpad, i) => {
                                return <>
                                    {
                                        clubSpad.spadIds.map((spadId) => {
                                            return <div key={`${clubSpad.clubAddress}-${spadId}`} className='w-80'>
                                                <PortfolioClubSpad address={address} clubAddress={clubSpad.clubAddress} spadId={spadId}>
                                                    {spadId}
                                                </PortfolioClubSpad>
                                            </div>
                                        })
                                    }
                                </>
                            })
                        }
                    </div>
                </>
            }
            {
                (investedSpads.length > 0) &&
                <>
                    <h2 className="font-bold text-2xl mb-4"><Text>INVESTED SPADs</Text></h2>
                    <div className='flex gap-5 mb-10'>
                        {investedSpads.map(function (spadAddress, i) {
                            return <div key={spadAddress} className='w-80'>
                                <PortfolioSpad2 address={address} spadAddress={spadAddress} isInitiator={false} />
                            </div>
                        })
                        }
                    </div>
                </>
            }
            {
                (createdSpads.length > 0) &&
                <>
                    <h2 className="font-bold text-2xl mb-4"><Text>CREATED SPADs</Text></h2>
                    <div className='flex gap-5 mb-10'>
                        {createdSpads.map(function (spadAddress, i) {
                            return <div key={spadAddress} className='w-80'>
                                <PortfolioSpad2 address={address} spadAddress={spadAddress} isInitiator={true} />
                            </div>
                        })
                        }
                    </div>
                </>
            }
            {
                (privateSpads.length > 0) &&
                <>
                    <h2 className="font-bold text-2xl mb-4"><Text>Private SPADs</Text></h2>
                    <div className='flex gap-5 mb-10'>
                        {privateSpads.map(function (spadAddress, i) {
                            return <div key={spadAddress} className='w-80'>
                                <PortfolioSpad2 address={address} spadAddress={spadAddress} isInitiator={false} />
                            </div>
                        })
                        }
                    </div>
                </>
            }
            {
                (pitchedSpads.length > 0) &&
                <>
                    <h2 className="font-bold text-2xl mb-4"><Text>PITCHED SPADs</Text></h2>
                    <div className='flex gap-5 mb-10'>
                        {pitchedSpads.map(function (spadAddress, i) {
                            return <div key={spadAddress} className='w-80'>
                                <PortfolioSpad2 address={address} spadAddress={spadAddress} isInitiator={false} />
                            </div>
                        })
                        }
                    </div>
                </>
            }
            {
                (investedSpads.length === 0 && createdSpads.length === 0 && pitchedSpads.length === 0 && privateSpads.length == 0) &&
                <div className="text-center mt-0">
                    <FaExclamationTriangle className="text-4xl mx-auto text-amber-500 mb-3 mt-5" />
                    <h2 className='text-2xl'>
                        You do not have SPAD in your portfolio
                    </h2>
                </div>
            }
        </Container>
    )
}

export default PortfolioPage