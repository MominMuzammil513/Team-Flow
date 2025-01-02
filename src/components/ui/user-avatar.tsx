

import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface Props {
    size?: number;
    className?: string;
    profileImage?: string | null;
}

export const UserAvatar = ({size = 16, className, profileImage}: Props) => {
  return (
    <div className={cn("h-16 w-16 bg-muted flex justify-center items-center text-muted-foreground relative overflow-hidden rounded-full")}>
        {profileImage? (
            <Image src={profileImage} fill alt='profile image avatar' priority/>
        ):(
            <User size={size}/>
        )}
    </div>
  )
}
