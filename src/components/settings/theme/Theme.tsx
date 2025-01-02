"use client"

import React, { useEffect } from 'react'
import { ThemeCard } from './ThemeCard'
import { useTheme } from 'next-themes'
import LoadingState from '@/components/ui/loading-state'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Theme = () => {
  const [isMounted, setIsMounted] = React.useState(false)
    const {setTheme,theme } = useTheme()
    useEffect(()=>{
      setIsMounted(true)
    },[])
    if(!isMounted) return (
      <div>
        <LoadingState className='h-12 w-12'/>
      </div>
    )
  return (
    <>
        <Card className='bg-background border-none shadow-none'>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription className='text-base'>Select how would like your interface look. Select theme from dark, light or system  </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-row gap-6'>
            <ThemeCard onTheme={setTheme} theme='light' activeTheme={theme}/>
            <ThemeCard onTheme={setTheme} theme='dark' activeTheme={theme}/>
            <ThemeCard onTheme={setTheme} theme='system' activeTheme={theme}/>
          </CardContent>
        </Card>
    </>
  )
}
