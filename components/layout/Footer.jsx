import React from 'react'
import Container from '../template/Container'
import { FaDiscord, FaEnvelope, FaGithub, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>
            <Container>
                <div className='mx-auto py-4 flex flex-wrap items-center justify-between'>
                    <div>
                        &copy; 2023 SPADClub
                    </div>
                    <div className='flex items-center gap-5 text-xl'>
                        <a className="text-gray-600 hover:text-gray-900" href='#'><FaTwitter /></a>
                        <a className="text-gray-600 hover:text-gray-900" href='#'><FaDiscord /></a>
                        <a className="text-gray-600 hover:text-gray-900" href='#'><FaGithub /></a>
                        <a className="text-gray-600 hover:text-gray-900" href='#'><FaEnvelope /></a>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer