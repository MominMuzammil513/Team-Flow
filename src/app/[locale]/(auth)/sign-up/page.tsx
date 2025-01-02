

import AuthCard from '@/components/auth/AuthCard'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title: "Sign up",
    description: "Sign up or Create an account"
}
const SignUp = () => {
  return (
    <AuthCard/>
  )
}

export default SignUp