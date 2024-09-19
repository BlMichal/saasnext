'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface iAppProps {
    text: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export default function SubmitButton({text ,className,variant}:iAppProps) {
    const {pending} = useFormStatus();
  return (
    <>
    {pending ? <Button disabled className={cn('w-fit', className)} variant={variant}><Loader className="mr-2 size-4 animate-spin"/> Ukládá se...</Button>:  <Button className={cn("w-fit", className)} variant={variant} type="submit">{text}</Button>}   
    </> 
  )
}
