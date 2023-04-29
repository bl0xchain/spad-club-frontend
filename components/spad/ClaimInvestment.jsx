import { claimInvestment, isInvestmentClaimed } from '@/helpers/tokenClub'
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ClaimInvestment = ({ address, clubAddress, spadId, contribution }) => {
    const [claiming, setClaiming] = useState(false)
    const [claimed, setClaimed] = useState(false)

    const checkClaimed = async() => {
        const data = await isInvestmentClaimed(address, clubAddress, spadId);
        setClaimed(data)
    }

    const handleClaim = async() => {
        setClaiming(true);
        const response = await claimInvestment(address, clubAddress, spadId);
        if (response.code == 200) {
            toast.success("Target Claimed successfully");
            await checkClaimed();

        } else {
            toast.error(response?.status)
        }
        setClaiming(false);
    }

    useEffect(() => {
        if(parseInt(contribution) > 0 ) {
            checkClaimed()
        }
    }, [contribution])
    return (
        <div>
        { 
            (parseInt(contribution) > 0 ) &&
            <>
            {
                claimed ?
                <p className='text-semibold text-xl text-green-600'>Investment is Claimed</p> :
                <>
                {
                    claiming ?
                    <Button isProcessing={true} disabled>Claiming Investment</Button> :
                    <Button onClick={handleClaim}>Claim Investment</Button>
                }
                </>
            }
            </>
        }   
        </div>
    )
}

export default ClaimInvestment