import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { UploadFile } from "../common/UploadFile";
import { workspaceSchema, WorkspaceSchema } from "@/Schemas/workspaceSchema";
import { useOnboardingForm } from "../../../../context/OnBoardingForm";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { ActionType } from "@/types/onBoardingContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/ui/loading-state";
import { ArrowRight } from "lucide-react";

export const ThirdStep = () => {
  const [uploadError, setUploadError] = React.useState(false);
  const { currentStep, dispatch } = useOnboardingForm();
  const { toast } = useToast();
  const m = useTranslations("MESSAGES");
  const t = useTranslations("ONBOARDING_FORM");
  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: "",
      file: null, // Ensure the file field is initialized correctly
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      setUploadError(true)
      toast({
        title: m("ERRORS.WORKSPACE_ICON_ADDED"),
        variant: "destructive",
      });
    },
    onClientUploadComplete: (data) => {
      if (data) {
        dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url });
      } else {
        setUploadError(true)
        toast({
          title: m("ERRORS.WORKSPACE_ICON_ADDED"),
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = async (data: WorkspaceSchema) => {
    setUploadError(false)
    const image: File | undefined | null = data.file;
    if (image) await startUpload([image]);
    if(uploadError) return
    dispatch({ type: ActionType.WORKSPACE_NAME, payload: data.workspaceName });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 text-center flex-col my-10 w-full">
        <h2 className="font-bold text-4xl md:text-5xl max-w-md">
          Create a workspace
        </h2>
      </div>
      <Form {...form}>
        <form
          className="w-full max-w-md mt-12 space-y-1.5 gap-y-3 flex justify-center items-center flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-1.5 w-full flex flex-col justify-center items-center">
            <FormField
              name="workspaceName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Create a workspace</FormLabel>
                  <FormControl>
                  <Input className='bg-muted' placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <UploadFile
            form={form}
            schema={workspaceSchema}
            inputAccept="image/*"
            typesDescription={t("THIRD_STEP.IMAGE")}
            ContainerClassName="w-full"
            LabelClassName="text-muted-foreground mb-1.5 self-start"
            LabelText={t("THIRD_STEP.INPUTS.FILE")}
          />
          <Button disabled={isUploading} type="submit" className="w-full mt-10 max-w-md font-semibold">
            {isUploading ? (
              <LoadingState />
            ) : (
              <>
                {t("NEXT_BTN")}
                <ArrowRight width={18} height={18} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};