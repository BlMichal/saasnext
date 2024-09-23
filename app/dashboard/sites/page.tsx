import prisma from "@/app/utlis/db";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DefaultImage from "@/public/default.png";

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function SitesPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <Plus className="mr-1" />
            CREATE SITE
          </Link>
        </Button>
      </div>

      {data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                width={300}
                height={300}
                className="rounded-t-lg object-cover w-full aspect-auto"
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>View Articles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            Nemáte vytvořené žádné stránky
          </h2>
        </div>
      )}
    </>
  );
}
