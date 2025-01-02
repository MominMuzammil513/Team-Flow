import { useTranslations } from "next-intl";
import ProviderSignInBtn from "./ProviderSignInBtn";
import GoogleLogo from "../svg/GoogleLogo";
import GitHubLogo from "../svg/GitHubLogo";

export const ProviderSignUpBtns = ({
  signInCard,
  disabled,
  onLoading,
}: {
  signInCard?: boolean;
  disabled?: boolean;
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const t = useTranslations("AUTH");
  return (
    <div className="flex flex-col gap-2">
      <ProviderSignInBtn onLoading={onLoading} providerName="google" disabled={disabled} className="w-full bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50 text-sm h-12 sm:h-10 sm:text-base">
      <GoogleLogo className="mr-2" width={20} height={20} />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GOOGLE")
          : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInBtn>
      <ProviderSignInBtn onLoading={onLoading} providerName="github" disabled={disabled} className="w-full bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50 ext-sm h-12 sm:h-10 sm:text-base">
      <GitHubLogo className="mr-2" width={20} height={20} />
        {signInCard
          ? t("SIGN_IN.PROVIDERS.GITHUB")
          : t("SIGN_UP.PROVIDERS.GITHUB")}
      </ProviderSignInBtn>
    </div>
  );
};
