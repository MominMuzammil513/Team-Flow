"use client"

import ActiveLink from "@/components/ui/active-link"
import { LockKeyhole, SunMoon, User2 } from "lucide-react"
import { useTranslations } from "next-intl"

const settingsFields = [
    {
        href: "/dashboard/settings",
        icon: <User2 size={20}/>,
        title: "SETTINGS.ACCOUNT"
    },
    {
        href: "/dashboard/settings/security",
        icon: <LockKeyhole size={20}/>,
        title: "SETTINGS.SECURITY"
    },
    {
        href: "/dashboard/settings/theme",
        icon: <SunMoon size={20}/>,
        title: "SETTINGS.THEME"
    }
]

export const Settings = () => {
    const t = useTranslations("SIDEBAR")

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="">
                <p className="text-xs sm:text-sm uppercase text-muted-foreground">{t("SETTINGS.GENERAL")}</p>
                <div className="flex flex-col gap-2 w-full mt-2">
                    {settingsFields.map((settingField, i) => (
                        <ActiveLink key={i} variant={"ghost"} size={"sm"} href={settingField.href} className="flex justify-start items-center w-full gap-2">
                            {settingField.icon}
                            {t(settingField.title)}
                        </ActiveLink>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-xs sm:text-sm uppercase text-muted-foreground">{t("SETTINGS.WORKSPACE")}</p>
                <div className="flex flex-col gap-2 w-full mt-2 h-96 overflow-auto"></div>
            </div>
        </div>
    )
}