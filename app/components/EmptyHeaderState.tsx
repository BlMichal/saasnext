import { FileIcon } from "lucide-react";


export default function EmptyHeaderState({headerText}:{headerText: string}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
           {headerText}
          </h2>
        </div>
  )
}
