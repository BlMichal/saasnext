'use client'

import { CreateSiteAction } from '@/app/actions'
import SubmitButton from '@/app/components/SubmitButton'
import { siteSchema } from '@/app/utlis/zodSchemas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import React from 'react'
import { useFormState } from 'react-dom'

export default function CreateNewSites() {
    const [lastResult, action] = useFormState(CreateSiteAction, undefined);
    const [form,fields] = useForm({
        lastResult,
        onValidate({formData}) {
            return parseWithZod(formData,{schema: siteSchema,});
        },
        shouldValidate:"onBlur",
        shouldRevalidate: "onInput",
    });

  return (
    <div className='flex flex-col flex-1 items-center'>
        <Card className='max-w-[450px] w-full'>
            <CardHeader>
                <CardTitle>Title</CardTitle>
                <CardDescription>Vytvořte si svoji stránku.</CardDescription>               
            </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <CardContent>
                <div className='flex flex-col gap-y-6'>
                    <div className='grid gap-2'>
                        <Label>Site Name</Label>
                        <Input name={fields.name.name} key={fields.name.key} defaultValue={fields.name.initialValue} placeholder='Site name'/>
                        <p className='text-red-500 text-sm'>{fields.name.errors}</p>
                    </div>
                    <div className='grid gap-2'>
                        <Label>Subdirectory</Label>
                        <Input name={fields.subdirectory.name} key={fields.subdirectory.key} defaultValue={fields.subdirectory.initialValue} placeholder='Subdirectory'/>
                        <p className='text-red-500 text-sm'>{fields.subdirectory.errors}</p>
                    </div>
                    <div className='grid gap-2'>
                        <Label>Description</Label>
                        <Textarea name={fields.description.name} key={fields.description.key} defaultValue={fields.description.initialValue} placeholder='Popis pro vaši stránku'/>
                        <p className='text-red-500 text-sm'>{fields.description.errors}</p>
                    </div>                   
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton text='Uložit' />
            </CardFooter>
      </form>
        </Card>
    </div>
  )
}
