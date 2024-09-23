import { DeleteArticleActions } from "@/app/actions";
import SubmitButton from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function DeleteRoute({params}:{params:{id:string, articleId:string}}) {
  return (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-xl">
            <CardHeader>
                <CardTitle>
                    Opravdu chcete smazat ?
                </CardTitle>
                <CardDescription>
                    Údaje budou smazány
                </CardDescription>
            </CardHeader>
            <CardFooter className="w-full flex justify-between">
                <form action={DeleteArticleActions}>
                    <input type="hidden" name="articleId" value={params.articleId} />
                    <input type="hidden" name="siteId" value={params.id} />
                <SubmitButton variant={"destructive"} text="Delete"></SubmitButton>
                </form>
                <Button variant={"secondary"}><Link href={`/dashboard/sites/${params.id}`}>Cancel</Link></Button>
            </CardFooter>
        </Card>

    </div>
  )
}
