"use client";

import React from "react";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "@/Schemas/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignUpBtns } from "./ProviderSignUpBtns";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoadingState from "../ui/loading-state";

const SignUpCardContent = () => {
  const t = useTranslations("AUTH");
  const m = useTranslations("MESSAGES");
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.error || "Something went wrong");
        }

        toast({
            title: m("SIGN_UP.SUCCESS"),
            description: "Account created successfully",
            variant: "default",
        });

        // Sign in the user
        const signInResult = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (signInResult?.error) {
            throw new Error(signInResult.error);
        }

        router.push("/onboarding");
    } catch (error) {
        let errMsg = m("ERRORS.DEFAULT");
        if (error instanceof Error) {
            errMsg = error.message;
        }
        toast({
            title: errMsg,
            variant: "destructive",
        });
    }
    setIsLoading(false);
};

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <ProviderSignUpBtns disabled={isLoading} onLoading={setIsLoading}/>
            <div className="space-y-1.5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("EMAIL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("USERNAME")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("PASSWORD")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Button
                disabled={isLoading}
                className="w-full font-bold"
                type="submit"
              >
                {isLoading ? (
                  <>
                    {/* <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span> */}
                    <LoadingState loadingText={m("PENDING.LOADING")} hideLoaderIcon={isLoading} />
                  </>
                ) : (
                  <>{t("SIGN_UP.SUBMIT_BTN")}</>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {t("SIGN_UP.TERMS.FIRST")}{" "}
                <Link className="" href={"/"}>
                  {t("SIGN_UP.TERMS.SECOND")}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default SignUpCardContent;
