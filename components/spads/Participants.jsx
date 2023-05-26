import { getContributionEvents } from '@/helpers/actions';
import { getFromDecimals } from '@/helpers/tokens';
import Decimal from 'decimal.js-light';
import React, { useEffect, useState } from 'react'
import EtherscanAddress from '../layout/EtherscanAddress';
import Image from 'next/image';

const Participants = ({ spadAddress, spad }) => {
    const [participants, setParticipants] = useState(null);

    const loadParticipants = () => {
        if (spadAddress) {
            getContributionEvents(spadAddress, (error, events) => {
                if (!error) {
                    let participants = [];
                    participants.push({
                        address: spad.creator,
                        amount: Decimal(spad.targetView).dividedBy(10).toString(),
                    });
                    events.forEach(event => {
                        let amount = Number(getFromDecimals(spad.currencyAddress, event.returnValues.amount));
                        participants.push({
                            address: event.returnValues.contributor,
                            amount: amount,
                        });
                    });
                    setParticipants(participants)
                } else {
                    setParticipants(false)
                }
            });
        }
    }

    useEffect(() => {
        if (spad) {
            loadParticipants();
        }
    }, [spad])

    return (
        <div>
            <h2 className="font-bold mb-4 text-4xl my-5">PARTICIPANTS</h2>
            {
                (participants && spad.creatorContribution > 0) ?
                    <table className='w-full text-center mb-4'>
                        <thead>
                            <tr className="text-gray-500">
                                <th className='text-start ps-2'>#</th>
                                <th>ADDRESS</th>
                                <th>AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map(function (event, i) {
                                return <tr key={i}>
                                    <td className='relative'>
                                        <Image src='/spad-link-icon.png' alt="|" width={24} height={44} />
                                    </td>
                                    <td>
                                        <EtherscanAddress address={event.address} icon={true} />
                                    </td>
                                    <td>
                                        {event.amount} {" "}
                                        {spad.investmentCurrency}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table> :
                    <>
                        <p className="">No Participants</p>

                        <p>Share Icons</p>
                    </>
            }
        </div>
    )
}

export default Participants