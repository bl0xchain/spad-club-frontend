import { allowCurrency, getCurrencyAllowance, getCurrencyContract, getDecimals } from '@/helpers/tokens';
import Decimal from 'decimal.js-light';
import React, { useContext, useEffect, useState } from 'react'
import Button from '../template/Button';
import Modal from '../template/Modal';
import TextArea from '../template/TextArea';
import RadioButtons from '../template/RadioButtons';
import TextInput from '../template/TextInput';
import WalletContext from '@/context/WalletContext';
import { toast } from 'react-toastify';
import { activateSpad } from '@/helpers/actions';

const ActivateSpad = ({ spadAddress, spad, loadSpad }) => {
    const [activating, setActivating] = useState(false);
    const [activationPitch, setActivationPitch] = useState("");
    const [activationModalShow, setActivationModalShow] = useState(false);
    const [allowing, setAllowing] = useState(false);
    const [currencyAllowance, setCurrencyAllowance] = useState(0);
    const [tokenType, setTokenType] = useState('');
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokenAmount, setTokenAmount] = useState("");
    const [pitchProcessing, setPitchProcessing] = useState(false);

    const { address, status } = useContext(WalletContext)

    const tokenOptions = [
        { key: 'spad_token', value: `${spad.symbol} Token` },
        { key: 'external_token', value: `External Token` }
    ]

    const handleActivate = async() => {
        if(status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        if(spad.isPrivate) {
            setActivationModalShow(true);
        } else {
            setActivating(true);
            const amount = Decimal(spad.target).dividedBy(10);
                        
            const response = await activateSpad(address, spadAddress, amount, spad.currencyAddress, activationPitch, tokenAddress, 0);
            if(response.code == 200 ) {
                toast.success("SPAD activated successfully.")
                loadSpad();
                
            } else {
                toast.error("SPAD activation failed.")
            }
            setActivating(false);
        }
    }

    const handleCurrencyAllow = async() => {
        if(status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        setAllowing(true);
        const amount = Decimal(spad.targetView).dividedBy(10);
        const response = await allowCurrency(address, spad.currencyAddress, amount);
        if(response.code == 200 ) {
            toast.success("Currency allowed successfully.")
            getCurrencyAllowance(address, spad.currencyAddress).then(allowance => {
                setCurrencyAllowance(allowance);
            })
        } else {
            toast.error("Currency allowance failed.")
        }
        setAllowing(false);
       
    }

    const handlePitchActivation = async() => {
        if(status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }

        if(activationPitch === '' || tokenAmount === '' || tokenType === '') {
            toast.error("All fields are compulsory");
            return;
        }

        let amount = 0;
        if(tokenType === 'external_token') {
            if(tokenAddress === "") {
                toast.error("Please enter token address");
                setPitchProcessing(false);
                return;
            }
            const tokenContract = getCurrencyContract(tokenAddress);
            try {
                const balance = await tokenContract.methods.balanceOf(address).call({
                    from: address
                });
                if(balance > 0) {
                    toast.error("Make sure you have token balance");
                    setPitchProcessing(false);
                    return;
                }
            } catch (error) {
                toast.error("Please enter valid token address");
                setPitchProcessing(false);
                return;
            }
            const decimals = await tokenContract.methods.decimals().call({from: address});
            if(decimals == 18) {
                amount = getDecimals("", tokenAmount);
            } else if(decimals == 6) {
                amount = getDecimals("USDC", tokenAmount);
            } else {
                toast.error("Token decimals should be 18 or 6");
                setPitchProcessing(false);
                return;
            }
        } else {
            amount = getDecimals("", tokenAmount);
        }
        setActivationModalShow(false);
        setActivating(true);
        const shareAmount = Decimal(spad.target).dividedBy(10);
                    
        const response = await activateSpad(address, spadAddress, shareAmount, spad.currencyAddress, activationPitch, tokenAddress, amount);
        if(response.code == 200 ) {
            toast.success("SPAD activated successfully.")
            loadSpad();
            
        } else {
            toast.error("SPAD activation failed.")
        }
        setActivating(false);
    }

    useEffect(() => {
        if (spad.currencyAddress != "") {
            getCurrencyAllowance(address, spad.currencyAddress).then(allowance => {
                setCurrencyAllowance(allowance);
            })
        }
    }, [spad, address]);

    return (
        <div>
            {
                spad.status === "1" && spad.creator === address &&
                <>
                    {
                        ((spad.investmentCurrency === 'ETH') || parseFloat(currencyAllowance) >= parseFloat(Decimal(spad.targetView).dividedBy(10))) ?
                            <>
                                {activating ?
                                    <Button disabled isProcessing={true} className="mx-auto">ACTIVATING</Button> :
                                    <Button onClick={handleActivate} className="mx-auto">ACTIVATE</Button>
                                }
                            </> :
                            <>
                                {allowing ?
                                    <Button disabled isProcessing={true} className="mx-auto">Allowing {spad.investmentCurrency}</Button> :
                                    <Button onClick={handleCurrencyAllow} className="mx-auto">Allow {spad.investmentCurrency}</Button>
                                }
                            </>
                    }
                    {
                        spad.isPrivate &&
                        <Modal show={activationModalShow} onClose={() => setActivationModalShow(false)}>
                            <div className='text-2xl font-bold'>Activation Pitch</div>
                            <div>
                                <label className="form-label">Enter Your Activation Pitch for the SPAD</label>
                                <TextArea
                                    placeholder="Your Activation Pitch"
                                    className="mb-4"
                                    required
                                    rows={5}
                                    value={activationPitch}
                                    onChange={(e) => setActivationPitch(e.target.value)}
                                />
                                <div className="mb-5">
                                    <label className="form-label">Token Details for Distribution (ERC20)</label>
                                    <div className="flex items-center">
                                        <div className="mb-2">
                                            <RadioButtons options={tokenOptions} name='token_type' setValue={setTokenType} />
                                        </div>
                                        {
                                            tokenType == 'external_token' &&
                                            <div>
                                                <TextInput placeholder="Token Address"
                                                    value={tokenAddress}
                                                    onChange={(e) => { setTokenAddress(e.target.value) }}
                                                />
                                            </div>
                                        }
                                        <div>
                                            <TextInput type="number" placeholder="Token Amount"
                                                value={tokenAmount}
                                                onChange={(e) => { setTokenAmount(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button variant="secondary" onClick={() => setActivationModalShow(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handlePitchActivation}>
                                    Proceed
                                </Button>
                            </div>
                        </Modal>
                    }
                </>
            }
        </div>
    )
}

export default ActivateSpad