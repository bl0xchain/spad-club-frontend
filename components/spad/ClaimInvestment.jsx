import { formatEther, formatUSDC } from '@/helpers/helpers'
import { claimInvestment, isInvestmentClaimed } from '@/helpers/spad-club'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../template/Button'

const ClaimInvestment = ({ address, clubAddress, spadId, contribution, spad }) => {
    const [claiming, setClaiming] = useState(false)
    const [claimed, setClaimed] = useState(false)
    const [claimAmount, setClaimAmount] = useState(0)

    const checkClaimed = async() => {
        const data = await isInvestmentClaimed(address, clubAddress, spadId);
        setClaimed(data)
    }

    const handleClaim = async() => {
        setClaiming(true);
        const response = await claimInvestment(address, clubAddress, spadId);
        if (response.code == 200) {
            toast.success("investment Claimed successfully");
            await checkClaimed();

        } else {
            toast.error(response?.status)
        }
        setClaiming(false);
    }

    const calculateClaimAmount = () => {
        const amount = (formatUSDC(contribution) * formatEther(spad.externalTokenAmount) * (100 - parseInt(spad.carry)) / (formatUSDC(spad.valuation) * 100));
        setClaimAmount(amount)
    }

    useEffect(() => {
        if(parseInt(contribution) > 0 ) {
            checkClaimed()
            calculateClaimAmount()
        }
    }, [contribution])
    return (
        <div className='flex flex-col items-center gap-4'>
        { 
            (parseInt(contribution) > 0 ) &&
            <>
            {
                claimed ?
                <p className='text-semibold text-xl text-green-600'>You have claimed {claimAmount} tokens</p> :
                <>
                {
                    claiming ?
                    <Button isProcessing={true} disabled>Claiming {claimAmount} tokens</Button> :
                    <Button onClick={handleClaim}>Claim {claimAmount} tokens</Button>
                }
                </>
            }
            <p>Your tokens  = contribution - carry({spad.carry}%)</p>
            </>
        }   
        </div>
    )
}

export default ClaimInvestment