import Card from '@/components/template/Card'
import Container from '@/components/template/Container'
import React from 'react'

const CreateSpadPage = () => {
  return (
    <Container>
      <div className='flex justify-center gap-5 mb-5'>
        <div className='flex-initial w-72'>
          <Card href="/spads/create/public">
            <div className='flex flex-col h-56 justify-center gap-5'>
              <h2 className='text-gray-400 font-bold text-center'>Public SPAD</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minima aliquid eius dicta molestiae ipsam consectetur totam explicabo.</p>
            </div>
          </Card>
        </div>
        <div className='flex-initial w-72'>
          <Card href="/spads/create/private">
            <div className='flex flex-col h-56 justify-center gap-5'>
              <h2 className='text-gray-400 font-bold text-center'>Private SPAD</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minima aliquid eius dicta molestiae ipsam consectetur totam explicabo.</p>
            </div>
          </Card>
        </div>
      </div>
      <div className='flex justify-center gap-5'>
        <div className='flex-initial w-72'>
          <Card href="/clubs/create">
            <div className='flex flex-col h-56 justify-center gap-5'>
              <h2 className='text-gray-400 font-bold text-center'>SPAD CLUB</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minima aliquid eius dicta molestiae ipsam consectetur totam explicabo.</p>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default CreateSpadPage