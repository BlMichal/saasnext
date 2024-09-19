import prisma from "@/app/utlis/db";
import { requireUser } from "@/app/utlis/requireUser";
import { Button } from "@/components/ui/button";
import { Book, FileIcon, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(userId: string, siteId: string) {
  const data = await prisma.article.findMany({
    where: {
      userId: userId,
      siteId: siteId,
    },
    select: {
      image: true,
      slug: true,
      description: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();

  const data = await getData(user.id, params.id);

  return (
    <>
      <div className="flex w-full justify-end gap-x-2">
        <Button asChild variant="secondary">
          <Link href={"/"}>
            <Book className="size-6 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild>
          <Link href={"/"}>
            <Settings className="size-6 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.id}/create`}>
            <Plus className="size-6 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>
      {!data === undefined || data.length !== 0 ? (
        <>
          {data.map((item) => (
            <div key={item.id}>
              {item.title}
              <Image
                src={item.image}
                width={250}
                height={250}
                alt="r"
                className="object-contain"
              />
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            Nemáte vytvořené žádné articly
          </h2>
        </div>
      )}
    </>
  );
}
