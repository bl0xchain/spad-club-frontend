import { Spinner } from 'flowbite-react'
import React from 'react'

const DataLoading = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-between p-4'>
        <Spinner
            aria-label="Extra large spinner example"
            size="xl"
        />
        {
            message ?
            <p>{message} {" "} ...</p> :
            <p>Loading ...</p>
        }
    </div>
  )
}

export default DataLoading