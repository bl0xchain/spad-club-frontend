import React from 'react'

const Container = ({ children, className, ...props }) => {
    return (
        <div className={`container mx-auto px-2 2xl:px-5 ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Container