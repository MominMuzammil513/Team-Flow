

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { additionalUserInfoFirstPart, AdditionalUserInfoFirstPart } from '@/Schemas/additionalUserInfoFirstPart'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOnboardingForm } from '../../../../context/OnBoardingForm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ActionType } from '@/types/onBoardingContext'
import AddUserImage from '../common/AddUserImage'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

interface Props {
    profileImage?: string | null;

}

export const FirstStep = ({profileImage}: Props) => {
    const session = useSession()
    const { currentStep, name, surname, dispatch } = useOnboardingForm()
    console.log("PROFILE IMAGE OF USER", profileImage);
    const form = useForm<AdditionalUserInfoFirstPart>({
        resolver: zodResolver(additionalUserInfoFirstPart),
        defaultValues: {
            name: name ? name : "",
            surname: surname ? surname : ""
        }
    })

    useEffect(() => {
        dispatch({ type: ActionType.PROFILEIMAGE, payload: profileImage as string | undefined | null })
    }, [profileImage, dispatch])

    const onSubmit = async (data: AdditionalUserInfoFirstPart) => {
        dispatch({ type: ActionType.NAME, payload: data.name! })
        dispatch({ type: ActionType.SURNAME, payload: data.surname! })
        dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
    }
    const t = useTranslations("ONBOARDING_FORM")
    return (
        <>
            <h2 className='flex flex-col my-10 text-4xl md:text-5xl items-center'>
                <span>{t("FIRST_STEP.TITLE.FIRST")}</span>
                <span>{t("FIRST_STEP.TITLE.SECOND")}</span>
            </h2>
            <div className='max-w-md w-full space-y-8'>
                <div className='w-full flex flex-col justify-center items-center gap-2 text-muted-foreground'>
                    <p>{t("FIRST_STEP.PHOTO")}</p>
                    <AddUserImage profileImage={profileImage} />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='space-y-1.5'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-muted-foreground'>{t("FIRST_STEP.INPUTS.NAME")}</FormLabel>
                                        <FormControl>
                                            <Input className='bg-muted' placeholder='John' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='surname'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-muted-foreground'>{t("FIRST_STEP.INPUTS.SURNAME")}</FormLabel>
                                        <FormControl>
                                            <Input className='bg-muted' placeholder='Black cobra' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='w-full max-w-md font-semibold'>{t("NEXT_BTN")}
                            <ArrowRight className='' width={18} height={18} />
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
