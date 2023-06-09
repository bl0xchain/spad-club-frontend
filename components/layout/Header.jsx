"use client";
import React, { useRef } from 'react'
import Container from '../template/Container'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi'
import Text from '../template/Text'
import NavLink from '../template/NavLink'
import WalletConnect from '../WalletConnect';

const Header = () => {
    const pathname = usePathname();
    const menuIcon = useRef();
    const closeIcon = useRef();
    const navLinks = useRef();

    const handleMenu = () => {
        navLinks.current.classList.toggle('left-[0%]');
        menuIcon.current.classList.toggle('hidden');
        closeIcon.current.classList.toggle('hidden');
    }

    return (
        <header>
            <Container>
                <nav className='mx-auto py-2 md:flex flex-wrap items-center justify-between'>
                    <div className='flex justify-between'>
                        <Link href="/">
                            <Text className='text-3xl font-extrabold'>
                                SPAD
                            </Text>
                        </Link>
                        <div className='text-3xl cursor-pointer md:hidden z-50' onClick={handleMenu}>
                            <div ref={menuIcon} className=''>
                                <FiMenu />
                            </div>
                            <div ref={closeIcon} className='hidden'>
                                <FiX />
                            </div>
                        </div>
                    </div>
                    <div ref={navLinks} className='duration-500 md:static absolute bg-gray-50 md:bg-transparent md:min-h-fit min-h-[100vh] left-[-100%] top-0 md:w-auto w-full flex flex-col items-center px-5 z-40'>
                        <Text className='text-3xl font-extrabold md:hidden mt-4 mb-10'>
                            SPAD
                        </Text>
                        <div className='flex md:flex-row flex-col md:items-center text-center md:gap-[2vw] gap-8 font-semibold'>
                            <NavLink href="/spads" active={pathname == '/spads'} onClick={handleMenu}>Public SPADs</NavLink>
                            <NavLink href="/clubs" active={pathname == '/clubs'} onClick={handleMenu}>SPADClubs</NavLink>
                            <NavLink href="/portfolio" active={pathname == '/portfolio'} onClick={handleMenu}>Portfolio</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-6">
                        <Link href="/spads/create" className='hover:bg-gradient-to-r hover:from-rose-400 hover:via-purple-600 via-75% hover:to-violet-600 rounded-full transition-all duration-75 ease-in'>
                            <Text className="block px-4 py-2 font-bold hover:text-white">Create</Text>
                        </Link>
                        <WalletConnect />
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header