"use client";
import { Button, Navbar } from "flowbite-react"
import WalletConnect from "./WalletConnect";

const Header = () => {
    return (
        <Navbar
            fluid={false}
            rounded={true}
        >
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    TokenClub
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <WalletConnect />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/about">
                    About
                </Navbar.Link>
                <Navbar.Link href="/clubs">
                    Clubs
                </Navbar.Link>
                <Navbar.Link href="/clubs/create">
                    Create Club
                </Navbar.Link>
                <Navbar.Link href="/contact">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header