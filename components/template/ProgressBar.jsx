import React from 'react'

const ProgressBar = ({ className, progress, ...props }) => {
  return (
    <div className='w-full overflow-hidden rounded-full bg-gray-200 h-4'>
    {
        progress > 0 &&
        <div className='rounded-full text-center font-medium leading-none text-white space-x-2 bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 h-4' style={{width: `${progress}%`}}>
            <span>{`${progress}%`}</span>
        </div>
    }
    </div>
  )
}

export default ProgressBar