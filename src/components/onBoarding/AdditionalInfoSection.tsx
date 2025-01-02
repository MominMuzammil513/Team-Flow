"use client"

import React from 'react'
import { useOnboardingForm } from '../../../context/OnBoardingForm'
import { FirstStep } from './steps/FirstStep'
import { SecondStep } from './steps/SecondStep'
import { ThirdStep } from './steps/ThirdStep'
import FormSteps from './steps/FormSteps'
import { AppTitle } from '../ui/app-title'
import { Finish } from './steps/Finish'

interface Props {
  profileImage?: string | null;

}

const AdditionalInfoSection = ({profileImage} : Props) => {
    const {currentStep} = useOnboardingForm()
  return (
    <section className='w-full lg:w-1/2 bg-card min-h-screen flex flex-col justify-between items-center p-4 md:p-6'>
        <div className='mt-16 mb-8 w-full flex flex-col items-center'>
           <AppTitle size={50}/>
            {currentStep === 1 && <FirstStep profileImage={profileImage}/>}
            {currentStep === 2 && <SecondStep/>}
            {currentStep === 3 && <ThirdStep/>}
            {currentStep === 4 && <Finish/>}
        </div>
        <FormSteps/>
    </section>
  )
}

export default AdditionalInfoSection