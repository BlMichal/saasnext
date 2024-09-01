'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { parseWithZod } from '@conform-to/zod'
import { siteSchema } from "./utlis/zodSchemas"
import prisma from "./utlis/db";


export async function CreateSiteAction(formData: FormData) {
    const { getUser } = getKindeServerSession()

    const user = await getUser()

    if (!user) {
        return redirect('/api/auth/login')
    }

    const submission = parseWithZod(formData, {
        schema: siteSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
    const response = await prisma.site.create({
        data: {
            name: submission.value.name,
            subdirectory: submission.value.subdirectory,
            description: submission.value.description,
            userId: user.id,
        },
    });

    return redirect("/dashboard/sites/")
};