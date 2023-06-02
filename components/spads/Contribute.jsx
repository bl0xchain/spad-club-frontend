import WalletContext from '@/context/WalletContext';
import { getContribution } from '@/helpers/fund';
import { allowCurrency, getCurrencyAllowance, getFromDecimals } from '@/helpers/tokens';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from '../template/Button';
import TextInput from '../template/TextInput';
import { toast } from 'react-toastify';
import { contribute } from '@/helpers/actions';
import PassKeyModal from './PassKeyModal';

const Contribute = ({ spadAddress, spad, loadSpad }) => {
    const [isContribute, setIsContribute] = useState(false);
    const [contributing, setContributing] = useState(false);
    const [contribution, setContribution] = useState("");
    const [contributionAmount, setAmount] = useState("");
    const [passKey, setPassKey] = useState("");
    const [passKeyModalShow, setPassKeyModalShow] = useState(false);
    const [allowanceNeeded, setAllowanceNeeded] = useState(false);
    const [allowing, setAllowing] = useState(false);

    const { address, status } = useContext(WalletContext)

    const updateContribution = useCallback(async () => {
        const amount = await getContribution(address, spadAddress);
        setContribution(parseFloat(getFromDecimals(spad.currencyAddress, amount)));
    }, [address]);

    const isAllowanceNeeded = async () => {
        if (spad.currencyAddress === "") {
            return false;
        }
        const allowance = await getCurrencyAllowance(address, spad.currencyAddress);
        if (parseFloat(allowance) >= parseFloat(contributionAmount)) {
            return false;
        } else {
            return true;
        }
    }

    const handleContribute = async (e) => {
        e.preventDefault();
        if (status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        let amount = parseFloat(contributionAmount);
        if (!isNaN(amount)) {
            let minContributionNeeded = spad.minInvestmentView;
            if ((spad.targetView - spad.currentInvestmentView) < spad.minInvestmentView) {
                minContributionNeeded = spad.targetView - spad.currentInvestmentView;
            }
            let totalContribution = amount + contribution;
            if (totalContribution >= minContributionNeeded && totalContribution <= spad.maxInvestmentView) {
                if (await isAllowanceNeeded()) {
                    setAllowanceNeeded(true);
                    return;
                } else {
                    setAllowanceNeeded(false);
                }
                if (spad.isPrivate) {
                    setPassKeyModalShow(true);
                } else {
                    handlePassKeyContribute();
                }
            } else {
                toast.error('Contribution must be between ' + minContributionNeeded + ' ' + spad.investmentCurrency + ' to ' + spad.maxInvestmentView + ' ' + spad.investmentCurrency);
                setContributing(false);
            }
        } else {
            toast.error('Please enter valid contribution amount');
            setContributing(false);
        }
    }

    const handlePassKeyContribute = async () => {
        setContributing(true);
        setPassKeyModalShow(false);
        const response = await contribute(address, spadAddress, contributionAmount, spad.currencyAddress, passKey);
        if (response.code == 200) {
            toast.success("Contributed for SPAD successfully")
            updateContribution();
            setIsContribute(false);
            loadSpad();
        } else {
            toast.error("Problem with contributing for SPAD")
        }
        setContributing(false);
    }

    const handleCurrencyAllow = async () => {
        if (status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        setAllowing(true);
        const response = await allowCurrency(address, spad.currencyAddress, contributionAmount);
        if (response.code == 200) {
            toast.success("Currency allowed successfully.")
            if (await isAllowanceNeeded()) {
                setAllowanceNeeded(true);
            } else {
                setAllowanceNeeded(false);
            }
        } else {
            toast.error("Currency allowance failed.")
        }
        setAllowing(false);
    }

    useEffect(() => {
        if (address !== "") {
            updateContribution()
        }
    }, [address])


    return (
        <div>
            {
                contribution > 0 &&
                <div className='mb-4'>
                    <div className="font-bold text-sm text-gray-400">YOUR CONTRIBUTION</div>
                    <p className="font-bold text-xl">{contribution} {" "} {spad.investmentCurrency}</p>
                </div>
            }
            {
                (spad.status === "2" && contribution < spad.maxInvestmentView) &&
                <>
                    {
                        isContribute ?
                            <form className='flex gap-4 items-center justify-center'>
                                <div className='w-40'>
                                    <TextInput
                                        type='number'
                                        required={true}
                                        min={0.1}
                                        step={0.1}
                                        suffix={spad.investmentCurrency}
                                        value={contributionAmount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                {
                                    allowanceNeeded ?
                                        <>{
                                            allowing ?
                                                <Button isProcessing={true} disabled>Allowing {spad.investmentCurrency}</Button> :
                                                <Button type='submit' onClick={handleCurrencyAllow}>Allow {spad.investmentCurrency}</Button>
                                        }</> :
                                        <>{

                                            contributing ?
                                                <Button isProcessing={true} disabled>Contributing</Button> :
                                                <Button type='submit' onClick={handleContribute}>Contribute</Button>
                                        }</>

                                }
                                {
                                    spad.isPrivate &&
                                    <PassKeyModal show={passKeyModalShow} setShow={setPassKeyModalShow} passKey={passKey} setPassKey={setPassKey} handleAction={handlePassKeyContribute} />
                                }
                            </form> :
                            <Button className="mx-auto" onClick={() => setIsContribute(true)}>CONTRIBUTE</Button>
                    }
                </>
            }
        </div>
    )
}

export default Contribute