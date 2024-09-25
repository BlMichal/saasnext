import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyHeaderState from "../components/EmptyHeaderState";
import prisma from "../utlis/db";
import { requireUser } from "../utlis/requireUser";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DefaultImage from "@/public/default.png";

async function getData(userId: string) {
  const [sites, article] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, article };
}

const DashBoardPage = async () => {
  const user = await requireUser();

  const { article, sites } = await getData(user.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your site</h1>
      {sites.length < 0 ? (
        <EmptyHeaderState headerText="Nebyla nalezena žádná stránka." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((item) => (
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
      )}
      <hr className="mt-8"/>
      <h1 className="text-2xl font-semibold my-5">Recent articles</h1>
      {article.length < 0 ? (
        <EmptyHeaderState headerText="Nebyli nalezeny žádné příspěvky." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {article.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.image ?? DefaultImage}
              alt={item.title}
              width={400}
              height={200}
              className="rounded-t-lg object-cover w-full h-[200px]"
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>View Articles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

export default DashBoardPage;
