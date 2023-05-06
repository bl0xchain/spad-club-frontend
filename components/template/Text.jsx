import React from 'react'

const Text = ({ children, className, ...props }) => {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 ${className}`} {...props}>
        {children}
    </span>
  )
}

export default Text