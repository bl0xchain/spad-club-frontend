import { getShortAddress } from '@/helpers/helpers'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

const EtherscanAddress = ({ address, text, icon }) => {
  return (
    <a href={`https://goerli.etherscan.io/address/${address}`} target='_blank'>
        { text ? text : getShortAddress(address) } {" "}
        { icon && <FaExternalLinkAlt className='inline text-xs' /> }
    </a>
  )
}

export default EtherscanAddress