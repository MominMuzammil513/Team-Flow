import { getAuthSession } from "@/lib/authOption";
import { redirect } from "next/navigation";

export const checkUserCompletedOnBoarding = async (currentPath: string) => {
    const session = await getAuthSession();
    if (!session) return redirect("/");

    const { completeOnBoarding } = session.user;

    if (completeOnBoarding && currentPath === "/onboarding") {
        return redirect("/dashboard");
    }

    if (!completeOnBoarding && currentPath !== "/onboarding") {
        return redirect("/onboarding?error=not-completed-onboarding");
    }

    // If the user is already on the correct page, do nothing
    return session;
};