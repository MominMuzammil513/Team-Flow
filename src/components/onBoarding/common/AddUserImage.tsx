import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/ui/user-avatar';
import { imageSchema, ImageSchema } from '@/Schemas/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Check, Trash, User } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { User as UserType } from "@prisma/client";
import { useRouter } from '@/i18n/routing';
import { useSession } from 'next-auth/react';
import LoadingState from '@/components/ui/loading-state';
import axios from "axios";
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface Props {
    profileImage?: string | null;
}

const AddUserImage = ({ profileImage }: Props) => {
    const [imagePreview, setImagePreview] = React.useState("");
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();
    const { update } = useSession();
    const { toast } = useToast()
    const m = useTranslations("MESSAGES")
    const t = useTranslations("CHANGE_PROFILE_IMAGE")
    const form = useForm<ImageSchema>({
        resolver: zodResolver(imageSchema),
        defaultValues: { image: undefined } // Ensure the form has a default value
    });

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const result = imageSchema.safeParse({ image: selectedFile });

            if (result.success) {
                form.clearErrors("image");
                form.setValue("image", selectedFile);
                setImagePreview(URL.createObjectURL(selectedFile)); // Preview update
            } else {
                const errors = result.error.flatten().fieldErrors.image;
                errors?.forEach((error) => {
                    form.setError("image", { message: error });
                });
            }
        }
    };

    const imageOptions = useMemo(() => {
        if (!imagePreview && profileImage) {
            return {
                canDelete: true,
                canSave: false
            };
        } else if (imagePreview && profileImage) {
            return {
                canDelete: false,
                canSave: true
            };
        } else if (imagePreview && !profileImage) {
            return {
                canDelete: false,
                canSave: true
            };
        } else return {
            canDelete: false,
            canSave: false
        };
    }, [imagePreview, profileImage]);

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadError: (error) => {
            toast({
                title: m("ERRORS_UPLOAD_TITLE"),
                variant: "destructive"
            })
        },
        onClientUploadComplete: (data) => {
            if(data) uploadProfileImage(data[0].url)
            else {
                toast({
                    title: m("ERRORS.IMAGE_PROFILE_UPDATE"),
                    variant: "destructive"
                })
        }
        }
    });

    const { mutate: uploadProfileImage, isPending } = useMutation({
        mutationFn: async (profileImage: string) => {
            const { data } = await axios.post(`/api/profile/profileImage`, { profileImage });
            return data as UserType;
        },
        onError: (error) => {
            toast({
                title: m("ERRORS_UPLOAD_TITLE" + ` ${error}`),
                variant: "destructive"
            })
        },
        onSuccess: async () => {
            toast({
                title: m("SUCCESS.ERRORS_UPLOAD_TITLE"),
            })
            setIsOpen(false)
            await update();
            router.refresh();
        },
        mutationKey: ["updateProfileImage"]
    });

    // const onSubmit = async (data: ImageSchema) => {
    //     const image: File = data.image;
    //     console.log("Selected image:", image);
    //     try {
    //         const res = await startUpload([image]);
    //         if (!res) throw new Error("uploadthing error");
    //         console.log("Upload response:", res);
    //         uploadProfileImage(res[0].url);
    //     } catch (error) {
    //         console.error("Upload error:", error);
    //     }
    // };

    const { mutate: deleteProfileImage, isPending: isDeleting } = useMutation({
        mutationFn: async () => {
          const { data } = await axios.post(`/api/profile/delete-profile-image`);
          return data as UserType;
        },
        onError: (err) => {
          toast({
            title: m("ERRORS.IMAGE_PROFILE_UPDATE"),
            variant: "destructive",
          });
        },
        onSuccess: async () => {
          toast({
            title: m("SUCCESS.IMAGE_PROFILE_UPDATE"),
          });
          await update();
          router.refresh();
        },
        mutationKey: ["deleteProfileImage"],
      });
    
    const onSubmit = async (data:ImageSchema) => {
        const image:File = data.image
        await startUpload([image])
    }

    return (
        <div className='flex w-full flex-col justify-center items-center gap-2'>
            {/* <p className='text-sm text-muted-foreground'>Add a photo</p> */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button className='relative bg-muted w-16 h-16 md:w-20 md:h-20 rounded-full flex justify-center items-center text-muted-foreground overflow-hidden'>
                        {profileImage ? (
                            <Image priority src={profileImage} alt='profile image' fill className='object-cover h-full w-full' />
                        ) : (
                            <User />
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className='flex flex-col justify-center items-center sm:max-w-[28rem] p-0'>
                    <DialogHeader className='flex justify-center items-center'>
                        <DialogTitle>Upload a photo</DialogTitle>
                    </DialogHeader>
                    {imagePreview ? (
                        <div className='rounded-full w-52 h-52 relative overflow-hidden my-5'>
                            <Image src={imagePreview} alt='profile image preview' fill className='w-full h-full object-cover' />
                        </div>
                    ) : (
                        <UserAvatar className='w-52 h-52 my-5' size={52} profileImage={profileImage} />
                    )}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <Button
                                                    type="button"
                                                    className="mb-1"
                                                    onClick={() => {
                                                        inputRef.current?.click();
                                                    }}
                                                >
                                                    Choose a file
                                                </Button>
                                                <Input
                                                    {...field}
                                                    onChange={onImageChange} // Handle manually
                                                    ref={inputRef}
                                                    type="file"
                                                    id="image"
                                                    className="hidden"
                                                    value={undefined} // Ensure the input is always controlled
                                                    accept='image/*'
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className='flex mt-5 w-full justify-center items-center gap-4'>
                                <Button
                                    type='button'
                                    disabled={!imageOptions.canDelete || isDeleting}
                                    variant={imageOptions.canDelete ? "default" : "secondary"}
                                    className={`rounded-full w-12 h-12 p-2 ${imageOptions.canDelete ? "" : "text-muted-foreground"}`}
                                    onClick={()=>deleteProfileImage()}
                                >
                                    {isDeleting ? <LoadingState/> : <Trash size={10} />}
                                    
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={!imageOptions.canSave || isUploading || isPending}
                                    variant={imageOptions.canSave ? "default" : "secondary"}
                                    className={`rounded-full w-12 h-12 p-2 ${imageOptions.canSave ? "" : "text-muted-foreground"}`}
                                >
                                    {isPending || isUploading ? <LoadingState /> : <Check size={18} />}
                                </Button>

                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddUserImage;