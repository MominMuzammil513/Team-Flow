import { Theme } from "@/components/settings/theme/Theme";
import { checkUserCompletedOnBoarding } from "@/lib/checkUserCompletedOnBoarding";

const ThemeSettings = async () => {
  const session = await checkUserCompletedOnBoarding("/dashboard/settings");
  return (
    <>
      <Theme />
    </>
  );
};

export default ThemeSettings;
