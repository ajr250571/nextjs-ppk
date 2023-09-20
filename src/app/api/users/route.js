import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("TokenName");
    if (!token) {
      return NextResponse.json({ message: "Token not found" }, { status: 404 })
    }
    const { email } = jwt.verify(token.value, process.env.SECRET_KEY);
    if (!email) {
      return NextResponse.json({ message: "Token invalid" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error })
  }

  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request) {
  // try {
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("TokenName");
  //   if (!token) {
  //     return NextResponse.json({ message: "Token not found" }, { status: 404 })
  //   }
  //   const { email } = jwt.verify(token.value, process.env.SECRET_KEY);
  //   if (!email) {
  //     return NextResponse.json({ message: "Token invalid" }, { status: 401 })
  //   }
  // } catch (error) {
  //   return NextResponse.json({ error })
  // }

  const data = await request.json()
  const user = await prisma.user.create({
    data: data
  })

  return NextResponse.json(user)
}