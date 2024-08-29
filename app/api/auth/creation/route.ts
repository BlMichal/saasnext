import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../../../utlis/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong");
  }

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });    
  }
  return NextResponse.redirect("http://localhost:3000/dashboard")
}
