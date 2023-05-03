"use client";

import { Footer } from "flowbite-react"
import { FaDiscord, FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa"

const SiteFooter = () => {
    return (
        <Footer container={true} className="rounded-none">
            <Footer.Copyright
                href="/"
                by="TokenClub™"
                year={2023}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon
                    href="#"
                    icon={FaTwitter}
                />
                <Footer.Icon
                    href="#"
                    icon={FaDiscord}
                />
                <Footer.Icon
                    href="#"
                    icon={FaGithub}
                />
                <Footer.Icon
                    href="#"
                    icon={FaEnvelope}
                />
            </div>
        </Footer>
    )
}

export default SiteFooter