import { AccountInfo } from "@/components/settings/account/AccountInfo"
import { DeleteAccount } from "@/components/settings/account/DeleteAccount"
import { Heading } from "@/components/settings/account/Heading"
import { Separator } from "@/components/ui/separator"
import { checkUserCompletedOnBoarding } from "@/lib/checkUserCompletedOnBoarding"


const Settings = async () => {
    const session = await checkUserCompletedOnBoarding("/dashboard/settings")
    return (
        <>
            <div>
                <Heading/>
                <AccountInfo session={session} />
                <div className="p-4 sm:p-6">
                    <Separator/>
                </div>
                <DeleteAccount userEmail={session.user.email!}/>
            </div>
        </>
    )
}

export default Settings