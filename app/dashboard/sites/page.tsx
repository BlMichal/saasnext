import { Button } from "@/components/ui/button";
import { FileIcon, Plus } from "lucide-react";
import Link from "next/link";

export default function SitesPage() {
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}><Plus className="mr-1"/>CREATE SITE</Link>
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">

        <FileIcon className="size-10 text-primary"/>
        </div>
        <h2 className="mt-6 text-xl font-semibold">Nemáte vytvořené žádné stránky</h2>
        
      </div>
    </>
  );
}
