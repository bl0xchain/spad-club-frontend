import React from 'react'
import Card from '../template/Card'

const CreateSpadSelect = ({ className, active }) => {
  return (
    <div className={`grid grid-cols-3 gap-5 mt-8 ${className} text-center`}>
        <Card className={active == 'public' && 'bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 font-bold text-white'} href={active == 'public' ? '' : '/spads/create/public'}>
            Public Spad
        </Card>
        <Card className={active == 'private' && 'bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 font-bold text-white'} href={active == 'private' ? '' : '/spads/create/private'}>
            Private Spad
        </Card>
        <Card className={active == 'club' && 'bg-gradient-to-r from-rose-400 via-purple-600 via-75% to-violet-600 font-bold text-white'} href={active == 'club' ? '' : '/clubs/create'}>
            Club Spad
        </Card>
    </div>
  )
}

export default CreateSpadSelect