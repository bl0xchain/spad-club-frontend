"use client";

import PortfolioSpad from '@/components/spads/PortfolioSpad';
import Card from '@/components/template/Card';
import Container from '@/components/template/Container'
import Text from '@/components/template/Text';
import WalletContext from '@/context/WalletContext'
import { getContributedSpads, getPitchedSpads } from '@/helpers/actions'
import { getCreatedPrivateSpads, getCreatedSpads } from '@/helpers/spad-factory'
import React, { useContext, useEffect, useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

const PortfolioPage = () => {
    const [createdSpads, setCreatedSpads] = useState([])
    const [investedSpads, setInvestedSpads] = useState([])
    const [pitchedSpads, setPitchedSpads] = useState([])
    const [privateSpads, setPrivateSpads] = useState([])

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
        <Container className="max-w-3xl">
            {
                (investedSpads.length > 0) &&
                <Card className="rounded font-bold p-4 mb-5 shadow-lg">
                    <h2 className="font-bold text-2xl inline-block"><Text>INVESTED SPADs</Text></h2>
                    <table className='text-left mb-4'>
                        <thead>
                            <tr className="text-gray-500">
                                <th>SPAD NAME</th>
                                <th>SPAD SYMBOL</th>
                                <th>ADDRESS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investedSpads.map(function (spadAddress, i) {
                                return <PortfolioSpad address={address} spadAddress={spadAddress} key={i} isInitiator={false} />
                            })
                            }
                        </tbody>
                    </table>
                </Card>
            }
            {
                (createdSpads.length > 0) &&
                <Card className="rounded font-bold p-4 mb-5 shadow-lg">
                    <h2 className="font-bold text-2xl inline-block"><Text>CREATED SPADs</Text></h2>
                    
                    <table borderless className='text-left mb-4'>
                        <thead>
                            <tr className="text-gray-500">
                                <th>SPAD NAME</th>
                                <th>SPAD SYMBOL</th>
                                <th>ADDRESS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {createdSpads.map(function (spadAddress, i) {
                                return <PortfolioSpad address={address} spadAddress={spadAddress} key={i} isInitiator={true} />
                            })
                            }
                        </tbody>
                    </table>
                </Card>
            }
            {
                (privateSpads.length > 0) &&
                <Card className="rounded font-bold p-4 mb-5 shadow-lg">
                    <h2 className="font-bold text-2xl inline-block"><Text>Your Private SPADs</Text></h2>
                    <table borderless className='text-left mb-4'>
                        <thead>
                            <tr className="text-gray-500">
                                <th>SPAD NAME</th>
                                <th>SPAD SYMBOL</th>
                                <th>ADDRESS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {privateSpads.map(function (spadAddress, i) {
                                return <PortfolioSpad address={address} spadAddress={spadAddress} key={i} isInitiator={true} />
                            })
                            }
                        </tbody>
                    </table>
                </Card>
            }
            {
                (pitchedSpads.length > 0) &&
                <Card className="rounded font-bold p-4 mb-5 shadow-lg">
                    <h2 className="font-bold text-2xl inline-block"><Text>PITCHED SPADs</Text></h2>
                    <table borderless className='text-left mb-4'>
                        <thead>
                            <tr className="text-gray-500">
                                <th>SPAD NAME</th>
                                <th>ADDRESS</th>
                                <th>STATUS</th>
                                <th>PITCH STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pitchedSpads.map(function (spadAddress, i) {
                                return <PortfolioSpad address={address} spadAddress={spadAddress} key={i} isPitcher={true} />
                            })
                            }
                        </tbody>
                    </table>
                </Card>
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