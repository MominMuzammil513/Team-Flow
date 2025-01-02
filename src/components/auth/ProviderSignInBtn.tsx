"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import { useProviderLoginError } from "@/hooks/UseProviderLoginError";
import { signIn } from "next-auth/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  providerName: "google" | "github";
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderSignInBtn = ({
  children,
  providerName,
  onLoading,
  ...props
}: Props) => {
  const [showLoadingInfo, setShowLoadingInfo] = useState(false);
  const locale = useLocale()
  useProviderLoginError(showLoadingInfo);

  const signInHandler = async () => {
    onLoading(true);
    setShowLoadingInfo(true);
    try {
      await signIn(providerName, { callbackUrl: `/${locale}/onboarding` });
    } catch (error) {
      console.log(error)
    }
    onLoading(false);
    
  }
  return (
    <Button onClick={signInHandler} {...props} variant={"secondary"} type="button">
      {children}
    </Button>
  );
};

export default ProviderSignInBtn;
