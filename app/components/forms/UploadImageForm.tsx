"use client";
import { UploadDropzone } from "@/app/utlis/uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";

export default function UploadImageForm({siteId}:{siteId:string}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>You can change image here</CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] object-cover rounded-md"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("New image was uploaded");
            }}
            onUploadError={() => {
              toast.error("Something went wrong.");
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
            <input type="hidden" name="id" value={siteId} />
            <input type="hidden" name="imageUrl" value={imageUrl} />
        <SubmitButton text="Change Image"></SubmitButton>
        </form>
      </CardFooter>
    </Card>
  );
}
