"use client";

import DataLoading from '@/components/layout/DataLoading';
import EtherscanAddress from '@/components/layout/EtherscanAddress';
import SpadActions from '@/components/spad/SpadActions';
import Button from '@/components/template/Button';
import Card from '@/components/template/Card';
import ProgressBar from '@/components/template/ProgressBar';
import TextInput from '@/components/template/TextInput';
import WalletContext from '@/context/WalletContext';
import { formatEther, formatUSDC } from '@/helpers/helpers';
import { getClubData, getSpadDetails } from '@/helpers/spadClub';
import React, { useContext, useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SpadPage = ({ params }) => {
    const clubAddress = params.clubAddress;
    const spadId = params.spadId;
    const { address } = useContext(WalletContext)
    const [club, setClub] = useState(null)
    const [spad, setSpad] = useState(null)
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [currentInvestment, setCurrentInvestment] = useState(0)

    const loadClub = async () => {
        const data = await getClubData(clubAddress);
        setClub(data);
    }

    const loadSpad = async () => {
        setLoading(true);
        const data = await getSpadDetails(address, clubAddress, spadId, password);
        setSpad(data);
        const investmentPct = (parseInt(data.currentInvestment) * 100 / parseInt(data.target))
        setCurrentInvestment(investmentPct);
        setLoading(false);
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSubmiting(true)
        const data = await getSpadDetails(address, clubAddress, spadId, password);
        setSpad(data);
        const investmentPct = (parseInt(data.currentInvestment) * 100 / parseInt(data.target))
        setCurrentInvestment(investmentPct);
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

    useEffect(() => {
        loadClub()
    }, [])

    if (loading) {
        return (
            <DataLoading />
        )
    }
    return (
        <div className='max-w-4xl' style={{ margin: "0 auto" }}>
            {
                club &&
                <></>
            }
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
                    <> {spad && <>
                        <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {spad?.spadName}
                        </h5>
                        <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
                            {spad?.spadDescription}
                        </p>
                        <div className="grid grid-cols-4 gap-4 mb-5">
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Target</h4>
                                {formatUSDC(spad?.target)} {" "} USDC
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Valuation</h4>
                                {formatUSDC(spad?.valuation)} {" "} USDC
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Investment Range</h4>
                                {`${formatUSDC(spad?.minInvestment)} - ${formatUSDC(spad?.maxInvestment)} USDC`}
                            </div>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-400'>Carry</h4>
                                {spad?.carry} {" "} %
                            </div>
                        </div>
                        <div className='mb-5'>
                            <h4 className='text-sm font-semibold text-gray-400'>External Token</h4>
                            <div className='inline hover:text-blue-700'>
                                <EtherscanAddress address={spad?.externalToken} text={`${spad.token.name} (${spad.token.symbol})`} icon={true} />
                            </div>
                        </div>
                        <div className='max-w-md mx-auto mb-10'>
                            <h4 className='text-sm font-semibold text-gray-400 mb-1'>Current Investment</h4>
                            <ProgressBar progress={currentInvestment} />
                        </div>
                        {
                            club &&
                            <SpadActions clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} creator={club.creator} password={password} />
                        }
                    </>}
                    </>
            }
        </div>
    )
}

export default SpadPage