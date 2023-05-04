"use client";
import { Navbar } from "flowbite-react"
import WalletConnect from "./WalletConnect";
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    return (
        <Navbar
            fluid={false}
            rounded={false}
            className="bg-gray-50"
        >
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-3xl font-extrabold text-color dark:text-white">
                    SpadClub
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <WalletConnect />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/about" className={pathname === '/about' ? 'text-color text-lg' : 'text-lg'}>
                    About
                </Navbar.Link>
                <Navbar.Link href="/clubs" className={pathname === '/clubs' ? 'text-color text-lg' : 'text-lg'}>
                    Clubs
                </Navbar.Link>
                <Navbar.Link href="/clubs/create" className={pathname === '/clubs/create' ? 'text-color text-lg' : 'text-lg'}>
                    Create Club
                </Navbar.Link>
                <Navbar.Link href="/contact" className={pathname === '/contact' ? 'text-color text-lg' : 'text-lg'}>
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header