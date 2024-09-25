import { RenderArticle } from "@/app/components/RenderArticle";
import prisma from "@/app/utlis/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";

async function getData(slug: string) {
  const data = await prisma.article.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      description: true,
      image: true,
      createdAt: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string; name: string };
}) {
  const data = await getData(params.slug);

  return (
    <div>
      <div className="flex items-center gap-x-4 pt-10 pb-5">
        <Button asChild>
          <Link href={`/blog/${params.name}/`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h3 className="font-semibold">Vrátit se</h3>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
            {new Intl.DateTimeFormat('cs',{dateStyle:'medium'}).format(data.createdAt)}
          </p>
          <h2 className="text-3xl md:text-6xl tracking-tight mb-5 font-bold">
            {data.title}
          </h2>
          <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
            {data.description}
          </p>
        </div>
      </div>
      <div className="relative m-auto mb-10 h-80 md:h-[450px] w-full max-w-screen-lg overflow-hidden md:mb-20 md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <RenderArticle json={data.articleContent as JSONContent} />
    </div>
  );
}
