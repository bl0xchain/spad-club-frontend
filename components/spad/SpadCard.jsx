import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { getSpadInfo } from '@/helpers/tokenClub'
import { getExcerpt } from '@/helpers/helpers'
import DataLoading from '../DataLoading'

const SpadCard = ({ clubAddress, spadId }) => {
  const [spad, setSpad] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadSpad = async () => {
    const data = await getSpadInfo(clubAddress, spadId);
    setSpad(data);
    setLoading(false);
  }

  useEffect(() => {
    loadSpad()
  }, [])

  if (loading) {
    return (
      <Card>
        <DataLoading />
      </Card>
    )
  }

  return (
    <Card href={`/clubs/${clubAddress}/${spadId}`}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {spad.spadName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {getExcerpt(spad.spadDescription, 80)}
      </p>
    </Card>
  )
}

export default SpadCard