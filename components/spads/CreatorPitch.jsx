import { getPitch } from '@/helpers/pitch';
import { getSpadContract } from '@/helpers/spad';
import React, { useEffect, useState } from 'react'
import DataLoading from '../layout/DataLoading';
import Card from '../template/Card';
import EtherscanAddress from '../layout/EtherscanAddress';

const CreatorPitch = ({ spadAddress, creator }) => {
    const [pitch, setPitch] = useState(null);

    const fetchPitch = async () => {
        const pitchData = await getPitch(creator, spadAddress);

        if (pitchData.tokenName == "") {
            const spadContract = getSpadContract(spadAddress);
            pitchData.tokenName = await spadContract.methods.name().call();
            pitchData.tokenSymbol = await spadContract.methods.symbol().call();
            pitchData.tokenAddress = "";
        }
        setPitch(pitchData);
    }

    useEffect(() => {
        if (creator) {
            fetchPitch();
        }
    }, [creator]);

    if (!pitch) {
        return <DataLoading />
    }

    return (
        <Card className="mt-4">
            <h5 className="mb-0">{pitch.name}</h5>
            <small className="text-gray-400">{creator}</small>
            <p className="mt-3">{pitch.description}</p>
            <div>
                <p className="mb-0">
                    <b>Token:</b> {pitch.amount} {pitch.tokenSymbol} {"  "}
                    (
                    {
                        pitch.tokenAddress == "" ?
                            <>{pitch.tokenName}</> :
                            <EtherscanAddress address={pitch.tokenAddress} icon={true} text={pitch.tokenName} />
                    }
                    )
                </p>
            </div>
        </Card>
    )
}

export default CreatorPitch