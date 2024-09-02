import prisma from "@/app/utlis/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, FileIcon, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, sideId: string) {
  const data = await prisma.article.findMany({
    where: {
      userId: userId,
      siteId: sideId,
    },
    select: {
      image: true,
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

export default async function SideIdRoute({
  params,
}: {
  params: { id: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("api/auth/login");
  }

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
      {!data === undefined || data.length !== 0 ? <>{data.map((item)=>(
        <div key={''}></div>
      ))}</> :  <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <FileIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        Nemáte vytvořené žádné articly
      </h2>
    </div>}
    </>
  );
}
