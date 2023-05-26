"use client";

import web3 from "@/helpers/web3";

const { createContext, useState } = require("react");

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [address, setAddress] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [status, setStatus] = useState("")
    const [network, setNetwork] = useState("")
    const validChainId = '0x66eed'

    const connectWallet = async() => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                setChainId(chain)
                setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                if(chain == validChainId) {
                    setStatus("CONNECTED")
                    setNetwork("Arbitrum")
                } else {
                    setStatus("INVALID_CHAIN")
                    setNetwork("")
                }
            } catch (err) {
                setAddress("")
                setChainId("")
                setStatus("NOT_CONNECTED")
                setNetwork("")
            }
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
            setNetwork("")
        }
    }

    const loadWallet = async() => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (addressArray.length > 0) {
                    const chain = await ethereum.request({ method: 'eth_chainId' });
                    setChainId(chain)
                    setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                    if(chain == validChainId) {
                        setStatus("CONNECTED")
                        setNetwork("Arbitrum")
                    } else {
                        setStatus("INVALID_CHAIN")
                        setNetwork("")
                    }
                } else {
                    setAddress("")
                    setChainId("")
                    setStatus("NOT_CONNECTED")
                    setNetwork("")
                }
            } catch (err) {
                setAddress("")
                setChainId("")
                setStatus("UNKNOWN_ERROR")
                setNetwork("")
            }
    
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
            setNetwork("")
        }
    }

    const changeNetwork = async() => {
        if (typeof window.ethereum !== 'undefined') {
            const chainId = '421613';
            if (window.ethereum.networkVersion !== chainId) {
                try {
                    const resp = await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x66eed' }]
                    });
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                    setChainId(chain)
                    setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                    if(chain == validChainId) {
                        setStatus("CONNECTED")
                        setNetwork("Arbitrum")
                    } else {
                        setStatus("INVALID_CHAIN")
                        setNetwork("")
                    }
                } catch (error) {
                    console.log(error)
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                    setChainId(chain)
                    setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                    if(chain == validChainId) {
                        setStatus("CONNECTED")
                        setNetwork("Arbitrum")
                    } else {
                        setStatus("INVALID_CHAIN")
                        setNetwork("")
                    }
                }
            }
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
            setNetwork("")
        }
    }

    return (
        <WalletContext.Provider
            value={{
                address,
                chainId,
                status,
                network,
                loadWallet,
                connectWallet,
                changeNetwork
            }}
        >
            { children }
        </WalletContext.Provider>
    )
}

export default WalletContext;
