"use client";
import React, { useRef } from 'react'
import Container from '../template/Container'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi'
import Text from '../template/Text'
import NavLink from '../template/NavLink'
import Button from '../template/Button'
import WalletConnect from '../WalletConnect';

const Header = () => {
    const pathname = usePathname();
    const menuIcon = useRef();
    const closeIcon = useRef();
    const navLinks = useRef();

    const handleMenu = () => {
        navLinks.current.classList.toggle('top-[9%]');
        menuIcon.current.classList.toggle('hidden');
        closeIcon.current.classList.toggle('hidden');
    }

    return (
        <header>
            <Container>
                <nav className='mx-auto py-2 flex flex-wrap items-center justify-between'>
                    <Link href="/">
                        <Text className='text-3xl font-black'>
                            SpadClub
                        </Text>
                    </Link>
                    <div ref={navLinks} className='duration-500 md:static absolute bg-gray-50 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5'>
                        <div className='flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8 font-semibold'>
                            <NavLink href="/about" active={pathname == '/about'}>About</NavLink>
                            <NavLink href="/clubs" active={pathname == '/clubs'}>Clubs</NavLink>
                            <NavLink href="/clubs/create" active={pathname == '/clubs/create'}>Create Club</NavLink>
                            <NavLink href="/contact" active={pathname == '/contact'}>Contact</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <WalletConnect />
                        <div className='text-3xl cursor-pointer md:hidden' onClick={handleMenu}>
                            <div ref={menuIcon} className=''>
                                <FiMenu />
                            </div>
                            <div ref={closeIcon} className='hidden'>
                                <FiX />
                            </div>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header