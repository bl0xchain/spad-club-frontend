import WalletContext from '@/context/WalletContext'
import { getShortAddress } from '@/helpers/helpers'
import React, { useContext, useEffect, useState } from 'react'
import Button from './template/Button'
import Tooltip from './template/Tooltip'
import Modal from './template/Modal'
import { FaExternalLinkAlt, FaUnlink } from 'react-icons/fa'

const WalletConnect = () => {
    const { address, status, connectWallet, loadWallet, changeNetwork } = useContext(WalletContext)
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
                    <div className='bg-green-100 px-4 py-2 rounded-xl'>{getShortAddress(address)}</div> :
                    <>
                        {
                            status == "INVALID_CHAIN" ?
                                <>
                                <Tooltip message="Connect to Arbitrum Goerli Network">
                                    <Button onClick={changeNetwork}>
                                        Switch to Arbitrum Goerli
                                    </Button>
                                </Tooltip>
                                <Modal show={true} onClose={false}>
                                    
                                    <div className='flex flex-col gap-5 p-4 items-center'>
                                        <h3 className="text-2xl font-medium text-gray-400">
                                            <FaUnlink className='block text-red-400 mx-auto mb-2' />
                                            Invalid Network
                                        </h3>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Please connect to Arbitrum Goerli Network
                                        </h3>
                                        <Button onClick={changeNetwork} className='w-[300px]'>
                                            Switch to Arbitrum Goerli
                                        </Button>
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
                                                        <h3 className="text-xl font-medium text-gray-900 mb-5">
                                                            Connect Wallet
                                                        </h3>
                                                        {
                                                            status == 'NO_METAMASK' ?
                                                                <p>
                                                                    You must install Metamask, a virtual Ethereum wallet, in your browser.<br />
                                                                    <a href='https://metamask.io/download' target="_blank" className='text-purple-600 hover:underline'>Get Metamask <FaExternalLinkAlt className='inline text-sm' /> </a>
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