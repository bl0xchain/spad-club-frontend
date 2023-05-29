import WalletContext from '@/context/WalletContext';
import { getContribution } from '@/helpers/fund';
import { getFromDecimals } from '@/helpers/tokens';
import React, { useContext, useEffect, useState } from 'react'
import Text from '../template/Text';
import ViewPitches from './ViewPitches';
import EtherscanAddress from '../layout/EtherscanAddress';

const CompletedSpad = ({ spadAddress, spad }) => {
    const [contribution, setContribution] = useState(0);
    const { address, status } = useContext(WalletContext)

    const loadContribution = async () => {
        const amount = await getContribution(address, spadAddress);
        setContribution(parseFloat(getFromDecimals(spad.currencyAddress, amount)));
    }

    useEffect(() => {
        loadContribution();
    }, [address])

    return (
        <div>
            {
                spad &&
                <>
                    {
                        spad.creator == address ?
                            <ViewPitches spadAddress={spadAddress} /> :
                            <>
                                {
                                    contribution > 0 &&
                                    <p className="font-bold py-4 text-center">SPAD Creator <Text><EtherscanAddress address={spad.creator} icon={true} /></Text> is reviewing the PITCHES for your SPAD</p>
                                }
                            </>

                    }
                </>
            }
        </div>
    )
}

export default CompletedSpad