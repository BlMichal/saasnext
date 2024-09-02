import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ArticleCreationRoute({params}:{params:{id:string}}) {

    console.log(`Hello ${params.id}`)
    return (
        <>
        <div className="flex items-center">
            <Button size='icon' variant='outline' className="mr-3" >
                <Link href={`/dashboard/sites/${params.id}`}>
                <ArrowLeftIcon className='size-5' />
                </Link>
            </Button>
            <h2 className="text-xl font-semibold ">Create Article</h2>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Article Title</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-6">
                

                </form>
            </CardContent>
        </Card>
        </>
    )
}