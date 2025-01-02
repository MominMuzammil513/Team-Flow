"use client"

import { useTranslations } from "next-intl"
import { useOnboardingForm } from "../../../../context/OnBoardingForm"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import LoadingState from "@/components/ui/loading-state"

export const Finish = () => {
    const { workspaceName, workspaceImage, name, surname, useCase } = useOnboardingForm()
    const t = useTranslations("ONBOARDING_FORM")
    const { toast } = useToast()
    const m = useTranslations("MESSAGES")
    const router = useRouter()
    const { update } = useSession()

    const {mutate: completeOnboarding, isPending} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(`/api/onboarding`,{
                name,
                surname,
                useCase,
                workspaceName,
                workspaceImage
            })
            return data
        },
        onError: (err:AxiosError)=>{
            const error = err?.response?.data? err.response.data : "ERRORS_DEFAULT"
            toast({
                title: m(error),
                variant: "destructive"
            })
        },
        onSuccess: async () => {
            toast({
                title: m("SUCCESS.ONBOARDING_COMPLETE")
            })
            await update()
            router.push("/dashboard")
            router.refresh()
        },
        mutationKey: ["completeOnboarding"]
    })
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
                <h2>{t("FINISH.TITLE")}</h2>
            </div>
            <div className="font-bold text-xl sm:text-2xl md:text-3xl w-full max-w-lg text-center">
                <p>
                    {t("FINISH.DESC_FIRST")} {" "}
                    <span>
                    Team <span className="text-primary font-semibold">Flow</span>
                    </span>
                    {t("FINISH.DESC_SECOND")} {" "}
                </p>
                <Button disabled={isPending} onClick={()=> completeOnboarding()} type="submit" className="mt-10 sm:-32 w-full max-w-md font-semibold">{isPending ? <LoadingState/>: <>{t("START_BTN")}</>}</Button>
            </div>
        </>
    )
}

