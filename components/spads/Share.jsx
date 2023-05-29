import React, { useState } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

const Share = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='flex justify-end'>
            <button className='bg-white text-gray-800 px-4 py-2 rounded-full' onClick={() => setOpen(!open)}>
                <FaShareAlt />
            </button>
            <div className={`flex gap-2 overflow-hidden transition ease-in-out delay-300 ${open ? 'w-[152px] ml-2 visible' : 'w-0 ml-0'}`}>
                <TwitterShareButton
                    title="You might find this interesting"
                    url={window.location.href}
                >
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton> {" "}
                <TelegramShareButton
                    title="You might find this interesting"
                    url={window.location.href}
                >
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton> {" "}
                <WhatsappShareButton
                    title="You might find this interesting to participate"
                    url={window.location.href}
                >
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton> {" "}
                <EmailShareButton
                    subject="You might find this interesting"
                    body="This is interesting SPAD. Please have a look and participate"
                    url={window.location.href}
                >
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
            </div>
        </div>
    )
}

export default Share