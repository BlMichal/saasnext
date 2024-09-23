import UploadImageForm from '@/app/components/forms/UploadImageForm'
import SubmitButton from '@/app/components/SubmitButton'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SettingsRoute({params}:{params :{id:string}}) {
  return (
    <>
    
    <div className='flex items-center gap-x-2'>
        <Button variant={'outline'} size={'icon'} asChild>            
            <Link href={`/dashboard/sites/${params.id}`}><ChevronLeft/></Link>
        </Button>
        <h3>Go Back</h3>
    </div>

    <UploadImageForm siteId={params.id} />

    <Card className='border-red-500 bg-red-500/10'>
        <CardHeader>
            <CardTitle className='text-red-500'>
                Danger
            </CardTitle>
            <CardDescription>
                This will delete your site and all article associated with it.
                Click on this button to delete everything
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <SubmitButton text='Delete' variant={'destructive'}></SubmitButton>
        </CardFooter>
    </Card>
    </>
  )
}
