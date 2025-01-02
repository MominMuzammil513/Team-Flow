"use client"

import React from 'react'
import { useOnboardingForm } from '../../../../context/OnBoardingForm'

const steps = [1,2,3,4]

const FormSteps = () => {
    const {currentStep} = useOnboardingForm()
  return (
    <div className='flex justify-center items-center gap-2 w-full'>
        {steps.map((step)=>(
            <span key={step} className={`h-2.5 w-8 border px-6 py-1 rounded-md shadow-sm ${currentStep >= step ? "bg-primary ": "bg-muted"}`}></span>
        ))}
    </div>
  )
}

export default FormSteps