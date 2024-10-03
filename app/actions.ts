"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import {
  articleSchema,
  SiteCreationSchema,  
} from "./utlis/zodSchemas";
import prisma from "./utlis/db";
import { requireUser } from "./utlis/requireUser";
import { stripe } from "./utlis/stripe";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const [subStatus, sites] = await Promise.all([
    prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
      },
    }),
    prisma.site.findMany({
      where: {
        userId: user.id,
      },
    }),
  ]);

  if (!subStatus || subStatus.status !== "active") {
    // One sites for not sub. users
    if (sites.length < 1) {
     await createSite();
    } else {
      return redirect("/dashboard/pricing");
    }
  } else if (subStatus.status === "active") {
   await createSite();
  }

  async function createSite() {
    const submission = await parseWithZod(formData, {
      schema: SiteCreationSchema({
        async isSubdirectoryUnique() {
          const existingSubDirectory = await prisma.site.findUnique({
            where: {
              subdirectory: formData.get("subdirectory") as string,
            },
          });
          return !existingSubDirectory;
        },
      }),
      async: true,
    });

    if (submission.status !== "success") {
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

  }
  return redirect("/dashboard/sites/");
}

export async function CreateArticleActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: articleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.article.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.image,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function EditArticleActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: articleSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.article.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.image,
    },
  });
  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeleteArticleActions(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.article.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("id") as string,
    },
    data: { imageUrl: formData.get("imageUrl") as string },
  });

  return redirect(`/dashboard/sites/${formData.get("id")}`);
}

export async function DeleteSite(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("id") as string,
    },
  });

  return redirect(`/dashboard/sites/`);
}

export async function CreateSubscription() {
  const user = await requireUser();

  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_SUBS_STARTUP, quantity: 1 }],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url: "http://localhost:3000/dashboard/payment/success",
    cancel_url: "http://localhost:3000/dashboard/payment/cancelled",
  });

  return redirect(session.url as string);
}
