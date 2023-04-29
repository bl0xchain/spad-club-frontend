"use client";

import DataLoading from '@/components/DataLoading'
import EtherscanAddress from '@/components/EtherscanAddress';
import SpadActions from '@/components/SpadActions';
import WalletContext from '@/context/WalletContext';
import { formatUSDC } from '@/helpers/helpers';
import { getSpadDetails } from '@/helpers/tokenClub'
import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const SpadPage = ({ params }) => {
    const clubAddress = params.clubAddress;
    const spadId = params.spadId;
    const { address } = useContext(WalletContext)
    const [spad, setSpad] = useState(null)
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submiting, setSubmiting] = useState(false)

    const loadSpad = async () => {
        setLoading(true);
        const data = await getSpadDetails(address, clubAddress, spadId, password);
        setSpad(data);
        setLoading(false);
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        const data = await getSpadDetails(address, clubAddress, spadId, password);
        setSpad(data);
        if (data.error) {
            toast.error("Invalid Password. Please try again.")
        }
        setSubmiting(false)
    }

    useEffect(() => {
        if (address) {
            loadSpad()
        }
    }, [address])

    if (loading) {
        return (
            <DataLoading />
        )
    }
    return (
        <div className='max-w-4xl' style={{ margin: "0 auto" }}>
            {
                address == "" || spad?.error ?
                    <div className="max-w-sm m-auto mt-10">
                        <Card>
                            <form className="flex flex-col gap-4">
                                <h3 className='text-xl font-semibold mb-5'>Please enter password to view SPAD</h3>
                                <div className='mb-5'>
                                    <TextInput
                                        id="password"
                                        type='password'
                                        placeholder="Password"
                                        required={true}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {
                                    submiting ?
                                        <Button isProcessing={true}>
                                            Submiting
                                        </Button> :
                                        <Button type='submit' onClick={handlePasswordSubmit}>
                                            Submit
                                        </Button>
                                }
                            </form>
                        </Card>
                    </div>
                    :
                    <> { spad && <>
                        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {spad?.spadName}
                        </h5>
                        <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
                            {spad?.spadDescription}
                        </p>
                        <div class="grid grid-cols-4 gap-4 mb-5">
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Target</h4>
                                { formatUSDC(spad?.target) } {" "} USDC
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Valuation</h4>
                                { formatUSDC(spad?.valuation) } {" "} USDC
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Investment Range</h4>
                                { `${formatUSDC(spad?.minInvestment)} - ${formatUSDC(spad?.maxInvestment)} USDC` }
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Carry</h4>
                                { spad?.carry } {" "} %
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h4 className='text-sm font-semibold text-gray-400'>External Token</h4>
                            <div className='inline hover:text-blue-700'>
                                <EtherscanAddress address={spad?.externalToken} text={`${spad.token.name} (${spad.token.symbol})`} icon={true}/>
                            </div>
                        </div>
                        <SpadActions clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad}  />
                        </> }
                    </>
            }
        </div>
    )
}

export default SpadPage