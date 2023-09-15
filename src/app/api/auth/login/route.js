
import { prisma } from "@/libs/prisma";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (user && email === user.email && password === user.password) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        email,
        username: user.name,
      },
      process.env.SECRET_KEY
    );

    const response = NextResponse.json({ isLogged: true });

    response.cookies.set({
      name: "TokenName",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json(
      {
        isLogged: false,
      },
      {
        status: 200,
      }
    );
  }
}