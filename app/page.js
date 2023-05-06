"use client";
import Button from '@/components/template/Button'
import Modal from '@/components/template/Modal'
import Text from '@/components/template/Text'
import TextArea from '@/components/template/TextArea'
import TextInput from '@/components/template/TextInput'
import Image from 'next/image'
import { useState } from 'react'
import { FaAddressBook } from 'react-icons/fa'

export default function Home() {
  const [show, setShow] = useState(false)
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Text className='text-3xl font-bold'>Welcome World!</Text>
    </main>
  )
}
