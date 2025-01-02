"use client"
import React from 'react'
// import { useTranslations } from 'next-intl'
import ThemeSwitcher from '@/components/switchers/ThemeSwitcher'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import LocaleSwitcher from '@/components/switchers/LocaleSwitcher'
import Link from 'next/link'

const Home = () => {
    // const t = useTranslations("Index")
    const session = useSession()
    // console.log(session, "session");
    // console.log(session.data,"session.data");
    // console.log(session.data?.user,"session.data.user");
    // console.log(session.data?.expires,"session.data.expires");
    // console.log(session.status,"session.status");
    // console.log(session.update,"session.update");
    const logoutHandler = () =>{
      signOut({
        callbackUrl:`${window.location.origin}/sign-in`
      })
    }
  return (
    <>
      {session.data?.user ? <Button onClick={logoutHandler}>Logout</Button>:<Link href={`/sign-in`}>Signin</Link>}
      <LocaleSwitcher alignDropdown="end" alignHover="end" size={"icon"} variant={"outline"}/>
      <ThemeSwitcher alignDropdown="end" alignHover="end" size={"icon"} variant={"outline"}/>
    </>
  )
}
export default Home

