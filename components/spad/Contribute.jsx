import { formatUSDC } from '@/helpers/helpers'
import { contribute } from '@/helpers/spad-club'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import TextInput from '../template/TextInput'
import Button from '../template/Button'

const Contribute = ({ address, clubAddress, spadId, spad, loadSpad, contribution, password }) => {
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState("")
    const [contributing, setContributing] = useState(false)

    const handleContribution = async(e) => {
        e.preventDefault();
        if(amount == "") {
            toast.error("Please enter amount")
            return false;
        }
        setContributing(true);
        const response = await contribute(address, clubAddress, spadId, password, amount);
        if (response.code == 200) {
            toast.success("Contribution successful");
            loadSpad();

        } else {
            toast.error(response?.status)
        }
        setShow(false);
        setContributing(false);
    }

    return (
        <div className='mt-2'>
        {
            show ?
            <form className='flex gap-4 items-center'>
                <TextInput
                    type='number'
                    required={true}
                    min={0}
                    max={parseInt(formatUSDC(spad.maxInvestment - contribution))}
                    suffix="USDC"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {
                    contributing ?
                    <Button isProcessing={true} disabled>Contributing</Button> :
                    <Button type='submit' onClick={handleContribution}>Contribute</Button>
                }
                
            </form> :
            <Button onClick={()=>setShow(true)}>Contribute</Button>
        }
        </div>
    )
}

export default Contribute