"use client";

import DataLoading from '@/components/layout/DataLoading';
import EtherscanAddress from '@/components/layout/EtherscanAddress';
import SpadDetailsCard from '@/components/spads/SpadDetailsCard';
import Button from '@/components/template/Button';
import Card from '@/components/template/Card';
import Container from '@/components/template/Container';
import RadioButtons from '@/components/template/RadioButtons';
import Text from '@/components/template/Text';
import TextArea from '@/components/template/TextArea';
import TextInput from '@/components/template/TextInput';
import WalletContext from '@/context/WalletContext';
import { pitchSpad } from '@/helpers/actions';
import { getContribution } from '@/helpers/fund';
import { getPitch } from '@/helpers/pitch';
import { getSpadDetails } from '@/helpers/spad';
import { getCurrencyContract, getDecimals, getFromDecimals } from '@/helpers/tokens';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const PitchPage = ({ params }) => {
    const spadAddress = params.spadAddress;

    const [spad, setSpad] = useState(null);
    const [contribution, setContribution] = useState(0);
    const [pitch, setPitch] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tokenType, setTokenType] = useState('');
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [pitchProcessing, setPitchProcessing] = useState(false);

    const { address, status } = useContext(WalletContext)

    const tokenOptions = [
        { key: 'spad_token', value: `${spad?.symbol} Token` },
        { key: 'external_token', value: `External Token` }
    ]

    const loadSpad = async () => {
        const spadDetails = await getSpadDetails(spadAddress);
        setSpad(spadDetails);
    }

    const handlePitch = async (e) => {
        e.preventDefault();
        if (status !== 'CONNECTED') {
            toast.error("Please connect wallet");
            return;
        }
        setPitchProcessing(true);
        if (name === '' || description === '' || tokenAmount === '' || tokenType === '') {
            toast.error("All fields are compulsory");
            setPitchProcessing(false);
            return;
        }
        let amount = 0;
        if (tokenType === 'external_token') {
            if (tokenAddress === "") {
                toast.error("Please enter token address");
                setPitchProcessing(false);
                return;
            }
            const tokenContract = getCurrencyContract(tokenAddress);
            try {
                const balance = await tokenContract.methods.balanceOf(address).call({
                    from: address
                });
                if (balance <= 0) {
                    toast.error("Make sure you have token balance");
                    setPitchProcessing(false);
                    return;
                }
            } catch (error) {
                toast.error("Please enter valid token address");
                setPitchProcessing(false);
                return;
            }
            const decimals = await tokenContract.methods.decimals().call({ from: address });
            if (decimals == 18) {
                amount = getDecimals("", tokenAmount);
            } else if (decimals == 6) {
                amount = getDecimals("USDC", tokenAmount);
            } else {
                toast.error("Token decimals should be 18 or 6");
                setPitchProcessing(false);
                return;
            }
        } else {
            amount = getDecimals("", tokenAmount);
        }
        const response = await pitchSpad(address, spadAddress, name, description, tokenAddress, amount);
        if (response.code == 200) {
            await loadPitch();
            toast.success("Pitch Proposed successfully")
        } else {
            toast.error("Pitch Propsal failed")
        }
        setPitchProcessing(false);
    }

    const loadContribution = useCallback(async () => {
        if (address && spad && spadAddress) {
            const contrib = await getContribution(address, spadAddress);
            setContribution(parseFloat(getFromDecimals(spad.currencyAddress, contrib)));
            if (contrib == 0) {
                loadPitch();
            }
        }
    }, [address, spad, spadAddress])

    const loadPitch = async () => {
        const pitch = await getPitch(address, spadAddress);
        console.log(pitch)
        setPitch(pitch);
    }

    useEffect(() => {
        if (spadAddress !== undefined) {
            loadSpad()
        }
    }, [spadAddress])

    useEffect(() => {
        loadContribution();
    }, [address, spad])

    if (!spad) {
        return <DataLoading />
    }

    return (
        <Container className="max-w-2xl mx-auto">
            <h1 className='text-2xl font-bold text-center my-5'>PITCH FOR <Text>{spad.name}</Text></h1>
            {
                ((spad.status == 4 || spad.status == 5) && contribution == 0) ?
                    <Card>
                        {
                            pitch == null ?
                                <DataLoading /> :
                                <>
                                    {
                                        pitch.status === '0' ?
                                            <>
                                                {
                                                    spad.status == 5 ?
                                                        <div className="text-center">
                                                            <h3 className="text-red-500 text-xl pt-4">This SPAD is already acquired. You Cannot Pitch for this SPAD</h3>
                                                        </div> :
                                                        <form onSubmit={handlePitch}>
                                                            <div className='mb-4'>
                                                                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900'>
                                                                    Name
                                                                </label>
                                                                <TextInput
                                                                    id="name"
                                                                    placeholder="Name of Project"
                                                                    required={true}
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className='mb-4'>
                                                                <label htmlFor="description" className='block mb-2 text-sm font-medium text-gray-900'>
                                                                    Description
                                                                </label>
                                                                <TextArea
                                                                    id="description"
                                                                    placeholder="Description of Project"
                                                                    required={true}
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="mb-8">
                                                                <label className="form-label">Token Details for Distribution (ERC20)</label>
                                                                <div className="">
                                                                    <div className="my-3">
                                                                        <RadioButtons options={tokenOptions} name='token_type' setValue={setTokenType} />
                                                                    </div>
                                                                    <div className='flex items-center gap-5'>
                                                                        {
                                                                            tokenType == 'external_token' &&
                                                                                <TextInput placeholder="Token Address"
                                                                                    value={tokenAddress}
                                                                                    onChange={(e) => { setTokenAddress(e.target.value) }}
                                                                                />
                                                                        }
                                                                            <TextInput type="number" placeholder="Token Amount"
                                                                                value={tokenAmount}
                                                                                required={true}
                                                                                onChange={(e) => { setTokenAmount(e.target.value) }}
                                                                            />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                pitchProcessing ?
                                                                <Button disabled isProcessing={true} className="mx-auto">PITCHING</Button> :
                                                                <Button type='submit' className="mx-auto">PITCH</Button>
                                                            }
                                                        </form>
                                                }
                                            </> :
                                            <div className="mt-3">
                                                <div className="flex text-start mb-4">
                                                    <div className="w-1/4 font-bold">Name</div>
                                                    <div className="w-3/4">{pitch.name}</div>
                                                </div>
                                                <div className="flex text-start mb-4">
                                                    <div className="w-1/4 font-bold">Description</div>
                                                    <div className="w-3/4">{pitch.description}</div>
                                                </div>
                                                <div className="flex text-start mb-4">
                                                    <div className="w-1/4 font-bold">Status</div>
                                                    <div className="w-3/4">
                                                        {
                                                            (pitch.status === '1') ?
                                                                <span className="text-blue-400">Pending</span> :
                                                                <div>
                                                                    {
                                                                        (pitch.status === '2') ?
                                                                            <span className="text-green-500">Approved</span> :
                                                                            <>
                                                                                {
                                                                                    (pitch.status === '3') ?
                                                                                        <span className="text-red-500">Rejected</span> :
                                                                                        <span className="text-amber-500">Selected</span>
                                                                                }
                                                                            </>
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="flex text-start mb-4">
                                                    <div className="w-1/4 font-bold">Token</div>
                                                    <div className="w-3/4">
                                                        {pitch.amount} {pitch.tokenSymbol} {"  "}
                                                        (
                                                        {
                                                            pitch.tokenName == "" ?
                                                                <>{spad.symbol}</> :
                                                                <EtherscanAddress address={pitch.tokenAddress} icon={true} text={pitch.tokenName} />
                                                        }
                                                        )
                                                    </div>
                                                </div>
                                                {
                                                    pitch.status == 4 &&
                                                    <ClaimPitch spadAddress={spadAddress} pitch={pitch} loadPitch={loadPitch} />
                                                }
                                            </div>
                                    }
                                </>
                        }
                    </Card> :
                    <div className="text-center">
                        <h3 className="text-red-500 pt-4 text-xl">You Cannot Pitch for this SPAD</h3>
                    </div>
            }
            <div className='mt-10'>
                <SpadDetailsCard spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} hideActions={true} />
            </div>
        </Container>
    )
}

export default PitchPage