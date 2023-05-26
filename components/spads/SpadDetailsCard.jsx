import React from 'react'
import Card from '../template/Card'
import Moment from 'react-moment'
import { FaDotCircle, FaMinus, FaShieldAlt, FaUser } from 'react-icons/fa'
import EtherscanAddress from '../layout/EtherscanAddress'
import ProgressBar from '../template/ProgressBar'
import Text from '../template/Text'
import SpadActions from './SpadActions'

const SpadDetailsCard = ({ spadAddress, spad, loadSpad, hideActions }) => {
    const spadStatus = {
        1: 'pending',
        2: 'open',
        3: 'expired',
        4: 'closed',
        5: 'acquired'
    }
    return (
        <Card>
            <div className="relative rounded-xl bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 p-5 text-white">
                <div className="text-end">Share Buttons</div>
                <div className='flex justify-between gap-5'>
                    <div >
                        <p className="font-bold text-lg">TOKEN SYMBOL</p>
                        <div className="absolute block bg-white text-gray-800 font-bold text-3xl text-center pt-11 w-32 h-32 rounded-full border-purple-500 border-2 -bottom-[55px]">{spad.symbol}</div>
                    </div>
                    <div className="text-end">
                        <p className="font-bold text-xl mb-4">SPAD NAME</p>
                        <h2 className="font-bold text-4xl mb-4">{spad.name}</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-5 font-bold spad-feature-list'>
                <div>
                    <Moment unix format="DD MMM YYYY">{spad.created}</Moment>
                </div>
                <div className='flex items-center gap-1'>
                    <FaUser /> {" "}
                    <EtherscanAddress address={spad.creator} icon={true} />
                </div>
                <div className='flex items-center gap-1'>
                    <FaShieldAlt /> {" "}
                    {spad.isPrivate ? "Private" : "Public"}
                </div>
                <div className='flex items-center gap-1 capitalize'>
                    <FaDotCircle className={spadStatus[spad.status]} />  {" "}
                    {spadStatus[spad.status]}
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 my-5 font-bold'>
                <div className='text-gray-500'>
                    SPAD CREATOR
                </div>
                <div className='col-span-3'>
                    <EtherscanAddress address={spad.creator} icon={true} />
                </div>
                <div className='text-gray-500'>DTS SCORE</div>
                <div className='col-span-3'>
                    <iframe src={"https://dts-app-umber.vercel.app/score?address=" + spad.creator} height="28" scrolling="no" />
                </div>
                <div className='text-gray-500'>CURRENCY</div>
                <div>
                    {spad.investmentCurrency}
                </div>
                <div className='text-gray-500'>CONTRIBUTION RANGE</div>
                <div className=' flex items-center gap-3'>
                    {spad.minInvestmentView} {" "} {spad.investmentCurrency}
                    {" "} <FaMinus /> {" "}
                    {spad.maxInvestmentView} {" "} {spad.investmentCurrency}
                </div>
                <div className='text-gray-500'>SPAD PROGRESS</div>
                <div className='col-span-3'>
                    <ProgressBar progress={spad.currentInvstPercent} />
                    <div className='flex justify-between'>
                        <Text>{spad.currentInvstPercent}% Contribution done</Text>
                        <div>
                            {spad.currentInvestmentView}/ 
                                {spad.targetView} 
                                {" "}{spad.investmentCurrency}
                        </div>
                    </div>
                </div>
            </div>
            {
                ! hideActions &&
                <SpadActions spadAddress={spadAddress} spad={spad} loadSpad={loadSpad} />
            }
        </Card>
    )
}

export default SpadDetailsCard