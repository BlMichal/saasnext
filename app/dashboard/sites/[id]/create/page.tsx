"use client";

import { CreateArticleActions } from "@/app/actions";
import EditorWrapper from "@/app/components/EditorWrapper";
import { UploadDropzone } from "@/app/utlis/uploadthing";
import { articleSchema } from "@/app/utlis/zodSchemas";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeftIcon, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import slugify from "react-slugify";
import SubmitButton from "@/app/components/SubmitButton";

export default function ArticleCreationRoute({
  params,
}: {
  params: { id: string };
}) {
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<undefined | string>(
    undefined
  );
  const [slugValue, setSlugValue]= useState<undefined | string>(undefined);
  const [titleValue, setTitleValue] = useState<undefined | string>(undefined);
  const [lastResult, action] = useFormState(CreateArticleActions, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: articleSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = titleValue;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create an title first");
    }

    setSlugValue(slugify(titleInput));

    return toast.success("Slug hase been created!")
  }

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
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="flex flex-col gap-6"            
          >
            <input type="hidden" name="siteId" value={params.id} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                onChange={(e) => setTitleValue(e.target.value)}
                value={titleValue}
                placeholder="NextJs blogging web app"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Article slug"
                onChange={(e) => setSlugValue(e.target.value)}
                value={slugValue}
              />
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
              <Button onClick={handleSlugGeneration} className="w-fit" variant="secondary" type="button">
                <Atom className="mr-2 size-4" />
                Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder="Small Description for your article.."
                rows={6}
              />
              <p className="text-red-500 text-sm">
                {fields.description.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                key={fields.image.key}
                name={fields.image.name}
                defaultValue={fields.image.initialValue}
                value={imagePreview}
              ></input>
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
              <p className="text-red-500 text-sm">{fields.image.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Arcicle Content</Label>
              <input
                type="hidden"
                key={fields.articleContent.key}
                name={fields.articleContent.name}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              ></input>
              <EditorWrapper onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButton text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
