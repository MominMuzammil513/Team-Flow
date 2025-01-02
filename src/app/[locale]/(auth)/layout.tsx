import LocaleSwitcher from "@/components/switchers/LocaleSwitcher"
import ThemeSwitcher from "@/components/switchers/ThemeSwitcher"

const AuthLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <main className="flex min-h-screen items-center justify-center gap-3 flex-col w-full p-4 md:p-6 border-2 border-green-400">
            <div className="absolute top-0 left-0 w-full flex justify-end">
                <div className="flex justify-center gap-2 max-w-7xl p-4 md:p-6">
                    <LocaleSwitcher alignDropdown="end" alignHover="end" size={"icon"} variant={"outline"}/>
                    <ThemeSwitcher alignDropdown="end" alignHover="end" size={"icon"} variant={"outline"}/>
                </div>
            </div>
            {children}
        </main>
    )
}

export default AuthLayout