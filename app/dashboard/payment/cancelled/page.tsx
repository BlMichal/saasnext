import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";


export default function CancelRoute() {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
       <Card className="w-[350px] border-destructive bg-red-500/20">
        <div className="p-6">
            <div className="w-full flex justify-center">
                <XIcon className="size-12 rounded-full bg-red-500 text-white"/>
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
                <h2 className="font-medium text-xl ">Platba zrušena</h2>
                <p className="text-sm mt-2 text-muted-foreground">Platba Vám nebyla zaúčtována.</p>
                <Button asChild className="w-full mt-5" variant={'destructive'}>
                    <Link href={'/dashboard/payment'}>Zpět</Link>
                </Button>
            </div>
        </div>
       </Card>
    </div>
  )
}
