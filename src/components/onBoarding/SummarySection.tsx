"use client"

import React from 'react'
import { useOnboardingForm } from '../../../context/OnBoardingForm'
import { UserAvatar } from '../ui/user-avatar'
import { useTranslations } from 'next-intl'

const SummarySection = () => {
    const { name, surname, useCase, profileImage, currentStep } = useOnboardingForm()
    const t = useTranslations("ONBOARDING_FORM")
    return (
        <section className='hidden lg:w-1/2 lg:flex justify-center items-center border-l-2'>
            {currentStep < 3 && <div className='bg-card rounded-2xl border w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5'>
                <UserAvatar className='h-32 w-32 shadow-sm mt-[-5rem]' size={40} profileImage={profileImage} />
                <div className='text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold'>
                    {name && <p>{name}</p>}
                    {surname && <p>{surname}</p>}
                </div>
                {!useCase && <span className='bg-muted rounded-md w-24 h-8'></span>}
                {
                    useCase && (
                        <p>
                            {useCase === "WORK" && t("SECOND_STEP.WORK")}
                            {useCase === "STUDY" && t("SECOND_STEP.STUDY")}
                            {useCase === "PERSONAL_USE" && t("SECOND_STEP.PERSONAL")}
                        </p>
                    )
                }
            </div>}

        </section>
    )
}

export default SummarySection