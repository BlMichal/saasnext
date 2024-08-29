import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function CreateNewSites() {
  return (
    <div className='flex flex-col flex-1 items-center'>
        <Card className='max-w-[450px] w-full'>
            <CardHeader>
                <CardTitle>Title</CardTitle>
                <CardDescription>Vytvořte si svoji stránku.</CardDescription>
               
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-y-6'>
                    <div className='grid gap-2'>
                        <Label>Site Name</Label>
                        <Input placeholder='Site name'/>
                    </div>
                    <div className='grid gap-2'>
                        <Label>Subdirectory</Label>
                        <Input placeholder='Subdirectory'/>
                    </div>
                    <div className='grid gap-2'>
                        <Label>Description</Label>
                        <Textarea placeholder='Popis pro vaši stránku'/>
                    </div>
                   
                </div>
            </CardContent>
            <CardFooter>
                <Button>Uložit</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
