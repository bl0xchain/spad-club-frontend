import { formatUSDC } from '@/helpers/helpers'
import { contribute } from '@/helpers/tokenClub'
import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Contribute = ({ address, clubAddress, spadId, spad, loadSpad, contribution, password }) => {
    const [show, setShow] = useState(false)
    const [amount, setAmount] = useState("")
    // const [password, setPassword] = useState("")
    const [contributing, setContributing] = useState(false)

    const handleContribution = async(e) => {
        e.preventDefault();
        if(amount == "") {
            toast.error("Please enter amount")
            return false;
        }
        setContributing(true);
        console.log("contribute");
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
        <div className='my-10'>
        {
            show ?
            <form className='flex gap-4 items-center'>
                <TextInput
                    type='number'
                    required={true}
                    min={0}
                    max={parseInt(formatUSDC(spad.maxInvestment - contribution))}
                    addon="USDC"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {/* <TextInput
                    type='password'
                    placeholder="Password"
                    required={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> */}
                {
                    contributing ?
                    <Button isProcessing={true} disabled pill={true} className='button-color'>Contributing</Button> :
                    <Button type='submit' onClick={handleContribution} pill={true} className='button-color'>Contribute</Button>
                }
                
            </form> :
            <Button onClick={()=>setShow(true)} pill={true} className='button-color'>Contribute</Button>

        }
            
        </div>
    )
}

export default Contribute