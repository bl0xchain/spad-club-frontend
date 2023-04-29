import { claimTarget, getAllowance } from '@/helpers/tokenClub'
import { Button, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ClaimTarget = ({ address, clubAddress, spadId, spad, loadSpad }) => {
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState("")
    const [claiming, setClaiming] = useState(false)

    const handleClaimTarget = async (e) => {
        e.preventDefault();
        if(amount == "") {
            toast.error("Please enter token amount for distribution")
            return false;
        }

        setClaiming(true);
        const response = await claimTarget(address, clubAddress, spadId, spad.externalToken, amount);
        if (response.code == 200) {
            toast.success("Target Claimed successfully");
            loadSpad();

        } else {
            toast.error(response?.status)
        }
        setShow(false);
        setClaiming(false);

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
                                    value="External Token amount for distribution"
                                />
                            </div>
                            <TextInput
                                id="amount"
                                type="number"
                                placeholder="Enter token amount"
                                required={true}
                                value={amount}
                                onChange={(e)=>setAmount(e.target.value)}
                            />
                        </div>
                        {
                            claiming ?
                                <Button isProcessing={true} disabled>
                                    Claiming Target
                                </Button> :
                                <Button type="submit">
                                    Claim Target
                                </Button>
                        }
                    </form> :
                    <Button onClick={() => setShow(true)}>Claim Target</Button>
            }
        </div>
    )
}

export default ClaimTarget