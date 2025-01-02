"use client"

import React, { startTransition } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import LoadingState from "../ui/loading-state";
import { useLocale, useTranslations } from "next-intl";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter, usePathname } from "@/i18n/routing";
import { HoverCard, HoverCardContent } from "../ui/hover-card";

interface Props {
    variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    alignHover: "start" | "center" | "end";
    alignDropdown: "start" | "center" | "end";
    textSize?: "text-lg" | "text-base" | "text-sm" | "text-xs";
}

const LocaleSwitcher = ({alignDropdown = "center", alignHover = "center", size = "default", textSize = "text-base", variant = "default"}: Props) => {
    const t = useTranslations("COMMON")
    const [isLoading, setIsLoading] = React.useState(false);
    const locale = useLocale()
    const router = useRouter();
    const pathname = usePathname();
    const onSelectChange = async (nextLocale: "te" | "en") => {
        setIsLoading(true);
        startTransition(() => {
            router.replace(pathname,{locale: nextLocale});
        })
    }
  return (
    <HoverCard openDelay={250} closeDelay={250}>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button disabled={isLoading} variant={variant} size={size} className={textSize}>
                {isLoading ? <LoadingState className="mr-0"/>: locale.toUpperCase()}
                <span className="sr-only">{t("LANG_HOVER")}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={alignDropdown}>
            <DropdownMenuItem className="cursor-pointer max-w-min" onClick={() => onSelectChange("en")}>En</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer max-w-min" onClick={() => onSelectChange("te")}>TE</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <HoverCardContent align={alignHover}>
            <span>{t("LANG_HOVER")}</span>
    </HoverCardContent>
    </HoverCard>
  )
}

export default LocaleSwitcher