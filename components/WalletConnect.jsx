import WalletContext from '@/context/WalletContext'
import { getShortAddress } from '@/helpers/helpers'
import React, { useContext, useEffect, useState } from 'react'
import Button from './template/Button'
import Tooltip from './template/Tooltip'
import Modal from './template/Modal'
import { FaExclamationTriangle } from 'react-icons/fa'
import Image from 'next/image'

const WalletConnect = () => {
    const { address, status, network, connectWallet, loadWallet, changeNetwork } = useContext(WalletContext)
    const [visible, setVisible] = useState(false);

    const addWalletListener = () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                loadWallet()
            });
            window.ethereum.on("chainChanged", (chainid) => {
                loadWallet()
            });
        }
    };

    useEffect(() => {
        loadWallet()
        addWalletListener()
    }, [])

    return (
        <>
            {
                status == "CONNECTED" ?
                    <>
                        <div className='flex items-center'>
                            <Image 
                                src="/arbitrum.svg"
                                height={42}
                                width={42}
                                alt="Arbitrum"
                                className='mt-1 width-auto height-auto'
                            />
                            <div className='leading-3'>
                                { network }
                                <div className='text-xs'>Goerli</div>
                            </div>
                            
                        </div>
                        <div className='bg-green-100 px-4 py-2 rounded-xl'>{getShortAddress(address)}</div>
                    </> :
                    <>
                        {
                            status == "INVALID_CHAIN" ?
                                <>
                                    <Tooltip message="Connect to Arbitrum Goerli Network">
                                        <Button onClick={changeNetwork}>
                                            Invalid Network
                                        </Button>
                                    </Tooltip>
                                    <Modal show={true} onClose={false}>
                                        <div className="p-5 text-center">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                Wrong Network
                                                <FaExclamationTriangle className='block mx-auto text-5xl my-3 text-red-400' />
                                            </h3>
                                            <p>Please change your network to Arbitrum Goerli</p>
                                            <Button onClick={changeNetwork} className="block mx-auto mt-4">Switch Network</Button>
                                        </div>
                                    </Modal>
                                </> :
                                <>
                                    { 
                                        status == "NOT_CONNECTED" ?
                                            <Button onClick={connectWallet}>
                                                Connect Wallet
                                            </Button> :
                                            <>
                                                <Button onClick={() => setVisible(true)}>
                                                    Connect Wallet
                                                </Button>
                                                <Modal show={visible} onClose={() => setVisible(false)}>
                                                    <div className="p-5">
                                                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                                                            Connect Wallet
                                                        </h3>
                                                        {
                                                            status == 'NO_METAMASK' ?
                                                                <p>
                                                                    You must install Metamask, a virtual Ethereum wallet, in your browser.<br /><br />
                                                                    <a href='https://metamask.io/download' target="_blank" className='text-purple-700 underline'>Get Metamask</a>
                                                                </p> :
                                                                <p>
                                                                    Problem with connecting the wallet. Please reload the page and try again.
                                                                </p>
                                                        }
                                                    </div>
                                                </Modal>
                                            </>
                                    }
                                </>
                        }
                    </>
            }
        </>
    )
}

export default WalletConnect