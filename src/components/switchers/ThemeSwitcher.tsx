"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { HoverCard, HoverCardContent } from '../ui/hover-card'

interface Props {
    variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    alignHover: "start" | "center" | "end";
    alignDropdown: "start" | "center" | "end";
}

const ThemeSwitcher = ({alignDropdown = "center", alignHover = "center", size = "default", variant = "default"}: Props) => {
    const {setTheme} = useTheme()
    const t = useTranslations("COMMON")
  return (
    <HoverCard openDelay={250} closeDelay={250}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size={size}>
                    <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'/>
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-00 dark:scale-100'/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={alignDropdown}>
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <HoverCardContent align={alignHover}>
            <span>{t("THEME_HOVER")}</span>
        </HoverCardContent>
    </HoverCard>
  )
}

export default ThemeSwitcher