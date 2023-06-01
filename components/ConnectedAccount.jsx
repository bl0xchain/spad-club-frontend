import { getShortAddress } from '@/helpers/helpers'
import { getTokenBalance } from '@/helpers/tokens';
import { daiContractAddress } from '@/helpers/tokens';
import { usdcContractAddress } from '@/helpers/tokens';
import { getEthBalance } from '@/helpers/tokens';
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const ConnectedAccount = ({ address }) => {
    const [visible, setVisible] = useState(false);
    const [ethBalance, setEthBalance] = useState(0);
    const [usdcBalance, setUsdcBalance] = useState(0);
    const [daiBalance, setDaiBalance] = useState(0);

    const loadBalances = async () => {
        const eth = await getEthBalance(address);
        setEthBalance(eth);
        const usdc = await getTokenBalance(address, usdcContractAddress, usdcContractAddress);
        setUsdcBalance(usdc);
        const dai = await getTokenBalance(address, daiContractAddress, daiContractAddress);
        setDaiBalance(dai);
    }

    const onClick = (e) => {
        if(e.target.id !== 'addr-wrapper' && e.target.id !== 'addr-text' && e.target.id !== 'addr-icon') {
            setVisible(false);
        } else {
            // setVisible(!visible);
        }
    }

    useEffect(() => {
        if(address) {
            loadBalances()
        }
    }, [address])

    useEffect(() => {
        document.addEventListener("click", onClick);
    }, [])

    return (
        <div className='relative inline-block text-left cursor-pointer' id="address-popover">
            <div className='bg-green-100 px-4 py-2 rounded-xl flex items-center' id="addr-wrapper" onClick={() => setVisible(!visible)}>
                <span id="addr-text">{getShortAddress(address)}</span>
                {
                    visible ?
                    <FaAngleUp className='text-gray-500 ms-1' /> :
                    <FaAngleDown  id="addr-icon" className='text-gray-500 ms-1' />
                }
            </div>
            <div className={`${visible ? '' : 'hidden'} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="p-4" role="none">
                    <p>ETH: {ethBalance}</p>
                    <p>USDC: {usdcBalance}</p>
                    <p>DAI: {daiBalance}</p>
                </div>
            </div>
        </div>
    )
}

export default ConnectedAccount