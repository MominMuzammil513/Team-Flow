

import React from 'react'
import { useOnboardingForm } from '../../../../context/OnBoardingForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { additionalInfoUserSecondPart, AdditionalInfoUserSecondPart } from '@/Schemas/additionalInfoUserSecondPart'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { ActionType } from '@/types/onBoardingContext'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const useCase = [
    {
        case: "WORK",
        title: "SECOND_STEP.WORK" 
    },
    {
        case: "STUDY",
        title: "SECOND_STEP.STUDY" 
    },
    {
        case: "PERSONAL_USE",
        title: "SECOND_STEP.PERSONAL" 
    }
]

export const SecondStep = () => {
    const {currentStep, dispatch} = useOnboardingForm()
    const form = useForm<AdditionalInfoUserSecondPart>({
        resolver: zodResolver(additionalInfoUserSecondPart),
    })
    const t = useTranslations("ONBOARDING_FORM")
    const onSubmit = async (data:AdditionalInfoUserSecondPart) => {
        dispatch({type:ActionType.USECASE,payload:data.useCase})
        dispatch({type:ActionType.CHANGE_SITE,payload:currentStep + 1})
    }
  return (
    <>
        <div className='flex flex-col justify-center items-center gap-4 text-center w-full mt-10'>
            <h2 className='font-bold text-4xl md:text-5xl max-w-xs'>
                {t('SECOND_STEP.TITLE')} <span>Team</span> {" "}<span className='text-primary font-semibold'>Flow?</span>
            </h2>
            <p className='max-w-lg text-muted-foreground'>
                {t("SECOND_STEP.INFO")}
            </p>
        </div>
        <div className='max-w-md w-full space-y-8 mt-14'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                    control={form.control}
                    name="useCase"
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col space-y-1'>
                                    {useCase.map((useCase)=>(
                                        <FormItem key={useCase.case} className={`flex items-center space-x-3 space-y-0 rounded-md transition-colors p-3 duration-200 relative overflow-hidden ${form.getValues('useCase') === useCase.case?"bg-primary/40":"hover:bg-primary/10"}`}>
                                            <FormControl onClick={(e) => {
                                                const target = e.target as HTMLInputElement
                                                dispatch({
                                                    type: ActionType.USECASE,
                                                    payload: target.value
                                                })
                                            }}>

                                            <RadioGroupItem value={useCase.case}/>
                                            </FormControl>
                                            <FormLabel className='font-normal lg:text-lg h-ful left-9 flex items-center absolute w-full cursor-pointer'>
                                                {t(useCase.title)}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <Button disabled={!form.formState.isValid} type='submit' className='mt-10 w-full max-w-md font-semibold'>
                        {t("NEXT_BTN")}
                        <ArrowRight className='' width={18} hanging={18}/>
                    </Button>
                </form>
            </Form>
        </div>
    </>
  )
}
