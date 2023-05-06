import React from 'react'

const TextArea = ({ className, rows, ...props }) => {
    return (
        <textarea className={`block w-full border disabled:cursor-not-allowed outline-0 disabled:opacity-50 bg-gray-200 border-gray-200  focus:border-purple-400 focus:ring-purple-200 focus:ring-4 rounded-2xl p-2.5 text-sm ${className}`} rows={rows? rows : '4'} {...props} />
    )
}

export default TextArea