import WalletContext from '@/context/WalletContext';
import { pitchReview } from '@/helpers/actions';
import { getPitch } from '@/helpers/pitch';
import { getSpadContract } from '@/helpers/spad';
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import DataLoading from '../layout/DataLoading';
import EtherscanAddress from '../layout/EtherscanAddress';
import Button from '../template/Button';

const Pitch = ({ spadAddress, pitcher }) => {
    const [pitch, setPitch] = useState(null);
    const [review, setReview] = useState("");
    const [pitchReviewProcessing, setPitchReviewProcessing] = useState(false);

    const { address, status } = useContext(WalletContext);

    const handleApproval = async (approval) => {
        if (status !== 'CONNECTED') {
            toast.error("Please connect your wallet");
            return;
        }
        setPitchReviewProcessing(true);
        setReview(approval);
        const response = await pitchReview(address, spadAddress, pitcher, approval)
        if (response.code == 200) {
            toast.success("Pitch review completed")
            fetchPitch();
        } else {
            toast.error("Pitch review failed")
        }
        setPitchReviewProcessing(false);
    }

    const fetchPitch = async () => {
        const pitchData = await getPitch(pitcher, spadAddress);

        if (pitchData.tokenName == "") {
            const spadContract = getSpadContract(spadAddress);
            pitchData.tokenName = await spadContract.methods.name().call();
            pitchData.tokenSymbol = await spadContract.methods.symbol().call();
            pitchData.tokenAddress = "";
        }
        setPitch(pitchData);
    }

    useEffect(() => {
        if (pitcher) {
            fetchPitch();
        }
    }, [pitcher]);

    if (!pitch) {
        return <DataLoading />
    }

    return (
        <div>
            <h5 className="mb-0">{pitch.name}</h5>
            <small className="text-gray-400">{pitcher}</small>
            <p className="mt-3">{pitch.description}</p>
            <div>
                <p>
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
            <div className="mt-3">
                {
                    pitch.status === '1' ?
                        <>
                            <p className="text-blue-400">Pending</p>
                            {
                                pitchReviewProcessing ?
                                    <>
                                        {
                                            review ?
                                                <Button disabled isProcessing={true}>
                                                    Approving Pitch {' '}
                                                </Button> :
                                                <Button variant="secondary" disabled isProcessing={true}>
                                                    Rejecting Pitch {' '}
                                                </Button>
                                        }
                                    </> :
                                    <div>
                                        <Button onClick={() => handleApproval(true)}>
                                            Approve Pitch
                                        </Button>{' '}
                                        <Button variant="secondary" onClick={() => handleApproval(false)}>
                                            Reject Pitch
                                        </Button>
                                    </div>
                            }
                        </> :
                        <>
                            {
                                (pitch.status === '2') ?
                                    <p className="text-green-600">Approved</p> :
                                    <>
                                        {
                                            (pitch.status === '3') ?
                                                <p className="text-red-600">Rejected</p> :
                                                <p className="text-amber-400">Selected</p>
                                        }
                                    </>

                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Pitch