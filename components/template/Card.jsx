import Link from 'next/link'
import React from 'react'

const Card = ({ children, className, href, noPadding, ...props }) => {
    return (
        <>
            {
                href ?
                    <Link href={href} className={`flex rounded-xl border border-gray-100 bg-white shadow-xl flex-col hover:shadow-2xl ${className}`}>
                        <div className='flex h-full flex-col justify-center gap-4 p-6'>
                            {children}
                        </div>
                    </Link> :
                    <div className={`flex rounded-xl border border-gray-100 bg-white shadow-xl flex-col ${className}`}>
                        <div className={`flex h-full flex-col justify-center gap-4 ${!noPadding && 'p-3 md:p-6'}`}>
                            {children}
                        </div>
                    </div>
            }
        </>

    )
}

export default Card