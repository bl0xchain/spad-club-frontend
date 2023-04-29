"use client";

import DataLoading from '@/components/DataLoading';
import EtherscanAddress from '@/components/EtherscanAddress';
import CreateSpad from '@/components/spad/CreateSpad';
import SpadCard from '@/components/spad/SpadCard';
import { getClubData } from '@/helpers/tokenClub';
import React, { useEffect, useState } from 'react'

const TokenClubPage = ({ params }) => {
  const clubAddress = params.clubAddress;

  const [club, setClub] = useState(null)
  const [spadIds, setSpadIds] = useState([])
  const [loading, setLoading] = useState(true)

  const loadClub = async () => {
    const data = await getClubData(clubAddress);
    setClub(data);
    if(data.spadCount > 0) {
      const spads = [];
      for(let i = 1; i <= data.spadCount; i++) {
        spads.push(i);
      }
      setSpadIds(spads);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadClub()
  }, [])

  if (loading) {
    return (
      <DataLoading />
    )
  }

  return (
    <div className='max-w-4xl' style={{ margin: "0 auto" }}>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {club.name}
      </h2>
      <p className='mb-4 text-gray-500'>
        By {" "}
        <span className='hover:text-gray-800 hover:underline'>
          <EtherscanAddress address={club.creator} />
        </span>
      </p>
      <p className="mb-10 font-normal text-gray-700 dark:text-gray-400">
        {club.description}
      </p>
      
      <div className='flex items-center justify-between mb-8'>
        <h3 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          SPADS {" "}
          <span className='inline-flex items-center justify-center w-8 h-8 ml-2 text-lg font-semibold text-blue-800 bg-blue-200 rounded-full'>{ club.spadCount }</span> 
        </h3>
        <CreateSpad clubAddress={clubAddress} loadClub={loadClub} creator={club.creator} />
      </div>
      { spadIds.length > 0 && 
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          { spadIds.map((id) => (
            <SpadCard key={id} clubAddress={clubAddress} spadId={id} />
          )) }
        </div>
      }
    </div>
  )
}

export default TokenClubPage