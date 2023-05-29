"use client"

import Button from '@/components/template/Button'
import Checkbox from '@/components/template/Checkbox'
import Container from '@/components/template/Container'
import RadioButtons from '@/components/template/RadioButtons'
import Text from '@/components/template/Text'
import TextInput from '@/components/template/TextInput'
import WalletContext from '@/context/WalletContext'
import { startSpad } from '@/helpers/spad-factory'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'

const CreatePublicSpad = () => {
    const [name, setName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [currency, setCurrency] = useState("")
    const [target, setTarget] = useState("")
    const [minInvestment, setMinInvestment] = useState("")
    const [maxInvestment, setMaxInvestment] = useState("")
    const [totalSupply, setTotalSupply] = useState("")
    const [startSpadLoading, setStartSpadLoading] = useState(false)
    const [tnc, setTnc] = useState(false)
    const [disclaimer, setDisclaimer] = useState(false)

    const { address, status } = useContext(WalletContext)
    const router = useRouter()

    const currencyOptions = [
        { "key": "", "value": "ETH" },
        { "key": "0x6e557F271447FD2aA420cbafCdCD66eCDD5A71A8", "value": "USDC" },
        { "key": "0x02adaF2718cdc07503d66212f9EE850C813638EC", "value": "DAI" },
    ]

    const currencyNames = {
        "": "ETH",
        "0x6e557F271447FD2aA420cbafCdCD66eCDD5A71A8": "USDC",
        "0x02adaF2718cdc07503d66212f9EE850C813638EC": "DAI",
    }

    const handleStartSpad = async (e) => {
        e.preventDefault();
        if(status !== 'CONNECTED') {
            toast.error("Please connect your wallet first");
            return;
        }
        if(name === '' || tokenSymbol === '' || target === '' || minInvestment === '' || maxInvestment === '') {
            toast.error("All fields are compulsory");
            return;
        }
        if(Number(minInvestment) >= Number(maxInvestment)) {
            toast.error("Minimum investment amount should be less than maximum investment");
            return;
        }
        if(Number(maxInvestment) >= Number(target)) {
            toast.error("Maximum investment amount should be less than SPAD size");
            return;
        }
        if(!tnc || !disclaimer) {
            toast.error("Please accept terms and diclaimer");
            return;
        }
        if(Number(minInvestment) < (Number(target * 1.02 / 100))) {
            toast.error("Due to the limitation of 99 members per spad, we recommend the min contribution to be 1.02% of SPAD Size");
            return;
        }

        setStartSpadLoading(true);
        const response = await startSpad(address, name, tokenSymbol, target, minInvestment, maxInvestment, currency, "");
        if (response.code == 200) {
            toast.success("Spad is created");
            router.push(`/spads/${response.data.events.SpadCreated.returnValues.spadAddress}`)
        } else {
            toast.error(response?.status)
        }
        setStartSpadLoading(false);
    }

    return (
        <Container>
            <div className='text-center'>
                <p className="font-semibold mb-2 text-slate-400">LETS GET STARTED</p>
                <Text className="uppercase font-bold text-2xl">Start a public SPAD</Text>
            </div>
            
            <form className='bg-white mx-auto mt-16 rounded-lg border max-w-2xl sm:mt-20 p-8 shadow-xl' onSubmit={handleStartSpad}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3 mb-6">
                    <div className='sm:col-span-2'>
                        <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900'>
                            SPAD NAME
                        </label>
                        <TextInput
                            id="name"
                            placeholder="Name your Spad (10 characters)"
                            required={true}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="tokenSymbol" className='block mb-2 text-sm font-medium text-gray-900'>
                            SPAD TOKEN SYMBOL
                        </label>
                        <TextInput
                            id="tokenSymbol"
                            placeholder="Symbol (max 5 characters)"
                            required={true}
                            value={tokenSymbol}
                            onChange={(e) => setTokenSymbol(e.target.value)}
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="currency" className='block mb-2 text-sm font-medium text-gray-900'>
                            CURRENCY
                        </label>
                        <RadioButtons name="currency" options={currencyOptions} setValue={setCurrency} />
                    </div>
                    <div className=''>
                        <label htmlFor="target" className='block mb-2'>
                            &nbsp;
                        </label>
                        <label htmlFor="target" className='block mb-2 text-sm font-medium text-gray-900'>
                            TOTAL SPAD SIZE
                        </label>
                        <TextInput
                            id="target"
                            type="number"
                            placeholder="100"
                            required={true}
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            suffix={currencyNames[currency]}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className='block mb-2 text-center text-sm font-medium text-gray-900'>
                            PARTICIPATION AMOUNT
                        </label>
                        <div className='flex gap-x-8'>
                            <div className='flex-1'>
                                <label htmlFor="minInvestment" className='block mb-2 text-sm font-medium text-gray-900'>
                                    MINIMUM
                                </label>
                                <TextInput
                                    id="minInvestment"
                                    type="number"
                                    placeholder="0.1"
                                    step="0.1"
                                    required={true}
                                    value={minInvestment}
                                    onChange={(e) => setMinInvestment(e.target.value)}
                                    suffix={currencyNames[currency]}
                                />
                            </div>
                            <div className='flex-1'>
                                <label htmlFor="maxInvestment" className='block mb-2 text-sm font-medium text-gray-900'>
                                    MAXIMUM
                                </label>
                                <TextInput
                                    id="maxInvestment"
                                    type="number"
                                    placeholder="5"
                                    step="0.1"
                                    required={true}
                                    value={maxInvestment}
                                    onChange={(e) => setMaxInvestment(e.target.value)}
                                    suffix={currencyNames[currency]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-start-2">
                        <label htmlFor="totalSupply" className='block mb-2 text-sm font-medium text-gray-900'>
                            TOTAL SUPPLY OF TOKEN
                        </label>
                        <TextInput
                            id="totalSupply"
                            type="number"
                            placeholder="100"
                            required={true}
                            value={totalSupply}
                            onChange={(e) => setTotalSupply(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mb-6'>
                    <p className='mb-2 text-sm font-medium text-gray-900 text-center'>
                        CONTRIBUTION BY CREATOR TO ACTIVATE SPAD
                    </p>
                    <p className='text-center'>
                        10% of SPAD SIZE = {" "}
                        {
                            target !== "" ? (target / 10) : "10"
                        } {" "}
                        {currencyNames[currency]}
                    </p>
                </div>
                <div className='mb-6'>
                    <Checkbox 
                        id="tnc" 
                        label="I understand, I will need to contribute 10% to activate SPAD" 
                        onChange={
                            () => {
                                setTnc(!tnc);
                            }
                        } 
                        defaultChecked={tnc}
                    />
                </div>
                <div className='mb-6'>
                    <Checkbox 
                        id="disclaimer" 
                        label="I declare, I am not a resident of Afgahnistan, Cuba, Crimea, Congo, Iran, Iraq, Russia, Venezuela and United States" 
                        onChange={
                            () => {
                                setDisclaimer(!disclaimer);
                            }
                        } 
                        defaultChecked={disclaimer}
                    />
                </div>
                {
                    startSpadLoading ?
                    <Button className="mx-auto" disabled isProcessing={true}>STARTING A SPAD</Button> :
                    <Button type="submit" className="mx-auto">START A SPAD</Button>
                }
                
            </form>
        </Container>
    )
}

export default CreatePublicSpad