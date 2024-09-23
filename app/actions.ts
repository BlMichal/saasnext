"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { articleSchema, siteSchema } from "./utlis/zodSchemas";
import prisma from "./utlis/db";
import { requireUser } from "./utlis/requireUser";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await prisma.site.create({
    data: {
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      description: submission.value.description,
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites/");
}

export async function CreateArticleActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: articleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.article.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.image,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function EditArticleActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: articleSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.article.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.image,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeleteArticleActions(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.article.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("id") as string,
    },
    data: { imageUrl: formData.get("imageUrl") as string },
  });

  return redirect(`/dashboard/sites/${formData.get("id")}`);
}
