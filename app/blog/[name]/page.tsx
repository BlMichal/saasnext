import prisma from "@/app/utlis/db";
import { requireUser } from "@/app/utlis/requireUser";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from '@/public/vercel.svg'
import DefaultImage from '@/public/default.png'
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      Article: {
        select: {
          description: true,
          title: true,
          image: true,
          slug: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!data) return notFound();

  return data;
}

export default async function BlogPage({
  params,
}: {
  params: { name: string };
}) {

  const data = await getData(params.name);

  return (
    <>
    <nav className="grid grid-cols-3 my-8">
      <div className="col-span-1">

      </div>
      <div className="flex items-center gap-x-4 justify-center">
        <Image src={Logo} alt='Logo' />
        <h1 className="text-3xl font-semibold">{data.name}</h1>
      </div>
        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle/>
        </div>
    </nav>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.Article.map((item) => (
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
                  <Link href={`/blog/${params.name}/${item.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
    </>
  );
}
