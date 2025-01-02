"use client"

import { usePathname } from '@/i18n/routing'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const BreadcrumbNavbar = () => {
    const pathname = usePathname()
    const pathName = pathname.split("/").filter((path) => path !== "te" && path.trim() !== "")
    const t = useTranslations("ROUTES")
    if(pathName.length > 1){
        return (
            <div className='flex gap-0.5 items-center'>
                {
                    pathName.map((link,i) => {
                        const href = `/${pathName.slice(0,i+1).join("/")}`
                        return (
                            <div className='flex gap-0.5 items-center' key={i}>
                                {
                                    i+1 < pathName.length ? (
                                        <>
                                            <Link className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background rounded-md px-2' href={href} >{t(link.toUpperCase())}</Link>
                                            <ChevronRight className='text-primary'/>
                                        </>
                                    ) : (
                                        <p>{t(link.toUpperCase())}</p>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default BreadcrumbNavbar