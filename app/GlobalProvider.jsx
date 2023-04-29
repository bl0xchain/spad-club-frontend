"use client"

import { WalletProvider } from "@/context/WalletContext";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const GlobalProvider = ({ children }) => {
    return (
        <>
            <ToastContainer position="top-center" />
            <WalletProvider>
                {children}
            </WalletProvider>
        </>
    )
} 