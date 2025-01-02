

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
    size?: number
    className?: string
    hasLink?: boolean
}

export const AppTitle = ({ size = 20, className, hasLink }: Props) => {

    return (
        <>
            {hasLink ? (
                <Link href={'/dashboard'} className={cn("flex justify-center items-center gap-2 text-2xl bg-red-500 relative z-10", className)}>
                    <h1>
                        Team <span className='text-primary font-semibold'>Flow</span>
                    </h1>
                </Link>
            ) : (
                <div className={cn('flex justify-center items-center gap-2 text-2xl',className)}>
                    <h1>
                        Team <span className='text-primary font-semibold'>Flow</span>
                    </h1>
                </div>
            )}
        </>
    )
}
