import WalletContext from '@/context/WalletContext'
import { getShortAddress } from '@/helpers/helpers'
import React, { useContext, useEffect, useState } from 'react'
import Button from './template/Button'
import Tooltip from './template/Tooltip'
import Modal from './template/Modal'

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
                                <Tooltip message="Connect to Arbitrum Goerli Network">
                                    <Button onClick={changeNetwork}>
                                        Switch to Arbitrum Goerli
                                    </Button>
                                </Tooltip> :
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
                                                    <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                                        <h3 className="text-xl font-medium text-gray-900">
                                                            Connect Wallet
                                                        </h3>
                                                        {
                                                            status == 'NO_METAMASK' ?
                                                                <p>
                                                                    You must install Metamask, a virtual Ethereum wallet, in your browser.
                                                                    <Link href='https://metamask.io/download' target="_blank">Get Metamask</Link>
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