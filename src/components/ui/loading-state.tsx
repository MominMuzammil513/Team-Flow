import { cn } from "@/lib/utils"
import { svgProps } from "@/types/svg-props"
import { Loader2 } from "lucide-react"


interface Props extends svgProps {
    loadingText?: string,
    hideLoaderIcon?: boolean
}

const LoadingState = ({loadingText, hideLoaderIcon = false, className, ...props}:Props) => {
  return (
    <>
        {hideLoaderIcon && <Loader2 className={cn(`mr-2 h-4 w-4 animate-spin dark:text-white text-black`,className)} {...props} />}
        {loadingText && <p>{loadingText}</p>}
    </>
  )
}

export default LoadingState