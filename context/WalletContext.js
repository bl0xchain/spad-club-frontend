"use client";

import web3 from "@/helpers/web3";

const { createContext, useState } = require("react");

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [address, setAddress] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [status, setStatus] = useState("")

    const connectWallet = async() => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                setChainId(chain)
                setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                setStatus(chain == '0x5' ? "CONNECTED" : "INVALID_CHAIN")
            } catch (err) {
                setAddress("")
                setChainId("")
                setStatus("NOT_CONNECTED")
            }
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
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
                    setStatus(chain == '0x5' ? "CONNECTED" : "INVALID_CHAIN")
                } else {
                    setAddress("")
                    setChainId("")
                    setStatus("NOT_CONNECTED")
                }
            } catch (err) {
                setAddress("")
                setChainId("")
                setStatus("UNKNOWN_ERROR")
            }
    
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
        }
    }

    const changeNetwork = async() => {
        if (typeof window.ethereum !== 'undefined') {
            const chainId = '5';
            if (window.ethereum.networkVersion !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x5' }]
                    });
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                    setChainId(chain)
                    setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                    setStatus(chain == '0x5' ? "CONNECTED" : "INVALID_CHAIN")
                } catch (error) {
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chain = await  window.ethereum.request({ method: 'eth_chainId' });
                    setChainId(chain)
                    setAddress(web3.utils.toChecksumAddress(addressArray[0]))
                    setStatus(chain == '0x5' ? "CONNECTED" : "INVALID_CHAIN")
                }
            }
        } else {
            setAddress("")
            setChainId("")
            setStatus("NO_METAMASK")
        }
    }

    return (
        <WalletContext.Provider
            value={{
                address,
                chainId,
                status,
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
