"use client";

import React from "react";
import { CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/Schemas/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignUpBtns } from "./ProviderSignUpBtns";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

const SignInCardContent = () => {
  const t = useTranslations("AUTH");
  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
const [isLoading, setIsLoading] = React.useState(false);
const router = useRouter()
const { toast } = useToast();
const m = useTranslations("MESSAGES");
  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    try {
      const account = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })
      if(!account){
        throw new Error("Something went wrong")
      }
      if(account?.error){
        toast({
          title: account.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: m("SUCCESS.SIGN_IN"),
          description: "Account created successfully",
        });
        router.push("/onboarding")
        router.refresh()
      }
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
          <ProviderSignUpBtns signInCard disabled={isLoading} onLoading={setIsLoading}/>
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
                <Button className="w-full font-bold" type="submit">{t("SIGN_IN.SUBMIT_BTN")}</Button>
                <p className="text-xs text-center text-muted-foreground">{t("SIGN_IN.FORGOT_PASSWORD")}
                </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default SignInCardContent;
