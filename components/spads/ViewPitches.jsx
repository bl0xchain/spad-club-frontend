import { getPitchers } from '@/helpers/actions';
import React, { useEffect, useState } from 'react'
import DataLoading from '../layout/DataLoading';
import Pitch from './Pitch';

const ViewPitches = ({ spadAddress }) => {
    const [pitchers, setPitchers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (spadAddress) {
                const pitchers = await getPitchers(spadAddress);
                setPitchers(pitchers);
            }
        }
        fetchData();
    }, [spadAddress]);

    if (pitchers === null) {
        return (<DataLoading />)
    }

    return (
        <div>
            <h2 className='mt-10 text-2xl font-bold text-center'>Pitches</h2>
            {
                pitchers.length == 0 ?
                    <h4 className="text-amber-500 mt-5">No Pitch Found</h4> :
                    <div className="bg-white rounded-xl shadow-lg my-4">
                        {pitchers && pitchers.map(function (pitcher, i) {
                            return <div className="list-group-item p-4" key={i} >
                                <Pitch spadAddress={spadAddress} pitcher={pitcher} />
                            </div>
                        })}
                    </div>
            }
        </div>
    )
}

export default ViewPitches