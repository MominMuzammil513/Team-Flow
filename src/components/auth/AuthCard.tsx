import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SignUpCardContent from "./SignUpCardContent";
import SignInCardContent from "./SignInCardContent";

interface AuthCardProps {
  signInCard?: boolean;
}

const AuthCard = ({ signInCard }: AuthCardProps) => {
  const t = useTranslations("AUTH");
  return (
    <>
      <Card className="w-full sm:min-w-[28rem] sm:w-auto p-4">
        <CardHeader>
          <Image
            src={"https://github.com/shadcn.png"}
            alt="logo"
            className="rounded-full object-cover self-center"
            width={50}
            height={50}
          />
        </CardHeader>
        <CardTitle>
          {signInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
        </CardTitle>
        <CardDescription>
          {signInCard ? t("SIGN_IN.DESC") : t("SIGN_UP.DESC")}
        </CardDescription>
        {signInCard?<SignInCardContent/>:<SignUpCardContent/>}
      </Card>
      <p className="text-sm">{signInCard? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST") : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}</p>
      <Link className="text-primary" href={signInCard ? "/sign-up" : "/sign-in"}>{signInCard ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND") : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}</Link>
    </>
  );
};

export default AuthCard;
