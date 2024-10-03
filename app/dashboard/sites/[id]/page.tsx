import EmptyHeaderState from "@/app/components/EmptyHeaderState";
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
import { Book, MoreHorizontal, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(userId: string, siteId: string) {

  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      Article: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
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

  if(!data){
    return <div>loading</div>
  }

  
  return (
    <>
      <div className="flex w-full justify-end gap-x-2">
        <Button asChild variant="secondary">
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="size-6 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.id}/settings`}>
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
      {data?.Article == undefined || data.Article.length !== 0 ? (
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
                  {data.Article.map((item) => (                   
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
                              <DropdownMenuItem asChild> 
                                <Link
                                  href={`/dashboard/sites/${params.id}/${item.id}/delete`}
                                >
                                  Delete
                                </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (        
          <EmptyHeaderState headerText="Nemáte vytvořené žádné articly" />        
      )}
    </>
  );
}
