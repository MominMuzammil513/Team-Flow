"use client"

import { usePathname } from '@/i18n/routing'
import React from 'react'

export const Welcoming = () => {
    const pathname = usePathname()

  if(pathname === "/dashboard"){
    return (
        <>
            <div className='space-y-1'>
                <p>
                    Hey&apos; <span>Momin Muzammil</span> ðŸ‘‹ 👋
                </p>
                <p className='text-muted-foreground max-w-sm sm:max-w-xl'>
                    Welcome to Team Flow App !!!
                </p>
            </div>
        </>
      )
  }
}
