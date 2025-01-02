"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'
import { buttonVariants } from "./button";

interface Props {
    href: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
    size?: "default" | "sm" | "lg" | "icon" | null;
    children?: React.ReactNode
    include?: string
}

const ActiveLink = React.forwardRef<HTMLAnchorElement, Props>(
    (
        { href, children, className, include, size, variant, ...props }: Props,
        ref
    ) => {
        const pathname = usePathname()
        const isActive = pathname === href || (include && pathname.startsWith(include))
        const activeClass = isActive ? "bg-secondary font-semibold" : ""

        return (
            <Link href={href} className={cn(buttonVariants({ variant, size }), activeClass, className)} ref={ref} {...props}>
                {children}
            </Link>
        )
    }
)

ActiveLink.displayName = "ActiveLink"

export default ActiveLink