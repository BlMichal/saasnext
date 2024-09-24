import { EditArticleForm } from "@/app/components/forms/EditArticleForm";
import prisma from "@/app/utlis/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.article.findUnique({
    where: {
      id: id,
    },
    select: {
      image: true,
      title: true,
      description: true,
      articleContent: true,
      slug: true,
      id: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { articleId: string; id: string };
}) {
  const data = await getData(params.articleId);
  return (
    <>
      <div className="flex items-center">
        <Button asChild size={"icon"}>
          <Link href={`/dashboard/sites/${params.id}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="pl-2 text-xl">Edit Article</h1>
      </div>
      <EditArticleForm data={data} siteId={params.id} />
    </>
  );
}
