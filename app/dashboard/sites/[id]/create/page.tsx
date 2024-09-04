"use client";

import EditorWrapper from "@/app/components/EditorWrapper";
import { UploadDropzone } from "@/app/utlis/uploadthing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleCreationRoute({
  params,
}: {
  params: { id: string };
}) {

  const [value, setValue] = useState<JSONContent| undefined>(undefined)
  const [imagePreview, setImagePreview] = useState<undefined | string>(undefined);

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${params.id}`}>
            <ArrowLeftIcon className="size-5" />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold ">Create Article</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Title</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="NextJs blogging web app" />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="mr-2 size-4" />
                Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Small Description for your article.."
                rows={6}
              />
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  width={200}
                  height={200}
                  alt="Uploaded Image"
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                ></Image>
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImagePreview(res[0].url);
                    toast.success("Image has been uploaded");
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {                   
                    toast.error("Something went wrong...");
                  }}
                />
              )}
            </div>
            <div className="grid gap-2">
                <Label>Arcicle Content</Label>
                <EditorWrapper onChange={setValue} initialValue={value} />
            </div>
            <Button className="w-fit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
