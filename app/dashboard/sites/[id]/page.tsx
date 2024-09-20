import prisma from "@/app/utlis/db";
import { requireUser } from "@/app/utlis/requireUser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, FileIcon, MoreHorizontal, Plus, Settings } from "lucide-react";
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
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>Manage your articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Create at</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <>
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image
                            src={item.image}
                            width={64}
                            height={64}
                            alt="Article cover image"
                            className="size-16 object-contain rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={"outline"}
                            className="bg-green-500/10 text-green-500"
                          >
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Intl.DateTimeFormat("cs", {
                            dateStyle: "medium",
                          }).format(item.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Action</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/dashboard/sites/${params.id}/${item.id}`}
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
