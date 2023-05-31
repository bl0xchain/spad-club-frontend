import Link from 'next/link'
import React from 'react'

const Button2 = ({ children, className, isProcessing, variant, href, ...props }) => {
    return (
        <>
            <div className='border-color border-transparent border-2 rounded-full px-2 py-0.5 text-center'>
                { children }
            </div>
        </>

    )
}

export default Button2