import prisma from "@/app/utlis/db";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DefaultImage from "@/public/default.png";
import EmptyHeaderState from "@/app/components/EmptyHeaderState";
import { requireUser } from "@/app/utlis/requireUser";

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

  const user = await requireUser()
  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);

  console.log(data)
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
      {!data === undefined || data.length !== 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                width={400}
                height={200}
                className="rounded-t-lg object-cover w-full h-[200px]"
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
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
        <EmptyHeaderState headerText="Nemáte vytvořené žádné stránky" />
      )}
    </>
  );
}
