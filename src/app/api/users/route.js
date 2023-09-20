import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function GET(request) {
  if (process.env.NODE_ENV === "production") {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("TokenName");
      if (!token) {
        return NextResponse.json(
          { message: "Token not found" },
          { status: 404 }
        );
      }
      const { email } = jwt.verify(token.value, process.env.SECRET_KEY);
      if (!email) {
        return NextResponse.json({ message: "Token invalid" }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      attempts: true,
      blocked: true,
      createdAt: true,
      UpdateAt: true,

    },
  });
  return NextResponse.json(users);
}

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("TokenName");
      if (!token) {
        return NextResponse.json(
          { message: "Token not found" },
          { status: 404 }
        );
      }
      const { email } = jwt.verify(token.value, process.env.SECRET_KEY);
      if (!email) {
        return NextResponse.json({ message: "Token invalid" }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error });
    }
  }

  const data = await request.json();

  const salt = bcrypt.genSaltSync();
  const hashed = bcrypt.hashSync(data.password, salt);
  data.password = hashed
  const user = await prisma.user.create({
    data: data,
  });

  return NextResponse.json(user);
}
