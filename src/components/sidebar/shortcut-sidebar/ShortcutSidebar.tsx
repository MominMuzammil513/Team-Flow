


import React from 'react'
import { Top } from './Top'
import { Bottom } from './Bottom'
import Workspaces from './Workspaces'

const ShortcutSidebar = () => {
  return (
    <div className='border-r h-full flex flex-col justify-between items-center p-4 sm:py-6'>
      <div className='w-full h-2/3'>
        <Top/>
        <Workspaces/>
      </div>
      <Bottom/>
    </div>
  )
}

export default ShortcutSidebar