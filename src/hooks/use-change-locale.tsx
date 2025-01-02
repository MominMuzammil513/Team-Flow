"use client"

import { useRouter,usePathname } from "@/i18n/routing"
import { useState, useTransition } from "react"

export const useChangeLocale = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isPending, startTransition] = useTransition()
    const pathname = usePathname()
    const router = useRouter()

    const onSelectChange = async (nextLocale: "te" | "en") => {
        setIsLoading(true);
        startTransition(() => {
            router.replace(pathname,{locale: nextLocale});
        })
    }
    return { isLoading, isPending, onSelectChange}
}