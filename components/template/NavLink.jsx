import React from 'react'
import Text from './Text'
import Link from 'next/link'

const NavLink = ({ children, className, href, active, ...props }) => {
    return (
        <Link href={href} className={`hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-400 hover:via-purple-600 hover:via-75% hover:to-violet-600 ${className}`} {...props}>
            {
                active ?
                    <Text>{children}</Text> :
                    <>{children}</>
            }
        </Link>
    )
}

export default NavLink