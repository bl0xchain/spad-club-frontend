import { claimTarget, getAllowance } from '@/helpers/tokenClub'
import { Button, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const TokensForDistribution = ({ address, clubAddress, spadId, spad, loadSpad }) => {
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState("")
    const [claiming, setClaiming] = useState(false)
    const [distributionAmount, setDistributionAmount] = useState(0)

    const handleClaimTarget = async (e) => {
        e.preventDefault();
        if(amount == "") {
            toast.error("Please enter token amount for distribution")
            return false;
        }

        setClaiming(true);
        const response = await addTokensForDistribution(address, clubAddress, spadId, spad.externalToken, amount);
        if (response.code == 200) {
            toast.success("Target Claimed successfully");
            loadSpad();

        } else {
            toast.error(response?.status)
        }
        setShow(false);
        setClaiming(false);

    }

    const calculateDistributionAmount = (amount) => {
        setAmount(amount);
        const distAmt = spad.target * amount * (100 - spad.carry) / (spad.valuation * 100)
        setDistributionAmount(distAmt);
    }

    // useEffect(() => {
    //     const loadAllowance = async() => {
    //         const allowance = await getAllowance(address, clubAddress, externalToken);
    //         console.log(allowance)
    //     }
    //     if(address) {
    //         loadAllowance()
    //     }
    // }, [address])

    return (
        <div>
            {
                show ?
                    <form className="flex flex-col gap-6 max-w-md mx-auto" onSubmit={handleClaimTarget}>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="amount"
                                    value="Total Token Supply"
                                />
                            </div>
                            <TextInput
                                id="amount"
                                type="number"
                                placeholder="Enter token amount"
                                required={true}
                                value={amount}
                                onChange={(e)=>calculateDistributionAmount(e.target.value)}
                            />
                            <p className='mt-3 text-sm text-blue-700'>Based on the valuation, you need to distribute { spad.target * 100 / spad.valuation }% tokens to the contributors minus {spad.carry}% to you.</p>
                            <p className='mt-3 text-blue-700'>You need to transfer { distributionAmount } {spad.spadName} tokens for distribution</p>
                        </div>
                        {
                            claiming ?
                                <Button isProcessing={true} disabled>
                                    Adding distribution tokens
                                </Button> :
                                <Button type="submit">
                                    Add distribution tokens
                                </Button>
                        }
                    </form> :
                    <Button onClick={() => setShow(true)}>Add distribution tokens</Button>
            }
        </div>
    )
}

export default TokensForDistribution