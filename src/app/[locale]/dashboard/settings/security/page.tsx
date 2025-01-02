import { checkUserCompletedOnBoarding } from "@/lib/checkUserCompletedOnBoarding";

const SecuritySettings = async () => {
  const session = await checkUserCompletedOnBoarding("/dashboard/settings");
  return (
    <>
      <div>SecuritySettings</div>
    </>
  );
};

export default SecuritySettings;
