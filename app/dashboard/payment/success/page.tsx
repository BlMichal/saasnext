import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccesPaymentRoute() {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
       <Card className="w-[350px] border-green-500 bg-green-500/20">
        <div className="p-6">
            <div className="w-full flex justify-center">
                <Check className="size-12 rounded-full bg-green-500 text-white p-1"/>
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
                <h2 className="font-medium text-xl ">Zaplaceno</h2>
                <p className="text-sm mt-2 text-muted-foreground">Platba byla zaúčtována.</p>
                <Button asChild className="w-full mt-5" variant={'outline'}>
                    <Link href={'/dashboard/payment'}>Zpět</Link>
                </Button>
            </div>
        </div>
       </Card>
    </div>
  )
}
