import WalletContext from '@/context/WalletContext'
import { getShortAddress } from '@/helpers/helpers'
import { Badge, Button, Modal, Tooltip } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'

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
            <Badge color="success" size="lg" style={{fontWeight: 'normal', lineHeight:'38px'}}>{getShortAddress(address)}</Badge> :
            <>
            {
                status == "INVALID_CHAIN" ?
                <Tooltip content={"Connect to Goerli Network"} color="invert" placement="bottom">
                    <Button onClick={changeNetwork}>
                        Invalid Network
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
                    <Modal
                        dismissible={false}
                        show={visible}
                        size="md"
                        onClose={() => setVisible(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
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
                        </Modal.Body>
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