

import React from 'react'
import User from './User'
import BreadcrumbNavbar from './BreadcrumbNavbar'
import { Welcoming } from './Welcoming'
import { getAuthSession } from '@/lib/authOption'

export const DashboardHeader = async () => {
const session = await getAuthSession()
  return (
    <header className='flex w-full justify-between items-center mb-10'>
      <Welcoming/>
        <BreadcrumbNavbar/>
        <User profileImage={session?.user.image}/>
    </header>
  )
}
