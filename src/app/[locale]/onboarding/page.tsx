
import { checkUserCompletedOnBoarding } from "@/lib/checkUserCompletedOnBoarding";
import { OnBoardingFormProvider } from "../../../../context/OnBoardingForm";
import AdditionalInfoSection from "@/components/onBoarding/AdditionalInfoSection";
import SummarySection from "@/components/onBoarding/SummarySection";

const Onboarding = async () => {
  const session = await checkUserCompletedOnBoarding("/onboarding");
  return (
    <OnBoardingFormProvider session={session}>
      <AdditionalInfoSection profileImage={session.user.image}/>
      <SummarySection/>
    </OnBoardingFormProvider>
  )
};

export default Onboarding;