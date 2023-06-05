"use client";

import DataLoading from '@/components/layout/DataLoading';
import Disclaimer from '@/components/layout/Disclaimer';
import EtherscanAddress from '@/components/layout/EtherscanAddress';
import SpadActions from '@/components/spad/SpadActions';
import Share from '@/components/spads/Share';
import Breadcrumb from '@/components/template/Breadcrumb';
import Button from '@/components/template/Button';
import Card from '@/components/template/Card';
import ProgressBar from '@/components/template/ProgressBar';
import Text from '@/components/template/Text';
import TextInput from '@/components/template/TextInput';
import WalletContext from '@/context/WalletContext';
import { formatEther, formatUSDC } from '@/helpers/helpers';
import { getClubData, getSpadDetails } from '@/helpers/spad-club';
import React, { useContext, useEffect, useState } from 'react'
import { FaHome, FaMinus } from 'react-icons/fa';
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
        <div className='max-w-4xl mx-auto px-2'>
            {
                (club && spad) &&
                <Breadcrumb items={[
                    { name: 'Home', link: '/', type: 'home' },
                    { name: 'Clubs', link: '/clubs', type: 'link' },
                    { name: club.name, link: `/clubs/${clubAddress}`, type: 'link' },
                    { name: `${spad.spadName}`, link: `/clubs/${clubAddress}/${spadId}`, type: 'page' },
                ]}></Breadcrumb>
            }
            {
                spad == null || spad?.error ?
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
                                        <Button isProcessing={true} disabled>
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
                    <> {spad && club && <>
                        <Card noPadding={true} className={`pb-4`}>
                            <div className="relative rounded-xl bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 p-5 text-white">
                                <Share />
                                <div className='mt-2'>
                                    <h2 className="font-bold text-4xl mb-4">{spad.spadName}</h2>
                                    <p className='text-lg'>{spad?.spadDescription}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 my-5 font-bold px-2 md:px-0'>
                                <div className='text-gray-500'>
                                    SPAD CREATOR
                                </div>
                                <div className='md:col-span-3'>
                                    <EtherscanAddress address={club.creator} icon={true} />
                                </div>
                                <div className='text-gray-500'>CURRENCY</div>
                                <div>
                                    USDC
                                </div>
                                <div className='text-gray-500'>CONTRIBUTION RANGE</div>
                                <div className=' flex items-center gap-3'>
                                    {formatUSDC(spad?.minInvestment)} {" USDC"}
                                    {" "} <FaMinus /> {" "}
                                    {formatUSDC(spad?.maxInvestment)} {" USDC"}
                                </div>
                                <div className='text-gray-500'>
                                    Target
                                </div>
                                <div>
                                    {formatUSDC(spad?.target)} {" "} USDC
                                </div>
                                <div className='text-gray-500'>
                                    Valuation
                                </div>
                                <div>
                                    {formatUSDC(spad?.valuation)} {" "} USDC
                                </div>
                                <div className='text-gray-500'>
                                    Carry
                                </div>
                                <div>
                                    {spad?.carry} {" "} %
                                </div>
                                <div className='text-gray-500'>
                                    External Token
                                </div>
                                <div>
                                    <span className='hover:text-purple-500'>
                                        <EtherscanAddress address={spad?.externalToken} text={`${spad.token.name} (${spad.token.symbol})`} icon={true} />
                                    </span>
                                </div>
                                <div className='text-gray-500'>SPAD PROGRESS</div>
                                <div className='col-span-2 md:col-span-3'>
                                    <ProgressBar progress={currentInvestment} />
                                    <div className='flex justify-between'>
                                        <Text>{currentInvestment}% Contribution done</Text>
                                        <div>
                                            {formatUSDC(spad?.minInvestment)}/
                                            {formatUSDC(spad?.target)}
                                            {" USDC"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                club &&
                                <SpadActions clubAddress={clubAddress} spadId={spadId} spad={spad} loadSpad={loadSpad} creator={club.creator} password={password} />
                            }
                        </Card>
                        <div className='mt-4 text-gray-600'>
                            <Disclaimer />
                        </div>
                    </>}
                    </>
            }
        </div>
    )
}

export default SpadPage